"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [{
        name: 'displayIntervalsListContainer',
        description: 'Displays a container with a paginated list of active advanced intervals.',
        code: `
    $c[Getting data on the 'page']
    $jsonLoad[listPage;$arrayAt[listPages;$math[$get[page]-1]]]

    $addContainer[
      $addTextDisplay[## Active Intervals Panel]
      $addSeparator[Large]

      $if[$arrayLength[listPage]>0;
        $loop[$get[rows];
          $let[i;$math[$env[i] - 1]]

          $let[iid;$env[listPage;$get[i];0]]
          $let[lastIter;$env[listPage;$get[i];1;lastIteration]]
          $if[$get[lastIter]!=null;
            $let[lastIter;$discordTimestamp[$get[lastIter];RelativeTime]]
          ]
          $let[nextIter;$discordTimestamp[$env[listPage;$get[i];1;nextIteration];RelativeTime]]
          
          $let[deleteOnRestart;$env[listPage;$get[i];1;arguments;deleteOnRestart]]
          $let[restoredIterationsLimit;$env[listPage;$get[i];1;arguments;restoredIterationsLimit]]

          $let[time;$parseMS[$env[listPage;$get[i];1;time];;, ;true]]
    
          $c[DO NOT EDIT IF YOU DON'T KNOW WHAT YOU ARE DOING!]
          $addTextDisplay[### ID: $inlineCode[$get[iid]]]
          $addTextDisplay[### Time: $inlineCode[$get[time]]]
          $addTextDisplay[### Delete on restart: $inlineCode[$get[deleteOnRestart]]]
          $addTextDisplay[### Restore iterations on restart: $inlineCode[$get[restoredIterationsLimit]]]
          $addTextDisplay[### Last iterated: $get[lastIter]]
          $addTextDisplay[### Next iteration: $get[nextIter]]
          
          $addActionRow
          $addButton[$get[page]!!!$get[rows]!!!$get[iid]!!!stopIntervalManually!!!$authorID;Stop;Danger]
          $addButton[$get[page]!!!$get[rows]!!!$get[iid]!!!iterateIntervalManually!!!$authorID;Iterate;Primary]
          $addButton[$get[page]!!!$get[rows]!!!$get[iid]!!!showIntervalCode!!!$authorID;Show code;Secondary]

          $addSeparator
          $if[$or[$sum[1;$env[i]]>$arrayLength[listPage];$env[i]==$get[rows]];
            $break
          ]
        ;i;true]
      ;
        $addTextDisplay[## No active intervals.]
        $addSeparator[Large]
      ]

      $addTextDisplay[### Page $get[page]/$get[maxPages]]

      $if[$get[maxPages]>1;
        $addActionRow
        $addButton[$get[page]-$get[rows]-intervalsListButtonPrev-$authorID;;Primary;◀️]
        $addButton[$get[page]-$get[rows]-intervalsListButtonNext-$authorID;;Primary;▶️]
      ]
    ;FFFFFF]
    $addActionRow
    $addButton[$get[page]-$get[rows]-refreshIntervalCommand-$authorID;Refresh;Success]
  `
    }, {
        name: 'generateIntervalListPages',
        description: 'Generates paginated data for the list of active advanced intervals.',
        params: [
            {
                name: '_rows',
                description: 'Rows per page',
                type: 'Number',
                required: true,
                rest: false,
            }
        ],
        code: `
    $jsonLoad[intervals;$getGlobalVar[intervals;{}]]
    $jsonLoad[entries;$jsonEntries[intervals]]

    $if[$arrayLength[entries]==0;
      $return[[\\]]
    ]

    $arrayCreate[listPages]

    $loop[$arrayLength[entries];
      $if[$math[($env[i] - 1) % $env[_rows]]==0;
        $arrayPushJSON[listPages;$arraySplice[entries;0;$env[_rows]]]
      ]
    ;i;true]

    $return[$env[listPages]]
  `
    }];
//# sourceMappingURL=embedIntervalFunctions.js.map