export default {
  name: 'advancedTimeout',
  params: [
    {
      name: 'code',
      description: 'The code to execute.',
      required: true
    },
    {
      name: 'time',
      description: 'How long to wait for before running this code.',
      required: true
    },
    {
      name: 'id',
      description: 'A unique ID for this timeout',
      required: true
    },
    {
      name: 'data',
      description: 'The data to include in the code.',
      required: false,
      rest: true
    },
  ],
  code: `
    $c[The time when the code inside the timeout will execute]
    $let[time;$function[
      $if[$isNumber[$env[time]];
        $return[$env[time]]
      ;
        $return[$parseString[$env[time]]]
      ]
    ]]

    $if[$get[time]==0;
      $logger[Error;Failed to set timeout with ID '$env[id]'. Reason: invalid time '$env[time]' received]
      $return
    ]
    $let[endTime;$math[$getTimestamp + $get[time]]]

    $c[Removing empty lines and extra spaces at the beginning and end of each line of code]
    $arrayLoad[block;\n;$trimLines[$env[code]]]
    $arrayMap[block;elem;$return[$trim[$env[elem]]];block]
    $let[code;$arrayJoin[block; ]]


    $c[Replacing {placeholders} with included data in desc order]
    $loop[$arrayLength[data];
      $let[i;$math[$env[i] - 1]]
      $let[code;$replace[$get[code];{$get[i]};$arrayAt[data;$get[i]];-1]]
    ;i;true]


    $c[Saving timeout data and loading it into 'timeouts' variable]
    $jsonLoad[timeout_data;{
      "time": "$get[time]",
      "endTime": "$get[endTime]",
      "code": "$get[code]"
    }]

    $if[$js[Array.isArray($getGlobalVar[timeouts;{}])];
      $setGlobalVar[timeouts;{}]
    ]
    $jsonLoad[timeouts;$getGlobalVar[timeouts;{}]]
    $if[$env[timeouts;$env[id]]!=;
      $logger[Error;Failed to set timeout with ID '$env[id]'. Reason: timeout with this ID already exist]
      $return
    ]
    $!jsonSet[timeouts;$env[id];$env[timeout_data]]
    $setGlobalVar[timeouts;$env[timeouts]]
    
    $setTimeout[
      $eval[$get[code];false]
      $jsonLoad[timeouts;$getGlobalVar[timeouts;{}]]
      $if[$env[timeouts;$get[id]]!=;
        $!jsonDelete[timeouts;$env[id]]
        $setGlobalVar[timeouts;$env[timeouts]]
      ]
    ;$env[time];$env[id]]
  `
}