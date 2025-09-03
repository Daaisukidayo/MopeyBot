export default function JSON() {
  return `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $jsonLoad[userSettings;$env[userProfile;1hl;settings]]
    $jsonLoad[challengeData;$getGlobalVar[challengeData]]
    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[animalsIndexes;$getGlobalVar[animalsIndexes]]
    $jsonLoad[allRaresData;$getGlobalVar[allRaresData]]
    $jsonLoad[allRaresData;$jsonEntries[allRaresData]]
    $jsonLoad[allRares;$getGlobalVar[allRares]]
  `
}