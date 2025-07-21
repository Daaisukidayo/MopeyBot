module.exports=({
  name: "dev",
  type: "messageCreate",
  code: `
    $reply
    $onlyForUsers[;$botOwnerID]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $let[msg;$toLowerCase[$message]]

    $onlyIf[$includes["$get[msg]";"on";"off";"semi"]]
    
    $if[$get[msg]==semi;
      $!jsonSet[userProfile;devMode;semi]
      $sendMessage[$channelID;## ✅ Successfully __enabled__ semi dev mode!]
    ;
      $if[$get[msg]==on;
        $!jsonSet[userProfile;devMode;true]
        $sendMessage[$channelID;## ✅ Successfully __enabled__ full dev mode!]
      ;
        $if[$get[msg]==off;
          $!jsonSet[userProfile;devMode;false]
          $sendMessage[$channelID;## ✅ Successfully __disabled__ dev mode!]
        ]
      ]
    ]
    $setUserVar[userProfile;$env[userProfile]]
  `
})