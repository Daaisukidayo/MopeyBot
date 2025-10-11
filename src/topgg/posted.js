export default {
  type: "posted",
  code: `
    $logger[Info;Posted stats to Top.gg]
    $sendMessage[$getGlobalVar[logChannelID];
      $description[## Posted stats to Top.gg]
      $color[$getGlobalVar[logColor]]
    ]
  `
}
