module.exports = [{ 
  name: "dbstat", 
  type: "messageCreate", 
  code: `
    $reply
    **Ping: \`$dbPing\`ms**
  `
}]