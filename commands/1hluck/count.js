module.exports = [{ 
name: "countpoints", 
aliases: ["cp"], 
type: "messageCreate", 
code: `
$reply 
$onlyIf[$message!=]
$let[points;0]

$let[kbt;0]
$let[mh;0]
$let[cht;0]

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
        $if[$and[$get[kbt]<3;$env[an]==kbt]; $letSum[points;$get[common]] $letSum[kbt;1] ]
        $if[$and[$get[cht]<3;$env[an]==cht]; $letSum[points;$get[common]] $letSum[cht;1] ]
        $if[$and[$get[mh]<3;$env[an]==mh];  $letSum[points;$get[common]] $letSum[mh;1] ] 
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
                                    ;
                                        $arrayPush[unknown;$env[an]]
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
# Total points: \`$get[points]\`
# Total rares: \`$arrayLength[rares]\`
# Commons: 
$codeBlock[Markhor: $get[mh]
Choco: $get[cht]
Keel-Billed: $get[kbt];JSON]
$if[$arrayLength[unknown]!=0;# Unknown rares:\n$codeBlock[$env[unknown];JSON]]

`}]