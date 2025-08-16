export default {
  name: "setfullaccount",
  aliases: ["sfa"],
  type: "messageCreate",
  code: `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$env[userProfile;devMode]]
    $jsonLoad[shopItems;$getGlobalVar[shopItems]]
    $arrayLoad[newPacks]

    $arrayForEach[shopItems;item;
      $arrayPush[newPacks;$env[item;code]]
    ]

    $!jsonSet[userProfile;userPacks;$env[newPacks]]
    
    $callFunction[embed;default]
    $description[## ✅ Successfully maxed your account!]
    $setUserVar[userProfile;$env[userProfile]]
  `
}