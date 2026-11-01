import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "showPoints",
  description: "total points of the 1h luck challenge, hidden if the profile settings say so",
  params: [
    {
      name: "progressVar",
      description: "var w/ the challenge progress",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[progress;$env[progressVar]]
    $let[points;$jsonGet[progress;points]]
    $return[$tl[ui.challenge.points.$jsonGet[userProfile;language];$if[$arrayIncludes[$jsonGet[userProfile;challenge;settings];hidePoints];||$get[points]||;\`$get[points]\`]]]
  `,
})
