import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: "setmc",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    $onlyIf[$or[$isDev;$authorID==485453670729646090]]

    $onlyIf[$isNumber[$message[0]];
      $newError[$tl[ui.errors.invalidArguments.$get[l]]]
    ]

    $let[user;$if[$message[1]==;$authorID;$findUser[$message[1]]]]
    $onlyIf[$get[user]!=;
      $newError[$tl[ui.errors.userNotFound.$get[l]]]
    ]

    $jsonLoad[target;$getProfile[$get[user]]]
    $callMethod[target;setCoins;$message[0]]
    $callMethod[target;save]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[## _$if[$get[user]==$authorID;New balance;$username[$get[user]]'s new balance]: \`$separate[$jsonGet[target;mope_coins]]\`$getGlobalVar[mopecoin]_]
    ;$getGlobalVar[defaultColor]]
  `,
})
