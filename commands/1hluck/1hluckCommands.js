module.exports = [{
  name: "start",
  type: "messageCreate",
  code: `
    $reply
    $onlyIf[$getUserVar[1hstarted;;false]==false;# You already have an active challenge!]

    # Started at: \`$hour:$minute:$second\`!
    $setUserVar[1htime;0]
    $setUserVar[1hstarted;true]
    $setUserVar[1hpoints;0]
    $setUserVar[paused;false]
    $setUserVar[kbt;0]
    $setUserVar[cht;0]
    $setUserVar[mh;0]

    ${interval()}
  `
},{
  name: "time",
  type: "messageCreate",
  code: `
    $reply
    $onlyIf[$getUserVar[1hstarted];# You dont have an active challenge!]
    
    ${vars()}
    
    ${time()}
    $if[$getUserVar[paused];# Status: Paused]
  `
},{

  name: "pause",
  type: "messageCreate",
  code: `
    $reply
    $onlyIf[$getUserVar[1hstarted];# You dont have an active challenge!]
    $!stopInterval[1HLUCK]
    $setUserVar[paused;true]
    ${vars()}

    # Paused at: \`$hour:$minute:$second\`!
    ${time()}
  `
},{

  name: "resume",
  aliases: ["continue", "res"],
  type: "messageCreate",
  code: `
    $reply
    $onlyIf[$getUserVar[1hstarted];# You dont have an active challenge!]
    $setUserVar[paused;false]

    ${vars()}

    # Continued at: \`$hour:$minute:$second\`!
    ${time()}

    ${interval()}
  `
},{
  unprefixed: true,
  type: "messageCreate",
  code: `
    $onlyIf[$getUserVar[1hstarted]]
    $onlyIf[$startsWith[$messageContent;$getGuildVar[prefix]]==false]
    $onlyIf[$getUserVar[paused]==false]

    $let[points;0]
    $let[typo;false]

    $let[common;1]
    $let[uncommon;2]
    $let[rare;3]
    $let[epic;5]
    $let[insane;8]
    $let[legendary;15]
    $let[extreme;20]
    $let[mythic;30]
    $let[godly;50]

    $arrayLoad[rares; ;$toLowerCase[$message]]
    $arrayLoad[unknown]

    $arrayLoad[common; ;cht kbt mh]
    $arrayLoad[uncommon; ;doe bm jag leo ft yp ln]
    $arrayLoad[rare; ;wd pp mad gph mm mf bp lc bml]
    $arrayLoad[epic; ;jass gir wt wl wln wlc bg sbf ssm ssg]
    $arrayLoad[insane; ;sp md bl bln blc pr ge wr ay]
    $arrayLoad[legendary; ;lt dp br wg]
    $arrayLoad[extreme; ;wgf]
    $arrayLoad[mythic; ;lbf lsm lsg kd]
    $arrayLoad[godly; ;sm hht arg shh he gpe]

    $arrayForEach[rares;an;
        $if[$arrayIncludes[common;$env[an]];
          $arrayForEach[common;com;
            $if[$env[an]==$env[com]; 
              $if[$getUserVar[$env[com]]<3; 
                $letSum[points;$get[common]] 
                $setUserVar[$env[com];$math[$getUserVar[$env[com]] + 1]]
              ;
                $let[typo;true]
              ]
            ]
          ]
        ;
            $if[$arrayIncludes[uncommon;$env[an]];
                $letSum[points;$get[uncommon]]
            ;
                $if[$arrayIncludes[rare;$env[an]];
                    $letSum[points;$get[rare]]
                ;
                    $if[$arrayIncludes[epic;$env[an]];
                        $letSum[points;$get[epic]]
                    ;
                        $if[$arrayIncludes[insane;$env[an]];
                            $letSum[points;$get[insane]]
                        ;
                            $if[$arrayIncludes[legendary;$env[an]];
                                $letSum[points;$get[legendary]]
                            ;
                                $if[$arrayIncludes[extreme;$env[an]];
                                    $letSum[points;$get[extreme]]
                                ;
                                    $if[$arrayIncludes[mythic;$env[an]];
                                        $letSum[points;$get[mythic]]
                                    ;
                                        $if[$arrayIncludes[godly;$env[an]];
                                            $letSum[points;$get[godly]]
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]

    
    $if[$get[points]>0;
      $reply[$channelID;$messageID;true]
      $setUserVar[1hpoints;$math[$getUserVar[1hpoints] + $get[points]]]
      # +$get[points]\n-# Total: $getUserVar[1hpoints]
    ]
  `
},{
  name: "end",
  type: "messageCreate",
  code: `
    $reply
    $onlyIf[$getUserVar[1hstarted];# You dont have an active challenge!]
    # You ended your challenge!
    ${pts()}
    
    $setUserVar[1hstarted;false]
    $!stopInterval[1HLUCK]

    $deleteUserVar[1htime]
    $deleteUserVar[1hpoints]
    $setUserVar[paused;false]
    $deleteUserVar[mh]
    $deleteUserVar[kbt]
    $deleteUserVar[cht]
  `
},{
  name: "points",
  aliases: ["pts", "score", "scr"],
  type: "messageCreate",
  code: `
    $reply
    $onlyIf[$getUserVar[1hstarted];# You dont have an active challenge!]
    ${pts()}
  `
}]




function interval () {
return `
$setInterval[
    $setUserVar[1htime;$sum[$getUserVar[1htime];1]] 
    $if[$getUserVar[1htime]>=3600;
        $sendMessage[$channelID;# <@$authorID> 1 Hour Luck Ended!
        ${pts()}]
        $setUserVar[1hstarted;false]
        $!stopInterval[1HLUCK]

        $deleteUserVar[1htime]
        $deleteUserVar[1hpoints]
        $setUserVar[paused;false]
        $deleteUserVar[mh]
        $deleteUserVar[kbt]
        $deleteUserVar[cht]
    ] 
;1s;1HLUCK]`
}

function vars () {
return `
$let[remaining;$math[3600 - $getUserVar[1htime]]]
$let[hour;$floor[$math[$get[remaining] / 3600]]]
$let[minute;$floor[$math[($get[remaining] % 3600) / 60]]]
$let[second;$floor[$math[$get[remaining] % 60]]]`
}

function time () {
return `
# Time passed: \`$parseDigital[$getUserVar[1htime]000]\`
# Time left: \`$get[hour]:$get[minute]:$get[second]\``
}

function pts () {
return `
# Points: \`$getUserVar[1hpoints]\`
# Commons: \n$codeBlock[Markhor: $getuservar[mh]\nChoco: $getuservar[cht]\nKeel-Billed: $getuservar[kbt];JSON]`
}