module.exports = {
  type: "ready",
  code: `
    $deletevars[page;;message]
    $deletevars[crpage;;message]
    $deletevars[pages;;message]
    $deletevars[rowsPerPage;;message]

    $logger[Info;Bot $username[$botID] is ready!]

    $setInterval[
      $setStatus[online;Watching;$guildCount servers]
    ;12s]
    
  `
}