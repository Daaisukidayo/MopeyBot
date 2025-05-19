module.exports = [{
  name: "help",
  type: "messageCreate",
  code: `
    $reply
    $let[cdTime;5s]
    $callFunction[checking;]
    $callFunction[cooldown;$get[cdTime]]

    $let[arg;$toLowerCase[$message]]


    $let[desc;$codeBlock[[\\] - required arguments \n{} - required option \n() - optional argument or option]]
    
    $let[al;📚 Aliases:]
    $let[rel;📖 Related:]
    $let[comNameEmoji;📜]

    $getGlobalVar[author]
    $color[$getGlobalVar[defaultColor]]

    $if[$get[arg]==weekly;

        $title[$get[comNameEmoji] Weekly]
        $description[Claim your weekly reward by using this command once a week!]
        $addField[$get[rel];\`daily\`]

    ;$if[$get[arg]==rules;

        $title[$get[comNameEmoji] Rules]
        $description[Shows the rules you agreed with!]

    ;$if[$get[arg]==daily;

        $title[$get[comNameEmoji] Daily]
        $description[Claim your daily reward by using this command once a day!]
        $addField[$get[rel];\`weekly\`]

    ;$if[$or[$get[arg]==arena;$get[arg]==pvp;$get[arg]==battle];

        $title[$get[comNameEmoji] Arena]
        $description[Enter the PvP arena to claim your reward!]
        $addField[$get[al];\`arena\`, \`pvp\`, \`battle\`]

    ;$if[$or[$get[arg]==balance;$get[arg]==bal;$get[arg]==profile;$get[arg]==prof;$get[arg]==coins];

        $title[$get[comNameEmoji] Balance]
        $description[Displays your current balance and purchased packs!]
        $addField[$get[al];\`balance\`, \`bal\`, \`profile\`, \`prof\`, \`coins\`, \`cash\`]
        $addField[$get[rel];\`shop\`]

    ;$if[$or[$get[arg]==kd;$get[arg]==kingdragon];

        $title[$get[comNameEmoji] Kingdragon]
        $description[Attempt to transform into a mighty King Dragon and claim your reward!
        Additionally, there is a 1/1000 chance of becoming a King Dragon by sheer luck!]
        $addField[$get[al];\`kingdragon\`, \`kd\`]
        $addField[$get[rel];\`arena\`]

    ;$if[$or[$get[arg]==leaderboard;$get[arg]==lb;$get[arg]==top];

        $title[$get[comNameEmoji] Leaderboard]
        $description[Displays the current leaderboard!
        Use the command followed by a number to navigate through pages!]
        $addField[$get[al];\`leaderboard\`, \`lb\`, \`top\`]
        $addField[$get[rel];\`balance\`]

    ;$if[$get[arg]==shop;

        $title[$get[comNameEmoji] Shop]
        $description[Here you can purchase any skin pack you desire! 
        Note that some commands may not utilize certain packs. Stay tuned for the release of the \`play\` command!]
        $addField[$get[rel];\`balance\`, \`leaderboard\`]

    ;$if[$get[arg]==prefix;

        $title[$get[comNameEmoji] Prefix]
        $description[Changes the bot's prefix for your server!\nRequired permissions: \`Manage Server\` or \`Administrator\`]
        $addField[Usage:;\`$getGuildVar[prefix]prefix [your prefix\\]\` $get[desc]]

    ;$if[$or[$get[arg]==reset-my-coins;$get[arg]==rmc;$get[arg]==rc];

        $title[$get[comNameEmoji] Reset-my-coins]
        $description[# ❗ WARNING ❗\n## __This command will reset all your $getGlobalVar[emoji]!__]
        $addField[$get[al];\`reset-my-coins\`, \`rmc\`, \`rc\`]
        $addField[$get[rel];\`reset-my-packs\`]

    ;$if[$or[$get[arg]==reset-my-packs;$get[arg]==rmp;$get[arg]==rp];

        $title[$get[comNameEmoji] Reset-my-packs]
        $description[# ❗ WARNING ❗\n## __This command will reset all your packs!__]
        $addField[$get[al];\`reset-my-packs\`, \`rmp\`, \`rp\`]
        $addField[$get[rel];\`reset-my-coins\`]

    ;$if[$or[$get[arg]==invite;$get[arg]==inv];

        $title[$get[comNameEmoji] Invite]
        $description[Invite the Mopey bot to your server, join the Mopey server, and vote for Mopey!]
        $addField[$get[al];\`invite\`, \`inv\`]
        $addField[$get[rel];\`credits\`]

    ;$if[$get[arg]==ping;

        $title[$get[comNameEmoji] Ping]
        $description[Displays the bot's latency in milliseconds]

    ;$if[$get[arg]==report;

        $title[$get[comNameEmoji] Report]
        $description[If you encounter a bug or notice a user attempting to disrupt the bot through alts, spamming, or other means, use the Report command to notify us!]

    ;$if[$get[arg]==math;

        $title[$get[comNameEmoji] Math]
        $description[Performs calculations based on the provided input (some arguments may not be supported)!]
        $addField[Usage:;\`$getGuildVar[prefix]math [arguments\\]\` $get[desc]]

    ;$if[$get[arg]==credits;

        $title[$get[comNameEmoji] Credits]
        $description[Displays a list of all contributors to the bot's development!]
        $addField[$get[rel];\`invite\`]

    ;$if[$or[$get[arg]==muid;$get[arg]==uid;$get[arg]==id];

        $title[$get[comNameEmoji] MUID]
        $description[Displays the Mopey User Identifier along with their current coin balance!]
        $addField[Usage:;\`$getGuildVar[prefix]muid [number\\]\` $get[desc]]
        $addField[$get[al];\`muid\`, \`uid\`, \`id\`]

    ;$if[$or[$get[arg]==raretry;$get[arg]==rt];

        $title[$get[comNameEmoji] Raretry]
        $description[Use this command to attempt catching some rares!
        Check your current rarities and rares you caught with the \`$getGuildVar[prefix]caughtrares\` command!]
        $addField[$get[al];\`raretry\`, \`rt\`]
        $addField[$get[rel];\`chances\`, \`rtmode\`]

    ;$if[$get[arg]==chart;

        $title[$get[comNameEmoji] Chart]
        $description[Displays the current rare chart for the 1-hour luck challenge!]

    ;$if[$or[$get[arg]==rtm;$get[arg]==rtmode];

        $title[$get[comNameEmoji] Raretry mode]
        $description[Displays the current raretry mode. You can switch modes by pressing the buttons!
        The higher the active mode, the greater the rewards!]
        $addField[$get[rel];\`caughtrares\`, \`raretry\`]

    ;$if[$or[$get[arg]==chances;$get[arg]==caughtrares;$get[arg]==cr];

        $title[$get[comNameEmoji] Caught rares]
        $description[Displays your caught rares with the current rarities of catching rares from any category! 
        To change the chances, use \`$getGuildVar[prefix]rtmode\` or click the button in the command!]
        $addField[$get[al];\`caughtrares\`, \`cr\`, \`chances\`]
        $addField[$get[rel];\`raretry\`, \`rtmode\`]

    ;$if[$or[$get[arg]==pumpkin;$get[arg]==pk];

        $title[$get[comNameEmoji] Pumpkin]
        $description[## Use this command to collect pumpkins!
        ### Current rarities for them:

        $codeBlock[Jack-o'-lantern: 1/20 \nGolden: 1/50 \nPlatinum: 1/100 \nDiamond: 1/200 \nLapis Lazuli: 1/500 \nTopaz: 1/1000 \nQuartz: 1/1500 \nMusgravite: 1/2000 \nOnyx 1/3500 \nPainite: 1/5000;JSON]]
        $addField[$get[al];\`pumpkin\`, \`pk\`]
        $addField[$get[rel];\`beachball\`, \`umbrella\`]

    ;$if[$or[$get[arg]==beachball;$get[arg]==bb];

        $title[$get[comNameEmoji] Beachball]
        $description[## Use this command to collect beachballs!
        ### Current rarities for them:
        $codeBlock[Amber: 1/20 \nGolden: 1/50 \nPlatinum: 1/100 \nDiamond: 1/200 \nJade: 1/500 \nPearl: 1/1000 \nPink Diamond: 1/1500 \nOpal: 1/2000 \nAquamarine: 1/3500 \nTanzanite: 1/5000;JSON]]
        $addField[$get[al];\`beachball\`, \`bb\`]
        $addField[$get[rel];\`pumpkin\`, \`umbrella\`]

    ;$if[$or[$get[arg]==umbrella;$get[arg]==ur];

        $title[$get[comNameEmoji] Umbrella]
        $description[## Use this command to collect umbrellas!
        ### Current rarities for them:
        $codeBlock[Purple: 1/20 \nGolden: 1/50 \nPlatinum: 1/100 \nDiamond: 1/200 \nEmerald: 1/500 \nRuby: 1/1000 \nSapphire: 1/1500 \nAmethyst: 1/2000 \nAmmolite: 1/3500 \nTaaffeite: 1/5000;JSON]]
        $addField[$get[al];\`umbrella\`, \`ur\`]
        $addField[$get[rel];\`pumpkin\`, \`beachball\`]

    ;$if[$or[$get[arg]==tornado;$get[arg]==td];

        $title[$get[comNameEmoji] Tornado]
        $description[Use this command to discover various disasters!]
        $addField[$get[al];\`tornado\`, \`td\`]
        $addField[$get[rel];\`pumpkin\`, \`beachball\`, \`umbrella\`, \`arena\`]

    ;$if[$or[$get[arg]==howlucky;$get[arg]==hl];

        $title[$get[comNameEmoji] How lucky]
        $description[Use this command to see how lucky you are today!]
        $addField[$get[al];\`howlucky\`, \`hl\`]
        $addField[$get[rel];\`raretry\`]

    ;$if[$get[arg]==rrare;

        $title[$get[comNameEmoji] Random rare]
        $description[Shows random rare!]
        $addField[$get[rel];\`raretry\`]

    ;$if[$or[$get[arg]==rtr;$get[arg]==raretryrun];

        $title[$get[comNameEmoji] Raretryrun]
        $description[Attempt to obtain rares while progressing from a mouse to a black dragon! The rarities are identical to those in the game!]
        $addField[$get[al];\`raretryrun\`,\`rtr\`]
        $addField[$get[rel];\`raretry\`]

    ;$if[$or[$get[arg]==cf;$get[arg]==coinflip];

        $title[$get[comNameEmoji] Coinflip]
        $description[Wager your coins on heads or tails for a chance to win!

        \`max\` - the maximum allowable bet (\`200,000\`)
        \`side\` - the side of the coin, either heads or tails. If no side is specified, it defaults to heads]
        $addField[$get[al];\`coinflip\`,\`cf\`]
        $addField[Usage:;\`$getGuildVar[prefix]coinflip {amount|max} (side)\` $get[desc]]

    ;$if[$or[$get[arg]==ann;$get[arg]==announcement];

        $title[$get[comNameEmoji] Announcement]
        $description[Displays the most recent announcement!]
        $addField[$get[al];\`announcement\`,\`ann\`]

    ;$if[$get[arg]==start;

        $title[$get[comNameEmoji] Start]
        $description[## Starts your 1 hour luck challenge! \n### While in progress, you must write names of rares from \`$getGuildVar[prefix]snora\` without prefix to earn points!\n### Example: \`mar cht kbt pre mud...\`]
        $addField[$get[rel];\`pause\`, \`resume\`, \`time\`, \`snora\`, \`points\`, \`edittime\`, \`editpoints\`, \`end\`]

    ;$if[$get[arg]==snora;

        $title[$get[comNameEmoji] SNORA]
        $description[## Displays all "Shorter Names Of Rare Animals"! \n## Basically it's first 3 letters or first letter of each word]
        $addField[$get[rel];\`pause\`, \`resume\`, \`time\`, \`start\`, \`points\`, \`edittime\`, \`editpoints\`, \`end\`]


    ;$if[$get[arg]==pause;

        $title[$get[comNameEmoji] Pause]
        $description[## Pauses your 1 hour luck challenge! \n### You can continue it at any time!]
        $addField[$get[rel];\`snora\`, \`resume\`, \`time\`, \`start\`, \`points\`, \`edittime\`, \`editpoints\`, \`end\`]

    ;$if[$or[$get[arg]==resume;$get[arg]==res;$get[arg]==continue];

        $title[$get[comNameEmoji] Resume]
        $description[## Continues your 1 hour luck challenge!]
        $addField[$get[al];\`resume\`, \`res\`, \`continue\`]
        $addField[$get[rel];\`snora\`, \`pause\`, \`time\`, \`start\`, \`points\`, \`edittime\`, \`editpoints\`, \`end\`]

    ;$if[$get[arg]==time;

        $title[$get[comNameEmoji] Time]
        $description[## Displays the time until the end of the 1 hour luck challenge!]
        $addField[$get[rel];\`snora\`, \`pause\`, \`resume\`, \`start\`, \`points\`, \`edittime\`, \`editpoints\`, \`end\`]

    ;$if[$or[$get[arg]==points;$get[arg]==pts;$get[arg]==score];

        $title[$get[comNameEmoji] Time]
        $description[## Displays the current points you have!]
        $addField[$get[al];\`points\`, \`pts\`, \`score\`]
        $addField[$get[rel];\`snora\`, \`pause\`, \`resume\`, \`start\`, \`time\`, \`edittime\`, \`editpoints\`, \`end\`]

    ;$if[$get[arg]==end;

        $title[$get[comNameEmoji] End]
        $description[## Immediately ends your 1 hour luck challenge! Also shows the points you got!]
        $addField[$get[rel];\`snora\`, \`pause\`, \`resume\`, \`points\`, \`start\`, \`time\`, \`edittime\`, \`editpoints\`]

    ;$if[$get[arg]==count;

        $title[$get[comNameEmoji] Count]
        $description[## Counts points! \n### Does not require participation in a 1-hour luck challenge, instead requires writing the names of rare animals in one message after the command! \n### Example: \`$getGuildVar[prefix]count kbt cht mh...\`]
        $addField[$get[rel];\`snora\`, \`start\`]

    ;$if[$or[$get[arg]==edittime;$get[arg]==etime;$get[arg]==et];

        $title[$get[comNameEmoji] Edit time]
        $description[## Edits your time in 1 hour luck challenge! \n### Usage: \`$getGuildVar[prefix]edittime {HH:MM:SS (has to be "time passed") | seconds}\`\n### Example: \`$getGuildVar[prefix]edittime 00:30:00\`\n### Example: \`$getGuildVar[prefix]edittime 1800\`\n$get[desc]]
        $addField[$get[al];\`edittime\`, \`etime\`, \`et\`]
        $addField[$get[rel];\`snora\`, \`start\`, \`pause\`, \`resume\`, \`points\`, \`time\`, \`editpoints\`, \`end\`]

    ;$if[$or[$get[arg]==editpoints;$get[arg]==epoints;$get[arg]==epts];

        $title[$get[comNameEmoji] Edit points]
        $description[## Edits your points! \n### Usage: \`$getGuildVar[prefix]editpoints [number\\]\`\n### Example: \`$getGuildVar[prefix]editpoints 100\`]
        $addField[$get[al];\`editpoints\`, \`epoints\`, \`epts\`]
        $addField[$get[rel];\`snora\`, \`pause\`, \`resume\`, \`points\`, \`start\`, \`time\`, \`edittime\`, \`end\`]

    ;

        $title[$get[comNameEmoji] __ALL COMMANDS__]
        $description[Use \`$getGuildVar[prefix]help (command)\` for detailed information on a specific command!]

        $addField[🔳 __Special__;**$codeBlock[balance  \nleaderboard  \nshop \ninvite  \nping  \nreport  \nannouncement  \ncredits  \nmuid  \nprefix  \nreset-my-coins  \nreset-my-packs;JSON]**]
        $addField[$getGlobalVar[emoji] __Earning:__;**$codeBlock[weekly \ndaily \narena \nkingdragon \ncoinflip;JSON]**]
        $addField[🍀 __Luck related__;**$codeBlock[raretry \npumpkin  \nbeachball  \numbrella  \ntornado  \nhowlucky  \nraretryrun  \nrrare \nchart  \nrtmode  \ncaughtrares;JSON]**]
        $addField[🍀 __1 Hour Luck__;**$codeBlock[snora \nstart \npause \nresume \ntime \npoints \nend \ncount \nedittime \neditpoints;JSON]**]
        $footer[Need assistance with a specific issue? Use the invite command to join our official Discord server!]

    ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
  `
}]