module.exports = [{
name: "time",
type: "messageCreate",
code: `
$reply
$textSplit[$parseDigital[$getChannelVar[1htime]000];:]

$let[remaining;$math[3600 - $getChannelVar[1htime]]]

# Time passed: \`$parseDigital[$getChannelVar[1htime]000]\`
# Time left: \`$floor[$math[$get[remaining] / 3600]]:$floor[$math[($get[remaining] % 3600) / 60]]:$floor[$math[$get[remaining] % 60]]\`
`}]