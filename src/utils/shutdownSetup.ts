import { Logger, ForgeClient } from "@tryforge/forgescript"

export async function shutdownSetup (client: ForgeClient): Promise<void> {
  ['SIGINT', 'SIGTERM'].forEach(signal => process.on(signal, () => {
    Logger.info(`Bot has been shut down`)
    client.destroy()
    process.exit(0)
  }))
}