export default {
  name: "arena",
  aliases: ["pvp"],
  type: "messageCreate",
  code: `
    $reply
    $let[cdTime;30s]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]

    $let[r;$randomNumber[0;101]]
    $let[MC;$randomNumber[1500;2001]]

    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[LOC;$readFile[json/localizations.json]]
    $let[lang;$env[userProfile;language]]
    $let[winContent;$env[LOC;arena;0;$get[lang]]]
    $let[loseContent;$env[LOC;arena;1;$get[lang]]]

    $arrayLoad[enemies]
    $loop[$arrayLength[animals];
      $let[i;$math[$env[i] - 1]]
      $if[$env[animals;$get[i];tier]>=15;;$break]
      $if[$includes[$env[animals;$get[i];fullName];Luck;luck];$continue]
      $jsonLoad[variants;$env[animals;$get[i];variants]]
      $arrayPush[enemies;$default[$env[animals;$get[i];variants;$arrayRandomIndex[variants];emoji];❓]]
    ;i;false]
    

    $if[$get[r]>=20;
      $callFunction[sumMC;$get[MC]]
      $let[desc;$advancedReplace[$get[winContent];{0};$arrayRandomValue[enemies];{1};$get[MC];{2};$getGlobalVar[emoji]]]
      $let[color;$getGlobalVar[defaultColor]]
    ;
      $let[desc;$advancedReplace[$get[loseContent];{0};$arrayRandomValue[enemies]]]
      $let[color;$getGlobalVar[errorColor]]
    ]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[## $get[desc]]
    ;$get[color]]
    $setUserVar[userProfile;$env[userProfile]]
  `
}
