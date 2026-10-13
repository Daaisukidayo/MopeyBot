import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "showHistoryOption",
  description:
    "Opens the form that changes a typed option of a history page (the play type and the difficulty have menus on the page). The answer comes as '<handler>-set-<author ID>-<option>'.",
  params: [
    {
      name: "handler",
      description: "The interaction that gets the answer: addHistory or editHistory.",
      type: ArgType.String
    },
    {
      name: "option",
      description: "The option: points, raresQuantity, endDate or raresList.",
      type: ArgType.String
    },
    {
      name: "page",
      description: "The history page being made or edited.",
      type: ArgType.Json
    }
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $let[id;$env[handler]-set-$authorID-$env[option]]

    $c[A form prefilled with the current value]
    $switch[$env[option];
      $case[points;
        $modal[$get[id];$tl[ui.history.modalTitlePoints.$get[l]]]
        $addTextInput[historyOptionInput;$tl[ui.history.modalDescriptionPoints.$get[l]];Short;true;$tl[ui.history.modalPlaceholderPoints.$get[l];$jsonGet[page;points]];$if[$jsonGet[page;points]>0;$jsonGet[page;points]];1;5]
      ]
      $case[raresQuantity;
        $modal[$get[id];$tl[ui.history.modalTitleRares.$get[l]]]
        $addTextInput[historyOptionInput;$tl[ui.history.modalDescriptionRares.$get[l]];Short;true;$tl[ui.history.modalPlaceholderRares.$get[l];$jsonGet[page;rares]];$if[$jsonGet[page;rares]>0;$jsonGet[page;rares]];1;3]
      ]
      $case[endDate;
        $modal[$get[id];$tl[ui.history.modalTitleEndDate.$get[l]]]
        $addTextInput[historyOptionInput;$tl[ui.history.modalDescriptionEndDate.$get[l]];Paragraph;true;$tl[ui.history.modalPlaceholderEndDate.$get[l]];$parseDate[$jsonGet[page;endDate];UTC]]
      ]
      $case[raresList;
        $arrayMap[$jsonEntries[$sortList[$jsonGet[page;raresList]]];entry;
          $return[$getAnimalInfo[$jsonGet[entry;0];challenge.abbreviations.0] = $jsonGet[entry;1]]
        ;lines]
        $modal[$get[id];$tl[ui.history.modalTitleList.$get[l]]]
        $addTextInput[historyOptionInput;$tl[ui.history.modalDescriptionList.$get[l]];Paragraph;true;$tl[ui.history.modalPlaceholderList.$get[l]];$arrayJoin[lines;\n]]
      ]
    ]
    $showModal
  `
})
