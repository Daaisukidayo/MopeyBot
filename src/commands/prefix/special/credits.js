export default { 
  name: "credits", 
  aliases: ["owners", "devteam"], 
  type: "messageCreate", 
  code: `
    $handleCredits
  `
}