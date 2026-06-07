export default {
  name: 'handleRandomrare',
  code: `
    $reply
    $nomention
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $getCache[raresContent;raresContent]

    $addTextDisplay[# $arrayRandomValue[raresContent]]
  `
}