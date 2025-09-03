// REQUIRES LOADED USER PROFILE
export default {
  name: "checking",
  code: `
    $if[$env[userProfile;devMode];;
      $onlyIf[$getGlobalVar[botEnabled]]
    ]
    $onlyIf[$env[userProfile;isBanned]!=true]
    $onlyIf[$env[userProfile;acceptedRules];$callFunction[rulesSchema]]
    $onlyIf[$env[userProfile;onSlowmode]!=true]
  `
}