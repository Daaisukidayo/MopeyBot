export default async function setupShutdown(client) {
  async function shutdown(signal) {
		console.log(`Received signal ${signal}, shutting down the bot...`);
		try {
      setTimeout(() => {
			client.destroy()
      console.log("Bot disconnected from Discord.");
      process.exit(0);
		}, 1000);
		} catch (err) {
      console.error("Error while disconnecting bot:", err);
		}
	}

	// Catch SIGINT (Stop) and SIGTERM (Restart)
	process.on('SIGINT', () => shutdown('STOP'));
	process.on('SIGTERM', () => shutdown('RESTART'));
};