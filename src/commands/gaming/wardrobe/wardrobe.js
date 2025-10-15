import wardrobeSnippets from '#snippets/wardrobeSnippets.js'
import universalSnippets from '#snippets/universalSnippets.js'

export default [{
  name: "wardrobe", 
  aliases: ["wr"], 
  type: "messageCreate", 
  code: `
    $reply
    ${universalSnippets.checkProfile({time: '10s'})}

    $let[arg;$replace[$toCamelCase[$message];-;]]

    $onlyIf[$get[arg]!=;
      $callFunction[embed;error]
      $description[## Usage: \`$getGuildVar[prefix]wardrobe {new|all|<tier>|<fullAnimalName>}\`]
    ]

    ${wardrobeSnippets.loadJSON()}

    $if[$get[arg]==new;
      $let[animalID;mouse]
      ${wardrobeSnippets.animalsEmbed('new')}
    ;
      $if[$get[arg]==all;
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addTextDisplay[# Equipping \`all\` animals, choose a skinpack]
          $addSeparator
          ${wardrobeSnippets.sninpacksMenu("all")}
        ;$getGlobalVar[defaultColor]]
      ;
        $if[$isNumber[$get[arg]];
          $addContainer[
            $callFunction[newAuthor]
            $addSeparator[Large]
            $addTextDisplay[# Equipping tier \`$get[arg]\` animals, choose a skinpack]
            $addSeparator
            ${wardrobeSnippets.sninpacksMenu("$get[arg]")}
          ;$getGlobalVar[defaultColor]]
        ;
          $onlyIf[$arrayIncludes[animalIDs;$get[arg]];
            $addContainer[
              $callFunction[newAuthor]
              $addSeparator[Large]
              $addTextDisplay[## Animal not found]
            ;$getGlobalVar[errorColor]]
          ]

          $let[animalID;$get[arg]]
          ${wardrobeSnippets.animalsEmbed('animal')}
        ]
      ]
    ]
    
    ${wardrobeSnippets.timeout()}
  `
}]