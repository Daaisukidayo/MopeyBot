import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "showRares",
  description: "total rares count of the 1h luck challenge, hidden if the profile settings say so",
  params: [
    {
      name: "progressVar",
      description: "var w/ the challenge progress",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[progress;$env[progressVar]]
    $let[rares;$jsonGet[progress;rares]]
    $return[$tl[ui.challenge.rares.$jsonGet[userProfile;language];$if[$arrayIncludes[$jsonGet[userProfile;challenge;settings];hideRares];||$get[rares]||;\`$get[rares]\`]]]
  `,
})
