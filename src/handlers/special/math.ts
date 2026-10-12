import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleMath",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    $checkProfile

    $let[e;$default[$option[expression];$message]]
    $let[a;$math[$get[e]]]
    $onlyIf[$get[a]!=;
      $let[prefix;$getPrefix]
      $newError[$tl[ui.errors.usage.$get[l];$get[prefix]math <$tl[ui.math.expression.$get[l]]>]]
    ]

    $addTextDisplay[## $get[e] = $get[a]]
  `
})
