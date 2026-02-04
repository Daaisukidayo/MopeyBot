export default {
  name: 'advancedInterval',
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
      description: 'A unique ID for this interval',
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
    $c[The time when the code inside the interval will execute]
    $let[time;$function[
      $if[$isNumber[$env[time]];
        $return[$env[time]]
      ;
        $return[$parseString[$env[time]]]
      ]
    ]]

    $if[$get[time]==0;
      $logger[Error;Failed to set interval with ID '$env[id]'. Reason: invalid time '$env[time]' received]
      $return
    ]

    $c[Removing empty lines and extra spaces at the beginning and end of each line of code]
    $arrayLoad[block;\n;$trimLines[$env[code]]]
    $arrayMap[block;elem;$return[$trim[$env[elem]]];block]
    $let[code;$arrayJoin[block; ]] 


    $c[Replacing {placeholders} with included data in desc order]
    $loop[$arrayLength[data];
      $let[i;$math[$env[i] - 1]]
      $let[code;$replace[$get[code];{$get[i]};$arrayAt[data;$get[i]];-1]]
    ;i;true]


    $c[Saving interval data and loading it into 'intervals' variable]
    $jsonLoad[interval_data;{
      "time": "$get[time]",
      "lastExecution": "$getTimestamp",
      "code": "$get[code]"
    }]

    $jsonLoad[intervals;$getGlobalVar[intervals;{}]]
    $if[$env[intervals;$env[id]]!=;
      $logger[Error;Failed to set interval with ID '$env[id]'. Reason: interval with this ID already exist]
      $return
    ]
    $!jsonSet[intervals;$env[id];$env[interval_data]]
    $setGlobalVar[intervals;$env[intervals]]

    
    $setInterval[
      $eval[$get[code];false]
      $jsonLoad[intervals;$getGlobalVar[intervals]]
      $!jsonSet[intervals;$env[id];lastExecution;$getTimestamp]
      $setGlobalVar[intervals;$env[intervals]]
    ;$get[time];$env[id]]
  `
}