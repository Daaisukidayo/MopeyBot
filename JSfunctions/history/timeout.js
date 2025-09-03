export default function historyTimeout () {
  return ``
  return `
    $!stopTimeout[1HLHISTORY-$authorID]
    $setTimeout[
      $!disableComponentsOf[$channelID;$get[msg]]
    ;1m;1HLHISTORY-$authorID]`
}