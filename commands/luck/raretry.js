module.exports = [{ 
  name: "raretry", 
  aliases: ["rt"], 
  type: "messageCreate", 
  code: `
    $reply

    $let[cdTime;5s]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]

    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[caughtRareCategories;$env[userProfile;caughtRareCategories]]
    $jsonLoad[raretryVarData;$getGlobalVar[raretryVarData]]
    $jsonLoad[multipliers;$env[raretryVarData;multipliersForRaretry]]
    $jsonLoad[userWardrobe;$env[userProfile;userWardrobe]]

    $jsonLoad[raresGroup;${raretryData()}]
    $jsonLoad[categories;$env[raretryVarData;categories]]

    $jsonLoad[l10n;$readFile[json/localizations.json]]
    $let[l10n;$env[userProfile;l10n]]

    $loop[3;
        $arrayLoad[content$env[i];--;$if[${rep()}==;textNotFound | ID: $get[l10n]$env[i];${rep()}]]
        $let[raretryDesc$env[i];$env[l10n;raretry;raretryDesc$env[i];$get[l10n]]]
        $if[$get[raretryDesc$env[i]]==;$let[raretryDesc$env[i];textNotFound | ID: $get[l10n]$env[i]]]
    ;i;desc]

    $let[rtMode;$env[userProfile;rtMode]]

    $let[al;$arrayLength[categories]]
    $let[li;$math[$get[al] - 1]]

    $switch[$get[rtMode];
        $case[inferno;$let[rtModeNum;-1]]
        $case[default;$let[rtModeNum;0]]
        $case[medium;$let[rtModeNum;1]]
        $case[hard;$let[rtModeNum;2]]
        $case[insane;$let[rtModeNum;3]]
        $case[impossible;$let[rtModeNum;4]]
    ]

    $let[p;-1]
    $let[color;$getGlobalVar[errorColor]]
    $let[MC;0]
    $let[caught;false]
    $let[content;## $arrayRandomValue[content1]] 
    $let[thumbnail;]
    ${catchingRare()}
    $setUserVar[userProfile;$env[userProfile]]
  `
}]

// Functions

function onCatchSuccess() {
  return `
    $let[cat;$arrayAt[categories;$get[p]]]
    ${colorAndCoins()}
    ${thumbnailAndArray()}
    ${content()}
    $callFunction[sumMC;$get[MC]]
    ${embed()}
  `
}


function colorAndCoins() {
    return `
    $let[color;$env[raresGroup;category_$get[p];color]]

    $if[$get[rtMode]!=inferno;
        $let[index;$math[$get[p] + $get[rtModeNum]]]
        $let[MC;$math[$env[raretryVarData;coinsForRaretry;other;$get[index]] * $arrayAt[multipliers;$get[rtModeNum]]]]
    ;
        $let[MC;$env[raretryVarData;coinsForRaretry;inferno;$get[p]]]
    ]`
}

function baseChance(par) {
    return`
    $if[$get[rtMode]!=inferno;
        $let[baseChance;$env[raretryVarData;chancesForRaretry;other;$math[$get[${par}] + $get[rtModeNum]]]]
    ;
        $let[baseChance;$env[raretryVarData;chancesForRaretry;inferno;$get[${par}]]]
    ]`
}

function thumbnailAndArray() {
    return `
    $jsonLoad[thumbnails;$env[raresGroup;category_$get[p];thumbnail]]
    $jsonLoad[contents;$env[raresGroup;category_$get[p];content]]


    $let[thumbnailAndContentIndex;$arrayRandomIndex[thumbnails]]
    $let[thumbnail;$arrayAt[thumbnails;$get[thumbnailAndContentIndex]]]
    $let[animal;$arrayAt[contents;$get[thumbnailAndContentIndex]]]

    `
}

function content() {
    return `
    $let[content;$trimLines[$arrayRandomValue[content2]] __$get[animal]__]

    $if[$get[MC]!=0;
        $let[content;$get[content] $trimLines[$arrayRandomValue[content3]] $separateNumber[$get[MC];.]$getGlobalVar[emoji]]
    ]

    $let[content;## $get[content]!]
    `
}

function catchingRare() {
  return `
    $if[$and[$env[userProfile;devMode];$message[0]!=;$isNumber[$message[0]];$message[0]>-1;$message[0]<=$get[li]];
      $let[p;$message[0]]
      $let[caught;true]

      ${baseChance("p")}
      ${onCatchSuccess()}
    ;
      $let[i;$get[li]]

      $loop[$get[al];
        ${baseChance("i")}

        $if[1==$randomNumber[1;$sum[1;$get[baseChance]]]; 
          $let[caught;true]
          $let[p;$get[i]]

          $jsonSet[userProfile;caughtRareCategories;$get[rtMode];$get[p];$sum[$env[userProfile;caughtRareCategories;$get[rtMode];$get[p]];1]]

          ${onCatchSuccess()}
        ]
        $let[i;$math[$get[i] - 1]]
      ]

      $if[$get[caught]==false;
        ${embed()}
      ]
    ]
  `
}

function embed() {
  return `
    $sendMessage[$channelID;
      $color[$get[color]]
      $description[$get[content]]
      $thumbnail[$get[thumbnail]]
      $getGlobalVar[author]
      $footer[$if[$get[p]>-1;$get[raretryDesc1]: 1/$separateNumber[$get[baseChance];,] • $get[raretryDesc2]: $get[cat] • ]$get[raretryDesc3]: $toTitleCase[$get[rtMode]]]
    ]
  `
}

function rep() {
  return `$advancedReplace[$env[l10n;raretry;contents;content$env[i];$get[l10n]];\n\\];;\\[\n;;\n;--;",;;";]`
}

function raretryData() {
  return `
    {
      "category_8": {
        "content": [
          "${addEmoji("shaheen")}",
          "${addEmoji("harpyEagle")}",
          "${addEmoji("greaterSpottedEagle")}"
        \\],
        "thumbnail": [
          "${addImg("shaheen")}",
          "${addImg("harpyEagle")}",
          "${addImg("greaterSpottedEagle")}"
        \\],
        "color": "50351E"
      },
      "category_7": {
        "content": [
          "${addEmoji("rareMacaw")}",
          "${addEmoji("rareToucan")}",
          "${addEmoji("rareVulture")}"
        \\],
        "thumbnail": [
          "${addImg("rareMacaw")}",
          "${addImg("rareToucan")}",
          "${addImg("rareVulture")}"
        \\],
        "color": "677caf"
      },
      "category_6": {
        "content": [
          "${addEmoji("kingDragon")}",
          "${addEmoji("luckBigfoot")}",
          "${addEmoji("luckSnowman")}",
          "${addEmoji("luckSnowgirl")}"
        \\],
        "thumbnail": [
          "${addImg("kingDragon")}",
          "${addImg("luckBigfoot")}",
          "${addImg("luckSnowman")}",
          "${addImg("luckSnowgirl")}"
        \\],
        "color": "d61b4a"
      },
      "category_5": {
        "content": [
          "${addEmoji("whiteGiraffeFamily")}",
          "${addEmoji("whiteGiraffe")}",
          "${addEmoji("blackRhino")}",
          "${addEmoji("demonPufferfish")}",
          "${addEmoji("lavaToucan")}"
        \\],
        "thumbnail": [
          "${addImg("whiteGiraffeFamily")}",
          "${addImg("whiteGiraffe")}",
          "${addImg("blackRhino")}",
          "${addImg("demonPufferfish")}",
          "${addImg("lavaToucan")}"
        \\],
        "color": "452591"
      },
      "category_4": {
        "content": [
          "${addEmoji("blackTiger")}",
          "${addEmoji("blackBear")}",
          "${addEmoji("aquaYeti")}",
          "${addEmoji("predator")}",
          "${addEmoji("goldenEagle")}",
          "${addEmoji("whiteRhino")}",
          "${addEmoji("blackLionCub")}",
          "${addEmoji("blackLioness")}",
          "${addEmoji("blackLion")}",
          "${addEmoji("muskDeer")}",
          "${addEmoji("stinkyPig")}"
        \\],
        "thumbnail": [
          "${addImg("blackTiger")}",
          "${addImg("blackBear")}",
          "${addImg("aquaYeti")}",
          "${addImg("predator")}",
          "${addImg("goldenEagle")}",
          "${addImg("whiteRhino")}",
          "${addImg("blackLionCub")}",
          "${addImg("blackLioness")}",
          "${addImg("blackLion")}",
          "${addImg("muskDeer")}",
          "${addImg("stinkyPig")}"
        \\],
        "color": "750e0e"
      },
      "category_3": {
        "content": [
          "${addEmoji("girabie")}",
          "${addEmoji("jackass")}",
          "${addEmoji("bigGoat")}",
          "${addEmoji("whiteLionCub")}",
          "${addEmoji("whiteLioness")}",
          "${addEmoji("whiteLion")}",
          "${addEmoji("whiteTiger")}"
        \\],
        "thumbnail": [
          "${addImg("girabie")}",
          "${addImg("jackass")}",
          "${addImg("bigGoat")}",
          "${addImg("whiteLionCub")}",
          "${addImg("whiteLioness")}",
          "${addImg("whiteLion")}",
          "${addImg("whiteTiger")}"
        \\],
        "color": "ffffff"
      },
      "category_2": {
        "content": [
          "${addEmoji("goldenPheasant")}",
          "${addEmoji("momaffieFamily")}",
          "${addEmoji("momaffie")}",
          "${addEmoji("marshDeer")}",
          "${addEmoji("pinkyPig")}",
          "${addEmoji("whiteDove")}",
          "${addEmoji("blackManedLion")}",
          "${addEmoji("lionCub")}",
          "${addEmoji("blackPanther")}"
        \\],
        "thumbnail": [
          "${addImg("goldenPheasant")}",
          "${addImg("momaffieFamily")}",
          "${addImg("momaffie")}",
          "${addImg("marshDeer")}",
          "${addImg("pinkyPig")}",
          "${addImg("whiteDove")}",
          "${addImg("blackManedLion")}",
          "${addImg("lionCub")}",
          "${addImg("blackPanther")}"
        \\],
        "color": "f3ab0f"
      },
      "category_1": {
        "content": [
          "${addEmoji("fieryToucan")}",
          "${addEmoji("leopard")}",
          "${addEmoji("jaguar")}",
          "${addEmoji("doe")}",
          "${addEmoji("lioness")}",
          "${addEmoji("yellowPufferfish")}",
          "${addEmoji("blueMacaw")}"
        \\],
        "thumbnail": [
          "${addImg("fieryToucan")}",
          "${addImg("leopard")}",
          "${addImg("jaguar")}",
          "${addImg("doe")}",
          "${addImg("lioness")}",
          "${addImg("yellowPufferfish")}",
          "${addImg("blueMacaw")}"
        \\],
        "color": "ffff00"
      },
      "category_0": {
        "content": [
          "${addEmoji("chocoToucan")}",
          "${addEmoji("keelBilledToucan")}",
          "${addEmoji("markhor")}"
        \\],
        "thumbnail": [
          "${addImg("chocoToucan")}",
          "${addImg("keelBilledToucan")}",
          "${addImg("markhor")}"
        \\],
        "color": "c0c0c0"
      }
    }
  `
}

function addEmoji (name) {
  return `$env[animals;${name};variants;$env[userWardrobe;${name}];emoji]`
}

function addImg (name) {
  return `$env[animals;${name};variants;$env[userWardrobe;${name}];img]`
}