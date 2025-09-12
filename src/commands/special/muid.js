import uniSnippets from "#snippets/universalSnippets.js";

export default {
  name: "muid",
  aliases: ["uid", "id"],
  type: "messageCreate",
  code: `
    $reply
    ${uniSnippets.checkProfile({time: '5s'})}

    $let[arg;$message[0]]

    $onlyIf[$or[$get[arg]!=;$isNumber[$get[arg]]];
      $callFunction[embed;error]
      $description[## No MUID were written or argument is not a number]
    ]

    $jsonLoad[allUserIDs;$getGlobalVar[allUserIDs]]

    $loop[$arrayLength[allUserIDs];
      $let[id;$arrayAt[allUserIDs;$math[$env[i] - 1]]]

      $jsonLoad[otherUserProfile;$getUserVar[userProfile;$get[id]]]
      $let[userMUID;$env[otherUserProfile;MUID]]

      $if[$get[userMUID]==$get[arg];;$continue]

      $let[userID;$get[id]]

      $break
    ;i;true]

    $onlyIf[$and[$get[arg]>0;$get[userMUID]!=;$get[userID]!=];
      $color[$getGlobalVar[errorColor]]
      $author[✖️ Invalid user!]
      $description[## User with «\`$get[arg]\`» MUID does not exist yet]
    ]

    $author[@$username[$get[userID]] • MUID: $get[userMUID]]
    $footer[Discord ID: $get[userID]]
    $thumbnail[$userAvatar[$get[userID]]]
    $description[# \`$separateNumber[$env[otherUserProfile;MC;];,]\`$getGlobalVar[emoji]]
    $color[$getGlobalVar[defaultColor]]
  `
}