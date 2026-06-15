export default {
  name: 'advOrdinal',
  params: [
    {
      name: '_number',
      type: "Number",
      required: true,
    },
    {
      name: '_lang',
      required: false,
    },
  ],
  code: `
    $let[l;$nullish[$env[_lang];en-US]]

    $switch[$get[l];
      $case[ru;
        $return[$env[_number]я]
      ]
      $case[en-US;
        $return[$ordinal[$env[_number]]]
      ]
    ]
  `
}