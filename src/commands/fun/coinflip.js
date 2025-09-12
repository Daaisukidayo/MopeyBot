import universalSnippets from "#snippets/universalSnippets.js"

export default {
  name: 'coinflip',
  aliases: ['cf'],
  type: 'messageCreate',
  code: `
    $reply
    ${universalSnippets.checkProfile({time: "10s"})}

    $let[maximum;200000]
    $let[MC;$env[userProfile;MC]]

    $if[$get[MC]<$get[maximum];
      $let[maximum;$env[userProfile;MC]]
    ]

    $let[amount;$advancedReplace[$toLowercase[$message[0]];all;$get[maximum]]]
    $let[side;$toLowercase[$message[1]]]
    $arrayLoad[sides; ;Tails Heads]


    $if[$includes['$get[side]';'';'h';'heads';'head'];
      $let[side;$arrayAt[sides;1]]
    ;
      $if[$includes['$get[side]';'tail','tails';'t'];
        $let[side;$arrayAt[sides;0]]
      ]
    ]


    $onlyIf[$argCount[$message]>=1;
      $callFunction[embed;error]
      $description[## Usage: \`$getGuildVar[prefix]coinflip {<amount>|all} (h|t)\`]
    ] 
    $onlyif[$isNumber[$get[amount]];
      $callFunction[embed;error]
      $description[## Only number or arguments \`all\` is allowed!]
    ]
    $onlyif[$get[MC]>0;
      $callFunction[embed;error]
      $description[## You don't have any $getGlobalVar[emoji]!]
    ]
    $onlyif[$get[amount]<=$get[MC];
      $callFunction[embed;error]
      $description[## You don't have that much $getGlobalVar[emoji]!]
    ]
    $onlyif[$get[amount]>0;
      $callFunction[embed;error]
      $description[## You can't bet 0 or lower $getGlobalVar[emoji]!]
    ]
    $onlyif[$get[amount]<=$get[maximum];
      $callFunction[embed;error]
      $description[## You can't bet more than $separateNumber[$get[maximum];,]$getGlobalVar[emoji]!]
    ]
    $onlyif[$arrayIncludes[sides;$get[side]];
      $callFunction[embed;error]
      $description[## Invalid coin side chose!]
    ]

    $let[caughtSide;$arrayRandomValue[sides]]
    $let[msg;$sendMessage[$channelID;# The bet is set on __$get[side]__! Flipping a coin...;true]]
    $callFunction[subMC;$get[amount]]

    $wait[3s]

    $if[$get[caughtSide]==$get[side];
      $!editMessage[$channelID;$get[msg];# You got __$get[side]__ and won $inlineCode[$separateNumber[$math[$get[amount] * 2];,]]$getGlobalVar[emoji]!]
      $callFunction[sumMC;$math[$get[amount] * 2]]
    ;
      $!editMessage[$channelID;$get[msg];# You got __$get[caughtSide]__ and lost $inlineCode[$separateNumber[$get[amount];,]]$getGlobalVar[emoji]]
    ]
    $setUserVar[userProfile;$env[userProfile]]
  `
}