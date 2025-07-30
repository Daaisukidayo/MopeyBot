module.exports = {
  name: "setfullaccount",
  aliases: ["sfa"],
  type: "messageCreate",
  code: `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$env[userProfile;devMode]]
    $jsonLoad[shopItems;$getGlobalVar[shopItems]]

    $arrayForEach[shopItems;item;
      $!jsonSet[userProfile;userPacks;$env[item;name];true]
    ]
    
    $callFunction[embed;default]
    $description[## ✅ Successfully maxed your account!]
    $setUserVar[userProfile;$env[userProfile]]
  `
}