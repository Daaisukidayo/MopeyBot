export default {
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

    $let[length;$arraylength[umbrellas]]
    $let[lastI;$math[$get[length] - 1]]
    $let[arg;$message]
        
    $if[$and[$env[userProfile;devMode];$get[arg]!=;$isNumber[$get[arg]];$get[arg]>-1;$get[arg]<=$get[lastI]];
      $let[targetID;$get[arg]]
    ;
      $let[targetID;-1]
    ]

    $arrayForEach[umbrellas;umbrella;
      $let[cond1;$and[$get[targetID]!=-1;$env[umbrella;ID]==$get[targetID]]]
      $let[cond2;$and[$get[targetID]==-1;$randomNumber[1;$math[$env[umbrella;rarity] + 1]]==1]]

      $if[$or[$get[cond1];$get[cond2]];
        ${catched()}
        $callFunction[sumMC;$get[MC]]
        $setUserVar[userProfile;$env[userProfile]]
        $sendMessage[$channelID]
        $stop
      ]
    ]
  `
}

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
    "You were walking across the ocean and saw a(n) {UMBRELLA}",
    "You were wandering around the ocean and spotted a(n) {UMBRELLA}",
    "You stumbled upon a(n) {UMBRELLA} while exploring",
    "You were gliding across the ocean when you found a(n) {UMBRELLA}",
    "You discovered a(n) {UMBRELLA} while roaming the ocean",
    "You were cruising through the wild and noticed a(n) {UMBRELLA}",
    "You found a(n) {UMBRELLA} lying on the ocean",
    "You were sliding through the ocean when you saw a(n) {UMBRELLA}",
    "You noticed a(n) {UMBRELLA} on your path",
    "You were gliding through the ocean and spotted a(n) {UMBRELLA}",
    "You were strolling across the ocean and noticed a(n) {UMBRELLA}"
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