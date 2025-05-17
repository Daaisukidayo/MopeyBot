module.exports = [{
  name: "pumpkin",
  type: "messageCreate",
  aliases: ["pk"],
  code: `
    $reply
    $let[cdTime;20s]
    $callFunction[checking;]
    $callFunction[cooldown;$get[cdTime]]
  
    $jsonLoad[data;$readFile[json/pumpkins.json]]
        
    $arrayLoad[rarityValues;, ;1, 20, 50, 100, 200, 500, 1000, 1500, 2000, 3500, 5000]
  
    $let[al;$arraylength[rarityValues]]
    $let[li;$math[$get[al] - 1]]
  
    $let[i;$get[li]]
  
    $if[$and[$getUserVar[dev]!=false;$message[0]!=;$isNumber[$message[0]]==true;$message[0]>-1;$message[0]<=$get[li]]==true;
        $let[i;$message[0]]
        ${catched()}
    ;
        $loop[$get[al];
            $let[r;$randomNumber[1;$math[$arrayAt[rarityValues;$get[i]] + 1]]]
  
            $if[1==$get[r];
                ${catched()}
                $break
            ]
  
            $letSub[i;1]
        ]
    ]
  
    $callFunction[sumMC;$get[MC]]
  `
}]
  
function catched() {
return `

$let[thum;$env[data;pk$get[i];thum]]
$let[MC;$randomNumber[$env[data;pk$get[i];mc;0];$env[data;pk$get[i];mc;1]]]
$let[desc;__$env[data;pk$get[i];desc]__ $env[data;pk$get[i];emoji]]
$let[clr;$env[data;pk$get[i];clr]]

${contents()}

$sendMessage[$channelID;
    $color[$get[clr]]
    $description[### $arrayRandomValue[content1]!\n### $arrayRandomValue[content2] $separateNumber[$get[MC];.]$getGlobalVar[emoji]!]
    $thumbnail[$get[thum]]
    $author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]
    $if[$arrayAt[rarityValues;$get[i]]!=1;
        $footer[Rarity: 1/$arrayAt[rarityValues;$get[i]]]
    ]
]
`
}


function contents() {
return `

$arrayLoad[content1;,\n;
You were walking across the map and saw a $get[desc],
You were wandering around the map and spotted a $get[desc],
You stumbled upon $get[desc] while exploring,
You were gliding across the map when you found a $get[desc],
You discovered a $get[desc] while roaming the map,
You were cruising through the wild and noticed a $get[desc],
You found a $get[desc] lying on the ground,
You were sliding through the map when you saw a $get[desc],
You noticed a $get[desc] on your path,
You were gliding through the map and spotted a $get[desc],
You were strolling across the map and noticed a $get[desc]]

$arrayLoad[content2;,\n;
You held it for some time, goaled it and earned,
You held it carefully, goaled it, and earned,
You carried it for a while, scored it, and earned,
You held onto it, delivered it to the waterpull, and earned,
You protected it, goaled it, and collected,
You kept it safe, scored it, and gained,
You grabbed it, goaled it, and pocketed,
You picked it up, delivered it to the waterpull, and earned,
You kept it safe, goaled it, and scored,
You held it carefully, goaled it, and earned,
You kept it safe, goaled it, and collected,
You protected it, goaled it, and pocketed,
You carried it to the hole and earned,
You carried it to the waterpull and earned]
`
}