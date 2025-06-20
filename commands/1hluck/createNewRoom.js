module.exports = [{
  name: "createnewroom",
  aliases: ["cnr"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $onlyIf[$getChannelVar[participants]==;
      $author[✖️ Error]
      $description[## Room already exist! Use another channel]
      $color[$getGlobalVar[errorColor]]
    ]

    $onlyIf[$getUserVar[participating;$authorID;false]==false;
      $author[✖️ Failed to create room]
      $description[## You're already participanting somewhere else]
      $color[$getGlobalVar[errorColor]]
    ]
    
    $arrayLoad[participants; ;$authorID]
    
    ${particEmbed()}
    $setUserVar[participating;true]
    $let[msgid;$sendMessage[$channelID;;true]]

    ${timeout()}
  `
},{
  type: "interactionCreate",
  description: "When pressing Participate",
  allowedInteractionTypes: ["button"],
  code: `
    $onlyIf[$includes[$customID;join1hl]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]

    $jsonLoad[participants;$getChannelVar[participants]]

    ${roomExist()}

    $onlyIf[$arrayIncludes[participants;$authorID]==false;
      $interactionReply[
        $ephemeral
        $author[✖️ Error]
        $description[## You're already participating]
        $color[$getGlobalVar[errorColor]]
      ]
    ]
    $onlyIf[$getUserVar[participanting;$authorID;false]==false;
      $interactionReply[
        $ephemeral
        $author[✖️ Error]
        $description[## You're already participanting somewhere else]
        $color[$getGlobalVar[errorColor]]
      ]
    ]
    $!stopTimeout[MULTI1HL-$channelID]
    $let[msgid;$messageID]
    $setUserVar[participating;true]
    $arrayPush[participants;$authorID]
    ${particEmbed()}
    $!editMessage[$channelID;$get[msgid]]
    ${timeout()}
    $deferUpdate
  `
},{
  type: "interactionCreate",
  description: "When pressing Quit",
  allowedInteractionTypes: ["button"],
  code: `
    $onlyIf[$includes[$customID;quit1hl]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]

    $jsonLoad[participants;$getChannelVar[participants]]

    ${roomExist()}

    $onlyIf[$and[$arrayIncludes[participants;$authorID];$getUserVar[participating;$authorID;false]];
      $interactionReply[
        $ephemeral
        $author[✖️ Error]
        $description[## You're not a participant]
        $color[$getGlobalVar[errorColor]]
      ]
    ]

    $onlyIf[$authorID!=$env[participants;0];
      $interactionReply[
        $ephemeral
        $author[✖️ Error]
        $description[## Host can't quit room]
        $color[$getGlobalVar[errorColor]]
      ]
    ]

    $!stopTimeout[MULTI1HL-$channelID]
    $let[msgid;$messageID]

    $!arraySplice[participants;$arrayIndexOf[participants;$authorID];1]
    $deleteUserVar[participating]
    
    ${particEmbed()}
    $!editMessage[$channelid;$get[msgid]]
    ${timeout()}
    $deferUpdate
  `
},{
  type: "interactionCreate",
  description: "When pressing End",
  allowedInteractionTypes: ["button"],
  code: `
    $onlyIf[$includes[$customID;end1hl]]
    $onlyIf[$includes[$customID;$authorID];
      $interactionReply[
        $ephemeral
        $author[✖️ Error]
        $description[## Only host can end this room]
        $color[$getGlobalVar[errorColor]]
      ]
    ]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]

    $jsonLoad[participants;$getChannelVar[participants]]

    ${roomExist()}

    $onlyIf[$and[$arrayIncludes[participants;$authorID];$getUserVar[participating;$authorID;false]];
      $interactionReply[
        $ephemeral
        $author[✖️ Error]
        $description[## You're not a participant]
        $color[$getGlobalVar[errorColor]]
      ]
    ]

    $arrayForEach[participants;user;
      $deleteUserVar[participating;$env[user]]
    ]
    $deleteChannelVar[participants]

    $!stopTimeout[MULTI1HL-$channelID]
    $let[msgid;$messageID]

    $description[# ✅ Successfully closed the room!]
    $color[$getGlobalVar[luckyColor]]
    $!editMessage[$channelid;$get[msgid]]
    $deferUpdate
  `
},{
    type: "interactionCreate",
  description: "When pressing Start",
  allowedInteractionTypes: ["button"],
  code: ``
}]

function roomExist() {
  return `
    $onlyIf[$getChannelVar[participants]!=;
      $author[✖️ Error]
      $description[## Room does not exist anymore]
      $color[$getGlobalVar[errorColor]]
    ]
  `
}

function timeout () {
  return `
    $setTimeout[
      $!disableButtonsOf[$channelID;$get[msgid]]
      $sendMessage[$channelID;
        $description[## Room created by <@$env[participants;0]> was closed due to inactivity]
        $color[Orange]
      ]
      $arrayForEach[participants;user;
        $deleteUserVar[participating;$env[user]]
      ]
      $deleteChannelVar[participants]
    ;10m;MULTI1HL-$channelID]
  `
}


function particEmbed () {
  return `
    $setChannelVar[participants;$env[participants]]

    $arrayForEach[participants;participant;
      $let[parts;$get[parts]$userDisplayName[$env[participant]]\n]
    ]
    
    $author[✅ Successfully created new room!]
    $description[# Host: $userDisplayName[$env[participants;0]]]
    $addField[Participants:;$codeBlock[$get[parts]]]
    $color[$getGlobalVar[luckyColor]]
    $footer[Room will be closed automatically in 10m due to inactivity]
    $addActionRow
    $addButton[join1hl;Participate;Success]
    $addButton[quit1hl;Quit;Danger]
    $addActionRow
    $addButton[start1hl-$env[participants;0];Start;Success]
    $addButton[end1hl-$env[participants;0];End;Danger]
  `
}