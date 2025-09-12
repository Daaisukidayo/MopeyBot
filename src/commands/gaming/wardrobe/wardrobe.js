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
        $callFunction[embed;default]
        $description[# Choose a skinpack]
        ${wardrobeSnippets.sninpacksMenu("all")}
      ;
        $if[$isNumber[$get[arg]];
          $callFunction[embed;default]
          $description[# Choose a skinpack]
          ${wardrobeSnippets.sninpacksMenu("$get[arg]")}
        ;
          $onlyIf[$arrayIncludes[animalIDs;$get[arg]];
            $callFunction[embed;error]
            $description[## Animal not found]
          ]

          $let[animalID;$get[arg]]
          ${wardrobeSnippets.animalsEmbed('animal')}
        ]
      ]
    ]
    
    ${wardrobeSnippets.timeout()}
  `
}]