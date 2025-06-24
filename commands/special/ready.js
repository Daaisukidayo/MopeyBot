module.exports = {
  type: "ready",
  code: `
    $logger[Info;Bot $username[$botID] is ready!]
    $setInterval[
      $setStatus[online;Watching;$guildCount servers]
    ;12s]
  `
}