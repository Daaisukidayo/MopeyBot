module.exports = [{ 
  name: "randomrare", 
  aliases: ["rrare"], 
  type: "messageCreate", 
  code: `
    $reply
    $let[cdTime;5s]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]
    $jsonLoad[rares;${rares()}]

    Your random rare: $arrayRandomValue[rares]
  `
}]

function rares () {
  return `
    [
      "Black Lion",
      "Black Tiger",
      "White Dove",
      "Pinky",
      "Stinky",
      "Doe",
      "Marsh Deer",
      "Musk Deer",
      "Jackass",
      "Blue Macaw",
      "Spix's Macaw",
      "Momaffie",
      "Momaffie Family",
      "Girabie",
      "Jaguar",
      "Leopard",
      "Black Panther",
      "Keel-Billed Toucan",
      "Choco Toucan",
      "Fiery Toucan",
      "Lava Toucan",
      "Helmeted Hornbill Toucan",
      "Yellow Pufferfish",
      "Demonfish",
      "White Tiger",
      "Lioness",
      "White Lioness",
      "Black Lioness",
      "Lion Cub",
      "White Lion Cub",
      "Black Lion Cub",
      "Black-Maned Lion",
      "White Lion",
      "Black Lion",
      "Predator",
      "Shaheen",
      "Argentavis Vulture",
      "White Rhino",
      "Black Rhino",
      "Golden Eagle",
      "Harpy Eagle",
      "Greater-Spotted Eagle",
      "Markhor",
      "Big Goat",
      "Aqua Yeti",
      "Snowman",
      "Snowgirl",
      "Big Foot",
      "Snowgirl by luck",
      "Snowman by luck",
      "Big Foot by luck",
      "King Dragon by luck"
  \\]
  `
}