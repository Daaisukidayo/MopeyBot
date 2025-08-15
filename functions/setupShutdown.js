module.exports = function setupShutdown(client) {
    async function shutdown(signal) {
		console.log(`Received signal ${signal}, shutting down the bot...`);
		try {
				console.log("Bot disconnected from Discord.");
				await client.destroy(); // Close the connection to Discord
		} catch (err) {
				console.error("Error while disconnecting bot:", err);
		}
		process.exit(0);
	}

	// Catch SIGINT (Stop) and SIGTERM (Restart)
	process.on('SIGINT', () => shutdown('STOP'));
	process.on('SIGTERM', () => shutdown('RESTART'));
};