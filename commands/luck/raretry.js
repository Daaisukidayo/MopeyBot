module.exports = [{ 
  name: "raretry", 
  aliases: ["rt"], 
  type: "messageCreate", 
  code: `
    $reply

    $let[cdTime;5m]
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
    $let[l10n;$getUserVar[l10n]]

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
$if[$and[$env[userProfile;dev];$message[0]!=;$isNumber[$message[0]];$message[0]>=-1;$message[0]<=$get[li]];
    $let[p;$message[0]]
    $let[caught;true]

    ${baseChance("p")}
    ${colorAndCoins()}
    $let[cat;$arrayAt[categories;$get[p]]]
    ${thumbnailAndArray()}
    ${content()}

    $callFunction[sumMC;$get[MC]]

    ${sm()}

;
    $let[i;$get[li]]

    $loop[$get[al];
        ${baseChance("i")}

        $if[1==$randomNumber[1;$sum[1;$get[baseChance]]]; 
            $let[caught;true]
            $let[p;$get[i]]

            $jsonSet[userProfile;caughtRareCategories;$get[rtMode];$get[p];$sum[$env[userProfile;caughtRareCategories;$get[rtMode];$get[p]];1]]

            $let[cat;$arrayAt[categories;$get[p]]]

            ${colorAndCoins()}
            ${thumbnailAndArray()}
            ${content()}


            $callFunction[sumMC;$get[MC]]

            ${sm()}
        ]

        $let[i;$math[$get[i] - 1]]
    ]

    $if[$get[caught]==false;
        ${sm()}
    ]
]`
}

function sm() {
return `
$sendMessage[$channelID;
    $color[$get[color]]
    $description[$get[content]]
    $thumbnail[$get[thumbnail]]
    $getGlobalVar[author]
    $footer[$if[$get[p]>-1;$get[raretryDesc1]: 1/$separateNumber[$get[baseChance];,] • $get[raretryDesc2]: $get[cat] • ]$get[raretryDesc3]: $toTitleCase[$get[rtMode]]]
]`
}

function rep() {
return `$advancedReplace[$env[l10n;raretry;contents;content$env[i];$get[l10n]];\n\\];;\\[\n;;\n;--;",;;";]`
}

function raretryData () {
  return `{
      "category_9": {
        "content": [
          "USSR Macaw <:USSRMacawS2:1288058610655690804>",
          "USSR Toucan <:USSRToucanS2:1288058651075940382>",
          "USSR Vulture <:USSRVultureS2:1288058686241243157>"
        \\],
    
        "thumbnail": [
          "https://media.discordapp.net/attachments/701793335941136464/1288064073983987787/USSR_Macaw-S2.png",
          "https://media.discordapp.net/attachments/701793335941136464/1288064074365534208/USSR_Toucan-S2.png",
          "https://media.discordapp.net/attachments/701793335941136464/1288064074789421077/USSR_Vulture-S2.png"
        \\],
    
        "color": "B80000"
      },
  
      "category_8": {
        "content": [
          "$env[animals;shaheen;variants;$env[userWardrobe;shaheen];emoji]",
          "$env[animals;harpyEagle;variants;$env[userWardrobe;harpyEagle];emoji]",
          "$env[animals;greaterSpottedEagle;variants;$env[userWardrobe;greaterSpottedEagle];emoji]"
        \\],
    
        "thumbnail": [
          "$env[animals;shaheen;variants;$env[userWardrobe;shaheen];img]",
          "$env[animals;harpyEagle;variants;$env[userWardrobe;harpyEagle];img]",
          "$env[animals;greaterSpottedEagle;variants;$env[userWardrobe;greaterSpottedEagle];img]"
        \\],
    
        "color": "50351E"
      },
  
      "category_7": {
        "content": [
          "$env[animals;rareMacaw;variants;$env[userWardrobe;rareMacaw];emoji]",
          "$env[animals;rareToucan;variants;$env[userWardrobe;rareToucan];emoji]",
          "$env[animals;rareVulture;variants;$env[userWardrobe;rareVulture];emoji]"
        \\],
    
        "thumbnail": [
          "$env[animals;rareMacaw;variants;$env[userWardrobe;rareMacaw];img]",
          "$env[animals;rareToucan;variants;$env[userWardrobe;rareToucan];img]",
          "$env[animals;rareVulture;variants;$env[userWardrobe;rareVulture];img]"
        \\],
    
        "color": "677caf"
      },
  
      "category_6": {
        "content": [
          "$env[animals;kingDragon;variants;$env[userWardrobe;kingDragon];emoji]",
          "$env[animals;bigfoot;variants;$env[userWardrobe;bigfoot];emoji]",
          "$env[animals;snowman;variants;$env[userWardrobe;snowman];emoji]",
          "$env[animals;snowgirl;variants;$env[userWardrobe;snowgirl];emoji]"
        \\],
    
        "thumbnail": [
          "$env[animals;kingDragon;variants;$env[userWardrobe;kingDragon];img]",
          "$env[animals;bigfoot;variants;$env[userWardrobe;bigfoot];img]",
          "$env[animals;snowman;variants;$env[userWardrobe;snowman];img]",
          "$env[animals;snowgirl;variants;$env[userWardrobe;snowgirl];img]"
        \\],
    
        "color": "d61b4a"
      },
  
      "category_5": {
        "content": [
          "$env[animals;whiteGiraffeFamily;variants;$env[userWardrobe;whiteGiraffeFamily];emoji]",
          "$env[animals;whiteGiraffe;variants;$env[userWardrobe;whiteGiraffe];emoji]",
          "$env[animals;blackRhino;variants;$env[userWardrobe;blackRhino];emoji]",
          "$env[animals;demonPufferfish;variants;$env[userWardrobe;demonPufferfish];emoji]",
          "$env[animals;lavaToucan;variants;$env[userWardrobe;lavaToucan];emoji]"
        \\],
    
        "thumbnail": [
          "$env[animals;whiteGiraffeFamily;variants;$env[userWardrobe;whiteGiraffeFamily];img]",
          "$env[animals;whiteGiraffe;variants;$env[userWardrobe;whiteGiraffe];img]",
          "$env[animals;blackRhino;variants;$env[userWardrobe;blackRhino];img]",
          "$env[animals;demonPufferfish;variants;$env[userWardrobe;demonPufferfish];img]",
          "$env[animals;lavaToucan;variants;$env[userWardrobe;lavaToucan];img]"
        \\],
    
        "color": "452591"
      },
  
      "category_4": {
        "content": [
          "$env[animals;blackTiger;variants;$env[userWardrobe;blackTiger];emoji]",
          "$env[animals;blackBear;variants;$env[userWardrobe;blackBear];emoji]",
          "$env[animals;aquaYeti;variants;$env[userWardrobe;aquaYeti];emoji]",
          "$env[animals;predator;variants;$env[userWardrobe;predator];emoji]",
          "$env[animals;goldenEagle;variants;$env[userWardrobe;goldenEagle];emoji]",
          "$env[animals;whiteRhino;variants;$env[userWardrobe;whiteRhino];emoji]",
          "$env[animals;blackLionCub;variants;$env[userWardrobe;blackLionCub];emoji]",
          "$env[animals;blackLioness;variants;$env[userWardrobe;blackLioness];emoji]",
          "$env[animals;blackLion;variants;$env[userWardrobe;blackLion];emoji]",
          "$env[animals;muskDeer;variants;$env[userWardrobe;muskDeer];emoji]",
          "$env[animals;stinkyPig;variants;$env[userWardrobe;stinkyPig];emoji]"
        \\],
  
        "thumbnail": [
          "$env[animals;blackTiger;variants;$env[userWardrobe;blackTiger];img]",
          "$env[animals;blackBear;variants;$env[userWardrobe;blackBear];img]",
          "$env[animals;aquaYeti;variants;$env[userWardrobe;aquaYeti];img]",
          "$env[animals;predator;variants;$env[userWardrobe;predator];img]",
          "$env[animals;goldenEagle;variants;$env[userWardrobe;goldenEagle];img]",
          "$env[animals;whiteRhino;variants;$env[userWardrobe;whiteRhino];img]",
          "$env[animals;blackLionCub;variants;$env[userWardrobe;blackLionCub];img]",
          "$env[animals;blackLioness;variants;$env[userWardrobe;blackLioness];img]",
          "$env[animals;blackLion;variants;$env[userWardrobe;blackLion];img]",
          "$env[animals;muskDeer;variants;$env[userWardrobe;muskDeer];img]",
          "$env[animals;stinkyPig;variants;$env[userWardrobe;stinkyPig];img]"
        \\],
  
        "color": "750e0e"
      },
  
      "category_3": {
        "content": [
          "$env[animals;girabie;variants;$env[userWardrobe;girabie];emoji]",
          "$env[animals;jackass;variants;$env[userWardrobe;jackass];emoji]",
          "$env[animals;bigGoat;variants;$env[userWardrobe;bigGoat];emoji]",
          "$env[animals;whiteLionCub;variants;$env[userWardrobe;whiteLionCub];emoji]",
          "$env[animals;whiteLioness;variants;$env[userWardrobe;whiteLioness];emoji]",
          "$env[animals;whiteLion;variants;$env[userWardrobe;whiteLion];emoji]",
          "$env[animals;whiteTiger;variants;$env[userWardrobe;whiteTiger];emoji]"
        \\],
        "thumbnail": [
          "$env[animals;girabie;variants;$env[userWardrobe;girabie];img]",
          "$env[animals;jackass;variants;$env[userWardrobe;jackass];img]",
          "$env[animals;bigGoat;variants;$env[userWardrobe;bigGoat];img]",
          "$env[animals;whiteLionCub;variants;$env[userWardrobe;whiteLionCub];img]",
          "$env[animals;whiteLioness;variants;$env[userWardrobe;whiteLioness];img]",
          "$env[animals;whiteLion;variants;$env[userWardrobe;whiteLion];img]",
          "$env[animals;whiteTiger;variants;$env[userWardrobe;whiteTiger];img]"
        \\],
        "color": "ffffff"
      },

      "category_2": {
        "content": [
          "$env[animals;goldenPheasant;variants;$env[userWardrobe;goldenPheasant];emoji]",
          "$env[animals;momaffieFamily;variants;$env[userWardrobe;momaffieFamily];emoji]",
          "$env[animals;momaffie;variants;$env[userWardrobe;momaffie];emoji]",
          "$env[animals;marshDeer;variants;$env[userWardrobe;marshDeer];emoji]",
          "$env[animals;pinkyPig;variants;$env[userWardrobe;pinkyPig];emoji]",
          "$env[animals;whiteDove;variants;$env[userWardrobe;whiteDove];emoji]",
          "$env[animals;blackManedLion;variants;$env[userWardrobe;blackManedLion];emoji]",
          "$env[animals;lionCub;variants;$env[userWardrobe;lionCub];emoji]",
          "$env[animals;blackPanther;variants;$env[userWardrobe;blackPanther];emoji]"
        \\],
        "thumbnail": [
          "$env[animals;goldenPheasant;variants;$env[userWardrobe;goldenPheasant];img]",
          "$env[animals;momaffieFamily;variants;$env[userWardrobe;momaffieFamily];img]",
          "$env[animals;momaffie;variants;$env[userWardrobe;momaffie];img]",
          "$env[animals;marshDeer;variants;$env[userWardrobe;marshDeer];img]",
          "$env[animals;pinkyPig;variants;$env[userWardrobe;pinkyPig];img]",
          "$env[animals;whiteDove;variants;$env[userWardrobe;whiteDove];img]",
          "$env[animals;blackManedLion;variants;$env[userWardrobe;blackManedLion];img]",
          "$env[animals;lionCub;variants;$env[userWardrobe;lionCub];img]",
          "$env[animals;blackPanther;variants;$env[userWardrobe;blackPanther];img]"
        \\],
        "color": "f3ab0f"
      },

      "category_1": {
        "content": [
          "$env[animals;fieryToucan;variants;$env[userWardrobe;fieryToucan];emoji]",
          "$env[animals;leopard;variants;$env[userWardrobe;leopard];emoji]",
          "$env[animals;jaguar;variants;$env[userWardrobe;jaguar];emoji]",
          "$env[animals;doe;variants;$env[userWardrobe;doe];emoji]",
          "$env[animals;lioness;variants;$env[userWardrobe;lioness];emoji]",
          "$env[animals;yellowPufferfish;variants;$env[userWardrobe;yellowPufferfish];emoji]",
          "$env[animals;blueMacaw;variants;$env[userWardrobe;blueMacaw];emoji]"
        \\],
        "thumbnail": [
          "$env[animals;fieryToucan;variants;$env[userWardrobe;fieryToucan];img]",
          "$env[animals;leopard;variants;$env[userWardrobe;leopard];img]",
          "$env[animals;jaguar;variants;$env[userWardrobe;jaguar];img]",
          "$env[animals;doe;variants;$env[userWardrobe;doe];img]",
          "$env[animals;lioness;variants;$env[userWardrobe;lioness];img]",
          "$env[animals;yellowPufferfish;variants;$env[userWardrobe;yellowPufferfish];img]",
          "$env[animals;blueMacaw;variants;$env[userWardrobe;blueMacaw];img]"
        \\],
        "color": "ffff00"
      },

      "category_0": {
        "content": [
          "$env[animals;chocoToucan;variants;$env[userWardrobe;chocoToucan];emoji]",
          "$env[animals;keelBilledToucan;variants;$env[userWardrobe;keelBilledToucan];emoji]",
          "$env[animals;markhor;variants;$env[userWardrobe;markhor];emoji]"
        \\],
        "thumbnail": [
          "$env[animals;chocoToucan;variants;$env[userWardrobe;chocoToucan];img]",
          "$env[animals;keelBilledToucan;variants;$env[userWardrobe;keelBilledToucan];img]",
          "$env[animals;markhor;variants;$env[userWardrobe;markhor];img]"
        \\],
        "color": "c0c0c0"
      }
    }
  `
}