"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'participantReady',
    type: 'interactionCreate',
    code: `
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkLobby
    
    $jsonLoad[lobby;$getChannelVar[lobby]]
    $jsonLoad[ready;$env[lobby;ready]]
    $jsonLoad[teams;$env[lobby;teams]]
    $jsonLoad[allPlayers;$env[lobby;allPlayers]]

    $onlyIf[$messageID==$env[lobby;messageID];$!deleteMessage[$channelID;$messageID]]

    $onlyIf[$arrayIncludes[allPlayers;$authorID];
      $newError[$tl[$get[l];ui;lobby.notParticipant]]
    ]

    $if[$arrayIncludes[ready;$authorID];
      $!arraySplice[ready;$arrayIndexOf[ready;$authorID];1]
    ;
      $arrayPush[ready;$authorID]
    ]
    $!jsonSet[lobby;ready;$env[ready]]
    $setChannelVar[lobby;$env[lobby]]
    
    $lobbyEmbed
    $let[msgid;$messageID]
    $interactionUpdate
    $newLobbyTimeout
  `
};
//# sourceMappingURL=ready.js.map