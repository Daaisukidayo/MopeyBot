export default {
  pointsOption() {
    return `
      $onlyIf[$and[$isNumber[$get[input]];$get[input]>0];
        $callFunction[newError;Invalid number!]
        $ephemeral
        $interactionFollowUp
      ]
    `
  },

  raresOption() {
    return this.pointsOption()
  },

  endedAtOption() {
    return `
      $onlyIf[$and[$get[date]>0;$get[date]<$getTimestamp];
        $callFunction[newError;Invalid date!]
        $ephemeral
        $interactionFollowUp
      ]
    `
  },

  tagsOption() {
    return `
      $if[$arrayIncludes[tags;$get[value]];
        $!arraySplice[tags;$arrayIndexOf[tags;$get[value]];1]
      ;
        $arrayPush[tags;$get[value]]
      ]
    `
  },

  listOption() {
    return `
      $arrayLoad[keyValue;=;$env[elem]]
      $let[animalID;$callFunction[findingAnimalID;$env[keyValue;0]]]
      $let[value;$env[keyValue;1]]

      $onlyIf[$get[animalID]!=undefined;
        $callFunction[newError;Unknown animal \`$env[keyValue;0]\` in \`$env[elem]\`!]
        $ephemeral
        $interactionFollowUp
      ]

      $onlyIf[$isNumber[$get[value]];
        $callFunction[newError;Invalid value \`$get[value]\` in \`$env[elem]\`]
        $ephemeral
        $interactionFollowUp
      ]

      $!jsonSet[raresList;$get[animalID];$get[value]]

      $if[$get[value]<=0;
        $!jsonDelete[raresList;$get[animalID]]
      ]
    `
  }
}
