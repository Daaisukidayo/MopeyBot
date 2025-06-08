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
    
    $let[al;$arraylength[pumpkins]]
    $let[li;$math[$get[al] - 1]]
        
    $if[$and[$env[userProfile;devMode];$message[0]!=;$isNumber[$message[0]];$message[0]>-1;$message[0]<=$get[li]];
      $let[id;$message[0]]
      $arrayForEach[pumpkins;pumpkin;
        $if[$get[id]==$env[pumpkin;ID];
          ${catched()}
          $setUserVar[userProfile;$env[userProfile]]
          $sendMessage[$channelID]
          $stop
        ]
      ]
    ;
      $arrayForEach[pumpkins;pumpkin;
        $let[r;$randomNumber[1;$math[$env[pumpkin;rarity] + 1]]]
        
        $if[1==$get[r];
          ${catched()}
          $callFunction[sumMC;$get[MC]]
          $setUserVar[userProfile;$env[userProfile]]
          $sendMessage[$channelID]
          $stop
        ]
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
    "You were walking across the map and saw a {PUMPKIN}",
    "You were wandering around the map and spotted a {PUMPKIN}",
    "You stumbled upon {PUMPKIN} while exploring",
    "You were gliding across the map when you found a {PUMPKIN}",
    "You discovered a {PUMPKIN} while roaming the map",
    "You were cruising through the wild and noticed a {PUMPKIN}",
    "You found a {PUMPKIN} lying on the ground",
    "You were sliding through the map when you saw a {PUMPKIN}",
    "You noticed a {PUMPKIN} on your path",
    "You were gliding through the map and spotted a {PUMPKIN}",
    "You were strolling across the map and noticed a {PUMPKIN}"
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
