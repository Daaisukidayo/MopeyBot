module.exports = [{
  name: "help",
  type: "messageCreate",
  code: `
    $reply
    $let[cdTime;5s]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]

    $let[arg;$toLowerCase[$message]]

    $let[desc;$codeBlock[[\\] - required argument(s) \n{} - required option \n() - optional argument(s) or option \n<> — input data type, must differ from example]]
    
    $let[al;📚 Aliases:]
    $let[rel;📖 Related:]
    $let[comNameEmoji;📜]

		$description[## Unknown command!]
    $getGlobalVar[author]
    $color[$getGlobalVar[defaultColor]]


		$if[$or[$get[arg]==ctr;$get[arg]==createtogetherroom];
        $title[$get[comNameEmoji] 1 Hour Luck Challenge Together]
        $description[## Creates a new room, and anyone who wishes can join your room and participate! A maximum of 6 participants.
        ### 1. Press the 'Join' button to enter the room.
        ### 2. Press the 'Exit' button to leave the room.
        ### 3. Press the 'Start' button (for hosts only) to begin the 1 Hour Luck Challenge Together! A minimum of 2 participants is required.
        ### 4. Press the 'Finish' button (for hosts only) to close the room and cancel participation in 1 Hour Luck Challenge Together.
        ### The room will be automatically closed in 10 minutes if it has not been started yet. 
        ### After pressing the 'Start' button, a countdown will appear, and then you will be able to start trying to get rares in Mope.io.
        ### After all participants have completed their challenge either forcibly or after 1 hour, a message about the winner and the leaderboard will appear.]
				$addField[$get[al];\`createtogetherroom\`, \`ctr\`]
		]

		$if[$or[$get[arg]==tz;$get[arg]==timezone];
        $title[$get[comNameEmoji] 1 Hour Luck Settings]
        $description[## Shows and edits your current timezone! Required for the proper functioning of time functions!
				### Example: \`$getGuildVar[prefix]timezone <Timezone ID>\`
				### $hyperlink[List of all timezones;https://en.wikipedia.org/wiki/List_of_tz_database_time_zones]]
				$addField[$get[al];\`timezone\`, \`tz\`]
		]

		$if[$or[$get[arg]==1hlset;$get[arg]==1hlsettings];
        $title[$get[comNameEmoji] 1 Hour Luck Settings]
        $description[## Shows your settings related to 1 Hour Luck Challenge which you can edit!]
				$addField[$get[al];\`1hlsettings\`, \`1hlset\`]
        $addField[$get[rel];\`start\`]
		]

		$if[$or[$get[arg]==1hlhis;$get[arg]==1hlhistory];
        $title[$get[comNameEmoji] 1 Hour Luck History]
        $description[## Shows your history of all ended 1 Hour Luck Challenges!]
				$addField[$get[al];\`1hlhistory\`, \`1hlhis\`]
        $addField[$get[rel];\`start\`]
		]

		$if[$or[$get[arg]==1hlsim;$get[arg]==1hlsimulator];
        $title[$get[comNameEmoji] 1 Hour Luck Simulator]
        $description[## Shows how much rares you would get in real 1 Hour Luck Challenge!]
				$addField[$get[al];\`1hlsimulator\`, \`1hlsim\`]
        $addField[$get[rel];\`raretry\`, \`raretryrun\`]
		]

    $if[$get[arg]==weekly;
        $title[$get[comNameEmoji] Weekly]
        $description[## Claim your weekly reward once a week!]
        $addField[$get[rel];\`daily\`]
		]

		$if[$get[arg]==rules;
        $title[$get[comNameEmoji] Rules]
        $description[## Shows the rules you agreed with!]
		]

		$if[$get[arg]==daily;
        $title[$get[comNameEmoji] Daily]
        $description[## Claim your daily reward once a day!]
        $addField[$get[rel];\`weekly\`]
		]

		$if[$or[$get[arg]==arena;$get[arg]==pvp;$get[arg]==battle];

        $title[$get[comNameEmoji] Arena]
        $description[## Enter the PvP arena to claim your reward!]
        $addField[$get[al];\`arena\`, \`pvp\`, \`battle\`]
		]

		$if[$or[$get[arg]==balance;$get[arg]==bal;$get[arg]==profile;$get[arg]==prof;$get[arg]==coins];
        $title[$get[comNameEmoji] Balance]
        $description[## Displays your current balance and purchased packs!]
        $addField[$get[al];\`balance\`, \`bal\`, \`profile\`, \`prof\`, \`coins\`, \`cash\`]
        $addField[$get[rel];\`shop\`]
		]

		$if[$or[$get[arg]==kd;$get[arg]==kingdragon];
        $title[$get[comNameEmoji] Kingdragon]
        $description[## Attempt to transform into a mighty King Dragon and claim your reward!
        ### Additionally, there is a 1/1000 chance of becoming a King Dragon by sheer luck!]
        $addField[$get[al];\`kingdragon\`, \`kd\`]
        $addField[$get[rel];\`arena\`]
		]

		$if[$or[$get[arg]==leaderboard;$get[arg]==lb;$get[arg]==top];
        $title[$get[comNameEmoji] Leaderboard]
        $description[## Displays the current leaderboard!
        ### Use the command followed by a number to navigate through pages!]
        $addField[$get[al];\`leaderboard\`, \`lb\`, \`top\`]
        $addField[$get[rel];\`balance\`]
		]

		$if[$get[arg]==shop;
        $title[$get[comNameEmoji] Shop]
        $description[## Here you can purchase any skin pack you desire! 
        ### Note that some commands may not utilize certain packs. Stay tuned for the release of the \`play\` command!]
        $addField[$get[rel];\`balance\`, \`leaderboard\`]
		]

		$if[$get[arg]==prefix;
        $title[$get[comNameEmoji] Prefix]
        $description[## Changes the bot's prefix for your server!
        ### Required permissions: \`Manage Server\` or \`Administrator\`]
        $addField[Usage:;\`$getGuildVar[prefix]prefix [your prefix\\]\` $get[desc]]
		]

		$if[$or[$get[arg]==resetcoins;$get[arg]==rc];
        $title[$get[comNameEmoji] Reset Coins]
        $description[# ❗ WARNING ❗\n## __This command will reset all your $getGlobalVar[emoji]!__]
        $addField[$get[al];\`resetcoins\`, \`rc\`]
        $addField[$get[rel];\`resetpacks\`]
		]

		$if[$or[$get[arg]==resetpacks;$get[arg]==rmp;$get[arg]==rp];

        $title[$get[comNameEmoji] Reset Packs]
        $description[# ❗ WARNING ❗\n## __This command will reset all your skin packs!__]
        $addField[$get[al];\`resetpacks\`, \`rp\`]
        $addField[$get[rel];\`resetcoins\`]
		]
		
		$if[$or[$get[arg]==invite;$get[arg]==inv];

        $title[$get[comNameEmoji] Invite]
        $description[## Invite the Mopey bot to your server, join the Mopey server, and vote for Mopey!]
        $addField[$get[al];\`invite\`, \`inv\`]
        $addField[$get[rel];\`credits\`]
		]

		$if[$get[arg]==ping;
        $title[$get[comNameEmoji] Ping]
        $description[## Displays the bot's latency in milliseconds]
		]

		$if[$get[arg]==report;
        $title[$get[comNameEmoji] Report]
        $description[## If you encounter a bug or notice a user attempting to disrupt the bot through alts, spamming, or other means, use the Report command to notify us!]
		]

		$if[$get[arg]==math;
        $title[$get[comNameEmoji] Math]
        $description[## Performs calculations based on the provided input (some arguments may not be supported)!]
        $addField[Usage:;\`$getGuildVar[prefix]math [arguments\\]\` $get[desc]]
		]

		$if[$get[arg]==credits;
        $title[$get[comNameEmoji] Credits]
        $description[## Displays a list of all contributors to the bot's development!]
        $addField[$get[rel];\`invite\`]
		]

		$if[$or[$get[arg]==muid;$get[arg]==uid;$get[arg]==id];
        $title[$get[comNameEmoji] MUID]
        $description[## Displays the Mopey User Identifier along with their current coin balance!]
        $addField[Usage:;\`$getGuildVar[prefix]muid [number\\]\` $get[desc]]
        $addField[$get[al];\`muid\`, \`uid\`, \`id\`]
		]

		$if[$or[$get[arg]==raretry;$get[arg]==rt];
        $title[$get[comNameEmoji] Raretry]
        $description[## Use this command to attempt catching some rares!
        ### Check your current rarities and rares you caught with the \`$getGuildVar[prefix]caughtrares\` command!]
        $addField[$get[al];\`raretry\`, \`rt\`]
        $addField[$get[rel];\`chances\`, \`rtmode\`]
		]

		$if[$get[arg]==chart;
        $title[$get[comNameEmoji] Chart]
        $description[## Displays the current rare chart for the 1-hour luck challenge!
        ### What is the 1-hour luck challenge? Its a game where you have to get rares in <https://mope.io>! Start from a mouse and try getting rares for 1 hour!
        ### For better experience, use the bot to track your progress! The bot will count your points from every rare you caught and wrote!
        ### More information is in the \`$getGuildVar[prefix]help start\` command!]
        $addField[$get[rel];\`snora\`, \`start\`, \`pause\`, \`resume\`, \`time\`, \`points\`, \`edittime\`, \`editpoints\`, \`editlist\`, \`end\`]
		]

		$if[$or[$get[arg]==raretrymode;$get[arg]==rtm;$get[arg]==rtmode];
        $title[$get[comNameEmoji] Raretry mode]
        $description[## Displays the current raretry mode. You can switch modes by pressing the buttons!
        ### The higher the active mode, the greater the rewards!]
        $addField[$get[al];\`raretrymode\`, \`rtmode\`, \`rtm\`]
        $addField[$get[rel];\`caughtrares\`, \`raretry\`]
		]

		$if[$or[$get[arg]==chances;$get[arg]==caughtrares;$get[arg]==cr];
        $title[$get[comNameEmoji] Caught rares]
        $description[## Displays your caught rares with the current rarities of catching rares from any category! 
        ### To change the chances, use \`$getGuildVar[prefix]rtmode\` or click the button in the command!]
        $addField[$get[al];\`caughtrares\`, \`cr\`, \`chances\`]
        $addField[$get[rel];\`raretry\`, \`rtmode\`]
		]

		$if[$or[$get[arg]==pumpkin;$get[arg]==pk];
        $title[$get[comNameEmoji] Pumpkin]
        $description[## Use this command to collect pumpkins!
        ### Current rarities:
        $codeBlock[Jack-o'-lantern: 1/20 \nGolden: 1/50 \nPlatinum: 1/100 \nDiamond: 1/200 \nLapis Lazuli: 1/500 \nTopaz: 1/1000 \nQuartz: 1/1500 \nMusgravite: 1/2000 \nOnyx 1/3500 \nPainite: 1/5000;JSON]]
        $addField[$get[al];\`pumpkin\`, \`pk\`]
        $addField[$get[rel];\`beachball\`, \`umbrella\`]
		]

		$if[$or[$get[arg]==beachball;$get[arg]==bb];
        $title[$get[comNameEmoji] Beachball]
        $description[## Use this command to collect beachballs!
        ### Current rarities:
        $codeBlock[Amber: 1/20 \nGolden: 1/50 \nPlatinum: 1/100 \nDiamond: 1/200 \nJade: 1/500 \nPearl: 1/1000 \nPink Diamond: 1/1500 \nOpal: 1/2000 \nAquamarine: 1/3500 \nTanzanite: 1/5000;JSON]]
        $addField[$get[al];\`beachball\`, \`bb\`]
        $addField[$get[rel];\`pumpkin\`, \`umbrella\`]
		]

		$if[$or[$get[arg]==umbrella;$get[arg]==ur];
        $title[$get[comNameEmoji] Umbrella]
        $description[## Use this command to collect umbrellas!
        ### Current rarities:
        $codeBlock[Purple: 1/20 \nGolden: 1/50 \nPlatinum: 1/100 \nDiamond: 1/200 \nEmerald: 1/500 \nRuby: 1/1000 \nSapphire: 1/1500 \nAmethyst: 1/2000 \nAmmolite: 1/3500 \nTaaffeite: 1/5000;JSON]]
        $addField[$get[al];\`umbrella\`, \`ur\`]
        $addField[$get[rel];\`pumpkin\`, \`beachball\`]
		]

		$if[$or[$get[arg]==tornado;$get[arg]==td];
        $title[$get[comNameEmoji] Tornado]
        $description[## Use this command to discover various disasters!]
        $addField[$get[al];\`tornado\`, \`td\`]
        $addField[$get[rel];\`pumpkin\`, \`beachball\`, \`umbrella\`, \`arena\`]
		]

		$if[$or[$get[arg]==howlucky;$get[arg]==hl];
        $title[$get[comNameEmoji] How lucky]
        $description[## Use this command to see how lucky you are today!]
        $addField[$get[al];\`howlucky\`, \`hl\`]
        $addField[$get[rel];\`raretry\`]
		]

		$if[$get[arg]==rrare;
        $title[$get[comNameEmoji] Random rare]
        $description[## Shows random rare!]
        $addField[$get[rel];\`raretry\`]
		]

		$if[$or[$get[arg]==rtr;$get[arg]==raretryrun];
        $title[$get[comNameEmoji] Raretryrun]
        $description[## Attempt to obtain rares while progressing from a mouse to a black dragon! The rarities are identical to those in the game!]
        $addField[$get[al];\`raretryrun\`,\`rtr\`]
        $addField[$get[rel];\`raretry\`]
		]

		$if[$or[$get[arg]==cf;$get[arg]==coinflip];
        $title[$get[comNameEmoji] Coinflip]
        $description[## Wager your coins on heads or tails for a chance to win!
        ### \`max\` - the maximum allowable bet (\`200,000\`)
        ### \`side\` - the side of the coin, either heads or tails. If no side is specified, it defaults to heads]
        $addField[$get[al];\`coinflip\`,\`cf\`]
        $addField[Usage:;\`$getGuildVar[prefix]coinflip {amount|max} (side)\` $get[desc]]
		]

		$if[$or[$get[arg]==ann;$get[arg]==announcement];
        $title[$get[comNameEmoji] Announcement]
        $description[## Displays the most recent announcement!]
        $addField[$get[al];\`announcement\`,\`ann\`]
		]

		$if[$get[arg]==start;
        $title[$get[comNameEmoji] Start]
        $description[## Starts your 1 hour luck challenge! 
        ### While in progress, you must write names of rares from \`$getGuildVar[prefix]snora\` without prefix to earn points!
        ### Example: \`mar cht kbt pf mud...\`]
        $addField[$get[rel];\`pause\`, \`resume\`, \`time\`, \`snora\`, \`points\`, \`edittime\`, \`editpoints\`, \`editlist\`, \`end\`]
		]

		$if[$get[arg]==snora;
        $title[$get[comNameEmoji] SNORA]
        $description[## Displays all "Shorter Names Of Rare Animals"! \n## Basically it's first 3 letters or first letter of each word]
        $addField[$get[rel];\`pause\`, \`resume\`, \`time\`, \`start\`, \`points\`, \`edittime\`, \`editpoints\`, \`editlist\`, \`end\`]
		]

		$if[$get[arg]==pause;
        $title[$get[comNameEmoji] Pause]
        $description[## Pauses your 1 hour luck challenge! 
        ### You can continue it at any time!]
        $addField[$get[rel];\`snora\`, \`resume\`, \`time\`, \`start\`, \`points\`, \`edittime\`, \`editpoints\`, \`editlist\`, \`end\`]
		]

		$if[$or[$get[arg]==resume;$get[arg]==res;$get[arg]==continue];
        $title[$get[comNameEmoji] Resume]
        $description[## Continues your 1 hour luck challenge!]
        $addField[$get[al];\`resume\`, \`res\`, \`continue\`]
        $addField[$get[rel];\`snora\`, \`pause\`, \`time\`, \`start\`, \`points\`, \`edittime\`, \`editpoints\`, \`editlist\`, \`end\`]
		]

		$if[$get[arg]==time;
        $title[$get[comNameEmoji] Time]
        $description[## Displays the time until the end of the 1 hour luck challenge!]
        $addField[$get[rel];\`snora\`, \`pause\`, \`resume\`, \`start\`, \`points\`, \`edittime\`, \`editpoints\`, \`editlist\`, \`end\`]
		]

		$if[$or[$get[arg]==points;$get[arg]==pts;$get[arg]==score];
        $title[$get[comNameEmoji] Time]
        $description[## Displays the current points you have!]
        $addField[$get[al];\`points\`, \`pts\`, \`score\`]
        $addField[$get[rel];\`snora\`, \`pause\`, \`resume\`, \`start\`, \`time\`, \`edittime\`, \`editpoints\`, \`editlist\`, \`end\`]
		]

		$if[$get[arg]==end;
        $title[$get[comNameEmoji] End]
        $description[## Immediately ends your 1 hour luck challenge! Also shows the points you got!]
        $addField[$get[rel];\`snora\`, \`pause\`, \`resume\`, \`points\`, \`start\`, \`time\`, \`edittime\`, \`editlist\`, \`editpoints\`]
		]

		$if[$get[arg]==count;
        $title[$get[comNameEmoji] Count]
        $description[## Counts points! 
        ### Does not require participation in a 1-hour luck challenge, instead requires writing the names of rare animals in one message after the command! 
        ### Example: \`$getGuildVar[prefix]count kbt cht mar...\`]
        $addField[$get[rel];\`snora\`, \`start\`]
		]

		$if[$or[$get[arg]==edittime;$get[arg]==etime;$get[arg]==et];
        $title[$get[comNameEmoji] Edit time]
        $description[## Edits your time in 1 hour luck challenge! 
        ### Usage: \`$getGuildVar[prefix]edittime {MM:SS (has to be "time passed") | seconds}\`
        ### Example: \`$getGuildVar[prefix]edittime 30:00\`
        ### Example: \`$getGuildVar[prefix]edittime 1800\`\n$get[desc]]
        $addField[$get[al];\`edittime\`, \`etime\`, \`et\`]
        $addField[$get[rel];\`snora\`, \`start\`, \`pause\`, \`resume\`, \`points\`, \`time\`, \`editpoints\`, \`editlist\`, \`end\`]
		]

		$if[$or[$get[arg]==editpoints;$get[arg]==epoints;$get[arg]==epts];
        $title[$get[comNameEmoji] Edit points]
        $description[## Edits your points!
        ### Usage: \`$getGuildVar[prefix]editpoints [number\\]\`
        ### Example: \`$getGuildVar[prefix]editpoints 100\`]
        $addField[$get[al];\`editpoints\`, \`epoints\`, \`epts\`]
        $addField[$get[rel];\`snora\`, \`start\`, \`pause\`, \`resume\`, \`points\`, \`time\`, \`edittime\`, \`editlist\`, \`end\`]
		]

		$if[$or[$get[arg]==editlist;$get[arg]==elist;$get[arg]==el];
        $title[$get[comNameEmoji] Edit list]
        $description[## Edits your list! 
        ### Usage: \`$getGuildVar[prefix]editlist [rare\\] [add/a/+ || remove/r/-\\] [amount || all\\]\`
        ### Example 1: \`$getGuildVar[prefix]editlist yp + 5\` - this will add 5 Yellow Pufferfishes to your list with the points!
        ### Example 2: \`$getGuildVar[prefix]editlist yp - all\` - this will remove all Yellow Pufferfishes from your list with the points!]
        $addField[$get[al];\`editlist\`, \`elist\`, \`el\`]
        $addField[$get[rel];\`snora\`, \`start\`, \`pause\`, \`resume\`, \`points\`, \`time\`, \`edittime\`, \`editpoints\`, \`end\`]
		]

		$if[$get[arg]==;
        $title[$get[comNameEmoji] __ALL COMMANDS__]
        $description[Use \`$getGuildVar[prefix]help (command)\` for detailed information on a specific command!]

        $addField[🔳 __Special__;**$codeBlock[balance  \nleaderboard  \nshop \ninvite  \nping  \nreport  \nannouncement  \ncredits  \nmuid  \nprefix  \nresetcoins  \nresetpacks \ntimezone;JSON]**]
        $addField[$getGlobalVar[emoji] __Economy:__;**$codeBlock[weekly \ndaily \narena \nkingdragon \ncoinflip;JSON]**]
        $addField[✨ __Fun__;**$codeBlock[raretry \npumpkin  \nbeachball  \numbrella  \ntornado  \nhowlucky  \nraretryrun  \nrrare  \nraretrymode  \ncaughtrares \n1hlsimulator;JSON]**]
        $addField[🎮 __Play__;**$codeBlock[wardrobe \nplay;JSON]**]
        $addField[🍀 __1 Hour Luck__;**$codeBlock[snora \nchart \ncreatetogetherroom \nstart \npause \nresume \ntime \npoints \nend \ncount \nedittime \neditpoints \neditlist \n1hlsettings \n1hlhistory;JSON]**]
        $footer[Need assistance with a specific issue? Use the invite command to join our official Discord server!]
    ]
		$sendMessage[$channelID]
  `
}]