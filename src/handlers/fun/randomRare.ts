export default {
  name: 'handleRandomrare',
  code: `
    $reply
    $nomention
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $addTextDisplay[# $arrayRandomValue[$getCache[rares;raresContent]]]
  `
}