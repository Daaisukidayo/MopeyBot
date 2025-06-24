module.exports = [{
  name: "help",
  type: "messageCreate",
  code: `
    $reply
    $let[cdTime;5s]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]


    $let[desc;$codeBlock[[\\] - required argument(s) \n{} - required option \n() - optional argument(s) or option \n<> — input data type, must differ from example]]
    
    $let[al;📚 Aliases:]
    $let[rel;📖 Related:]
    $let[comNameEmoji;📜]
		$jsonLoad[arg;["-$toLowerCase[$message]-"\\]]
		$log[$env[arg]]

		$description[## Unknown command!]
    $color[$getGlobalVar[defaultColor]]

		
		$if[$includes[$env[arg;0];-ctr-;-createtogetherroom-];
        $author[$get[comNameEmoji] 1 Hour Luck Challenge Together]
        $description[## Creates a new room, and anyone who wishes can join your room and participate! A maximum of 6 participants.
        ### 1. Press the 'Join' button to enter the room.
        ### 2. Press the 'Exit' button to leave the room.
        ### 3. Press the 'Start' button (for hosts only) to begin the 1 Hour Luck Challenge Together! A minimum of 2 participants is required.
        ### 4. Press the 'End' button (for hosts only) to close the room and cancel participation in 1 Hour Luck Challenge Together.
        ### The room will be automatically closed in 10 minutes if it has not been started yet. 
        ### After pressing the 'Start' button, a countdown will appear, and then you will be able to start trying to get rares in Mope.io.
        ### After all participants have completed their challenge either forcibly or after 1 hour, a message about the winner and the leaderboard will appear.]
				$addField[$get[al];\`createtogetherroom\`, \`ctr\`]
		]

		$if[$includes[$env[arg;0];-tz-;-timezone-];
        $author[$get[comNameEmoji] 1 Hour Luck Settings]
        $description[## Shows and edits your current timezone! Required for the proper functioning of time functions!
				### Example: \`$getGuildVar[prefix]timezone <Timezone ID>\`
				### $hyperlink[List of all timezones;https://en.wikipedia.org/wiki/List_of_tz_database_time_zones]]
				$addField[$get[al];\`timezone\`, \`tz\`]
		]

		$if[$includes[$env[arg;0];-set-;-settings-];
        $author[$get[comNameEmoji] 1 Hour Luck Settings]
        $description[## Shows your settings related to 1 Hour Luck Challenge which you can edit!]
				$addField[$get[al];\`settings\`, \`set\`]
        $addField[$get[rel];\`start\`]
		]

		$if[$includes[$env[arg;0];-his-;-history-];
        $author[$get[comNameEmoji] 1 Hour Luck History]
        $description[## Shows your history of all ended 1 Hour Luck Challenges!]
				$addField[$get[al];\`history\`, \`his\`]
        $addField[$get[rel];\`start\`]
		]

		$if[$includes[$env[arg;0];-sim-;-simulator-];
        $author[$get[comNameEmoji] 1 Hour Luck Simulator]
        $description[## Shows how much rares you would get in real 1 Hour Luck Challenge!]
				$addField[$get[al];\`simulator\`, \`sim\`]
        $addField[$get[rel];\`raretry\`, \`raretryrun\`]
		]

    $if[$includes[$env[arg;0];-weekly-];
        $author[$get[comNameEmoji] Weekly]
        $description[## Claim your weekly reward once a week!]
        $addField[$get[rel];\`daily\`]
		]

		$if[$includes[$env[arg;0];-rules-];
        $author[$get[comNameEmoji] Rules]
        $description[## Shows the rules you agreed with!]
		]

		$if[$includes[$env[arg;0];-daily-];
        $author[$get[comNameEmoji] Daily]
        $description[## Claim your daily reward once a day!]
        $addField[$get[rel];\`weekly\`]
		]

		$if[$includes[$env[arg;0];-arena-;-pvp-;-battle-];

        $author[$get[comNameEmoji] Arena]
        $description[## Enter the PvP arena to claim your reward!]
        $addField[$get[al];\`arena\`, \`pvp\`, \`battle\`]
		]

		$if[$includes[$env[arg;0];-balance-;-bal-;-profile-;-prof-;-coins-;-packs-];
        $author[$get[comNameEmoji] Balance]
        $description[## Displays your current balance and purchased packs!]
        $addField[$get[al];\`balance\`, \`bal\`, \`profile\`, \`prof\`, \`coins\`, \`cash\`, \`packs\`]
        $addField[$get[rel];\`shop\`]
		]

		$if[$includes[$env[arg;0];-kd-;-kingdragon-];
        $author[$get[comNameEmoji] Kingdragon]
        $description[## Attempt to transform into a mighty King Dragon and claim your reward!
        ### Additionally, there is a 1/1000 chance of becoming a King Dragon by sheer luck!]
        $addField[$get[al];\`kingdragon\`, \`kd\`]
        $addField[$get[rel];\`arena\`]
		]

		$if[$includes[$env[arg;0];-leaderboard-;-lb-;-top-];
        $author[$get[comNameEmoji] Leaderboard]
        $description[## Displays the current leaderboard!
        ### Use the command followed by a number to navigate through pages!]
        $addField[$get[al];\`leaderboard\`, \`lb\`, \`top\`]
        $addField[$get[rel];\`balance\`]
		]

		$if[$includes[$env[arg;0];-shop-];
        $author[$get[comNameEmoji] Shop]
        $description[## Here you can purchase any skin pack you desire! 
        ### Note that some commands may not utilize certain packs. Stay tuned for the release of the \`play\` command!]
        $addField[$get[rel];\`balance\`, \`leaderboard\`]
		]

		$if[$includes[$env[arg;0];-prefix-];
        $author[$get[comNameEmoji] Prefix]
        $description[## Changes the bot's prefix for your server!
        ### Required permissions: \`Manage Server\` or \`Administrator\`]
        $addField[Usage:;\`$getGuildVar[prefix]prefix [your prefix\\]\` $get[desc]]
		]

		$if[$includes[$env[arg;0];-resetcoins-;-rc-];
        $author[$get[comNameEmoji] Reset Coins]
        $description[# ❗ WARNING ❗\n## __This command will reset all your $getGlobalVar[emoji]!__]
        $addField[$get[al];\`resetcoins\`, \`rc\`]
        $addField[$get[rel];\`resetpacks\`]
		]

		$if[$includes[$env[arg;0];-resetpacks-;-rmp-;-rp-];

        $author[$get[comNameEmoji] Reset Packs]
        $description[# ❗ WARNING ❗\n## __This command will reset all your skin packs!__]
        $addField[$get[al];\`resetpacks\`, \`rp\`]
        $addField[$get[rel];\`resetcoins\`]
		]
		
		$if[$includes[$env[arg;0];-invite-;-inv-];

        $author[$get[comNameEmoji] Invite]
        $description[## Invite the Mopey bot to your server, join the Mopey server, and vote for Mopey!]
        $addField[$get[al];\`invite\`, \`inv\`]
        $addField[$get[rel];\`credits\`]
		]

		$if[$includes[$env[arg;0];-ping-];
        $author[$get[comNameEmoji] Ping]
        $description[## Displays the bot's latency in milliseconds]
		]

		$if[$includes[$env[arg;0];-report-];
        $author[$get[comNameEmoji] Report]
        $description[## If you encounter a bug or notice a user attempting to disrupt the bot through alts, spamming, or other means, use the Report command to notify us!]
		]

		$if[$includes[$env[arg;0];-math-];
        $author[$get[comNameEmoji] Math]
        $description[## Performs calculations based on the provided input (some arguments may not be supported)!]
        $addField[Usage:;\`$getGuildVar[prefix]math [arguments\\]\` $get[desc]]
		]

		$if[$includes[$env[arg;0];-credits-];
        $author[$get[comNameEmoji] Credits]
        $description[## Displays a list of all contributors to the bot's development!]
        $addField[$get[rel];\`invite\`]
		]

		$if[$includes[$env[arg;0];-muid-;-uid-;-id-];
        $author[$get[comNameEmoji] MUID]
        $description[## Displays the Mopey User Identifier along with their current coin balance!]
        $addField[Usage:;\`$getGuildVar[prefix]muid [number\\]\` $get[desc]]
        $addField[$get[al];\`muid\`, \`uid\`, \`id\`]
		]

		$if[$includes[$env[arg;0];-raretry-;-rt-];
        $author[$get[comNameEmoji] Raretry]
        $description[## Use this command to attempt catching some rares!
        ### Check your current rarities and rares you caught with the \`$getGuildVar[prefix]caughtrares\` command!]
        $addField[$get[al];\`raretry\`, \`rt\`]
        $addField[$get[rel];\`chances\`, \`rtmode\`]
		]

		$if[$includes[$env[arg;0];-chart-];
        $author[$get[comNameEmoji] Chart]
        $description[## Displays the current rare chart for the 1-hour luck challenge!
        ### What is the 1-hour luck challenge? Its a game where you have to get rares in <https://mope.io>! Start from a mouse and try getting rares for 1 hour!
        ### For better experience, use the bot to track your progress! The bot will count your points from every rare you caught and wrote!
        ### More information is in the \`$getGuildVar[prefix]help start\` command!]
        $addField[$get[rel];\`snora\`, \`start\`, \`pause\`, \`resume\`, \`time\`, \`points\`, \`edittime\`, \`editpoints\`, \`editlist\`, \`end\`]
		]

		$if[$includes[$env[arg;0];-raretrymode-;-rtm-;-rtmode-];
        $author[$get[comNameEmoji] Raretry mode]
        $description[## Displays the current raretry mode. You can switch modes by pressing the buttons!
        ### The higher the active mode, the greater the rewards!]
        $addField[$get[al];\`raretrymode\`, \`rtmode\`, \`rtm\`]
        $addField[$get[rel];\`caughtrares\`, \`raretry\`]
		]

		$if[$includes[$env[arg;0];-chances-;-caughtrares-;-cr-];
        $author[$get[comNameEmoji] Caught rares]
        $description[## Displays your caught rares with the current rarities of catching rares from any category! 
        ### To change the chances, use \`$getGuildVar[prefix]rtmode\` or click the button in the command!]
        $addField[$get[al];\`caughtrares\`, \`cr\`, \`chances\`]
        $addField[$get[rel];\`raretry\`, \`rtmode\`]
		]

		$if[$includes[$env[arg;0];-pumpkin-;-pk-];
        $author[$get[comNameEmoji] Pumpkin]
        $description[## Use this command to collect pumpkins!
        ### Current rarities:
        $codeBlock[Jack-o'-lantern: 1/20 \nGolden: 1/50 \nPlatinum: 1/100 \nDiamond: 1/200 \nLapis Lazuli: 1/500 \nTopaz: 1/1000 \nQuartz: 1/1500 \nMusgravite: 1/2000 \nOnyx 1/3500 \nPainite: 1/5000;JSON]]
        $addField[$get[al];\`pumpkin\`, \`pk\`]
        $addField[$get[rel];\`beachball\`, \`umbrella\`]
		]

		$if[$includes[$env[arg;0];-beachball-;-bb-];
        $author[$get[comNameEmoji] Beachball]
        $description[## Use this command to collect beachballs!
        ### Current rarities:
        $codeBlock[Amber: 1/20 \nGolden: 1/50 \nPlatinum: 1/100 \nDiamond: 1/200 \nJade: 1/500 \nPearl: 1/1000 \nPink Diamond: 1/1500 \nOpal: 1/2000 \nAquamarine: 1/3500 \nTanzanite: 1/5000;JSON]]
        $addField[$get[al];\`beachball\`, \`bb\`]
        $addField[$get[rel];\`pumpkin\`, \`umbrella\`]
		]

		$if[$includes[$env[arg;0];-umbrella-;-ur-];
        $author[$get[comNameEmoji] Umbrella]
        $description[## Use this command to collect umbrellas!
        ### Current rarities:
        $codeBlock[Purple: 1/20 \nGolden: 1/50 \nPlatinum: 1/100 \nDiamond: 1/200 \nEmerald: 1/500 \nRuby: 1/1000 \nSapphire: 1/1500 \nAmethyst: 1/2000 \nAmmolite: 1/3500 \nTaaffeite: 1/5000;JSON]]
        $addField[$get[al];\`umbrella\`, \`ur\`]
        $addField[$get[rel];\`pumpkin\`, \`beachball\`]
		]

		$if[$includes[$env[arg;0];-tornado-;-td-];
        $author[$get[comNameEmoji] Tornado]
        $description[## Use this command to discover various disasters!]
        $addField[$get[al];\`tornado\`, \`td\`]
        $addField[$get[rel];\`pumpkin\`, \`beachball\`, \`umbrella\`, \`arena\`]
		]

		$if[$includes[$env[arg;0];-howlucky-;-hl-];
        $author[$get[comNameEmoji] How lucky]
        $description[## Use this command to see how lucky you are today!]
        $addField[$get[al];\`howlucky\`, \`hl\`]
        $addField[$get[rel];\`raretry\`]
		]

		$if[$includes[$env[arg;0];-rrare-];
        $author[$get[comNameEmoji] Random rare]
        $description[## Shows random rare!]
        $addField[$get[rel];\`raretry\`]
		]

		$if[$includes[$env[arg;0];-rtr-;-raretryrun-];
        $author[$get[comNameEmoji] Raretryrun]
        $description[## Attempt to obtain rares while progressing from a mouse to a black dragon! The rarities are identical to those in the game!]
        $addField[$get[al];\`raretryrun\`,\`rtr\`]
        $addField[$get[rel];\`raretry\`]
		]

		$if[$includes[$env[arg;0];-cf-;-coinflip-];
        $author[$get[comNameEmoji] Coinflip]
        $description[## Wager your coins on heads or tails for a chance to win!
        ### \`max\` - the maximum allowable bet (\`200,000\`)
        ### \`side\` - the side of the coin, either heads or tails. If no side is specified, it defaults to heads]
        $addField[$get[al];\`coinflip\`,\`cf\`]
        $addField[Usage:;\`$getGuildVar[prefix]coinflip {amount|max} (side)\` $get[desc]]
		]

		$if[$includes[$env[arg;0];-ann-;-announcement-];
        $author[$get[comNameEmoji] Announcement]
        $description[## Displays the most recent announcement!]
        $addField[$get[al];\`announcement\`,\`ann\`]
		]

		$if[$includes[$env[arg;0];-start-];
        $author[$get[comNameEmoji] Start]
        $description[## Starts your 1 hour luck challenge! 
        ### While in progress, you must write names of rares from \`$getGuildVar[prefix]snora\` without prefix to earn points!
        ### Example: \`mar cht kbt pf mud...\`]
        $addField[$get[rel];\`pause\`, \`resume\`, \`time\`, \`snora\`, \`points\`, \`edittime\`, \`editpoints\`, \`editlist\`, \`end\`]
		]

		$if[$includes[$env[arg;0];-snora-];
        $author[$get[comNameEmoji] SNORA]
        $description[## Displays all "Shorter Names Of Rare Animals"! \n## Basically it's first 3 letters or first letter of each word]
        $addField[$get[rel];\`pause\`, \`resume\`, \`time\`, \`start\`, \`points\`, \`edittime\`, \`editpoints\`, \`editlist\`, \`end\`]
		]

		$if[$includes[$env[arg;0];-pause-];
        $author[$get[comNameEmoji] Pause]
        $description[## Pauses your 1 hour luck challenge! 
        ### You can continue it at any time!]
        $addField[$get[rel];\`snora\`, \`resume\`, \`time\`, \`start\`, \`points\`, \`edittime\`, \`editpoints\`, \`editlist\`, \`end\`]
		]

		$if[$includes[$env[arg;0];-resume-;-res-;-continue-];
        $author[$get[comNameEmoji] Resume]
        $description[## Continues your 1 hour luck challenge!]
        $addField[$get[al];\`resume\`, \`res\`, \`continue\`]
        $addField[$get[rel];\`snora\`, \`pause\`, \`time\`, \`start\`, \`points\`, \`edittime\`, \`editpoints\`, \`editlist\`, \`end\`]
		]

		$if[$includes[$env[arg;0];-time-];
        $author[$get[comNameEmoji] Time]
        $description[## Displays the time until the end of the 1 hour luck challenge!]
        $addField[$get[rel];\`snora\`, \`pause\`, \`resume\`, \`start\`, \`points\`, \`edittime\`, \`editpoints\`, \`editlist\`, \`end\`]
		]

		$if[$includes[$env[arg;0];-points-;-pts-;-score-];
        $author[$get[comNameEmoji] Points]
        $description[## Displays the current points you have!]
        $addField[$get[al];\`points\`, \`pts\`, \`score\`]
        $addField[$get[rel];\`snora\`, \`pause\`, \`resume\`, \`start\`, \`time\`, \`edittime\`, \`editpoints\`, \`editlist\`, \`end\`]
		]

		$if[$includes[$env[arg;0];-end-];
        $author[$get[comNameEmoji] End]
        $description[## Immediately ends your 1 hour luck challenge! Also shows the points you got!]
        $addField[$get[rel];\`snora\`, \`pause\`, \`resume\`, \`points\`, \`start\`, \`time\`, \`edittime\`, \`editlist\`, \`editpoints\`]
		]

		$if[$includes[$env[arg;0];-count-];
        $author[$get[comNameEmoji] Count]
        $description[## Counts points! 
        ### Does not require participation in a 1-hour luck challenge, instead requires writing the names of rare animals in one message after the command! 
        ### Example: \`$getGuildVar[prefix]count kbt cht mar...\`]
        $addField[$get[rel];\`snora\`, \`start\`]
		]

		$if[$includes[$env[arg;0];-edittime-;-etime-;-et-];
        $author[$get[comNameEmoji] Edit time]
        $description[## Edits your time in 1 hour luck challenge! 
        ### Usage: \`$getGuildVar[prefix]edittime {MM:SS (has to be "time passed") | seconds}\`
        ### Example: \`$getGuildVar[prefix]edittime 30:00\`
        ### Example: \`$getGuildVar[prefix]edittime 1800\`\n$get[desc]]
        $addField[$get[al];\`edittime\`, \`etime\`, \`et\`]
        $addField[$get[rel];\`snora\`, \`start\`, \`pause\`, \`resume\`, \`points\`, \`time\`, \`editpoints\`, \`editlist\`, \`end\`]
		]

		$if[$includes[$env[arg;0];-editpoints-;-epoints-;-epts-];
        $author[$get[comNameEmoji] Edit points]
        $description[## Edits your points!
        ### Usage: \`$getGuildVar[prefix]editpoints [number\\]\`
        ### Example: \`$getGuildVar[prefix]editpoints 100\`]
        $addField[$get[al];\`editpoints\`, \`epoints\`, \`epts\`]
        $addField[$get[rel];\`snora\`, \`start\`, \`pause\`, \`resume\`, \`points\`, \`time\`, \`edittime\`, \`editlist\`, \`end\`]
		]

		$if[$includes[$env[arg;0];-editlist-;-elist-;-el-];
        $author[$get[comNameEmoji] Edit list]
        $description[## Edits your list! 
        ### Usage: \`$getGuildVar[prefix]editlist [rare\\] [add/a/+ || remove/r/-\\] [amount || all\\]\`
        ### Example 1: \`$getGuildVar[prefix]editlist yp + 5\` - this will add 5 Yellow Pufferfishes to your list with the points!
        ### Example 2: \`$getGuildVar[prefix]editlist yp - all\` - this will remove all Yellow Pufferfishes from your list with the points!]
        $addField[$get[al];\`editlist\`, \`elist\`, \`el\`]
        $addField[$get[rel];\`snora\`, \`start\`, \`pause\`, \`resume\`, \`points\`, \`time\`, \`edittime\`, \`editpoints\`, \`end\`]
		]

		$if[$env[arg;0]==--;
        $author[$get[comNameEmoji] ALL COMMANDS]
        $description[Use \`$getGuildVar[prefix]help (command)\` for detailed information on a specific command!]

        $addField[🔳 __Special__;**$codeBlock[balance  \nleaderboard  \nshop \ninvite  \nping  \nreport  \nannouncement  \ncredits  \nmuid  \nprefix  \nresetcoins  \nresetpacks \ntimezone;JSON]**]
        $addField[$getGlobalVar[emoji] __Economy:__;**$codeBlock[weekly \ndaily \narena \nkingdragon \ncoinflip;JSON]**]
        $addField[✨ __Fun__;**$codeBlock[raretry \npumpkin  \nbeachball  \numbrella  \ntornado  \nhowlucky  \nraretryrun  \nrrare  \nraretrymode  \ncaughtrares;JSON]**]
        $addField[🎮 __Play__;**$codeBlock[wardrobe \nplay;JSON]**]
        $addField[🍀 __1 Hour Luck__;**$codeBlock[snora \nchart \ncreatetogetherroom \nstart \npause \nresume \ntime \npoints \nend \ncount \nedittime \neditpoints \neditlist \nsettings \nhistory \nsimulator;JSON]**]
        $footer[Need assistance with a specific issue? Use the invite command to join our official Discord server!]
    ]
		$sendMessage[$channelID]
  `
}]