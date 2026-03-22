export default {
  name: 'advOrdinal',
  params: [
    {
      name: 'number',
      type: "Number",
      required: true,
    },
    {
      name: 'lang',
      required: false,
    },
  ],
  code: `
    $let[l;$nullish[$env[lang];EN]]

    $switch[$get[l];
      $case[RU;
        $return[$env[number]я]
      ]
      $case[EN;
        $return[$ordinal[$env[number]]]
      ]
    ]
  `
}