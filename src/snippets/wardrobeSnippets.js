export default {
  animalsMenu(id) {
    return `
      $addActionRow
      $addStringSelectMenu[${id}-wardrobe-$authorID;Choose a skin:]
      $let[AI;$env[animalsIndexes;$get[animalID]]]

      $loop[25;
        $let[i;$math[$env[i] - 1]] 
        $if[$env[animals;$get[AI];variants;$get[i]]!=;;$break]
        $let[animalVarCode;$env[animals;$get[AI];variants;$get[i];vCode]]

        $arrayForEach[userSPs;key;
          $if[$get[animalVarCode]==$env[key];
            $let[animalName;$env[animals;$get[AI];variants;$get[i];name]]
            $let[animalDesc;$env[animals;$get[AI];variants;$get[i];description]]
            $let[animalEmoji;$env[animals;$get[AI];variants;$get[i];emoji]]
            
            $addOption[$get[animalName];$get[animalDesc];$get[animalID]-$get[i];$get[animalEmoji]]
          ]
        ]
      ;i;true]
    `;
  },

  animalsEmbed(id) {
    return `
      $let[currentAnimalVariant;$env[userWardrobe;$get[animalID]]]
      $let[currentAnimalEmoji;$env[animals;$env[animalsIndexes;$get[animalID]];variants;$get[currentAnimalVariant];emoji]]
      $let[fullName;$env[animals;$env[animalsIndexes;$get[animalID]];fullName]]

      $addContainer[
        $callFunction[newAuthor]
        $addSeparator
        $addTextDisplay[## All available skins for \`$get[fullName]\`:]
        ${this.animalsMenu(id)}
        $addSeparator
        $addTextDisplay[## Equipped skin:\n# $get[currentAnimalEmoji]]
      ;$getGlobalVar[defaultColor]]
    `;
  },

  loadJSON() {
    return `
      $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
      $jsonLoad[animals;$readFile[src/json/animals.json]]
      $arrayMap[animals;animal;$return[$env[animal;ID]];animalIDs]
      $jsonLoad[animalsIndexes;$getGlobalVar[animalsIndexes]]
      $jsonLoad[shopItems;$getGlobalVar[shopItems]]
      $jsonLoad[userSPs;$env[userProfile;userPacks]]
      $arrayPush[userSPs;s1;s2]
      $arrayLoad[content]
    `;
  },

  sninpacksMenu(id = "$get[arg]") {
    return `
      $addActionRow
      $addStringSelectMenu[${id}-wardrobe-$authorID;Choose a skinpack:]

      $addOption[Season 1;;Season 1]
      $addOption[Season 2;;Season 2]
      $addOption[Winter Version;;Winter Version]

      $if[$arrayAt[userSPs;0]!=;
        $arrayForEach[userSPs;key;
          $loop[$arrayLength[shopItems];
            $let[i;$math[$env[i] - 1]]

            $let[code;$env[shopItems;$get[i];code]]
            $if[$get[code]==$env[key];;$continue]
            
            $let[name;$env[shopItems;$get[i];name]]
            $addOption[$get[name];;$get[name]]

            $break
          ;i;true]
        ]
      ]
    `;
  },

  timeoutName() {
    return `WARDROBE-$authorID`;
  },
  stopTimeout() {
    return `$!stopTimeout[${this.timeoutName()}]`;
  },

  timeout() {
    return `
      ${this.stopTimeout()}
      $setTimeout[
        $!deleteMessage[$channelID;$default[$get[msg];$messageID]]
      ;1m;${this.timeoutName()}]
    `;
  },
};
