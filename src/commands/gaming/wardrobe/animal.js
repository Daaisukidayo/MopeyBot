import wardrobeSnippets from '#snippets/wardrobeSnippets.js'

export default {
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "if user providing animal as an argument",
  code: `
    $arrayLoad[interactionID;-;$customID]
    $arrayLoad[values;-;$selectMenuValues]
    $arrayLoad[passKeys;,;animal,wardrobe]

    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[interactionID;$env[key]]]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    ${wardrobeSnippets.loadJSON()}
    $let[msg;$messageID]
    $let[animalID;$env[values;0]]
    $let[variant;$env[values;1]]

    $onlyIf[$arrayIncludes[animalIDs;$get[animalID]]]

    $!jsonSet[userWardrobe;$get[animalID];$get[variant]]
    $setUserVar[userWardrobe;$env[userWardrobe]]

    ${wardrobeSnippets.animalsEmbed('animal')}
    $interactionUpdate
    ${wardrobeSnippets.timeout()}
  `
}