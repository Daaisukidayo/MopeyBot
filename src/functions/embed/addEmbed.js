export default { 
  name: "addEmbed",
  description: "Adds legacy embed.",
  params: [
    {
      name: "color",
      description: "The type of color for the embed (e.g., 'default', 'cooldown', 'error', 'lucky').",
      type: "String",
      required: true,
    },
  ],
  code: `
    $author[$tl[ui.errors.errorTitle]]
    $if[$env[color]!=error;
      $addAuthor
    ]
    $color[$getGlobalVar[$env[color]Color]]
  `
}