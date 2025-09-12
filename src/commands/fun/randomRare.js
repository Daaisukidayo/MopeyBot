import universalSnippets from "#snippets/universalSnippets.js";

export default { 
  name: "randomrare", 
  aliases: ["rrare"], 
  type: "messageCreate", 
  code: `
    $reply
    $nomention
    ${universalSnippets.checkProfile({time: '5s'})}
    $jsonLoad[animals;$readFile[src/json/animals.json]]

    $arrayMap[animals;animal;
      $if[$env[animal;isRare];
        $return[$env[animal;variants;0;name] $env[animal;variants;0;emoji]]
      ]
    ;rares]

    $sendMessage[$channelID;# $arrayRandomValue[rares]]
  `
}