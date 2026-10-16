import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "showRares",
  description:
    "Displays the count of total rares of a 1 hour luck challenge in content format, hidden when the profile's settings say so.",
  params: [
    {
      name: "progressVar",
      description: "The name of the variable that holds the challenge progress.",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[progress;$env[progressVar]]
    $let[rares;$jsonGet[progress;rares]]
    $return[$tl[ui.challenge.rares.$jsonGet[userProfile;language];$if[$arrayIncludes[$jsonGet[userProfile;challenge;settings];hideRares];||$get[rares]||;\`$get[rares]\`]]]
  `,
})
