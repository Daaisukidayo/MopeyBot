export default function historySorting() {
  return `
    $switch[$get[sortType];
      $case[points;
        $arrayAdvancedSort[history;elem1;elem2;
          $math[$env[elem2;points] - $env[elem1;points]]
        ;history]
      ]

      $case[rares;
        $arrayAdvancedSort[history;elem1;elem2;
          $math[$env[elem2;rares] - $env[elem1;rares]]
        ;history]
      ]

      $case[date;
        $arrayAdvancedSort[history;elem1;elem2;
          $math[$env[elem2;endedAt] - $env[elem1;endedAt]]
        ;history]
      ]
    ]
  `
}