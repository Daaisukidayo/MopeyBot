export default {
  name: 'showPoints',
  params: [{ 
      "name": "ID", 
      "required": false 
    }],
  code: `
    $let[ID;$default[$env[ID];$authorID]]
    $if[$env[challengeProgress]==;
      $jsonLoad[challengeProgress;$getUserVar[challengeProgress|$channelID;$get[ID]]]
    ]

    $let[TP;$env[challengeProgress;points]]

    $if[$arrayIncludes[userSettings;hidePoints];
      $let[styled;||$get[TP]||] 
    ; 
      $let[styled;\`$get[TP]\`]
    ]
    
    $return[⁘ Points: $get[styled]]
  `
}