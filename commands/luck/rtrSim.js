module.exports = [{
  name: '1hlsimulator',
  aliases: ['1hls', '1hlsim'],
  type: 'messageCreate',
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $let[cdTime;10s]
    $callFunction[cooldown;$get[cdTime]]

    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[raresData;${raresData()}]
    $jsonLoad[snora;$getGlobalVar[SNORA]]
    $jsonLoad[raresMap;$getGlobalVar[raresMap]]
    $jsonLoad[total;{}]

    $loop[75;
      $arrayForEach[raresData;rare;
        $let[anChance;$env[rare;chance]]
        $let[att;$env[rare;atts]]
        $let[rChance;$randomNumber[1;$math[$get[att] + 1]]]

        $if[$get[anChance]>=$get[rChance];
          $let[content;$env[rare;content]]
          $if[$env[total;$get[content]]==;
            $!jsonSet[total;$get[content];1]
          ;
            $!jsonSet[total;$get[content];$math[$env[total;$get[content]] + 1]]
          ]
        ]
      ]
    ]

    $let[msgdesc;]
    $jsonLoad[totalEntr;$jsonEntries[total]]
    $arrayForEach[totalEntr;entry;
      $let[msgdesc;$get[msgdesc] $env[entry;0]\`$env[entry;1]\`]
    ]




    $color[$getGlobalVar[luckyColor]]
    $description[# $get[msgdesc]]
    $getGlobalVar[author]

`
}]

function raresData () {
  return `
    [
      {
        "chance": "10",
        "atts": "700",
        "emoji": "${addEmoji("jackass")}",
        "name": "${addName("jackass")}"
      },
      {
        "chance": "1",
        "atts": "3000",
        "emoji": "${addEmoji("rareMacaw")}",
        "name": "${addName("rareMacaw")}"
      },
      {
        "chance": "900",
        "atts": "3000",
        "emoji": "${addEmoji("blueMacaw")}",
        "name": "${addName("blueMacaw")}"
      },
      {
        "chance": "10",
        "atts": "500",
        "emoji": "${addEmoji("girabie")}",
        "name": "${addName("girabie")}"
      },
      {
        "chance": "25",
        "atts": "500",
        "emoji": "${addEmoji("momaffieFamily")}",
        "name": "${addName("momaffieFamily")}"
      },
      {
        "chance": "50",
        "atts": "500",
        "emoji": "${addEmoji("momaffie")}",
        "name": "${addName("momaffie")}"
      },
      {
        "chance": "1",
        "atts": "3000",
        "emoji": "${addEmoji("rareToucan")}",
        "name": "${addName("rareToucan")}"
      },
      {
        "chance": "12",
        "atts": "3000",
        "emoji": "${addEmoji("lavaToucan")}",
        "name": "${addName("lavaToucan")}"
      },
      {
        "chance": "600",
        "atts": "3000",
        "emoji": "${addEmoji("fieryToucan")}",
        "name": "${addName("fieryToucan")}"
      },
      {
        "chance": "900",
        "atts": "3000",
        "emoji": "${addEmoji("keelBilledToucan")}",
        "name": "${addName("keelBilledToucan")}"
      },
      {
        "chance": "1200",
        "atts": "3000",
        "emoji": "${addEmoji("chocoToucan")}",
        "name": "${addName("chocoToucan")}"
      },
      {
        "chance": "5",
        "atts": "250",
        "emoji": "${addEmoji("blackPanther")}",
        "name": "${addName("blackPanther")}"
      },
      {
        "chance": "10",
        "atts": "250",
        "emoji": "${addEmoji("leopard")}",
        "name": "${addName("leopard")}"
      },
      {
        "chance": "25",
        "atts": "250",
        "emoji": "${addEmoji("jaguar")}",
        "name": "${addName("jaguar")}"
      },
      {
        "chance": "5",
        "atts": "1000",
        "emoji": "${addEmoji("demonPufferfish")}",
        "name": "${addName("demonPufferfish")}"
      },
      {
        "chance": "330",
        "atts": "1000",
        "emoji": "${addEmoji("yellowPufferfish")}",
        "name": "${addName("yellowPufferfish")}"
      },
      {
        "chance": "15",
        "atts": "250",
        "emoji": "${addEmoji("whiteTiger")}",
        "name": "${addName("whiteTiger")}"
      },
      {
        "chance": "1",
        "atts": "1000",
        "emoji": "${addEmoji("blackLion")}",
        "name": "${addName("blackLion")}"
      },
      {
        "chance": "5",
        "atts": "1000",
        "emoji": "${addEmoji("whiteLion")}",
        "name": "${addName("whiteLion")}"
      },
      {
        "chance": "14",
        "atts": "1000",
        "emoji": "${addEmoji("blackManedLion")}",
        "name": "${addName("blackManedLion")}"
      },
      {
        "chance": "1",
        "atts": "1000",
        "emoji": "${addEmoji("blackLioness")}",
        "name": "${addName("blackLioness")}"
      },
      {
        "chance": "5",
        "atts": "1000",
        "emoji": "${addEmoji("whiteLioness")}",
        "name": "${addName("whiteLioness")}"
      },
      {
        "chance": "114",
        "atts": "1000",
        "emoji": "${addEmoji("lioness")}",
        "name": "${addName("lioness")}"
      },
      {
        "chance": "1",
        "atts": "1000",
        "emoji": "${addEmoji("blackLionCub")}",
        "name": "${addName("blackLionCub")}"
      },
      {
        "chance": "5",
        "atts": "1000",
        "emoji": "${addEmoji("whiteLionCub")}",
        "name": "${addName("whiteLionCub")}"
      },
      {
        "chance": "54",
        "atts": "1000",
        "emoji": "${addEmoji("lionCub")}",
        "name": "${addName("lionCub")}"
      },
      {
        "chance": "1",
        "atts": "4000",
        "emoji": "${addEmoji("shaheen")}",
        "name": "${addName("shaheen")}"
      },
      {
        "chance": "50",
        "atts": "4000",
        "emoji": "${addEmoji("predator")}",
        "name": "${addName("predator")}"
      },
      {
        "chance": "1",
        "atts": "3000",
        "emoji": "${addEmoji("rareVulture")}",
        "name": "${addName("rareVulture")}"
      },
      {
        "chance": "15",
        "atts": "700",
        "emoji": "${addEmoji("bigGoat")}",
        "name": "${addName("bigGoat")}"
      },
      {
        "chance": "600",
        "atts": "700",
        "emoji": "${addEmoji("markhor")}",
        "name": "${addName("markhor")}"
      },
      {
        "chance": "2",
        "atts": "1000",
        "emoji": "${addEmoji("blackRhino")}",
        "name": "${addName("blackRhino")}"
      },
      {
        "chance": "4",
        "atts": "1000",
        "emoji": "${addEmoji("whiteRhino")}",
        "name": "${addName("whiteRhino")}"
      },
      {
        "chance": "1",
        "atts": "5000",
        "emoji": "${addEmoji("greaterSpottedEagle")}",
        "name": "${addName("greaterSpottedEagle")}"
      },
      {
        "chance": "1",
        "atts": "5000",
        "emoji": "${addEmoji("harpyEagle")}",
        "name": "${addName("harpyEagle")}"
      },
      {
        "chance": "28",
        "atts": "5000",
        "emoji": "${addEmoji("goldenEagle")}",
        "name": "${addName("goldenEagle")}"
      }
  \\]
  `
}

function addEmoji (name) {
  return `$env[animals;${name};variants;$env[userProfile;userWardrobe;${name}];emoji]`
}

function addName (name) {
  return `$env[animals;${name};variants;$env[userProfile;userWardrobe;${name}];name]`
}