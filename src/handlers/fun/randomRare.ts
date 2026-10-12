import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleRandomrare",
  code: `
    $reply
    $nomention
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $addTextDisplay[# $arraySample[$getCache[rares;raresContent]]]
  `
})
