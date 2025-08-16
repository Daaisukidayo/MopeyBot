export default {
  name: "help",
  type: "messageCreate",
  code: `
    $reply
    $let[cdTime;5s]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]

    $let[desc;$codeBlock[[\\] - required argument(s) \n{} - required option \n() - optional argument(s) or option \n<> — data input]]
    
    $let[al;📚 Aliases:]
    $let[rel;📖 Related:]
    $let[comNameEmoji;📜]

    $let[prefix;$getGuildVar[prefix]]
    $let[timezonesHyperlink;$hyperlink[List of all timezones;https://en.wikipedia.org/wiki/List_of_tz_database_time_zones]]

    $jsonLoad[arg;["-$toLowerCase[$message]-"\\]]
    $let[arg;$env[arg;0]]

    $description[## Unknown command!]
    $color[$getGlobalVar[defaultColor]]
    
    $if[$includes[$get[arg];-backup-];
      $author[$get[comNameEmoji] Backup]
      $description[## Restores your most recent backup!
      ### No need to add it manually — it's automatically updated every 12 hours for everyone!]
    ]
    
    $if[$includes[$get[arg];-party-];
      $author[$get[comNameEmoji] 1 Hour Luck Party]
      $description[## Creates a new party, and anyone who wishes can join your party and participate in the Cooperative 1 Hour Luck Challenge! A maximum of 6 participants.
      ### \`1.\` Press the 'Join' button to enter the party.
      ### \`2\`. Press the 'Exit' button to leave the party.
      ### \`3\`. Press the 'Start' button (for hosts only) to begin the Challenge! A minimum of 2 participants is required.
      ### \`4\`. Press the 'End' button (for hosts only) to close the party and cancel participation in the Challenge.
      ## __Notes:__
      ### The party will be automatically closed in 30 minutes if it has not been started yet. 
      ### After pressing the 'Start' button, a countdown will appear, and then you will be able to start trying to get rares in Mope.io.
      ### Each participant will have their own timer, so you can pause at any time.
      ### After all participants have completed their challenge either forcibly or after 1 hour, the participant with the highest number of points will win.]
    ]

    $if[$includes[$get[arg];-wr-;-wardrobe-];
      $author[$get[comNameEmoji] Wardrobe]
      $description[## Let's you equip any animal with purchased skin!
      ## Usage: ${inl('$getGuildVar[prefix]wardrobe {new|all|<tier>|<animal>}')}
      ### \`[new\\]\` - Starts new equiping animals with chosen skin for mouse to king dragon
      ### \`[all\\]\` - Equips every animal with chosen skin pack
      ### \`[tier\\]\` - Equips every chosen tier animal with chosen skin pack
      ### \`[animal\\]\` - Equips chosen animal with chosen skin]
      $addField[$get[al];${inl('wardrobe')}, ${inl('wr')}]
    ]

    $if[$includes[$get[arg];-tz-;-timezone-];
      $author[$get[comNameEmoji] Timezone]
      $description[## Shows and edits your current timezone! Required for the proper functioning of time functions!
      ### Example: ${inl('$getGuildVar[prefix]timezone <Timezone ID>')}
      ### $hyperlink[List of all timezones;https://en.wikipedia.org/wiki/List_of_tz_database_time_zones]]
      $addField[$get[al];${inl('timezone')}, ${inl('tz')}]
    ]

    $if[$includes[$get[arg];-sts-;-settings-];
      $author[$get[comNameEmoji] 1 Hour Luck Settings]
      $description[## Shows your settings related to 1 Hour Luck Challenge which you can edit!]
      $addField[$get[al];${inl('settings')}, ${inl('sts')}]
      $addField[$get[rel];${inl('start')}]
    ]

    $if[$includes[$get[arg];-his-;-history-];
      $author[$get[comNameEmoji] 1 Hour Luck History]
      $description[## Shows your history of all ended 1 Hour Luck Challenges!]
      $addField[$get[al];${inl('history')}, ${inl('his')}]
      $addField[$get[rel];${inl('start')}]
    ]

    $if[$includes[$get[arg];-sim-;-simulator-];
      $author[$get[comNameEmoji] 1 Hour Luck Simulator]
      $description[## Shows how much rares you'd get in real 1 Hour Luck Challenge!
      ### Use ${inl('$getGuildVar[prefix]simulator event')} to simulate in event mode!]
      $addField[$get[al];${inl('simulator')}, ${inl('sim')}]
      $addField[$get[rel];${inl('raretry')}, ${inl('raretryrun')}]
    ]

    $if[$includes[$get[arg];-weekly-];
      $author[$get[comNameEmoji] Weekly]
      $description[## Claim your weekly reward once a week!]
      $addField[$get[rel];${inl('daily')}]
    ]

    $if[$includes[$get[arg];-rules-];
      $author[$get[comNameEmoji] Rules]
      $description[## Shows the rules you agreed with!]
    ]

    $if[$includes[$get[arg];-daily-];
      $author[$get[comNameEmoji] Daily]
      $description[## Claim your daily reward once a day!]
      $addField[$get[rel];${inl('weekly')}]
    ]

    $if[$includes[$get[arg];-arena-;-pvp-;-battle-];
      $author[$get[comNameEmoji] Arena]
      $description[## Enter the PvP arena to claim your reward!]
      $addField[$get[al];${inl('arena')}, ${inl('pvp')}, ${inl('battle')}]
    ]

    $if[$includes[$get[arg];-balance-;-bal-;-profile-;-prof-;-coins-;-packs-];
      $author[$get[comNameEmoji] Balance]
      $description[## Displays your current balance and purchased packs!]
      $addField[$get[al];${inl('balance')}, ${inl('bal')}, ${inl('profile')}, ${inl('prof')}, ${inl('coins')}, ${inl('cash')}, ${inl('packs')}]
      $addField[$get[rel];${inl('shop')}]
    ]

    $if[$includes[$get[arg];-kd-;-kingdragon-];
      $author[$get[comNameEmoji] Kingdragon]
      $description[## Attempt to transform into a mighty King Dragon and claim your reward!
      ### Additionally, there is a 1/1000 chance of becoming a King Dragon by sheer luck!]
      $addField[$get[al];${inl('kingdragon')}, ${inl('kd')}]
      $addField[$get[rel];${inl('arena')}]
    ]

    $if[$includes[$get[arg];-leaderboard-;-lb-;-top-];
      $author[$get[comNameEmoji] Leaderboard]
      $description[## Displays the current leaderboard!
      ### Leaderboard updates every 5 minutes!]
      $addField[$get[al];${inl('leaderboard')}, ${inl('lb')}, ${inl('top')}]
      $addField[$get[rel];${inl('balance')}]
    ]

    $if[$includes[$get[arg];-shop-];
      $author[$get[comNameEmoji] Shop]
      $description[## Here you can purchase any skin pack you desire! 
      ### Note that some commands may not utilize certain packs. Stay tuned for the release of the ${inl('play')} command!]
      $addField[$get[rel];${inl('balance')}, ${inl('leaderboard')}]
    ]

    $if[$includes[$get[arg];-prefix-];
      $author[$get[comNameEmoji] Prefix]
      $description[## Changes the bot's prefix for your server!
      ### Required permissions: ${inl('Manage Server')} or ${inl('Administrator')}]
      $addField[Usage:;${inl('$getGuildVar[prefix]prefix [your prefix\\]')} $get[desc]]
    ]

    $if[$includes[$get[arg];-resetcoins-;-rc-];
      $author[$get[comNameEmoji] Reset Coins]
      $description[# ❗ WARNING ❗\n## __This command will reset all your $getGlobalVar[emoji]!__]
      $addField[$get[al];${inl('resetcoins')}, ${inl('rc')}]
      $addField[$get[rel];${inl('resetpacks')}]
    ]

    $if[$includes[$get[arg];-resetpacks-;-rmp-;-rp-];
      $author[$get[comNameEmoji] Reset Packs]
      $description[# ❗ WARNING ❗\n## __This command will reset all your skin packs!__]
      $addField[$get[al];${inl('resetpacks')}, ${inl('rp')}]
      $addField[$get[rel];${inl('resetcoins')}]
    ]
    
    $if[$includes[$get[arg];-invite-;-inv-];
      $author[$get[comNameEmoji] Invite]
      $description[## Invite the Mopey bot to your server, join the Mopey server, and vote for Mopey!]
      $addField[$get[al];${inl('invite')}, ${inl('inv')}]
      $addField[$get[rel];${inl('credits')}]
    ]

    $if[$includes[$get[arg];-ping-];
      $author[$get[comNameEmoji] Ping]
      $description[## Displays the bot's latency in milliseconds]
    ]

    $if[$includes[$get[arg];-report-];
      $author[$get[comNameEmoji] Report]
      $description[## If you encounter a bug or notice a user attempting to disrupt the bot through alts, spamming, or other means, use the Report command to notify us!]
    ]

    $if[$includes[$get[arg];-math-];
      $author[$get[comNameEmoji] Math]
      $description[## Performs calculations based on the provided input (some arguments may not be supported)!]
      $addField[Usage:;${inl('$getGuildVar[prefix]math [arguments\\]')} $get[desc]]
    ]

    $if[$includes[$get[arg];-credits-];
      $author[$get[comNameEmoji] Credits]
      $description[## Displays a list of all contributors to the bot's development!]
      $addField[$get[rel];${inl('invite')}]
    ]

    $if[$includes[$get[arg];-muid-;-uid-;-id-];
      $author[$get[comNameEmoji] MUID]
      $description[## Displays the Mopey User Identifier along with their current coin balance!]
      $addField[Usage:;${inl('$getGuildVar[prefix]muid [number\\]')} $get[desc]]
      $addField[$get[al];${inl('muid')}, ${inl('uid')}, ${inl('id')}]
    ]

    $if[$includes[$get[arg];-raretry-;-rt-];
      $author[$get[comNameEmoji] Raretry]
      $description[## Use this command to attempt catching some rares!
      ### Check your current rarities and rares you caught with the ${inl('$getGuildVar[prefix]caughtrares')} command!]
      $addField[$get[al];${inl('raretry')}, ${inl('rt')}]
      $addField[$get[rel];${inl('chances')}, ${inl('rtmode')}]
    ]

    $if[$includes[$get[arg];-chart-];
      $author[$get[comNameEmoji] Chart]
      $description[## Displays the current rare chart for the 1-hour luck challenge!
      ### What is the 1-hour luck challenge? Its a game where you have to get rares in <https://mope.io>! Start from a mouse and try getting rares for 1 hour!
      ### For better experience, use the bot to track your progress! The bot will count your points from every rare you caught and wrote!
      ### More information is in the ${inl('$getGuildVar[prefix]help start')} command!
      ### Use ${inl('$getGuildVar[prefix]chart event')} to see the event chart!]
      $addField[$get[rel];${inl('snora')}, ${inl('start')}, ${inl('pause')}, ${inl('resume')}, ${inl('time')}, ${inl('points')}, ${inl('edittime')}, ${inl('editpoints')}, ${inl('editlist')}, ${inl('end')}]
    ]

    $if[$includes[$get[arg];-raretrymode-;-rtm-;-rtmode-];
      $author[$get[comNameEmoji] Raretry mode]
      $description[## Displays the current raretry mode. You can switch modes by pressing the buttons!
      ### The higher the active mode, the greater the rewards!]
      $addField[$get[al];${inl('raretrymode')}, ${inl('rtmode')}, ${inl('rtm')}]
      $addField[$get[rel];${inl('caughtrares')}, ${inl('raretry')}]
    ]

    $if[$includes[$get[arg];-chances-;-caughtrares-;-cr-];
      $author[$get[comNameEmoji] Caught rares]
      $description[## Displays your caught rares with the current rarities of catching rares from any category! 
      ### To change the chances, use ${inl('$getGuildVar[prefix]rtmode')} or click the button in the command!]
      $addField[$get[al];${inl('caughtrares')}, ${inl('cr')}, ${inl('chances')}]
      $addField[$get[rel];${inl('raretry')}, ${inl('rtmode')}]
    ]

    $if[$includes[$get[arg];-pumpkin-;-pk-];
      $author[$get[comNameEmoji] Pumpkin]
      $description[## Use this command to collect pumpkins!
      ### Current rarities:
      $codeBlock[Jack-o'-lantern: 1/20 \nGolden: 1/50 \nPlatinum: 1/100 \nDiamond: 1/200 \nLapis Lazuli: 1/500 \nTopaz: 1/1000 \nQuartz: 1/1500 \nMusgravite: 1/2000 \nOnyx 1/3500 \nPainite: 1/5000;JSON]]
      $addField[$get[al];${inl('pumpkin')}, ${inl('pk')}]
      $addField[$get[rel];${inl('beachball')}, ${inl('umbrella')}]
    ]

    $if[$includes[$get[arg];-beachball-;-bb-];
      $author[$get[comNameEmoji] Beachball]
      $description[## Use this command to collect beachballs!
      ### Current rarities:
      $codeBlock[Amber: 1/20 \nGolden: 1/50 \nPlatinum: 1/100 \nDiamond: 1/200 \nJade: 1/500 \nPearl: 1/1000 \nPink Diamond: 1/1500 \nOpal: 1/2000 \nAquamarine: 1/3500 \nTanzanite: 1/5000;JSON]]
      $addField[$get[al];${inl('beachball')}, ${inl('bb')}]
      $addField[$get[rel];${inl('pumpkin')}, ${inl('umbrella')}]
    ]

    $if[$includes[$get[arg];-umbrella-;-ur-];
      $author[$get[comNameEmoji] Umbrella]
      $description[## Use this command to collect umbrellas!
      ### Current rarities:
      $codeBlock[Purple: 1/20 \nGolden: 1/50 \nPlatinum: 1/100 \nDiamond: 1/200 \nEmerald: 1/500 \nRuby: 1/1000 \nSapphire: 1/1500 \nAmethyst: 1/2000 \nAmmolite: 1/3500 \nTaaffeite: 1/5000;JSON]]
      $addField[$get[al];${inl('umbrella')}, ${inl('ur')}]
      $addField[$get[rel];${inl('pumpkin')}, ${inl('beachball')}]
    ]

    $if[$includes[$get[arg];-tornado-;-td-];
      $author[$get[comNameEmoji] Tornado]
      $description[## Use this command to discover various disasters!]
      $addField[$get[al];${inl('tornado')}, ${inl('td')}]
      $addField[$get[rel];${inl('pumpkin')}, ${inl('beachball')}, ${inl('umbrella')}, ${inl('arena')}]
    ]

    $if[$includes[$get[arg];-howlucky-;-hl-];
      $author[$get[comNameEmoji] How lucky]
      $description[## Use this command to see how lucky you are today!]
      $addField[$get[al];${inl('howlucky')}, ${inl('hl')}]
      $addField[$get[rel];${inl('raretry')}]
    ]

    $if[$includes[$get[arg];-rrare-];
      $author[$get[comNameEmoji] Random rare]
      $description[## Shows random rare!]
      $addField[$get[rel];${inl('raretry')}]
    ]

    $if[$includes[$get[arg];-rtr-;-raretryrun-];
      $author[$get[comNameEmoji] Raretryrun]
      $description[## Attempt to obtain rares while progressing from a mouse to a black dragon! The rarities are identical to those in the game!]
      $addField[$get[al];${inl('raretryrun')},${inl('rtr')}]
      $addField[$get[rel];${inl('raretry')}]
    ]

    $if[$includes[$get[arg];-cf-;-coinflip-];
      $author[$get[comNameEmoji] Coinflip]
      $description[## Wager your coins on heads or tails for a chance to win!
      ### ${inl('max')} - the maximum allowable bet (${inl('200,000')})
      ### ${inl('side')} - the side of the coin, either heads or tails. If no side is specified, it defaults to heads]
      $addField[$get[al];${inl('coinflip')},${inl('cf')}]
      $addField[Usage:;${inl('$getGuildVar[prefix]coinflip {amount|max} (side)')} $get[desc]]
    ]

    $if[$includes[$get[arg];-ann-;-announcement-];
      $author[$get[comNameEmoji] Announcement]
      $description[## Displays the most recent announcement!]
      $addField[$get[al];${inl('announcement')},${inl('ann')}]
    ]

    $if[$includes[$get[arg];-start-];
      $author[$get[comNameEmoji] Start]
      $description[## Starts your 1 hour luck challenge! 
      ### While in progress, you must write names of rares from ${inl('$getGuildVar[prefix]snora')} without prefix to earn points!
      ### Example: ${inl('mar cht kbt pf mud ...')}
      ### Use ${inl("$getGuildVar[prefix]start event")} to enter in event mode.
      ### In event mode. the chart is different, pause is disabled and enabling "unlimited rares" is disabled.]
      $addField[$get[rel];${inl('pause')}, ${inl('resume')}, ${inl('time')}, ${inl('snora')}, ${inl('points')}, ${inl('edittime')}, ${inl('editpoints')}, ${inl('editlist')}, ${inl('end')}]
    ]

    $if[$includes[$get[arg];-snora-];
      $author[$get[comNameEmoji] SNORA]
      $description[## Displays all "Shorter Names Of Rare Animals"! \n## Basically it's first 3 letters or first letter of each word]
      $addField[$get[rel];${inl('pause')}, ${inl('resume')}, ${inl('time')}, ${inl('start')}, ${inl('points')}, ${inl('edittime')}, ${inl('editpoints')}, ${inl('editlist')}, ${inl('end')}]
    ]

    $if[$includes[$get[arg];-pause-];
      $author[$get[comNameEmoji] Pause]
      $description[## Pauses your 1 hour luck challenge! 
      ### You can continue it at any time!]
      $addField[$get[rel];${inl('snora')}, ${inl('resume')}, ${inl('time')}, ${inl('start')}, ${inl('points')}, ${inl('edittime')}, ${inl('editpoints')}, ${inl('editlist')}, ${inl('end')}]
    ]

    $if[$includes[$get[arg];-resume-;-res-;-continue-];
      $author[$get[comNameEmoji] Resume]
      $description[## Continues your 1 hour luck challenge!]
      $addField[$get[al];${inl('resume')}, ${inl('res')}, ${inl('continue')}]
      $addField[$get[rel];${inl('snora')}, ${inl('pause')}, ${inl('time')}, ${inl('start')}, ${inl('points')}, ${inl('edittime')}, ${inl('editpoints')}, ${inl('editlist')}, ${inl('end')}]
    ]

    $if[$includes[$get[arg];-time-];
      $author[$get[comNameEmoji] Time]
      $description[## Displays the time until the end of the 1 hour luck challenge!]
      $addField[$get[rel];${inl('snora')}, ${inl('pause')}, ${inl('resume')}, ${inl('start')}, ${inl('points')}, ${inl('edittime')}, ${inl('editpoints')}, ${inl('editlist')}, ${inl('end')}]
    ]

    $if[$includes[$get[arg];-points-;-pts-;-score-];
      $author[$get[comNameEmoji] Points]
      $description[## Displays the current points you have!]
      $addField[$get[al];${inl('points')}, ${inl('pts')}, ${inl('score')}]
      $addField[$get[rel];${inl('snora')}, ${inl('pause')}, ${inl('resume')}, ${inl('start')}, ${inl('time')}, ${inl('edittime')}, ${inl('editpoints')}, ${inl('editlist')}, ${inl('end')}]
    ]

    $if[$includes[$get[arg];-end-];
      $author[$get[comNameEmoji] End]
      $description[## Immediately ends your 1 hour luck challenge! Also shows the points you got!]
      $addField[$get[rel];${inl('snora')}, ${inl('pause')}, ${inl('resume')}, ${inl('points')}, ${inl('start')}, ${inl('time')}, ${inl('edittime')}, ${inl('editlist')}, ${inl('editpoints')}]
    ]

    $if[$includes[$get[arg];-count-];
      $author[$get[comNameEmoji] Count]
      $description[## Counts points! 
      ### Does not require participation in a 1-hour luck challenge, instead requires writing the names of rare animals in one message after the command! 
      ### Example: ${inl('$getGuildVar[prefix]count kbt cht mar...')} ]
      $addField[$get[rel];${inl('snora')}, ${inl('start')}]
    ]

    $if[$includes[$get[arg];-edittime-;-etime-;-et-];
      $author[$get[comNameEmoji] Edit time]
      $description[## Edits your time in 1 hour luck challenge! 
      ### Usage: ${inl('$getGuildVar[prefix]edittime {MM:SS (has to be "time passed") | seconds}')}
      ### Example: ${inl('$getGuildVar[prefix]edittime 30:00')}
      ### Example: ${inl('$getGuildVar[prefix]edittime 1800')}\n$get[desc]]
      $addField[$get[al];${inl('edittime')}, ${inl('etime')}, ${inl('et')}]
      $addField[$get[rel];${inl('snora')}, ${inl('start')}, ${inl('pause')}, ${inl('resume')}, ${inl('points')}, ${inl('time')}, ${inl('editpoints')}, ${inl('editlist')}, ${inl('end')}]
    ]

    $if[$includes[$get[arg];-editpoints-;-epoints-;-epts-];
      $author[$get[comNameEmoji] Edit points]
      $description[## Edits your points!
      ### Usage: ${inl('$getGuildVar[prefix]editpoints [number\\]')}
      ### Example: ${inl('$getGuildVar[prefix]editpoints 100')}]
      $addField[$get[al];${inl('editpoints')}, ${inl('epoints')}, ${inl('epts')}]
      $addField[$get[rel];${inl('snora')}, ${inl('start')}, ${inl('pause')}, ${inl('resume')}, ${inl('points')}, ${inl('time')}, ${inl('edittime')}, ${inl('editlist')}, ${inl('end')}]
    ]

    $if[$includes[$get[arg];-editlist-;-elist-;-el-];
      $author[$get[comNameEmoji] Edit list]
      $description[## Edits your list! 
      ### Usage: ${inl('$getGuildVar[prefix]editlist [rare\\] [add/a/+ || remove/r/-\\] [amount || all\\]')}
      ### Example 1: ${inl('$getGuildVar[prefix]editlist yp + 5')} - this will add 5 Yellow Pufferfishes to your list with the points!
      ### Example 2: ${inl('$getGuildVar[prefix]editlist yp - all')} - this will remove all Yellow Pufferfishes from your list with the points!]
      $addField[$get[al];${inl('editlist')}, ${inl('elist')}, ${inl('el')}]
      $addField[$get[rel];${inl('snora')}, ${inl('start')}, ${inl('pause')}, ${inl('resume')}, ${inl('points')}, ${inl('time')}, ${inl('edittime')}, ${inl('editpoints')}, ${inl('end')}]
    ]

    $if[$get[arg]==--;
      $author[$get[comNameEmoji] ALL COMMANDS]
      $description[Use ${inl('$getGuildVar[prefix]help (command)')} for detailed information on a specific command!]

      $addField[🔳 __Special__;**$codeBlock[balance \nleaderboard \nshop \ninvite \nping \nreport \nannouncement \ncredits \nmuid \nprefix \nresetcoins \nresetpacks \ntimezone (NEW);JSON]**]
      $addField[$getGlobalVar[emoji] __Economy:__;**$codeBlock[weekly \ndaily \narena \nkingdragon \ncoinflip;JSON]**]
      $addField[✨ __Fun__;**$codeBlock[raretry \npumpkin \nbeachball \numbrella \ntornado \nhowlucky \nraretryrun \nrrare \nraretrymode \ncaughtrares (NEW);JSON]**]
      $addField[🎮 __Play__ (NEW);**$codeBlock[wardrobe \nplay;JSON]**]
      $addField[🍀 __1 Hour Luck__ (NEW);**$codeBlock[snora \nchart \nparty \nstart \npause \nresume \ntime \npoints \nend \ncount \nedittime \neditpoints \neditlist \nsettings \nhistory \nsimulator;JSON]**]
      $footer[Need assistance with a specific issue? Use the invite command to join our official Discord server!]
    ]
    $sendMessage[$channelID]
  `
}

function inl (text) { return `$inlineCode[${text}]`}