export default {
  name: 'addRespawnButton',
  code: `
    $let[l;$env[userProfile;language]]
    $addActionRow
    $addButton[respawn-play-$authorID;$tl[$get[l];ui;play.buttonLabelRespawn];Success]
  `
}