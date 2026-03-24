export default {
  name: 'handleRandomrare',
  code: `
    $reply
    $nomention
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown

    $jsonLoad[raresContent;$getGlobalVar[raresContent]]

    $addTextDisplay[# $arrayRandomValue[raresContent]]
    $send
  `
}