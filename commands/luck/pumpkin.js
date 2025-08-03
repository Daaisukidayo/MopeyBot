module.exports = [{
  name: "pumpkin",
  type: "messageCreate",
  aliases: ["pk"],
  code: `
    $reply
    $let[cdTime;20s]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]
    
    $jsonLoad[pumpkins;$readFile[json/pumpkins.json]]
    $jsonLoad[content1;${content1()}]
    $jsonLoad[content2;${content2()}]
    
    $let[length;$arraylength[pumpkins]]
    $let[lastI;$math[$get[length] - 1]]
    $let[arg;$message]
        
    $if[$and[$env[userProfile;devMode];$get[arg]!=;$isNumber[$get[arg]];$get[arg]>-1;$get[arg]<=$get[lastI]];
      $let[targetID;$get[arg]]
    ;
      $let[targetID;-1]
    ]

    $arrayForEach[pumpkins;pumpkin;
      $let[cond1;$and[$get[targetID]!=-1;$env[pumpkin;ID]==$get[targetID]]]
      $let[cond2;$and[$get[targetID]==-1;$randomNumber[1;$math[$env[pumpkin;rarity] + 1]]==1]]

      $if[$or[$get[cond1];$get[cond2]];
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
    $let[thum;$env[pumpkin;thum]]
    $let[MC;$randomNumber[$env[pumpkin;MC;0];$env[pumpkin;MC;1]]]
    $let[desc;__$env[pumpkin;desc]__ $env[pumpkin;emoji]]
    $let[color;$env[pumpkin;color]]

    $color[$get[color]]
    $description[### $replace[$arrayRandomValue[content1];{PUMPKIN};$get[desc]]!\n### $arrayRandomValue[content2] $separateNumber[$get[MC];,]$getGlobalVar[emoji]!]
    $thumbnail[$get[thum]]
    $getGlobalVar[author]
    $if[$env[pumpkin;rarity]!=1;
      $footer[Rarity: 1/$env[pumpkin;rarity]]
    ]
  `
}

function content1() {
  return `[
    "You were walking across the map and saw a(n) {PUMPKIN}",
    "You were wandering around the map and spotted a(n) {PUMPKIN}",
    "You stumbled upon a(n) {PUMPKIN} while exploring",
    "You were gliding across the map when you found a(n) {PUMPKIN}",
    "You discovered a(n) {PUMPKIN} while roaming the map",
    "You were cruising through the wild and noticed a(n) {PUMPKIN}",
    "You found a(n) {PUMPKIN} lying on the ground",
    "You were sliding through the map when you saw a(n) {PUMPKIN}",
    "You noticed a(n) {PUMPKIN} on your path",
    "You were gliding through the map and spotted a(n) {PUMPKIN}",
    "You were strolling across the map and noticed a(n) {PUMPKIN}"
  \\]`
}

function content2() {
  return `[
    "You held it for some time, goaled it and earned",
    "You held it carefully, goaled it, and earned",
    "You carried it for a while, scored it, and earned",
    "You held onto it, delivered it to the hole, and earned",
    "You protected it, goaled it, and collected",
    "You kept it safe, scored it, and gained",
    "You grabbed it, goaled it, and pocketed",
    "You picked it up, delivered it to the hole, and earned",
    "You kept it safe, goaled it, and scored",
    "You held it carefully, goaled it, and earned",
    "You kept it safe, goaled it, and collected",
    "You protected it, goaled it, and pocketed",
    "You carried it to the hole and earned"
  \\]`
}
