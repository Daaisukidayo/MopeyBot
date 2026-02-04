export default { 
  name: "getRareAnimalID",
  description: "Returns the animal ID of a rare based on one of its aliases (snora).",
  params: [
    {
      name: "alias",
      description: "Alias (snora) of the rare animal.",
      required: true,
    }
  ],
  code: `
    $jsonLoad[allRaresData;$advJsonEntries[$getGlobalVar[allRaresData]]]
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