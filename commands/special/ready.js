module.exports = {
  type: "ready",
  code: `
    $deletevars[page;;message]
    $deletevars[crpage;;message]
    $deletevars[pages;;message]
    $deletevars[rowsPerPage;;message]
    $logger[Info;Unused message variables have been cleared!]
    $logger[Info;Bot $username[$botID] is ready!]

    $setInterval[
      $setStatus[online;Watching;$guildCount servers]
    ;12s]
  `
}