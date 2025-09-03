export default function settingsTimeout() {
  return ``
  return `
    $setTimeout[
      $!disableComponentsOf[$channelID;$get[msg]]
    ;5s;SETT-$authorID]
  `
}