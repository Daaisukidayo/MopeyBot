module.exports = [{
  name: "beachball",
  type: "messageCreate",
  aliases: ["bb"],
  code: `
    $reply
    $let[cdTime;20s]
    $callFunction[checking;]
    $callFunction[cooldown;$get[cdTime]]
    
    $jsonLoad[beachballs;$readFile[json/beachballs.json]]
    $jsonLoad[content1;${content1()}]
    $jsonLoad[content2;${content2()}]
    
    $let[al;$arraylength[beachballs]]
    $let[li;$math[$get[al] - 1]]
        
    $if[$and[$getUserVar[dev]!=false;$message[0]!=;$isNumber[$message[0]];$message[0]>-1;$message[0]<=$get[li]];
      $let[id;$message[0]]
      $arrayForEach[beachballs;beachball;
        $if[$get[id]==$env[beachball;ID];
          ${catched()}
          $sendMessage[$channelID]
          $stop
        ]
      ]
    ;
      $arrayForEach[beachballs;beachball;
        $let[r;$randomNumber[1;$math[$env[beachball;rarity] + 1]]]
        
        $if[1==$get[r];
          ${catched()}
          $callFunction[sumMC;$get[MC]]
          $sendMessage[$channelID]
          $stop
        ]
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
    "You were walking across the ocean and saw a {BEACHBALL}",
    "You were wandering around the ocean and spotted a {BEACHBALL}",
    "You stumbled upon {BEACHBALL} while exploring",
    "You were gliding across the ocean when you found a {BEACHBALL}",
    "You discovered a {BEACHBALL} while roaming the ocean",
    "You were cruising through the wild and noticed a {BEACHBALL}",
    "You found a {BEACHBALL} lying on the ocean",
    "You were sliding through the ocean when you saw a {BEACHBALL}",
    "You noticed a {BEACHBALL} on your path",
    "You were gliding through the ocean and spotted a {BEACHBALL}",
    "You were strolling across the ocean and noticed a {BEACHBALL}"
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
