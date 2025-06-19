module.exports = {
  type: "ready",
  code: `
    $async[
      $deletevars[page;;message]
      $deletevars[crpage;;message]
      $deletevars[pages;;message]
      $deletevars[rowsPerPage;;message]
      $logger[Unused message variables have been cleared!]
    ]
    
    $async[$logger[Bot $username[$botID] is ready!]]

    $setInterval[
      $setStatus[online;Watching;$guildCount servers]
    ;12s]

    
  `
}