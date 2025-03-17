module.exports = [{
  name: "beachball",
  type: "messageCreate",
  aliases: ["bb"],
  code:`

    $jsonLoad[data;$readFile[json/beachballs.json]]
        
    $let[rarityValues;20--50--100--200--500--1000--1500--2000--3500--5000]
    $textSplit[$get[rarityValues];--]

    $if[$and[$getUserVar[dev]!=false;$message[0]!=;$isNumber[$message[0]]==true;$message[0]>0;$message[0]<=10]==true;
        $let[i;$message[0]]
    ;
        $if[1==$randomNumber[1;$sum[1;$splitText[9]]];
            $let[i;10];
        $if[1==$randomNumber[1;$sum[1;$splitText[8]]];
            $let[i;9];
        $if[1==$randomNumber[1;$sum[1;$splitText[7]]];
            $let[i;8];
        $if[1==$randomNumber[1;$sum[1;$splitText[6]]];
            $let[i;7];
        $if[1==$randomNumber[1;$sum[1;$splitText[5]]];
            $let[i;6];
        $if[1==$randomNumber[1;$sum[1;$splitText[4]]];
            $let[i;5];
        $if[1==$randomNumber[1;$sum[1;$splitText[3]]];
            $let[i;4];
        $if[1==$randomNumber[1;$sum[1;$splitText[2]]];
            $let[i;3];
        $if[1==$randomNumber[1;$sum[1;$splitText[1]]];
            $let[i;2];
        $if[1==$randomNumber[1;$sum[1;$splitText[0]]];
            $let[i;1]
        ;
            $let[i;0]
        ]]]]]]]]]]
    ]

    $let[thum;$env[bb$get[i];thum]]
    $let[MC;$randomNumber[$env[data;bb$get[i];mc;0];$env[data;bb$get[i];mc;1]]]
    $let[desc;__$env[data;bb$get[i];desc]__ $env[data;bb$get[i];emoji]]
    $let[clr;$env[data;bb$get[i];clr]]
    $if[$get[i]!=0; $let[f;$splitText[$sub[$get[i];1]]] ]

    $callFunction[sumMC;$get[MC]]

    $sendMessage[$channelID;
        $color[$get[clr]]
        $description[### $randomText[You were walking across the ocean and saw a $get[desc];You were wandering around the ocean and spotted a $get[desc];You stumbled upon $get[desc] while exploring;You were gliding across the ocean when you found a $get[desc];You discovered a $get[desc] while roaming the ocean;You were cruising through the wild and noticed a $get[desc];You found a $get[desc] lying on the ocean;You were sliding through the ocean when you saw a $get[desc];You noticed a $get[desc] on your path]!
        ### $randomText[You held it for some time, goaled it and earned;You held it carefully, goaled it, and earned;You carried it for a while, scored it, and earned;You held onto it, delivered it to the waterpull, and earned;You protected it, goaled it, and collected;You kept it safe, scored it, and gained;You grabbed it, goaled it, and pocketed;You carried it to the waterpull and earned;You picked it up, delivered it to the waterpull, and earned;You kept it safe, goaled it, and scored;You held it carefully, goaled it, and earned] $separateNumber[$get[MC];.]$getGlobalVar[emoji]!]
        $thumbnail[$get[thum]]
        $author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]

        $if[$get[f]!=;
            $footer[Rarity: 1/$get[f]]
        ]
    ]
    
    $callFunction[logSchema;$commandName | Got: $get[desc]]

  `
}]


