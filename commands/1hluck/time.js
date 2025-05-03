module.exports = [{
name: "time",
type: "messageCreate",
code: `
$reply

$let[remaining;$math[3600 - $getUserVar[1htime]]]
$let[hour;$floor[$math[$get[remaining] / 3600]]]
$let[minute;$floor[$math[($get[remaining] % 3600) / 60]]]
$let[second;$floor[$math[$get[remaining] % 60]]]

# Time passed: \`$parseDigital[$getUserVar[1htime]000]\`
# Time left: \`$get[hour]:$get[minute]:$get[second]\`
`}]