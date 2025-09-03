// REQUIRES LOADED USER PROFILE
export default [{
  name: "sumMC",
  params: ["amount"],
  code: `
    $!jsonSet[userProfile;MC;$sum[$env[userProfile;MC];$env[amount]]]
  `
},{
  name: "subMC",
  params: ["amount"],
  code: `
    $!jsonSet[userProfile;MC;$sub[$env[userProfile;MC];$env[amount]]]
  `
}]