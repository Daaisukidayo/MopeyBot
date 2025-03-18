module.exports = [{
  name: "raretrymode",
  aliases: ["rtm", "rtmode"],
  type: "messageCreate",
  code: `
    
    $author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]
    $description[# Choose your raretry mode:]
    $color[228b22]

    $addActionRow
    $addButton[inferno-$authorID;Inferno;$if[$getUserVar[rtMode]==inferno;secondary\;\;true;success]]
    $addButton[default-$authorID;Default;$if[$getUserVar[rtMode]==default;secondary\;\;true;success]]
    $addButton[medium-$authorID;Medium;$if[$getUserVar[rtMode]==medium;secondary\;\;true;success]]

    $addActionRow
    $addButton[hard-$authorID;Hard;$if[$getUserVar[rtMode]==hard;secondary\;\;true;success]]
    $addButton[insane-$authorID;Insane;$if[$getUserVar[rtMode]==insane;secondary\;\;true;success]]
    $addButton[impossible-$authorID;Impossible;$if[$getUserVar[rtMode]==impossible;secondary\;\;true;success]]
`
},{
  type: "interactionCreate",
  allowedInteractionTypes: [ "button" ],
  code: `
    $textSplit[$customID;-]
    $onlyIf[$splitText[1]==$authorID]
    $onlyIf[$or[$splitText[0]==inferno;$splitText[0]==default;$splitText[0]==medium;$splitText[0]==hard;$splitText[0]==insane;$splitText[0]==impossible]]

    $log[$splitText[0]]

    $deferUpdate`
}]