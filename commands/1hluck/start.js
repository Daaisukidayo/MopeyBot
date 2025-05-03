module.exports = [{
name: "start",
type: "messageCreate",
code: `
$reply
# Started at: \`$hour:$minute:$second\`!
$setChannelVar[1htime;0]
$setInterval[
    $setChannelVar[1htime;$sum[$getChannelVar[1htime];1]] 
    $if[$getChannelVar[1htime]==300;
        $sendMessage[$channelID;# <@$authorID> 1 Hour Luck Ended!] 
        $deleteChannelVar[1htime]
        $stopInterval[1HLUCK]
    ] 
;1s;1HLUCK]`}]