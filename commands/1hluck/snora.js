module.exports = [{ 
name: "snora", 
type: "messageCreate", 
code: `
$reply

$let[cdTime;10s]
$callFunction[checking;]
$callFunction[cooldown;$get[cdTime]]

$arrayLoad[allRares]
$jsonLoad[raresMap;$getGlobalVar[raresMap]]
$jsonLoad[SNORA;$getGlobalVar[SNORA]]

$jsonLoad[allRares;$jsonKeys[SNORA]]
$arrayLoad[allRaresNames;, ;$jsonValues[SNORA;, ]]

$footer["||" is "or". It means you need to write for example "cht" or "chocotoucan"]
$description[
**===================Tier 2=====================
${allRareNames("White Dove")}
===================Tier 4=====================
${allRareNames("Pinky Pig")}
${allRareNames("Stinky Pig")}
===================Tier 5=====================
${allRareNames("Doe")}
${allRareNames("Marsh Deer")}
${allRareNames("Musk Deer")}
${allRareNames("Golden Pheasant")}
===================Tier 7=====================
${allRareNames("Jackass")}
${allRareNames("Blue Macaw")}
${allRareNames("Spix Macaw")}
===================Tier 8=====================
${allRareNames("Momaffie")}
${allRareNames("Momaffie Family")}
${allRareNames("Girabie")}
===================Tier 9=====================
${allRareNames("Jaguar")}
${allRareNames("Leopard")}
${allRareNames("Black Panther")}
${allRareNames("Choco Toucan")}
${allRareNames("Keel-Billed Toucan")}
${allRareNames("Fiery Toucan")}
${allRareNames("Lava Toucan")}
${allRareNames("Helmeted Hornbill Toucan")}
${allRareNames("Yellow Pufferfish")}
${allRareNames("Demon Pufferfish")}
===================Tier 10====================
${allRareNames("White Tiger")}
===================Tier 11====================
${allRareNames("Lion Cub")}
${allRareNames("White Lion Cub")}
${allRareNames("Black Lion Cub")}
${allRareNames("Lioness")}
${allRareNames("White Lioness")}
${allRareNames("Black Lioness")}
${allRareNames("Black-Maned Lion")}
${allRareNames("White Lion")}
${allRareNames("Black Lion")}
${allRareNames("Predator Falcon")}
${allRareNames("Shaheen Falcon")}
${allRareNames("Argentavis")}
===================Tier 12====================
${allRareNames("White Rhino")}
${allRareNames("Black Rhino")}
${allRareNames("Golden Eagle")}
${allRareNames("Harpy Eagle")}
${allRareNames("Greater-Spotted Eagle")}
${allRareNames("Markhor")}
${allRareNames("Big Goat")}
===================Tier 13====================
${allRareNames("White Giraffe")}
${allRareNames("Giraffe Family")}
===================Tier 15====================
${allRareNames("Aqua Yeti")}
${allRareNames("Shop Snowman")}
${allRareNames("Luck Snowman")}
${allRareNames("Shop Snowgirl")}
${allRareNames("Luck Snowgirl")}
${allRareNames("Shop BigFoot")}
${allRareNames("Luck BigFoot")}
===================Tier 17====================
${allRareNames("King Dragon")}**]
$color[$getGlobalVar[luckyColor]]`
}]

function allRareNames(rare) {
    return `### $trimSpace[$arrayAt[allRares;$arrayIndexOf[allRaresNames;${rare}]]] || $trimSpace[$arrayAt[allRares;$arrayLastIndexOf[allRaresNames;${rare}]]] ➡️ $trimSpace[$arrayAt[allRaresNames;$arrayIndexOf[allRaresNames;${rare}]]]`
}