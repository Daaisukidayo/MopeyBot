module.exports=({
  name: "dev",
  type: "messageCreate",
  code: `
    $reply
    $onlyForUsers[;$botOwnerID]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $let[msg;$toLowerCase[$message]]

    $onlyIf[$includes["$get[msg]";"on";"off"]]
    
    $switch[$get[msg];
      $case[on;
        $!jsonSet[userProfile;devMode;true]
        $let[state;Enabled]
      ]

      $case[off;
        $!jsonSet[userProfile;devMode;false]
        $let[state;Disabled]
      ]
    ]

    $callFunction[embed;default]
    $description[## ✅ Successfully __$get[state]__ developer mode!]    
    $setUserVar[userProfile;$env[userProfile]]
  `
})