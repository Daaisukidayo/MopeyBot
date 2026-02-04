export default {
  type: 'userUpdate',
  code: `
    $let[id;$newUser[id]]
    $jsonLoad[userProfile;$getProfile[$get[id]]]
    $onlyIf[$env[userProfile;acceptedRules]]
    
    $let[username;$newUser[username]]
    
    $jsonLoad[usernames;$getGlobalVar[usernames]]
    $!jsonSet[usernames;$get[id];$get[username]]
    $setGlobalVar[usernames;$env[usernames]]
  `
}