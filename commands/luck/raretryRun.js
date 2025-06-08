module.exports = [{
  name: 'raretryrun',
  aliases: ['rtr'],
  type: 'messageCreate',
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $let[cdTime;10s]
    $callFunction[cooldown;$get[cdTime]]

    $jsonLoad[raresData;${raresData()}]


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

    $arrayForEach[raresData;rare;
      $let[anChance;$env[rare;chance]]
      $let[att;$env[rare;atts]]
      $let[rChance;$randomNumber[1;$math[$get[att] + 1]]]

        $if[$get[anChance]>=$get[rChance];
          $let[desc;$get[desc]\n### $env[rare;content]]
        ]
    ]

  
    $if[$get[desc]==;
      $let[desc;\n## nothing]
    ]

    $let[text;$arrayRandomValue[text]]

    $let[msgdesc;# $get[text] $get[desc]]



    $color[$getGlobalVar[luckyColor]]
    $description[$get[msgdesc]]
    $getGlobalVar[author]

`
}]

function raresData () {
  return `
    [
      {
          "chance": "5",
          "atts": "100",
          "content": "White Dove <:WhiteDove:1291258772492255263>",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "250",
          "content": "Stinky Pig <:stinky_pig:1284520753793863831> 🍀",
          "MC": 0
      },
      {
          "chance": "25",
          "atts": "250",
          "content": "Pinky Pig <:pinky_pig:1284520701541351454>",
          "MC": 0
      },
      {
          "chance": "5",
          "atts": "100",
          "content": "Golden Pheasant <:GoldenPheasant:1285692782765408360>",
          "MC": 0
      },
      {
          "chance": "3",
          "atts": "300",
          "content": "Marsh Deer <:marsh_deer:1284520894894702788>",
          "MC": 0
      },
      {
          "chance": "60",
          "atts": "300",
          "content": "Doe <:doe:1284520854276804680>",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "300",
          "content": "Musk Deer <:musk_deer:1284540790583984139> 🍀",
          "MC": 0
      },
      {
          "chance": "10",
          "atts": "700",
          "content": "Jackass <:Jackass:1284567568299851918>",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "10000",
          "content": "USSR Macaw <:USSR_MacawS2:1288058610655690804> 🍀🍀🍀🍀🍀",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "3000",
          "content": "Pakistan Macaw <:pakistan_macaw:1284540970876145704> 🍀🍀🍀",
          "MC": 0
      },
      {
          "chance": "300",
          "atts": "3000",
          "content": "Blue Macaw <:blue_macaw:1284540918648541287>",
          "MC": 0
      },
      {
          "chance": "10",
          "atts": "500",
          "content": "Girabie <:Girabie:1284567631956807701>",
          "MC": 0
      },
      {
          "chance": "25",
          "atts": "500",
          "content": "Momaffie Family <:Momaffie_family:1284567618627571896>",
          "MC": 0
      },
      {
          "chance": "50",
          "atts": "500",
          "content": "Momaffie <:Momaffie:1284567606422147202>",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "10000",
          "content": "USSR Toucan <:USSR_ToucanS2:1288058651075940382> 🍀🍀🍀🍀🍀",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "3000",
          "content": "Pakistan Toucan <:PakistanToucan:1284567718351077386> 🍀🍀🍀",
          "MC": 0
      },
      {
          "chance": "12",
          "atts": "3000",
          "content": "Lava Toucan <:LavaToucan:1284567706171080725> 🍀",
          "MC": 0
      },
      {
          "chance": "300",
          "atts": "3000",
          "content": "Fiery Toucan <:FieryToucan:1284567688781238323>",
          "MC": 0
      },
      {
          "chance": "600",
          "atts": "3000",
          "content": "Keel-Billed Toucan <:KeelBilledToucan:1284567675212664964>",
          "MC": 0
      },
      {
          "chance": "900",
          "atts": "3000",
          "content": "Choco Toucan <:ChocoToucan:1284567662353059971>",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "250",
          "content": "Black Panther <:BlackPanther:1284567767764177028> 🍀",
          "MC": 0
      },
      {
          "chance": "4",
          "atts": "250",
          "content": "Leopard <:Leopard:1284567751641530579>",
          "MC": 0
      },
      {
          "chance": "5",
          "atts": "250",
          "content": "Jaguar <:Jaguar:1284567739440300052>",
          "MC": 0
      },
      {
          "chance": "5",
          "atts": "1000",
          "content": "Demonfish <:DemonPufferfish:1284567803596116047> 🍀🍀",
          "MC": 0
      },
      {
          "chance": "165",
          "atts": "1000",
          "content": "Yellow Pufferfish <:YellowPufferfish:1284567779156168846>",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "250",
          "content": "Black Tiger <:BlackTiger:1288058719082643526> 🍀",
          "MC": 0
      },
      {
          "chance": "15",
          "atts": "250",
          "content": "White Tiger <:WhiteTiger:1284568061474508810>",
          "MC": 0
      },
      {
          "chance": "10",
          "atts": "250",
          "content": "Black Bear <:BlackBear:1288058731363569684>",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "1000",
          "content": "Black Lion <:BlackLion:1284568143435661374> 🍀🍀",
          "MC": 0
      },
      {
          "chance": "5",
          "atts": "1000",
          "content": "White Lion <:WhiteLion:1284568130668199966>",
          "MC": 0
      },
      {
          "chance": "14",
          "atts": "1000",
          "content": "Black-Maned Lion <:BlackManedLion:1284568114562076903>",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "1000",
          "content": "Black Lioness <:BlackLioness:1284568191569235999> 🍀🍀",
          "MC": 0
      },
      {
          "chance": "5",
          "atts": "1000",
          "content": "White Lioness <:WhiteLioness:1284568171931766927>",
          "MC": 0
      },
      {
          "chance": "114",
          "atts": "1000",
          "content": "Lioness <:Lioness:1284568161206800505>",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "1000",
          "content": "Black Lion Cub <:BlackLionCub:1284568232950366290> 🍀🍀",
          "MC": 0
      },
      {
          "chance": "5",
          "atts": "1000",
          "content": "White Lion Cub <:WhiteLionCub:1284568220644409386>",
          "MC": 0
      },
      {
          "chance": "54",
          "atts": "1000",
          "content": "Lion Cub <:LionCub:1284568208082341929>",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "4000",
          "content": "Shaheen <:ShaheenFalcon:1284568268493033533> 🍀🍀🍀🍀",
          "MC": 0
      },
      {
          "chance": "50",
          "atts": "4000",
          "content": "Predator <:PredatorFalcon:1284568255599476786>",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "10000",
          "content": "USSR Vulture <:USSR_VultureS2:1288058686241243157> 🍀🍀🍀🍀🍀",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "3000",
          "content": "Pakistan Vulture <:PakistanVulture:1284568287971377233> 🍀🍀🍀",
          "MC": 0
      },
      {
          "chance": "15",
          "atts": "700",
          "content": "Big Goat <:BigGoat:1284568654092173404>",
          "MC": 0
      },
      {
          "chance": "600",
          "atts": "700",
          "content": "Markhor <:Markhor:1284568638170595459>",
          "MC": 0
      },
      {
          "chance": "2",
          "atts": "1000",
          "content": "Black Rhino <:BlackRhino:1284568536362127493> 🍀",
          "MC": 0
      },
      {
          "chance": "4",
          "atts": "1000",
          "content": "White Rhino <:WhiteRhino:1284568524806684724>",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "5000",
          "content": "Greater Spotted Eagle <:GoldenShahbaz:1284568382850727997> 🍀🍀🍀🍀",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "5000",
          "content": "Harpy Eagle <:Shahbaz:1284568371043635352> 🍀🍀🍀🍀",
          "MC": 0
      },
      {
          "chance": "28",
          "atts": "5000",
          "content": "Golden Eagle <:GoldenEagle:1284568352404279326> 🍀",
          "MC": 0
      },
      {
          "chance": "5",
          "atts": "700",
          "content": "Giraffe Family <:Giraffe_family:1284570523786936450> 🍀",
          "MC": 0
      },
      {
          "chance": "20",
          "atts": "700",
          "content": "White Giraffe <:WhiteGiraffe:1284570509589352478> 🍀",
          "MC": 0
      },
      {
          "chance": "25",
          "atts": "600",
          "content": "Aqua Yeti <:AquaYeti:1284570581093711914> 🍀",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "10",
          "content": "The Big Foot <:TheBigfoot:1285617256562425967>",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "10",
          "content": "The Snowman <:TheSnowman:1284570594075218014>",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "10",
          "content": "The Snowgirl <:TheSnowgirl:1284570612018315346>",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "1000",
          "content": "The Big Foot by luck <:TheBigfoot:1285617256562425967> 🍀🍀",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "2000",
          "content": "The Snowman by luck <:TheSnowman:1284570594075218014> 🍀🍀",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "2000",
          "content": "The Snowgirl by luck <:TheSnowgirl:1284570612018315346> 🍀🍀",
          "MC": 0
      },
      {
          "chance": "1",
          "atts": "1000",
          "content": "King Dragon by luck <:kingdragonseason2:1280238249360494825> 🍀🍀",
          "MC": 0
      }
  \\]
  `
}