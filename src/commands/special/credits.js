import uniSnippets from "#snippets/universalSnippets.js";

export default { 
  name: "credits", 
  aliases: ["owners"], 
  type: "messageCreate", 
  code: `
    $reply
    ${uniSnippets.checkProfile({time: '10s'})}

    $jsonLoad[l10n;$readFile[json/localizations.json]]
    $let[l10n;$env[userProfile;language]]

    $let[title;$default[$env[l10n;credits;0;$get[l10n]];???]]
    $let[creator;$default[$env[l10n;credits;1;$get[l10n]];???]]
    $let[developers;$default[$env[l10n;credits;5;$get[l10n]];???]]
    $let[profilePic;$default[$env[l10n;credits;2;$get[l10n]];???]]
    $let[artists;$default[$env[l10n;credits;3;$get[l10n]];???]]
    $let[footer;$default[$env[l10n;credits;4;$get[l10n]];???]]

    $addContainer[
      $addTextDisplay[# __$get[title]__]
      $addSeparator[Large]
      $addTextDisplay[# $get[creator]]
      $addTextDisplay[$codeBlock[$username[485453670729646090]]]
      $addSeparator
      $addTextDisplay[# $get[developers]]
      $addTextDisplay[$codeBlock[$username[485453670729646090]]]
      $addSeparator
      $addTextDisplay[# $get[profilePic]]
      $addTextDisplay[$codeBlock[$username[588624194032500747]]]
      $addSeparator
      $addTextDisplay[# $get[artists]]
      $addTextDisplay[$codeBlock[$username[502840819380912139]\n$username[254354531951837186]]]
      $addSeparator[Large]
      $addTextDisplay[### $get[footer]]
    ;$getGlobalVar[defaultColor]]
  `
}