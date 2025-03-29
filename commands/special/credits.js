module.exports = [{ name: "credits", aliases: ["owners"], type: "messageCreate", code: `
$reply

$let[cdTime;5s]
$callFunction[checking;]
$callFunction[cooldown;$get[cdTime]]


$title[__Credits__]
$description[**Bot creator & developer: $username[485453670729646090]
Profile pic by: $username[588624194032500747]
Artists: $username[502840819380912139], $username[254354531951837186]**]
$color[ffd700]
$footer[Made with love 💖]

`}]