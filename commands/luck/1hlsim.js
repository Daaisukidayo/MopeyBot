module.exports = [{
  name: '1hlsimulator',
  aliases: ['1hlsim'],
  type: 'messageCreate',
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $let[cdTime;10s]
    $callFunction[cooldown;$get[cdTime]]

    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[animalsKeys;$jsonKeys[animals]]
    $jsonLoad[raresData;${raresData()}]
    $jsonLoad[snora;$getGlobalVar[SNORA]]
    $jsonLoad[snoraKeys;$jsonKeys[snora]]
    $arrayLoad[snoraValues;, ;$jsonValues[snora;, ]]
    $jsonLoad[raresMap;$getGlobalVar[raresMap]]
    $jsonLoad[total;{}]
    $arrayLoad[limitAnimals;,;Markhor,Keel-Billed Toucan,Choco Toucan]

    $loop[140;
      $arrayForEach[raresData;rare;
        $let[anChance;$env[rare;chance]]
        $let[att;$env[rare;atts]]
        $let[rChance;$randomNumber[1;$math[$get[att] + 1]]]

        $if[$get[anChance]>=$get[rChance];
          $let[name;$env[rare;name]]
          $if[$env[total;$get[name]]==;
            $!jsonSet[total;$get[name];1]
          ;
            $!jsonSet[total;$get[name];$math[$env[total;$get[name]] + 1]]
            $arrayForEach[limitAnimals;animal;
              $if[$env[total;$env[animal]]>3;
                $!jsonSet[total;$env[animal];3]
              ]
            ]
          ]
        ]
      ]
    ]
    $let[totalRares;0]
    $let[totalPoints;0]
    $let[msgdesc;]

    $jsonLoad[fullNameMap;{}]
    $arrayForEach[animalsKeys;animal;
      $jsonSet[fullNameMap;$env[animals;$env[animal];fullName];$env[animal]]
    ]

    $jsonLoad[totalEntr;$jsonEntries[total]]

    $arrayForEach[totalEntr;entry;
      $let[animal;$env[fullNameMap;$env[entry;0]]]
      $let[rareEmoji;${addEmoji(`$get[animal]`)}]
      $let[msgdesc;$get[msgdesc] $get[rareEmoji]\`$env[entry;1]\`]
      $letSum[totalRares;$env[entry;1]]

      $arrayForEach[raresMap;obj;
        $jsonLoad[raresInCategory;$env[obj;rares]]
        $if[$arrayIncludes[raresInCategory;$tolowercase[$get[animal]]];
          $letSum[totalPoints;$math[$env[obj;points] * $env[entry;1]]]
        ]
      ]
    ]

    $color[$getGlobalVar[luckyColor]]
    $description[# $get[msgdesc]]
    $footer[Total Points: $get[totalPoints] • TotalRares: $get[totalRares]]
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
        "name": "${addName("jackass")}",
        "trig": "${addTrig("jackass")}"
      },
      {
        "chance": "1",
        "atts": "3000",
        "emoji": "${addEmoji("rareMacaw")}",
        "name": "${addName("rareMacaw")}",
        "trig": "${addTrig("rareMacaw")}"
      },
      {
        "chance": "300",
        "atts": "3000",
        "emoji": "${addEmoji("blueMacaw")}",
        "name": "${addName("blueMacaw")}",
        "trig": "${addTrig("blueMacaw")}"
      },
      {
        "chance": "10",
        "atts": "500",
        "emoji": "${addEmoji("girabie")}",
        "name": "${addName("girabie")}",
        "trig": "${addTrig("girabie")}"
      },
      {
        "chance": "25",
        "atts": "500",
        "emoji": "${addEmoji("momaffieFamily")}",
        "name": "${addName("momaffieFamily")}",
        "trig": "${addTrig("momaffieFamily")}"
      },
      {
        "chance": "50",
        "atts": "500",
        "emoji": "${addEmoji("momaffie")}",
        "name": "${addName("momaffie")}",
        "trig": "${addTrig("momaffie")}"
      },
      {
        "chance": "1",
        "atts": "3000",
        "emoji": "${addEmoji("rareToucan")}",
        "name": "${addName("rareToucan")}",
        "trig": "${addTrig("rareToucan")}"
      },
      {
        "chance": "12",
        "atts": "3000",
        "emoji": "${addEmoji("lavaToucan")}",
        "name": "${addName("lavaToucan")}",
        "trig": "${addTrig("lavaToucan")}"
      },
      {
        "chance": "300",
        "atts": "3000",
        "emoji": "${addEmoji("fieryToucan")}",
        "name": "${addName("fieryToucan")}",
        "trig": "${addTrig("fieryToucan")}"
      },
      {
        "chance": "600",
        "atts": "3000",
        "emoji": "${addEmoji("keelBilledToucan")}",
        "name": "${addName("keelBilledToucan")}",
        "trig": "${addTrig("keelBilledToucan")}"
      },
      {
        "chance": "900",
        "atts": "3000",
        "emoji": "${addEmoji("chocoToucan")}",
        "name": "${addName("chocoToucan")}",
        "trig": "${addTrig("chocoToucan")}"
      },
      {
        "chance": "1",
        "atts": "250",
        "emoji": "${addEmoji("blackPanther")}",
        "name": "${addName("blackPanther")}",
        "trig": "${addTrig("blackPanther")}"
      },
      {
        "chance": "4",
        "atts": "250",
        "emoji": "${addEmoji("leopard")}",
        "name": "${addName("leopard")}",
        "trig": "${addTrig("leopard")}"
      },
      {
        "chance": "5",
        "atts": "250",
        "emoji": "${addEmoji("jaguar")}",
        "name": "${addName("jaguar")}",
        "trig": "${addTrig("jaguar")}"
      },
      {
        "chance": "5",
        "atts": "1000",
        "emoji": "${addEmoji("demonPufferfish")}",
        "name": "${addName("demonPufferfish")}",
        "trig": "${addTrig("demonPufferfish")}"
      },
      {
        "chance": "165",
        "atts": "1000",
        "emoji": "${addEmoji("yellowPufferfish")}",
        "name": "${addName("yellowPufferfish")}",
        "trig": "${addTrig("yellowPufferfish")}"
      },
      {
        "chance": "15",
        "atts": "250",
        "emoji": "${addEmoji("whiteTiger")}",
        "name": "${addName("whiteTiger")}",
        "trig": "${addTrig("whiteTiger")}"
      },
      {
        "chance": "1",
        "atts": "1000",
        "emoji": "${addEmoji("blackLion")}",
        "name": "${addName("blackLion")}",
        "trig": "${addTrig("blackLion")}"
      },
      {
        "chance": "5",
        "atts": "1000",
        "emoji": "${addEmoji("whiteLion")}",
        "name": "${addName("whiteLion")}",
        "trig": "${addTrig("whiteLion")}"
      },
      {
        "chance": "14",
        "atts": "1000",
        "emoji": "${addEmoji("blackManedLion")}",
        "name": "${addName("blackManedLion")}",
        "trig": "${addTrig("blackManedLion")}"
      },
      {
        "chance": "1",
        "atts": "1000",
        "emoji": "${addEmoji("blackLioness")}",
        "name": "${addName("blackLioness")}",
        "trig": "${addTrig("blackLioness")}"
      },
      {
        "chance": "5",
        "atts": "1000",
        "emoji": "${addEmoji("whiteLioness")}",
        "name": "${addName("whiteLioness")}",
        "trig": "${addTrig("whiteLioness")}"
      },
      {
        "chance": "114",
        "atts": "1000",
        "emoji": "${addEmoji("lioness")}",
        "name": "${addName("lioness")}",
        "trig": "${addTrig("lioness")}"
      },
      {
        "chance": "1",
        "atts": "1000",
        "emoji": "${addEmoji("blackLionCub")}",
        "name": "${addName("blackLionCub")}",
        "trig": "${addTrig("blackLionCub")}"
      },
      {
        "chance": "5",
        "atts": "1000",
        "emoji": "${addEmoji("whiteLionCub")}",
        "name": "${addName("whiteLionCub")}",
        "trig": "${addTrig("whiteLionCub")}"
      },
      {
        "chance": "54",
        "atts": "1000",
        "emoji": "${addEmoji("lionCub")}",
        "name": "${addName("lionCub")}",
        "trig": "${addTrig("lionCub")}"
      },
      {
        "chance": "1",
        "atts": "4000",
        "emoji": "${addEmoji("shaheen")}",
        "name": "${addName("shaheen")}",
        "trig": "${addTrig("shaheen")}"
      },
      {
        "chance": "50",
        "atts": "4000",
        "emoji": "${addEmoji("predator")}",
        "name": "${addName("predator")}",
        "trig": "${addTrig("predator")}"
      },
      {
        "chance": "1",
        "atts": "3000",
        "emoji": "${addEmoji("rareVulture")}",
        "name": "${addName("rareVulture")}",
        "trig": "${addTrig("rareVulture")}"
      },
      {
        "chance": "15",
        "atts": "700",
        "emoji": "${addEmoji("bigGoat")}",
        "name": "${addName("bigGoat")}",
        "trig": "${addTrig("bigGoat")}"
      },
      {
        "chance": "600",
        "atts": "700",
        "emoji": "${addEmoji("markhor")}",
        "name": "${addName("markhor")}",
        "trig": "${addTrig("markhor")}"
      },
      {
        "chance": "2",
        "atts": "1000",
        "emoji": "${addEmoji("blackRhino")}",
        "name": "${addName("blackRhino")}",
        "trig": "${addTrig("blackRhino")}"
      },
      {
        "chance": "4",
        "atts": "1000",
        "emoji": "${addEmoji("whiteRhino")}",
        "name": "${addName("whiteRhino")}",
        "trig": "${addTrig("whiteRhino")}"
      },
      {
        "chance": "1",
        "atts": "5000",
        "emoji": "${addEmoji("greaterSpottedEagle")}",
        "name": "${addName("greaterSpottedEagle")}",
        "trig": "${addTrig("greaterSpottedEagle")}"
      },
      {
        "chance": "1",
        "atts": "5000",
        "emoji": "${addEmoji("harpyEagle")}",
        "name": "${addName("harpyEagle")}",
        "trig": "${addTrig("harpyEagle")}"
      },
      {
        "chance": "28",
        "atts": "5000",
        "emoji": "${addEmoji("goldenEagle")}",
        "name": "${addName("goldenEagle")}",
        "trig": "${addTrig("goldenEagle")}"
      }
  \\]
  `
}

function addEmoji (name) {
  return `$env[animals;${name};variants;$env[userProfile;userWardrobe;${name}];emoji]`
}

function addName (name) {
  return `$env[animals;${name};fullName]`
}

function addTrig (name) {
  return `$env[animals;${name};trig]`
}