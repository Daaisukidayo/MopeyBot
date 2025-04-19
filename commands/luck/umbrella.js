module.exports = [{
  name: "umbrella",
  type: "messageCreate",
  aliases: ["ur"],
  code: `
    $reply
    $let[cdTime;20s]
    $callFunction[checking;]
    $callFunction[cooldown;$get[cdTime]]
  
    $jsonLoad[data;$readFile[json/umbrellas.json]]
        
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

$let[thum;$env[data;ur$get[i];thum]]
$let[MC;$randomNumber[$env[data;ur$get[i];mc;0];$env[data;ur$get[i];mc;1]]]
$let[desc;__$env[data;ur$get[i];desc]__ $env[data;ur$get[i];emoji]]
$let[clr;$env[data;ur$get[i];clr]]
$sendMessage[$channelID;
    $color[$get[clr]]
    $description[### $randomText[You were walking across the ocean and saw $get[desc];You were wandering around the ocean and spotted $get[desc];You stumbled upon $get[desc] while exploring;You were gliding across the ocean when you found $get[desc];You discovered $get[desc] while roaming the ocean;You were cruising through the wild and noticed $get[desc];You found $get[desc] lying on the ocean;You were sliding through the ocean when you saw $get[desc];You noticed $get[desc] on your path]!
      ### $randomText[You held it for some time and earned;You held it carefully and earned;You carried it for a while and earned;You held onto it and earned;You protected it and collected;You kept it safe and gained;You graured it and pocketed;You held it for some time and earned;You picked it up and earned;You kept it safe and scored;You held it carefully and earned] $separateNumber[$get[MC];.]$getGlobalVar[emoji]!]
    $thumbnail[$get[thum]]
    $author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]
    $if[$arrayAt[rarityValues;$get[i]]!=1;
        $footer[Rarity: 1/$arrayAt[rarityValues;$get[i]]]
    ]
]

`
}
