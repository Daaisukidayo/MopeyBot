import listGenerator from './listGenerator.js'
export default function raresList(id = "$authorID") {
  return `
    $if[$env[challengeProgress]==;$jsonLoad[challengeProgress;$getUserVar[challengeProgress|$channelID;${id}]]]
    $jsonLoad[raresList;$env[challengeProgress;list]]
    ${listGenerator()}
  `
}