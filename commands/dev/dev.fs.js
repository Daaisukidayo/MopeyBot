module.exports=({
  name: "dev",
  type: "messageCreate",
  code: `
    $reply
    $onlyIf[$authorID==$botOwnerID]
    $let[msg;$toLowerCase[$message]]
    
    $if[$get[msg]==semi;
      $setUserVar[dev;semi]
      $sendMessage[$channelID;## ✅ Successfully __enabled__ semi dev mode!]
    ]

    $if[$get[msg]==on;
      $setUserVar[dev;true]
      $sendMessage[$channelID;## ✅ Successfully __enabled__ full dev mode!]
    ] 

    $if[$get[msg]==off;
      $setUserVar[dev;false]
      $sendMessage[$channelID;## ✅ Successfully __disabled__ dev mode!]
    ]
  `
})