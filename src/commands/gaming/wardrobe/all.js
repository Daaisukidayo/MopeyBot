import wardrobeSnippets from '#snippets/wardrobeSnippets.js'

export default {
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "if user choses skinpack providing all as an argument",
  code: `
    $arrayLoad[interactionID;-;$customID]
    $arrayLoad[passKeys;,;all,wardrobe]

    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[interactionID;$env[key]]]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    ${wardrobeSnippets.loadJSON()}
    $let[value;$selectMenuValues]

    $arrayForEach[animalIDs;animalID;
      $jsonLoad[variants;$env[animals;$env[animalsIndexes;$env[animalID]];variants]]

      $loop[$arrayLength[variants];
        $let[i;$math[$env[i] - 1]]
        $let[description;$env[variants;$get[i];description]]

        $if[$includes[$get[description];$get[value]];;$continue]

        $!jsonSet[userWardrobe;$env[animalID];$get[i]]

        $break
      ;i;true]
    ]
    $setUserVar[userWardrobe;$env[userWardrobe]]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[## Successfully equipped every animal with __$get[value]__!]
    ;$getGlobalVar[defaultColor]]
    $interactionUpdate
    ${wardrobeSnippets.stopTimeout()}
  `
}