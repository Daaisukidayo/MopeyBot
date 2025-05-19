module.exports = {
  name: "update",
  type: "messageCreate",
  code: `
    $onlyIf[$authorID==$botOwnerID]
    $updateCommands
    $sendMessage[$channelID;Commands updated successfully in \`$floor[$executionTime]\`ms!]
  `
};