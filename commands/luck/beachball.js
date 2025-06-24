module.exports = [{
  name: "beachball",
  type: "messageCreate",
  aliases: ["bb"],
  code: `
    $reply
    $let[cdTime;20s]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]
    
    $jsonLoad[beachballs;$readFile[json/beachballs.json]]
    $jsonLoad[content1;${content1()}]
    $jsonLoad[content2;${content2()}]
    
    $let[length;$arraylength[beachballs]]
    $let[lastI;$math[$get[length] - 1]]
    $let[arg;$message]
        
    $if[$and[$env[userProfile;devMode];$get[arg]!=;$isNumber[$get[arg]];$get[arg]>-1;$get[arg]<=$get[lastI]];
      $let[targetID;$get[arg]]
    ;
      $let[targetID;-1]
    ]

    $arrayForEach[beachballs;beachball;
      $let[cond1;$and[$get[targetID]!=-1;$env[beachball;ID]==$get[targetID]]]
      $let[cond2;$and[$get[targetID]==-1;$randomNumber[1;$math[$env[beachball;rarity] + 1]]==1]]

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
    $let[thum;$env[beachball;thum]]
    $let[MC;$randomNumber[$env[beachball;MC;0];$env[beachball;MC;1]]]
    $let[desc;__$env[beachball;desc]__ $env[beachball;emoji]]
    $let[color;$env[beachball;color]]

    $color[$get[color]]
    $description[### $replace[$arrayRandomValue[content1];{BEACHBALL};$get[desc]]!\n### $arrayRandomValue[content2] $separateNumber[$get[MC];,]$getGlobalVar[emoji]!]
    $thumbnail[$get[thum]]
    $getGlobalVar[author]
    $if[$env[beachball;rarity]!=1;
      $footer[Rarity: 1/$env[beachball;rarity]]
    ]
  `
}

function content1() {
  return `[
    "You were walking across the ocean and saw a(n) {BEACHBALL}",
    "You were wandering around the ocean and spotted a(n) {BEACHBALL}",
    "You stumbled upon a(n) {BEACHBALL} while exploring",
    "You were gliding across the ocean when you found a(n) {BEACHBALL}",
    "You discovered a(n) {BEACHBALL} while roaming the ocean",
    "You were cruising through the wild and noticed a(n) {BEACHBALL}",
    "You found a(n) {BEACHBALL} lying on the ocean",
    "You were sliding through the ocean when you saw a(n) {BEACHBALL}",
    "You noticed a(n) {BEACHBALL} on your path",
    "You were gliding through the ocean and spotted a(n) {BEACHBALL}",
    "You were strolling across the ocean and noticed a(n) {BEACHBALL}"
  \\]`
}

function content2() {
  return `[
    "You held it for some time, goaled it and earned",
    "You held it carefully, goaled it, and earned",
    "You carried it for a while, scored it, and earned",
    "You held onto it, delivered it to the waterpull, and earned",
    "You protected it, goaled it, and collected",
    "You kept it safe, scored it, and gained",
    "You grabbed it, goaled it, and pocketed",
    "You picked it up, delivered it to the waterpull, and earned",
    "You kept it safe, goaled it, and scored",
    "You held it carefully, goaled it, and earned",
    "You kept it safe, goaled it, and collected",
    "You protected it, goaled it, and pocketed",
    "You carried it to the waterpull and earned"
  \\]`
}
