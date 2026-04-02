export default [
{
  name: 'advancedTimeout',
  description: 'Sets an advanced timeout that persists when the bot is restarted.',
  params: [
    {
      name: 'code',
      description: 'The code to execute. Must be inside the $escapeCode function.',
      type: 'String',
      required: true,
      rest: false,
    },
    {
      name: 'time',
      description: 'How long to wait for before running this code.',
      type: 'String',
      required: true,
      rest: false,
    },
    {
      name: 'id',
      description: 'A unique ID for this timeout',
      type: 'String',
      required: true,
      rest: false,
    },
    {
      name: 'data',
      description: 'The data to include in the code.',
      type: 'Json',
      required: false,
      rest: false,
    },
  ],
  code: `
    $c[Calculate the exact execution time]
    $let[rawTime;$trimLines[$replace[$env[time]; ;;-1]]]
    $let[time;$function[
      $if[$isNumber[$get[rawTime]];
        $return[$abs[$get[rawTime]]]
      ;
        $return[$parseString[$get[rawTime]]]
      ]
    ]]

    $let[id;$trimLines[$env[id]]]

    $c[Validate time input]
    $if[$get[time]==0;
      $logger[Error;Failed to set timeout with ID '$get[id]'. Reason: invalid time '$get[rawTime]' received]
      $return[false]
    ]
  
    $let[endTime;$math[$getTimestamp + $get[time]]]
    $c[Sanitize newlines to prevent JSON corruption during storage]
    $let[code;$replace[$env[code];\n;{N};-1]]

    $c[Process dynamic data if provided via JSON]
    $if[$env[data]!=;
      $if[$isValidJSON[$env[data]]==false;
        $logger[Error;Failed to set timeout with ID '$get[id]'. Reason: invalid JSON data received]
        $return[false]
      ]
      
      $jsonLoad[keys;$jsonKeys[data]]

      $c[Iterate through JSON keys and replace {keyName} in the code with values]
      $loop[$arrayLength[keys];
        $let[key;$env[keys;$math[$env[i] - 1]]]
        $let[val;$env[data;$get[key]]]
        
        $let[code;$replace[$get[code];{$get[key]};$get[val];-1]]
      ;i;true]
    ]

    $c[Prepare the object for global storage]
    $jsonLoad[timeout_data;{
      "time": "$get[time]",
      "endTime": "$get[endTime]",
      "code": "$get[code]"
    }]

    $c[Prevent duplicate IDs to avoid overwriting active tasks]
    $jsonLoad[timeouts;$getGlobalVar[timeouts;{}]]
    $if[$env[timeouts;$get[id]]!=;
      $logger[Error;Failed to set timeout with ID '$get[id]'. Reason: timeout with this ID already exist]
      $return[false]
    ]

    $!jsonSet[timeouts;$get[id];$env[timeout_data]]
    $setGlobalVar[timeouts;$env[timeouts]]
    
    $c[Schedule the task and ensure self-cleanup on execution]
    $setTimeout[
      $jsonLoad[timeouts;$getGlobalVar[timeouts;{}]]
      $if[$env[timeouts;$get[id]]!=;
        $!jsonDelete[timeouts;$get[id]]
        $setGlobalVar[timeouts;$env[timeouts]]
      ]

      $c[Restore newlines and evaluate the escaped code]
      $try[$eval[$replace[$get[code];{N};\n;-1];false]]
    ;$get[time];$get[id]]

    $return[true]
  `
},{
  name: 'stopAdvancedTimeout',
  description: 'Stops an active advanced timeout, preventing its code from executing.',
  params: [
    {
      name: 'id',
      description: 'Timeout ID.',
      type: 'String',
      required: true,
      rest: false,
    }
  ],
  code: `
    $jsonLoad[timeouts;$getGlobalVar[timeouts;{}]]
    $if[$env[timeouts;$env[id]]!=;
      $!jsonDelete[timeouts;$env[id]]
      $setGlobalVar[timeouts;$env[timeouts]]
    ]
    $return[$stopTimeout[$env[id]]]
  `
},{
  name: 'advancedTimeoutExists',
  description: 'Checks if an advanced timeout with the given ID exists.',
  params: [
    {
      name: 'id',
      description: 'Timeout ID.',
      type: 'String',
      required: true,
      rest: false,
    }
  ],
  code: `
    $jsonLoad[timeouts;$getGlobalVar[timeouts;{}]]
    $return[$jsonHas[timeouts;$env[id]]]
  `
},{
  name: 'displayTimeoutsListContainer',
  description: 'Displays a container with a paginated list of active advanced timeouts.',
  code: `
    $c[Getting data on the 'page']
    $jsonLoad[listPage;$arrayAt[listPages;$math[$get[page]-1]]]

    $addContainer[
      $addTextDisplay[## Active Timeouts]
      $addSeparator[Large]

      $if[$arrayLength[listPage]>0;
        $loop[$get[rows];
          $let[i;$math[$env[i] - 1]]

          $let[tid;$env[listPage;$get[i];0]]
    
          $c[DO NOT EDIT IF YOU DON'T KNOW WHAT YOU ARE DOING!]
          $addTextDisplay[
            ### ID: $inline[$get[tid]]
            ### Time: $inline[$parseDigital[$env[listPage;$get[i];1;time]]]
            ### Ends in: $discordTimestamp[$env[listPage;$get[i];1;endTime];RelativeTime]
          ]
          $addActionRow
          $addButton[$get[page]!!!$get[rows]!!!$get[tid]!!!stopTimeoutManually!!!$authorID;Stop;Danger]
          $addButton[$get[page]!!!$get[rows]!!!$get[tid]!!!executeTimeoutManually!!!$authorID;Execute;Primary]
          $addButton[$get[page]!!!$get[rows]!!!$get[tid]!!!showTimeoutCode!!!$authorID;Show code;Secondary]

          $addSeparator
          $if[$or[$sum[1;$env[i]]>$arrayLength[listPage];$env[i]==$get[rows]];
            $break
          ]
        ;i;true]
      ;
        $addTextDisplay[## The list is empty.]
        $addSeparator
      ]

      $addTextDisplay[### Page $get[page]/$get[maxPages]]

      $if[$get[maxPages]>1;
        $addActionRow
        $addButton[$get[page]-$get[rows]-timeoutsListButtonPrev-$authorID;;Primary;◀️]
        $addButton[$get[page]-$get[rows]-timeoutsListButtonNext-$authorID;;Primary;▶️]
      ]
    ]
  `
},{
  name: 'generateTimeoutListPages',
  description: 'Generates paginated data for the list of active advanced timeouts.',
  params: [
    {
      name: 'rows',
      description: 'Rows per page',
      type: 'Number',
      required: true,
      rest: false,
    }
  ],
  code: `
    $jsonLoad[t;$getGlobalVar[timeouts;{}]]
    $jsonLoad[te;$jsonEntries[t]]

    $if[$arrayLength[te]==0;
      $return[[\\]]
    ]

    $arrayCreate[__listPages]

    $loop[$arrayLength[te];
      $if[$math[($env[i] - 1) % $env[rows]]==0;
        $arrayPushJSON[__listPages;$arraySplice[te;0;$env[rows]]]
      ]
    ;i;true]

    $return[$env[__listPages]]
  `
}]