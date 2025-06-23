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

    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[raresData;${raresData()}]
    $jsonLoad[text;${text()}]

    $let[desc;]
    $let[total;0]

    $arrayForEach[raresData;rare;
      $let[anChance;$env[rare;chance]]
      $let[att;$env[rare;atts]]
      $let[rChance;$randomNumber[1;$math[$get[att] + 1]]]

        $if[$get[anChance]>=$get[rChance];
          $let[desc;$get[desc]\n### $env[rare;content] | \`$get[anChance]/$get[att] ($round[$math[$get[anChance] / $get[att] * 100];1]%)\` | +$env[rare;MC]$getGlobalVar[emoji]]
          $letSum[total;$env[rare;MC]]
        ]
    ]
  
    $if[$get[desc]==;
      $let[desc;\n## nothing]
    ]

    $let[text;$arrayRandomValue[text]]
    $let[msgdesc;# $get[text] $get[desc]]

    $color[$getGlobalVar[luckyColor]]
    $description[$get[msgdesc]\n-# Total: +$get[total]$getGlobalVar[emoji]]
    $getGlobalVar[author]
    $callFunction[sumMC;$get[total]]
    $setUserVar[userProfile;$env[userProfile]]

`
}]

function text () {
  return `
    [
      "You attempted to obtain rares while upgrading from mouse to black dragon, and you received:",
      "You aimed for rares during your evolution from mouse to black dragon, and you got:",
      "You tried to acquire rares as you leveled up from mouse to black dragon, and you received:",
      "While evolving from mouse to black dragon, you sought rares and obtained:",
      "You were hoping for rares while upgrading from mouse to black dragon, and you received:",
      "You attempted to get rares on your journey from mouse to black dragon, and you got:",
      "While progressing from mouse to black dragon,you tried to select rares and got:",
      "You went for rares while evolving from mouse to black dragon, and your result was:"
  \\]
  `
}

function raresData () {
  return `
    [
      {
        "chance": "10",
        "atts": "100",
        "content": "${addContent("whiteDove")}",
        "MC": 125
      },
      {
        "chance": "1",
        "atts": "250",
        "content": "${addContent("stinkyPig")} 🍀",
        "MC": 3281
      },
      {
        "chance": "25",
        "atts": "250",
        "content": "${addContent("pinkyPig")}",
        "MC": 125
      },
      {
        "chance": "5",
        "atts": "100",
        "content": "${addContent("goldenPheasant")}",
        "MC": 250
      },
      {
        "chance": "3",
        "atts": "300",
        "content": "${addContent("marshDeer")}",
        "MC": 1250
      },
      {
        "chance": "60",
        "atts": "300",
        "content": "${addContent("doe")}",
        "MC": 60
      },
      {
        "chance": "1",
        "atts": "300",
        "content": "${addContent("muskDeer")} 🍀",
        "MC": 3935
      },
      {
        "chance": "10",
        "atts": "700",
        "content": "${addContent("jackass")}",
        "MC": 930
      },
      {
        "chance": "1",
        "atts": "3000",
        "content": "${addContent("rareMacaw")} 🍀🍀🍀",
        "MC": 41250
      },
      {
        "chance": "300",
        "atts": "3000",
        "content": "${addContent("blueMacaw")}",
        "MC": 125
      },
      {
        "chance": "10",
        "atts": "500",
        "content": "${addContent("girabie")}",
        "MC": 660
      },
      {
        "chance": "25",
        "atts": "500",
        "content": "${addContent("momaffieFamily")}",
        "MC": 250
      },
      {
        "chance": "50",
        "atts": "500",
        "content": "${addContent("momaffie")}",
        "MC": 125
      },
      {
        "chance": "1",
        "atts": "3000",
        "content": "${addContent("rareToucan")} 🍀🍀🍀",
        "MC": 41250
      },
      {
        "chance": "12",
        "atts": "3000",
        "content": "${addContent("lavaToucan")} 🍀",
        "MC": 3280
      },
      {
        "chance": "300",
        "atts": "3000",
        "content": "${addContent("fieryToucan")}",
        "MC": 125
      },
      {
        "chance": "600",
        "atts": "3000",
        "content": "${addContent("keelBilledToucan")}",
        "MC": 60
      },
      {
        "chance": "900",
        "atts": "3000",
        "content": "${addContent("chocoToucan")}",
        "MC": 0
      },
      {
        "chance": "1",
        "atts": "250",
        "content": "${addContent("blackPanther")} 🍀",
        "MC": 3280
      },
      {
        "chance": "4",
        "atts": "250",
        "content": "${addContent("leopard")}",
        "MC": 800
      },
      {
        "chance": "5",
        "atts": "250",
        "content": "${addContent("jaguar")}",
        "MC": 660
      },
      {
        "chance": "5",
        "atts": "1000",
        "content": "${addContent("demonPufferfish")} 🍀",
        "MC": 2625
      },
      {
        "chance": "165",
        "atts": "1000",
        "content": "${addContent("yellowPufferfish")}",
        "MC": 75
      },
      {
        "chance": "1",
        "atts": "250",
        "content": "${addContent("blackTiger")} 🍀",
        "MC": 3280
      },
      {
        "chance": "15",
        "atts": "250",
        "content": "${addContent("whiteTiger")}",
        "MC": 185
      },
      {
        "chance": "10",
        "atts": "250",
        "content": "${addContent("blackBear")}",
        "MC": 310
      },
      {
        "chance": "1",
        "atts": "1000",
        "content": "${addContent("blackLion")} 🍀🍀",
        "MC": 13750
      },
      {
        "chance": "5",
        "atts": "1000",
        "content": "${addContent("whiteLion")} 🍀",
        "MC": 2625
      },
      {
        "chance": "14",
        "atts": "1000",
        "content": "${addContent("blackManedLion")}",
        "MC": 930
      },
      {
        "chance": "1",
        "atts": "1000",
        "content": "${addContent("blackLioness")} 🍀🍀",
        "MC": 13750
      },
      {
        "chance": "5",
        "atts": "1000",
        "content": "${addContent("whiteLioness")} 🍀",
        "MC": 2625
      },
      {
        "chance": "114",
        "atts": "1000",
        "content": "${addContent("lioness")}",
        "MC": 125
      },
      {
        "chance": "1",
        "atts": "1000",
        "content": "${addContent("blackLionCub")} 🍀🍀",
        "MC": 13750
      },
      {
        "chance": "5",
        "atts": "1000",
        "content": "${addContent("whiteLionCub")} 🍀",
        "MC": 2625
      },
      {
        "chance": "54",
        "atts": "1000",
        "content": "${addContent("lionCub")}",
        "MC": 250
      },
      {
        "chance": "1",
        "atts": "4000",
        "content": "${addContent("shaheen")} 🍀🍀🍀🍀",
        "MC": 55000
      },
      {
        "chance": "50",
        "atts": "4000",
        "content": "${addContent("predator")}",
        "MC": 1065
      },
      {
        "chance": "1",
        "atts": "3000",
        "content": "${addContent("rareVulture")} 🍀🍀🍀",
        "MC": 41250
      },
      {
        "chance": "15",
        "atts": "700",
        "content": "${addContent("bigGoat")}",
        "MC": 666
      },
      {
        "chance": "600",
        "atts": "700",
        "content": "${addContent("markhor")}",
        "MC": 0
      },
      {
        "chance": "2",
        "atts": "1000",
        "content": "${addContent("blackRhino")} 🍀",
        "MC": 6875
      },
      {
        "chance": "4",
        "atts": "1000",
        "content": "${addContent("whiteRhino")} 🍀",
        "MC": 3280
      },
      {
        "chance": "1",
        "atts": "5000",
        "content": "${addContent("greaterSpottedEagle")} 🍀🍀🍀🍀",
        "MC": 68750
      },
      {
        "chance": "1",
        "atts": "5000",
        "content": "${addContent("harpyEagle")} 🍀🍀🍀🍀",
        "MC": 68750
      },
      {
        "chance": "28",
        "atts": "5000",
        "content": "${addContent("goldenEagle")}",
        "MC": 2360
      },
      {
        "chance": "5",
        "atts": "700",
        "content": "${addContent("whiteGiraffeFamily")}",
        "MC": 1840
      },
      {
        "chance": "20",
        "atts": "700",
        "content": "${addContent("whiteGiraffe")}",
        "MC": 440
      },
      {
        "chance": "25",
        "atts": "600",
        "content": "${addContent("aquaYeti")}",
        "MC": 300
      },
      {
        "chance": "1",
        "atts": "10",
        "content": "${addContent("shopBigfoot")}",
        "MC": 125
      },
      {
        "chance": "1",
        "atts": "10",
        "content": "${addContent("shopSnowman")}",
        "MC": 125
      },
      {
        "chance": "1",
        "atts": "10",
        "content": "${addContent("shopSnowgirl")}",
        "MC": 125
      },
      {
        "chance": "1",
        "atts": "1000",
        "content": "${addContent("luckBigfoot")} 🍀🍀",
        "MC": 13750
      },
      {
        "chance": "1",
        "atts": "2000",
        "content": "${addContent("luckSnowman")} 🍀🍀",
        "MC": 27500
      },
      {
        "chance": "1",
        "atts": "2000",
        "content": "${addContent("luckSnowgirl")} 🍀🍀",
        "MC": 27500
      },
      {
        "chance": "1",
        "atts": "1000",
        "content": "${addContent("kingDragon")} 🍀🍀",
        "MC": 13750
      }
  \\]
  `
}

function addContent (name) {
  return `$env[animals;${name};variants;$env[userProfile;userWardrobe;${name}];name] $env[animals;${name};variants;$env[userProfile;userWardrobe;${name}];emoji]`
}