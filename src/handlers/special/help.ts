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
            $addContainer[
                $addTextDisplay[$tl[ui.help.allCommandsTitle.$get[l]]]
                $addSeparator
                $addTextDisplay[$tl[ui.help.detailed.$get[l]]]
                $addSeparator

                $arrayForEach[$getGlobalVar[helpCategories];c;
                    $arrayMap[commandsEntries;data;
                        $if[$env[c]==$env[data;1;category];
                            $return[$env[data;1;name]]
                        ]
                    ;commands]

                    $addTextDisplay[## _$tl[data.helpCategories.$env[c].$get[l]]_]
                    $addTextDisplay[$codeBlock[$arrayJoin[commands; ]]]

                    $addSeparator[Large]
                ]

                $addTextDisplay[$tl[ui.help.assistance.$get[l];$getGlobalVar[discordServerInvite]]]
            ;$getGlobalVar[defaultColor]]
        ;
            $jsonLoad[commandInfo;$arrayFind[commandsEntries;data;
                $return[$or[$arrayIncludes[$env[data;1;aliases];$get[arg]];$env[data;1;name]==$get[arg]]]
            ]]

            $if[$env[commandInfo]==;
                $newError[$tl[ui.help.noInfo.$get[l]]]
            ]

            $let[emoji;$getGlobalVar[mopecoin]]
            $let[maxCoinflipBet;$getGlobalVar[maxCoinflipBet]]
            $let[maxSlotsBet;$getGlobalVar[maxSlotsBet]]
            $let[maxLobbyParticipants;$getGlobalVar[maxLobbyParticipants]]
            $let[timezonesHyperlink;$hyperlink[List of all timezones;https://en.wikipedia.org/wiki/List_of_tz_database_time_zones]]
            $arrayMap[$getGlobalVar[difficulties];elem;
                $return[$tl[data.difficulties.$env[elem].$get[l]]]
            ;hlDifficulties]


            $arrayMap[$jsonEntries[$getGlobalVar[allLocales]];elem;
                $return[$env[elem;0] - $env[elem;1]]
            ;locales]

            
            $jsonLoad[bracketsInfo;$tl[data.bracketsInfo.$get[l]]]
            $jsonLoad[umbrellaRarities;$tl[data.umbrellaRarities.$get[l]]]
            $jsonLoad[beachballRarities;$tl[data.beachballRarities.$get[l]]]
            $jsonLoad[pumpkinRarities;$tl[data.pumpkinRarities.$get[l]]]
            $jsonLoad[replacements;$getGlobalVar[helpReplacements]]

            $jsonLoad[related;$env[commandInfo;1;related]]
            $jsonLoad[aliases;$env[commandInfo;1;aliases]]
            $jsonLoad[description;$env[commandInfo;1;description;$get[l]]]

            $let[detailedName;$env[commandInfo;1;detailedName;$get[l]]]
            $let[name;$env[commandInfo;1;name]]
            $let[description;$arrayJoin[description;\n]]

            $if[$get[description]==;
                $logger[Error;$get[name] is missing 'description']
                $newError[$tl[ui.help.noInfo.$get[l]]]
            ]

            $arrayUnshift[aliases;$get[name]]

            $arrayForEach[replacements;elem;
                $let[description;$replace[$get[description];$env[elem;0];$eval[$env[elem;1];false];-1]]
            ]

            $let[description;$replace[$get[description];(N);\n;-1]]

            $arrayMap[related;elem;$return[$nullish[$env[commandsData;$env[elem];name];$env[elem]]];related]

            $addContainer[
                $addTextDisplay[$tl[ui.help.commandTitle.$get[l];$get[detailedName]]]
                $addSeparator
                $addTextDisplay[$get[description]]
                $addSeparator
                $addTextDisplay[$tl[ui.help.aliasesTitle.$get[l]]]
                $addTextDisplay[## \`$arrayJoin[aliases;\` \`]\`]
                $addSeparator
                $addTextDisplay[$tl[ui.help.relatedTitle.$get[l]]]
                $addTextDisplay[## \`$default[$arrayJoin[related;\` \`];$tl[ui.help.none.$get[l]]]\`]
            ;$getGlobalVar[defaultColor]]
        ]
        
    `
}