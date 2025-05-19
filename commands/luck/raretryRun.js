module.exports = [{
  name: 'raretryrun',
  aliases: ['rtr'],
  type: 'messageCreate',
  code: `
    $reply

    $callFunction[checking;]
    $let[cdTime;10s]
    $callFunction[cooldown;$get[cdTime]]

    $arrayLoad[animalsChances;,;5,1,25,5,3,60,1,10,1,1,300,10,25,50,1,1,12,300,600,900,1,4,5,5,165,1,15,10,1,5,14,1,5,114,1,5,54,1,50,1,1,15,600,2,4,1,1,28,5,20,25,1,1,1,1,1,1,1]
    $arrayLoad[globalChances;,;100,250,250,100,300,300,300,700,10000,3000,3000,500,500,500,10000,3000,3000,3000,3000,3000,250,250,250,1000,1000,250,250,250,1000,1000,1000,1000,1000,1000,1000,1000,1000,4000,4000,10000,3000,700,700,1000,1000,5000,5000,5000,700,700,600,10,10,10,1000,2000,2000,1000]
    $arrayLoad[MC;,;...]
    
    $arrayLoad[animalsDesc;,\n      ;
      White Dove <:WhiteDove:1291258772492255263>,
      Stinky Pig <:stinky_pig:1284520753793863831> 🍀,
      Pinky Pig <:pinky_pig:1284520701541351454>,
      Golden Pheasant <:GoldenPheasant:1285692782765408360>,
      Marsh Deer <:marsh_deer:1284520894894702788>,
      Doe <:doe:1284520854276804680>,
      Musk Deer <:musk_deer:1284540790583984139> 🍀,
      Jackass <:Jackass:1284567568299851918>,
      USSR Macaw <:USSR_MacawS2:1288058610655690804> 🍀🍀🍀🍀🍀,
      Pakistan Macaw <:pakistan_macaw:1284540970876145704> 🍀🍀🍀,
      Blue Macaw <:blue_macaw:1284540918648541287>,
      Girabie <:Girabie:1284567631956807701>,
      Momaffie Family <:Momaffie_family:1284567618627571896>,
      Momaffie <:Momaffie:1284567606422147202>,
      USSR Toucan <:USSR_ToucanS2:1288058651075940382> 🍀🍀🍀🍀🍀,
      Pakistan Toucan <:PakistanToucan:1284567718351077386> 🍀🍀🍀,
      Lava Toucan <:LavaToucan:1284567706171080725> 🍀,
      Fiery Toucan <:FieryToucan:1284567688781238323>,
      Keel-Billed Toucan <:KeelBilledToucan:1284567675212664964>,
      Choco Toucan <:ChocoToucan:1284567662353059971>,
      Black Panther <:BlackPanther:1284567767764177028> 🍀,
      Leopard <:Leopard:1284567751641530579>,
      Jaguar <:Jaguar:1284567739440300052>,
      Demonfish <:DemonPufferfish:1284567803596116047> 🍀🍀,
      Yellow Pufferfish <:YellowPufferfish:1284567779156168846>,
      Black Tiger <:BlackTiger:1288058719082643526> 🍀,
      White Tiger <:WhiteTiger:1284568061474508810>,
      Black Bear <:BlackBear:1288058731363569684>,
      Black Lion <:BlackLion:1284568143435661374> 🍀🍀,
      White Lion <:WhiteLion:1284568130668199966>,
      Black-Maned Lion <:BlackManedLion:1284568114562076903>,
      Black Lioness <:BlackLioness:1284568191569235999> 🍀🍀,
      White Lioness <:WhiteLioness:1284568171931766927>,
      Lioness <:Lioness:1284568161206800505>,
      Black Lion Cub <:BlackLionCub:1284568232950366290> 🍀🍀,
      White Lion Cub <:WhiteLionCub:1284568220644409386>,
      Lion Cub <:LionCub:1284568208082341929>,
      Shaheen <:ShaheenFalcon:1284568268493033533> 🍀🍀🍀🍀,
      Predator <:PredatorFalcon:1284568255599476786>,
      USSR Vulture <:USSR_VultureS2:1288058686241243157> 🍀🍀🍀🍀🍀,
      Pakistan Vulture <:PakistanVulture:1284568287971377233> 🍀🍀🍀,
      Big Goat <:BigGoat:1284568654092173404>,
      Markhor <:Markhor:1284568638170595459>,
      Black Rhino <:BlackRhino:1284568536362127493> 🍀,
      White Rhino <:WhiteRhino:1284568524806684724>,
      Greater Spotted Eagle <:GoldenShahbaz:1284568382850727997> 🍀🍀🍀🍀,
      Harpy Eagle <:Shahbaz:1284568371043635352> 🍀🍀🍀🍀,
      Golden Eagle <:GoldenEagle:1284568352404279326> 🍀,
      Giraffe Family <:Giraffe_family:1284570523786936450> 🍀,
      White Giraffe <:WhiteGiraffe:1284570509589352478> 🍀,
      Aqua Yeti <:AquaYeti:1284570581093711914> 🍀,
      The Big Foot <:TheBigfoot:1285617256562425967>,
      The Snowman <:TheSnowman:1284570594075218014>,
      The Snowgirl <:TheSnowgirl:1284570612018315346>,
      The Big Foot by luck <:TheBigfoot:1285617256562425967> 🍀🍀,
      The Snowman by luck <:TheSnowman:1284570594075218014> 🍀🍀,
      The Snowgirl by luck <:TheSnowgirl:1284570612018315346> 🍀🍀,
      King Dragon by luck <:kingdragonseason2:1280238249360494825> 🍀🍀]

    $arrayLoad[text;,\n      ;
      You attempted to obtain rares while upgrading from mouse to black dragon, and you received:,
      You aimed for rares during your evolution from mouse to black dragon, and you got:,
      You tried to acquire rares as you leveled up from mouse to black dragon, and you received:,
      While evolving from mouse to black dragon, you sought rares and obtained:,
      You were hoping for rares while upgrading from mouse to black dragon, and you received:,
      You attempted to get rares on your journey from mouse to black dragon, and you got:,
      While progressing from mouse to black dragon,you tried to select rares and got:,
      You went for rares while evolving from mouse to black dragon, and your result was:]

  

    $let[desc;]
    $let[index;0]

    $arrayForEach[animalsDesc;animal;
      $let[anChance;$arrayAt[animalsChances;$get[index]]]
      $let[gChance;$arrayAt[globalChances;$get[index]]]
      $let[rChance;$randomNumber[1;$math[$get[gChance] + 1]]]
        $if[$get[anChance]>=$get[rChance];
          $let[desc;$get[desc]\n### $env[animal]]
        ]
      $letSum[index;1]
    ]

  
    $if[$get[desc]==;
      $let[desc;\n## nothing]
    ]

    $let[text;$arrayRandomValue[text]]

    $let[msgdesc;# $get[text] $get[desc]]



    $color[$getGlobalVar[luckyColor]]
    $description[$get[msgdesc]]
    $author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]

`
}]