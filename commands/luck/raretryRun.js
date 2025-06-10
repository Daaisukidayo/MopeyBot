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
          $let[desc;$get[desc]\n### $env[rare;content] | \`$get[anChance]/$get[att]\` | +$env[rare;MC]$getGlobalVar[emoji]]
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
        "chance": "5",
        "atts": "100",
        "content": "${addContent("whiteDove")}",
        "MC": 0
      },
      {
        "chance": "1",
        "atts": "250",
        "content": "${addContent("stinkyPig")} 🍀",
        "MC": 0
      },
      {
        "chance": "25",
        "atts": "250",
        "content": "${addContent("pinkyPig")}",
        "MC": 0
      },
      {
        "chance": "5",
        "atts": "100",
        "content": "${addContent("goldenPheasant")}",
        "MC": 0
      },
      {
        "chance": "3",
        "atts": "300",
        "content": "${addContent("marshDeer")}",
        "MC": 0
      },
      {
        "chance": "60",
        "atts": "300",
        "content": "${addContent("doe")}",
        "MC": 0
      },
      {
        "chance": "1",
        "atts": "300",
        "content": "${addContent("muskDeer")} 🍀",
        "MC": 0
      },
      {
        "chance": "10",
        "atts": "700",
        "content": "${addContent("jackass")}",
        "MC": 0
      },
      {
        "chance": "1",
        "atts": "3000",
        "content": "${addContent("rareMacaw")} 🍀🍀🍀",
        "MC": 0
      },
      {
        "chance": "300",
        "atts": "3000",
        "content": "${addContent("blueMacaw")}",
        "MC": 0
      },
      {
        "chance": "10",
        "atts": "500",
        "content": "${addContent("girabie")}",
        "MC": 0
      },
      {
        "chance": "25",
        "atts": "500",
        "content": "${addContent("momaffieFamily")}",
        "MC": 0
      },
      {
        "chance": "50",
        "atts": "500",
        "content": "${addContent("momaffie")}",
        "MC": 0
      },
      {
        "chance": "1",
        "atts": "3000",
        "content": "${addContent("rareToucan")} 🍀🍀🍀",
        "MC": 0
      },
      {
        "chance": "12",
        "atts": "3000",
        "content": "${addContent("lavaToucan")} 🍀",
        "MC": 0
      },
      {
        "chance": "300",
        "atts": "3000",
        "content": "${addContent("fieryToucan")}",
        "MC": 0
      },
      {
        "chance": "600",
        "atts": "3000",
        "content": "${addContent("keelBilledToucan")}",
        "MC": 0
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
        "MC": 0
      },
      {
        "chance": "4",
        "atts": "250",
        "content": "${addContent("leopard")}",
        "MC": 0
      },
      {
        "chance": "5",
        "atts": "250",
        "content": "${addContent("jaguar")}",
        "MC": 0
      },
      {
        "chance": "5",
        "atts": "1000",
        "content": "${addContent("demonPufferfish")} 🍀",
        "MC": 0
      },
      {
        "chance": "165",
        "atts": "1000",
        "content": "${addContent("yellowPufferfish")}",
        "MC": 0
      },
      {
        "chance": "1",
        "atts": "250",
        "content": "${addContent("blackTiger")} 🍀",
        "MC": 0
      },
      {
        "chance": "15",
        "atts": "250",
        "content": "${addContent("whiteTiger")}",
        "MC": 0
      },
      {
        "chance": "10",
        "atts": "250",
        "content": "${addContent("blackBear")}",
        "MC": 0
      },
      {
        "chance": "1",
        "atts": "1000",
        "content": "${addContent("blackLion")} 🍀🍀",
        "MC": 0
      },
      {
        "chance": "5",
        "atts": "1000",
        "content": "${addContent("whiteLion")} 🍀",
        "MC": 0
      },
      {
        "chance": "14",
        "atts": "1000",
        "content": "${addContent("blackManedLion")}",
        "MC": 0
      },
      {
        "chance": "1",
        "atts": "1000",
        "content": "${addContent("blackLioness")} 🍀🍀",
        "MC": 0
      },
      {
        "chance": "5",
        "atts": "1000",
        "content": "${addContent("whiteLioness")} 🍀",
        "MC": 0
      },
      {
        "chance": "114",
        "atts": "1000",
        "content": "${addContent("lioness")}",
        "MC": 0
      },
      {
        "chance": "1",
        "atts": "1000",
        "content": "${addContent("blackLionCub")} 🍀🍀",
        "MC": 0
      },
      {
        "chance": "5",
        "atts": "1000",
        "content": "${addContent("whiteLionCub")} 🍀",
        "MC": 0
      },
      {
        "chance": "54",
        "atts": "1000",
        "content": "${addContent("lionCub")}",
        "MC": 0
      },
      {
        "chance": "1",
        "atts": "4000",
        "content": "${addContent("shaheen")} 🍀🍀🍀🍀",
        "MC": 0
      },
      {
        "chance": "50",
        "atts": "4000",
        "content": "${addContent("predator")}",
        "MC": 0
      },
      {
        "chance": "1",
        "atts": "3000",
        "content": "${addContent("rareVulture")} 🍀🍀🍀",
        "MC": 0
      },
      {
        "chance": "15",
        "atts": "700",
        "content": "${addContent("bigGoat")}",
        "MC": 0
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
        "MC": 0
      },
      {
        "chance": "4",
        "atts": "1000",
        "content": "${addContent("whiteRhino")} 🍀",
        "MC": 0
      },
      {
        "chance": "1",
        "atts": "5000",
        "content": "${addContent("greaterSpottedEagle")} 🍀🍀🍀🍀",
        "MC": 0
      },
      {
        "chance": "1",
        "atts": "5000",
        "content": "${addContent("harpyEagle")} 🍀🍀🍀🍀",
        "MC": 0
      },
      {
        "chance": "28",
        "atts": "5000",
        "content": "${addContent("goldenEagle")}",
        "MC": 0
      },
      {
        "chance": "5",
        "atts": "700",
        "content": "${addContent("whiteGiraffeFamily")}",
        "MC": 0
      },
      {
        "chance": "20",
        "atts": "700",
        "content": "${addContent("whiteGiraffe")}",
        "MC": 0
      },
      {
        "chance": "25",
        "atts": "600",
        "content": "${addContent("aquaYeti")}",
        "MC": 0
      },
      {
        "chance": "1",
        "atts": "10",
        "content": "${addContent("shopBigfoot")}",
        "MC": 0
      },
      {
        "chance": "1",
        "atts": "10",
        "content": "${addContent("shopSnowman")}",
        "MC": 0
      },
      {
        "chance": "1",
        "atts": "10",
        "content": "${addContent("shopSnowgirl")}",
        "MC": 0
      },
      {
        "chance": "1",
        "atts": "1000",
        "content": "${addContent("luckBigfoot")} 🍀🍀",
        "MC": 0
      },
      {
        "chance": "1",
        "atts": "2000",
        "content": "${addContent("luckSnowman")} 🍀🍀",
        "MC": 0
      },
      {
        "chance": "1",
        "atts": "2000",
        "content": "${addContent("luckSnowgirl")} 🍀🍀",
        "MC": 0
      },
      {
        "chance": "1",
        "atts": "1000",
        "content": "${addContent("kingDragon")} 🍀🍀",
        "MC": 0
      }
  \\]
  `
}

function addContent (name) {
  return `$env[animals;${name};variants;$env[userProfile;userWardrobe;${name}];name] $env[animals;${name};variants;$env[userProfile;userWardrobe;${name}];emoji]`
}