import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "clientReady",
  code: `
    $arrayForEach[$allUserIDs;id;$username[$env[id]]]
  `,
})
