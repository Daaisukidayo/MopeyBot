export default {
  name: 'addRespawnButton',
  code: `
    $addActionRow
    $addButton[respawn-play-$authorID;$tl[ui.play.buttonLabelRespawn];Success]
  `
}