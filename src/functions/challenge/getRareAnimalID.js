export default { 
  name: "getRareAnimalID",
  description: "Returns the rare animal's ID based on one of its abbreviations from the snora command.",
  params: [
    {
      name: "alias",
      description: "Abbreviation of the rare animal.",
      required: true,
    }
  ],
  code: `
    $jsonLoad[allRaresData;$advJsonEntries[$getGlobalVar[allRaresData]]]
    $loop[$arrayLength[allRaresData];
      $let[i;$math[$env[i] - 1]]
      $jsonLoad[arrAliases;$env[allRaresData;$get[i];1]]
      $if[$arrayIncludes[arrAliases;$env[alias]];;$continue]
      $let[getRareAnimalID_animalID;$env[allRaresData;$get[i];0]]
      $break
    ;i;true]

    $return[$default[$get[getRareAnimalID_animalID];undefined]]
  `
}