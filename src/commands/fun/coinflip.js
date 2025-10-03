import universalSnippets from "#snippets/universalSnippets.js"

export default {
  name: 'coinflip',
  aliases: ['cf'],
  type: 'messageCreate',
  code: `
    $reply
    ${universalSnippets.checkProfile({time: "10s"})}

    $let[maximum;$getGlobalVar[maxCoinflipBet]]
    $let[defaultAmount;5]
    $let[MC;$env[userProfile;MC]]

    $if[$get[MC]<$get[maximum];
      $let[maximum;$get[MC]]
    ]

    $let[amount;$default[$advancedReplace[$toLowercase[$message[0]];all;$get[maximum]];$get[defaultAmount]]]
    $let[side;$toLowercase[$message[1]]]
    $arrayLoad[sides; ;Tails Heads]


    $if[$includes['$get[side]';'';'h';'heads';'head'];
      $let[side;$arrayAt[sides;1]]
    ;
      $if[$includes['$get[side]';'tail','tails';'t'];
        $let[side;$arrayAt[sides;0]]
      ]
    ]


    $onlyif[$isNumber[$get[amount]];
      $callFunction[embed;error]
      $description[
        ## Only number or argument \`all\` is allowed!
        ### Usage: \`$getGuildVar[prefix]$commandName {<amount>|all} (h|t)\`
      ]
    ]
    $onlyif[$get[MC]>$get[defaultAmount];
      $callFunction[embed;error]
      $description[## You must have at least \`$get[defaultAmount]\`$getGlobalVar[emoji]! Your balance: \`$separateNumber[$get[MC];,]\`$getGlobalVar[emoji]]
    ]
    $onlyif[$get[amount]<=$get[MC];
      $callFunction[embed;error]
      $description[## You don't have that much $getGlobalVar[emoji]! Your balance: \`$separateNumber[$get[MC];,]\`$getGlobalVar[emoji]]
    ]
    $onlyif[$inRange[$get[amount];$get[defaultAmount];$get[maximum]];
      $callFunction[embed;error]
      $description[## You can bet only from \`$get[defaultAmount]\` to \`$separateNumber[$get[maximum];,]\`$getGlobalVar[emoji]!]
    ]
    $onlyif[$arrayIncludes[sides;$get[side]];
      $callFunction[embed;error]
      $description[## Invalid coin side chose!]
    ]

    $let[amount;$floor[$get[amount]]]
    $let[caughtSide;$arrayRandomValue[sides]]
    $let[msg;$sendMessage[$channelID;# The bet is set on __$get[side]__! Flipping a coin...;true]]
    $callFunction[subMC;$get[amount]]
    $setUserVar[userProfile;$env[userProfile]]

    $wait[3s]

    $if[$get[caughtSide]==$get[side];
      $let[winAmount;$math[$get[amount] * 2]]
      $!editMessage[$channelID;$get[msg];# You got __$get[side]__ and won $inlineCode[$separateNumber[$get[winAmount];,]]$getGlobalVar[emoji]!]
      ${universalSnippets.loadProfile()}
      $callFunction[sumMC;$get[winAmount]]
      $setUserVar[userProfile;$env[userProfile]]
    ;
      $!editMessage[$channelID;$get[msg];# You got __$get[caughtSide]__ and lost $inlineCode[$separateNumber[$get[amount];,]]$getGlobalVar[emoji]]
    ]
  `
}