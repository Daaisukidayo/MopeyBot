import chalk from "chalk"

export default async function (client) {
  const info = chalk.cyan.bold
  const warn = chalk.yellow.bold
  const debug = chalk.green.bold
  const err = chalk.red.bold

  process.on('SIGINT', () => {
    const now = new Date();
    const timestamp = `[${now.toLocaleString().replace(/,/g, '')}]`;
    
    console.log(debug(timestamp) + warn(` [WARN] Received signal STOP, shutting down the Bot...`) );
    try {
      client.destroy();
      console.log(debug(timestamp) + info(` [INFO] Bot has been shut down successfully`) );
      process.exit(0);
    } catch (error) {
      console.error(debug(timestamp) + err(` [ERROR] Failed to shut down the Bot: ${error.message}`));
    }
  })
}