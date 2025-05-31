module.exports = {
  name: "test",
  type: "messageCreate",
  code: `
$onlyIf[$authorID==$botOwnerID]

$let[arg;sum]
$eval[$$get[arg][1\\;3\\]]
`}