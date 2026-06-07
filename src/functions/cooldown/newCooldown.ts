export default {
  name: 'newCooldown',
  description: 'Adds a new cooldown embed.',
  params: [
    {
      name: '_cooldownTime',
      description: 'Remaining time when the cooldown ends.',
      required: true,
    }
  ],
  code: `
    $let[cooldownTime;$function[
      $if[$isNumber[$env[_cooldownTime]];
        $return[$env[_cooldownTime]]
      ]
      $return[$parseString[$env[_cooldownTime]]]
    ]]

    $let[l;$env[userProfile;language]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[# ⏰ $tl[$get[l];ui;cooldown.title]]
      $addSeparator[Small;false]
      $addTextDisplay[## > _$tl[$get[l];ui;cooldown.description;$discordTimestamp[$math[$get[cooldownTime] + $getTimestamp + 1000];RelativeTime]]_]
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