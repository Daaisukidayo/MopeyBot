export default function setChallengeVars(id = '$authorID', teamID = -1) {
  return `
    $jsonLoad[challengeProgress;{
      "started": true,
      "paused": false,
      "points": "0",
      "rares": "0",
      "userID": "${id}",
      "teamID": "${teamID}",
      "list": {}
    }]
    $setUserVar[1htime|$channelID;0;${id}]
    $setUserVar[challengeProgress|$channelID;$env[challengeProgress];${id}]
  `
}
