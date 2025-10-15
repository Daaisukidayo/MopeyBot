import playSnippets from "#snippets/playSnippets.js";

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  description: 'show apex message',
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;showApex,play]

    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    ${playSnippets.loadJSON()}
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    ${playSnippets.hasStarted()}
    ${playSnippets.hasAllApex()}
    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[$get[currentApexes]]
    ;$env[playData;color]]
    $ephemeral
    $interactionReply
  `
}