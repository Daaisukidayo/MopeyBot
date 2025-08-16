export default function setupShutdown(client) {
  let shuttingDown = false;

  const shutdown = async (signal) => {
    if (shuttingDown) return;
    shuttingDown = true;

    console.log(`Received ${signal}, shutting down the bot...`);
    try {
      await client.destroy();
      console.log("Bot disconnected from Discord.");
    } catch (err) {
      console.error("Error while disconnecting bot:", err);
    } finally {
      setImmediate(() => process.exit(0));
    }
  };

  process.on('SIGINT', () => {
    console.log("SIGINT received");
    shutdown('SIGINT');
  });
  process.on('SIGTERM', () => {
    console.log("SIGTERM received");
    shutdown('SIGTERM');
  });

}
