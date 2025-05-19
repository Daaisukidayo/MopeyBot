module.exports = [{
  name: "tornado",
  aliases: ["td"],
  type: "messageCreate",
  code: `$let[cdTime;20s]
    $reply
    $callFunction[checking;]
    $callFunction[cooldown;$get[cdTime]]

    $jsonLoad[tornadoes;$readFile[json/tornadoes.json]]


    $let[r;$randomNumber[1;31]]
    
    $if[1==$get[r];
        $let[type;devil]
        $let[i;$randomNumber[0;6]]
        $let[MC;$randomNumber[2500;4001]]
    ;
        $let[type;normal]
        $let[i;$randomNumber[0;5]]
        $let[MC;$randomNumber[300;601]]
    ]

    $let[clr;$env[tornadoes;$get[type];$get[type]_$get[i];color]]
    $let[desc;__$env[tornadoes;$get[type];$get[type]_$get[i];name]__]
    $let[thum;$env[tornadoes;$get[type];$get[type]_$get[i];thumbnail]]

    $callFunction[sumMC;$get[MC]]

    $description[## You walked around the map and saw $get[desc] and you earned $separateNumber[$get[MC];.]$getGlobalVar[emoji]!]
    $author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]
    $thumbnail[$get[thum]]
    $color[$get[clr]]
  `
}]