module.exports = ({
  name: "howlucky",
  aliases: ['hl'],
  type: "messageCreate",
  code:` 

    $reply
  
    $onlyIf[$getGlobalVar[botEnabled]==true]
    $onlyIf[$getUserVar[isBanned]==false]
    $onlyIf[$getUserVar[acceptedRules]==true;$callFunction[rulesSchema;]]
    $onlyIf[$getUserVar[onSlowmode]==false]

    $let[r;$randomNumber[0;101]]

    $if[$get[r]==100;
        $let[luckDesc;casino luck :100:!];
    $if[$get[r]>=95;
        $let[luckDesc;insane luck!];
    $if[$get[r]>=80;
        $let[luckDesc;good luck!];
    $if[$get[r]>=60;
        $let[luckDesc;not bad!];
    $if[$get[r]>=40;
        $let[luckDesc;kinda bad luck :(];
    $if[$get[r]>=20;
        $let[luckDesc;bad luck 😢];
    $if[$get[r]>=5;
        $let[luckDesc;too bad luck😭];
    $if[$get[r]>=0;
        $let[luckDesc;dead luck💀]
    ]]]]]]]]
    
    
    
    $author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]
    $description[:four_leaf_clover: **Your luck is $get[r]%, $get[luckDesc]**]
    $color[$getGlobalVar[luckyColor]]

    $callFunction[logSchema;$commandName]

  
  `
})