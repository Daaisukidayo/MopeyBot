export default { 
  name: 'findingAnimalID',
  params: ["alias"],
  code: `
    $jsonLoad[allRaresData;$getGlobalVar[allRaresData]]
    $jsonLoad[allRaresData;$jsonEntries[allRaresData]]
    $loop[$arrayLength[allRaresData];
      $let[i;$math[$env[i] - 1]]
      $jsonLoad[arrAliases;$env[allRaresData;$get[i];1]]
      $if[$arrayIncludes[arrAliases;$env[alias]];;$continue]
      $let[animalID;$env[allRaresData;$get[i];0]]
      $break
    ;i;true]
    $return[$default[$get[animalID];undefined]]
  `
}