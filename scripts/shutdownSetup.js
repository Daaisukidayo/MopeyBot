import chalk from "chalk"

export default async function (client) {
  const info = chalk.cyan.bold
  const warn = chalk.yellow.bold
  const debug = chalk.green.bold
  const err = chalk.red.bold
  const signals = ['SIGINT', 'SIGTERM']

  signals.forEach(signal => process.on(signal, () => {
    const now = new Date();
    const timestamp = `[${now.toLocaleString().replace(/,/g, '')}]`;

    console.log(debug(timestamp) + info(` [INFO] Bot has been shut down`) );
    client.destroy();
    process.exit(0);
  }));
}