export default {
  name: 'resetVars',
  params: [{ "name": "id", "required": false }],
  code: `
    $let[id;$default[$env[id];$authorID]]
    $!stopInterval[1HLUCK-$get[id]|$channelID]
    $deleteUserVar[challengeProgress|$channelID;$get[id]]
    $deleteUserVar[1htime|$channelID;$get[id]]
  `
}