module.exports = ({
  name: "howlucky",
  aliases: ['hl'],
  type: "messageCreate",
  code:` 

    $reply
  
    $callFunction[checking;]

    $let[lastHLUsed;$getUserVar[lastHLUsed;$authorID;-1]]
    $let[currentDay;$day]

    $if[$get[lastHLUsed]!=$get[currentDay];

        $setUserVar[lastHLUsed;$get[currentDay]]
        $setUserVar[HLRandom;$randomNumber[0;101]]

        $if[$getUserVar[HLRandom]==100;
                $setUserVar[luckDesc;legendary luck 🌟];
        $if[$getUserVar[HLRandom]>=95;
                $setUserVar[luckDesc;unbelievable fortune 🍀];
        $if[$getUserVar[HLRandom]>=80;
                $setUserVar[luckDesc;great luck 🎉];
        $if[$getUserVar[HLRandom]>=60;
                $setUserVar[luckDesc;decent luck 👍];
        $if[$getUserVar[HLRandom]>=40;
                $setUserVar[luckDesc;mediocre luck 🤔];
        $if[$getUserVar[HLRandom]>=20;
                $setUserVar[luckDesc;poor luck 😟];
        $if[$getUserVar[HLRandom]>=5;
                $setUserVar[luckDesc;terrible luck 😭];
        $if[$getUserVar[HLRandom]>=0;
                $setUserVar[luckDesc;abysmal luck 💀]
        ]]]]]]]]
    ]
    
    $sendMessage[$channelID;
        $author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]
        $description[:four_leaf_clover: **Today your luck is $getUserVar[HLRandom]%, $getUserVar[luckDesc]**]
        $color[$getGlobalVar[luckyColor]]
        $footer[The % number resets every day at 0 AM UTC+0]
    ]
  `
})
