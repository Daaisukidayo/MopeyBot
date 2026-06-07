export default {
    name: 'handleHelp',
    code: `
        $reply
        $jsonLoad[userProfile;$getProfile]
        $let[l;$env[userProfile;language]]
        
        $checkProfile
        $addCooldown

        $defer

        $let[arg;$toLowerCase[$default[$option[command];$message[0]]]]
        $let[prefix;$if[$guildID==;$getGlobalVar[prefix];$getGuildVar[prefix]]]

        $jsonLoad[commandsData;$readFile[res/data/commandsData.json]]
        $jsonLoad[commandsEntries;$jsonEntries[commandsData]]

        $if[$get[arg]==;
            $jsonLoad[categories;$getGlobalVar[helpCategories]]
            $c[
              $getCache[slashCommandsData;slashCommandsData]
            ]
            
            $addContainer[
                $addTextDisplay[$tl[$get[l];ui;help.allCommandsTitle]]
                $addSeparator
                $addTextDisplay[$tl[$get[l];ui;help.detailed]]
                $addSeparator

                $arrayForEach[categories;c;
                    $arrayCreate[prefixCommands]
                    $c[
                      $arrayCreate[slashCommands]
                    ]

                    $arrayForEach[commandsEntries;data;
                        $if[$env[c]==$env[data;1;commandCategory];

                            $let[command;$env[data;1;commandName]]
                            $arrayPush[prefixCommands;$get[command]]
                            $c[
                              $arrayPush[slashCommands;</$get[command]:$env[slashCommandsData;$get[command]]>]
                            ]

                        ]
                    ]

                    $addTextDisplay[## _$tl[$get[l];data;helpCategories.$env[c]]_]
                    $addTextDisplay[$codeBlock[$arrayJoin[prefixCommands; ]]]
                    $c[
                      $addTextDisplay[$arrayJoin[slashCommands; ]]
                    ]
                    $addSeparator[Large]
                ]

                $addTextDisplay[$tl[$get[l];ui;help.assistance;$getGlobalVar[discordServerInvite]]]
            ;$getGlobalVar[defaultColor]]
        ;
            $jsonLoad[commandInfo;$arrayFind[commandsEntries;data;
                $jsonLoad[aliases;$env[data;1;commandAliases]]
                $return[$or[$arrayIncludes[aliases;$get[arg]];$env[data;1;commandName]==$get[arg]]]
            ]]

            $if[$env[commandInfo]==;
                $newError[$tl[$get[l];ui;help.noInfo]]
            ]

            $let[emoji;$getGlobalVar[emoji]]
            $let[maxCoinflipBet;$getGlobalVar[maxCoinflipBet]]
            $let[maxSlotsBet;$getGlobalVar[maxSlotsBet]]
            $let[maxParticipants;$getGlobalVar[maxParticipants]]
            $let[timezonesHyperlink;$hyperlink[List of all timezones;https://en.wikipedia.org/wiki/List_of_tz_database_time_zones]]
            $jsonLoad[hlDifficulties;$getGlobalVar[difficulties]]
            $arrayMap[hlDifficulties;elem;
                $return[$tl[$get[l];data;difficulties.$env[elem]]]
            ;hlDifficulties]


            $jsonLoad[allLocales;$getGlobalVar[allLocales]]
            $arrayMap[allLocales;obj;
                $return[$env[obj;name] - $env[obj;description]]
            ;locales]

            
            $jsonLoad[bracketsInfo;$tl[$get[l];data;bracketsInfo]]
            $jsonLoad[umbrellaRarities;$tl[$get[l];data;umbrellaRarities]]
            $jsonLoad[beachballRarities;$tl[$get[l];data;beachballRarities]]
            $jsonLoad[pumpkinRarities;$tl[$get[l];data;pumpkinRarities]]
            $jsonLoad[replacements;$getGlobalVar[helpReplacements]]

            $jsonLoad[commandRelated;$env[commandInfo;1;commandRelated]]
            $jsonLoad[commandAliases;$env[commandInfo;1;commandAliases]]
            $jsonLoad[commandDesc;$env[commandInfo;1;commandDescription;$env[allLocales;$get[l];name]]]

            $let[detailedName;$env[commandInfo;1;commandDetailedName;$env[allLocales;$get[l];name]]]
            $let[commandName;$env[commandInfo;1;commandName]]
            $let[description;$arrayJoin[commandDesc;\n]]

            $if[$get[description]==;
                $logger[Error;$get[commandName] is missing 'description']
                $newError[$tl[$get[l];ui;help.noInfo]]
            ]

            $arrayUnshift[commandAliases;$get[commandName]]

            $arrayForEach[replacements;obj;
                $let[description;$replace[$get[description];$env[obj;0];$eval[$env[obj;1];false];-1]]
            ]

            $let[description;$replace[$get[description];(N);\n;-1]]

            $arrayMap[commandRelated;elem;$return[$nullish[$env[commandsData;$env[elem];commandName];$env[elem]]];commandRelated]

            $addContainer[
                $addTextDisplay[$tl[$get[l];ui;help.commandTitle;$get[detailedName]]]
                $addSeparator
                $addTextDisplay[$get[description]]
                $addSeparator
                $addTextDisplay[$tl[$get[l];ui;help.aliasesTitle]]
                $addTextDisplay[## \`$arrayJoin[commandAliases;\` \`]\`]
                $addSeparator
                $addTextDisplay[$tl[$get[l];ui;help.relatedTitle]]
                $addTextDisplay[## \`$default[$arrayJoin[commandRelated;\` \`];$tl[$get[l];ui;help.none]]\`]
            ;$getGlobalVar[defaultColor]]
        ]
        
    `
}