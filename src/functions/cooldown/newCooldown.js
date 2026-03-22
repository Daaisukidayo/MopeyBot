export default {
  name: 'newCooldown',
  description: 'Adds a new cooldown embed.',
  params: [
    {
      name: 'cooldownTime',
      description: 'Remaining time when the cooldown ends.',
      required: true,
    }
  ],
  code: `
    $let[cooldownTime;$function[
      $if[$isNumber[$env[cooldownTime]];
        $return[$env[cooldownTime]]
      ]
      $return[$parseString[$env[cooldownTime]]]
    ]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[# ⏰ $tl[ui.cooldown.title]]
      $addSeparator[Small;false]
      $addTextDisplay[## > _$tl[ui.cooldown.description;$discordTimestamp[$math[$get[cooldownTime] + $getTimestamp + 1000];RelativeTime]]_]
    ;$getGlobalVar[cooldownColor]]
    

    $let[deleteTime;$function[
      $if[$or[$get[cooldownTime]>15000;$get[cooldownTime]==0];
        $return[15000]
      ]
      $return[$get[cooldownTime]]
    ]]

    
    $if[$isPrefixCommand;
      $deleteIn[$get[deleteTime]]
    ;
      $ephemeral
      $interactionReply

      $setTimeout[
        $interactionDelete
      ;$get[deleteTime]]
    ]
  `
}