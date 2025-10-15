import wardrobeSnippets from '#snippets/wardrobeSnippets.js'

export default {
  type: "interactionCreate", 
  allowedInteractionTypes: ["selectMenu"],
  description: "if user's argument is new",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[values;-;$selectMenuValues]
    $arrayLoad[passKeys;,;new,wardrobe]
    $let[animalID;$env[values;0]]
    $let[variant;$env[values;1]]
    
    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getUserVar[userProfile]]
    ${wardrobeSnippets.loadJSON()}
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]
    $onlyIf[$env[animalsIndexes;$get[animalID]]!=]

    $let[msg;$messageID]

    $!jsonSet[userWardrobe;$get[animalID];$get[variant]]
    $setUserVar[userWardrobe;$env[userWardrobe]]        

    $let[i;$arrayIndexOf[animalIDs;$get[animalID]]]

    $loop[-1;
      $letSum[i;1]
      $let[animalID;$arrayAt[animalIDs;$get[i]]]
      $if[$env[animals;$env[animalsIndexes;$get[animalID]];variants;1]==;;$break]
    ]

    $onlyIf[$get[animalID]!=;
      $addContainer[
        $callFunction[newAuthor]
        $addSeparator[Large]
        $addTextDisplay[# You equipped all animals!]
      ;$getGlobalVar[defaultColor]]
      $interactionUpdate
      ${wardrobeSnippets.stopTimeout()}
    ]

    ${wardrobeSnippets.animalsEmbed('new')}
    $interactionUpdate
    ${wardrobeSnippets.timeout()}
  `
}