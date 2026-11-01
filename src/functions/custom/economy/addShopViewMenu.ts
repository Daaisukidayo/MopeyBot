import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addShopViewMenu",
  description: "adds the bundles / skins tab buttons (shop + balance), the open tab is lit up and disabled",
  params: [
    {
      name: "view",
      description: "the open one: 'packs' or 'skins'",
      type: ArgType.String,
    },
    {
      name: "prefix",
      description: "whose buttons, the custom id's first part. shopSkins by default",
      type: ArgType.String,
      required: false,
    },
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $let[prefix;$nullish[$env[prefix];shopSkins]]
    $jsonLoad[viewEmojis;$objectOf[packs;📦;skins;👕]]
    $addActionRow
    $arrayForEach[$arrayOf[packs;skins];option;
      $let[open;$checkCondition[$env[option]==$env[view]]]
      $addButton[$get[prefix]-view-$env[option]-$authorID;$tl[ui.shop.views.$env[option].$get[l]];$if[$get[open];Primary;Secondary];$jsonGet[viewEmojis;$env[option]];$get[open]]
    ]
  `,
})
