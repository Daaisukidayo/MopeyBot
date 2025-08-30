export default { 
  name: "newError",
  params: ["description"],
  code: `
    $addContainer[
      $addTextDisplay[**✖️ Error**]
      $addSeparator
      $addTextDisplay[## $env[description]]
    ;$getGlobalVar[errorColor]]
  `
}