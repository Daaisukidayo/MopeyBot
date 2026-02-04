export default {
  name: "cooldownEmbed",
  description: "Adds a cooldown embed",
  code: `
    $addAuthor
    $title[$tl[ui.cooldown.title]]
    $description[$tl[ui.cooldown.description;$get[relativeTimeLeft];$get[longDateTime]]]
    $color[$getGlobalVar[cooldownColor]]
  `
}