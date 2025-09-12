export default {
  name: 'showRares',
  params: [{ 
      "name": "ID", 
      "required": false 
    }],
  code: `
    $let[ID;$default[$env[ID];$authorID]]
    $if[$env[challengeProgress]==;
      $jsonLoad[challengeProgress;$getUserVar[challengeProgress|$channelID;$get[ID]]]
    ]

    $let[TR;$env[challengeProgress;rares]]

    $if[$arrayIncludes[userSettings;hideRares]; 
      $let[styled;||$get[TR]||] 
    ; 
      $let[styled;\`$get[TR]\`]
    ]

    $return[⁘ Rares: $get[styled]]
  `
}