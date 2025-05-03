module.exports = [{
name: "start",
type: "messageCreate",
code: `
$reply
# Started at: \`$hour:$minute:$second\`!
$setUserVar[1htime;0]
$setInterval[
    $setUserVar[1htime;$sum[$getUserVar[1htime];1]] 
    $if[$getUserVar[1htime]==300;
        $sendMessage[$UserID;# <@$authorID> 1 Hour Luck Ended!] 
        $deleteUserVar[1htime]
        $stopInterval[1HLUCK]
    ] 
;1s;1HLUCK]`}]