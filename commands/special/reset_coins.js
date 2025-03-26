module.exports = [{ name: "reset-coins", aliases: ["rc", "rmc", "reset-my-coins"], type: "messageCreate", code: `

$reply
$onlyIf[$getUserVar[MC]>0;You don't have any $getGlobalVar[emoji] to delete!]

Are you sure you want to delete all your \`$separateNumber[$getUserVar[MC];,]\`$getGlobalVar[emoji]? 

$addActionRow
$addButton[confirm_deleting_coins-$authorID;Confirm;Success]
$addButton[decline_deleting_coins-$authorID;Decline;Danger]

`},

{ type: "interactionCreate", allowedInteractionTypes: [ "button" ], code:`
$textSplit[$customID;-]
$onlyIf[$splitText[1]==$authorID;  $ephemeral $interactionReply[This button is not for you!]  ]
$onlyIf[$or[$splitText[0]==confirm_deleting_coins;$splitText[0]==decline_deleting_coins]]


$if[$splitText[0]==confirm_deleting_coins;
    $!editMessage[$channelID;$messageID;Deleted all your \`$separateNumber[$getUserVar[MC];,]\`$getGlobalVar[emoji]!]
    $deleteUserVar[MC;$authorID]
;
    $!editMessage[$channelID;$messageID;Deletion canceled!]
]

`}]