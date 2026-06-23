export default {
  name: 'handleMath',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    $checkProfile

    $let[e;$default[$option[expression];$message]]
    $let[a;$math[$get[e]]]
    $onlyIf[$get[a]!=;
      $newError[$tl[ui.errors.usage.$get[l];$if[$guildID==;$getGlobalVar[prefix];$getGuildVar[prefix]]math <$tl[ui.math.expression.$get[l]]>]]
    ]

    $addTextDisplay[## $get[e] = $get[a]]
  `
}