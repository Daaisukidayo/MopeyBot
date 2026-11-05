const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

const PROCESS = "mopey"
const BRANCH = "origin/main"
const BUILT = ["dist", "node_modules"]
const HEALTH_WAIT = 30000

const run = (command, cwd) => {
  console.log(`\n> ${command}`)
  execSync(command, { cwd, stdio: "inherit" })
}
const read = (command, cwd) => execSync(command, { cwd, encoding: "utf8" }).trim()

const state = () => {
  const out = execSync("pm2 jlist", { encoding: "utf8", maxBuffer: 1 << 28 })
  try {
    const { pm2_env } = JSON.parse(out).find((process) => process.name === PROCESS)
    return { status: pm2_env.status, restarts: pm2_env.restart_time }
  } catch {
    throw new Error("pm2 jlist isn't readable")
  }
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const post = async (channel, content) => {
  console.log(content)
  const response = await fetch(`https://discord.com/api/v10/channels/${channel}/messages`, {
    method: "POST",
    headers: { Authorization: `Bot ${process.env.TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ content, allowed_mentions: { parse: [] } }),
  }).catch(() => null)
  if (!response?.ok) console.log(`Couldn't post to Discord: ${response?.status}`)
}

const remove = (dir) => fs.rmSync(dir, { recursive: true, force: true })

async function update({ root, run, read, state, wait, say }) {
  const build = `${root}-build`
  const old = `${root}-old`

  try {
    fs.mkdirSync(build)
  } catch {
    return say(`❌ Another update is running. If it's not, delete ${build}`)
  }

  try {
    let step
    const doing = (command, cwd = root) => {
      step = command
      run(command, cwd)
    }
    let from
    try {
      doing("git fetch origin")
      from = read("git rev-parse HEAD", root)
      if (from === read(`git rev-parse ${BRANCH}`, root)) return await say("Already up to date")

      doing(`git archive ${BRANCH} | tar -x -C "${build}"`)
      doing("npm ci --include=dev", build)
      doing("npm run build", build)
      doing(`git merge --ff-only ${BRANCH}`)
    } catch {
      return await say(`❌ Update failed at \`${step}\`, the bot wasn't touched. See ~/update.log`)
    }

    const to = read("git rev-parse HEAD", root)
    try {
      remove(old)
      fs.mkdirSync(old)
      for (const name of BUILT) {
        fs.renameSync(path.join(root, name), path.join(old, name))
        fs.renameSync(path.join(build, name), path.join(root, name))
      }
      run(`pm2 restart ${PROCESS}`, root)
      const { restarts } = state()
      await wait(HEALTH_WAIT)
      const now = state()
      if (now.status !== "online" || now.restarts !== restarts)
        throw new Error(`the new version crashed: ${now.status}`)
    } catch (error) {
      console.log(error.message)
      try {
        for (const name of BUILT) {
          if (!fs.existsSync(path.join(old, name))) continue
          remove(path.join(root, name))
          fs.renameSync(path.join(old, name), path.join(root, name))
        }
        run(`git reset --keep ${from}`, root)
        run(`pm2 restart ${PROCESS}`, root)
        remove(old)
      } catch (rollback) {
        console.log(rollback.message)
        return await say(
          `❌ The update failed and so did the rollback, the bot may be down. The old files are in ${old}`
        )
      }
      return await say(`❌ The new version crashed, rolled back to \`${from.slice(0, 7)}\`. See ~/update.log`)
    }

    remove(old)
    await say(`✅ Updated \`${from.slice(0, 7)}\` → \`${to.slice(0, 7)}\``)
  } finally {
    remove(build)
  }
}

if (require.main === module) {
  const channel = process.argv[2]
  update({
    root: path.resolve(__dirname, ".."),
    run,
    read,
    state,
    wait,
    say: (text) => post(channel, text),
  }).catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
}

module.exports = { update, run, read }
