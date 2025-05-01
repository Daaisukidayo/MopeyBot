module.exports = [{
name: "t", 
type: "messageCreate", 
code: `
$reply
$onlyIf[$getUserVar[dev]]
$jsonLoad[animals;$readFile[json/animals.json]]
$arrayLoad[animalsNames;, ;$advancedReplace[$trimLines[$jsonKeys[animals]];\\[\n;;\n\\];;\n; ;";]]
`}]