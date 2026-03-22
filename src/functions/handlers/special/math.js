export default {
  name: 'handleMath',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile

    $let[e;$default[$option[expression];$message]]
    $let[a;$default[$math[$get[e]];ERR]]

    $addTextDisplay[## $get[e] = $get[a]]
    $send
  `
}