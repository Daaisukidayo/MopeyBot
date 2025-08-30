export default { 
  name: "embed",
  params: ["colorType"],
  code: `
    $author[✖️ Error!]
    $if[$env[colorType]!=error;$getGlobalVar[author]]
    $color[$getGlobalVar[$env[colorType]Color]]
  `
}