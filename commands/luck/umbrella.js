module.exports = [{
  name: "umbrella",
  type: "messageCreate",
  aliases: ["ur"],
  code: `
    $reply
    $let[cdTime;20s]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]

    $jsonLoad[umbrellas;$readFile[json/umbrellas.json]]
    $jsonLoad[content1;${content1()}]
    $jsonLoad[content2;${content2()}]

    $let[lastIndex;$math[$arraylength[umbrellas] - 1]]

    $arrayForEach[umbrellas;umbrella;
      $if[$and[$env[userProfile;devMode]!=false;$message[0]!=;$isNumber[$message[0]];$message[0]>-1;$message[0]<=$get[lastIndex]];
        $let[rid;$message[0]]
        $let[random;$env[umbrella;ID]]
      ;
        $let[rid;1]
        $let[random;$randomNumber[1;$math[$env[umbrella;rarity] + 1]]]
      ]

      $if[$get[rid]==$get[random];
        ${catched()}
        $callFunction[sumMC;$get[MC]]
        $setUserVar[userProfile;$env[userProfile]]
        $sendMessage[$channelID]
        $stop
      ]
    ]
  `
}]

function catched() {
  return `
    $let[thum;$env[umbrella;thum]]
    $let[MC;$randomNumber[$env[umbrella;MC;0];$env[umbrella;MC;1]]]
    $let[desc;__$env[umbrella;desc]__ $env[umbrella;emoji]]
    $let[color;$env[umbrella;color]]

    $color[$get[color]]
    $description[### $replace[$arrayRandomValue[content1];{UMBRELLA};$get[desc]]!\n### $arrayRandomValue[content2] $separateNumber[$get[MC];,]$getGlobalVar[emoji]!]
    $thumbnail[$get[thum]]
    $getGlobalVar[author]
    $if[$env[umbrella;rarity]!=1;
      $footer[Rarity: 1/$env[umbrella;rarity]]
    ]
  `
}

function content1() {
  return `[
    "You were walking across the ocean and saw a {UMBRELLA}",
    "You were wandering around the ocean and spotted a {UMBRELLA}",
    "You stumbled upon {UMBRELLA} while exploring",
    "You were gliding across the ocean when you found a {UMBRELLA}",
    "You discovered a {UMBRELLA} while roaming the ocean",
    "You were cruising through the wild and noticed a {UMBRELLA}",
    "You found a {UMBRELLA} lying on the ocean",
    "You were sliding through the ocean when you saw a {UMBRELLA}",
    "You noticed a {UMBRELLA} on your path",
    "You were gliding through the ocean and spotted a {UMBRELLA}",
    "You were strolling across the ocean and noticed a {UMBRELLA}"
  \\]`
}

function content2() {
  return `[
    "You held it for some time and earned",
    "You held it carefully and earned",
    "You carried it for a while and earned",
    "You held onto it and earned",
    "You protected it and collected",
    "You kept it safe and gained",
    "You grabbed it and pocketed",
    "You picked it up and earned",
    "You kept it safe and scored",
    "You held it carefully and earned",
    "You kept it safe and collected",
    "You protected it and pocketed"
  \\]`
}