"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [{
        name: 'advancedInterval',
        params: [
            {
                name: '_code',
                description: 'The code to execute. Must be inside the $escapeCode/$esc function.',
                type: "String",
                required: true,
                rest: false,
            },
            {
                name: '_time',
                description: 'How long to wait for before running this code.',
                type: "String",
                required: true,
                rest: false,
            },
            {
                name: '_id',
                description: 'A unique ID for this interval',
                type: "String",
                required: true,
                rest: false,
            },
            {
                name: '_data',
                description: 'The data to include in the code.',
                type: "Json",
                required: false,
                rest: false,
            },
        ],
        code: `
    $c[Error functions]
    $fn[throwError;
      $logger[Error;Failed to set interval '$get[id]': $env[reason]]
    ;reason]
    $fn[propertyError;
      $return["$env[property]" property expects "$env[type]" type, received "$env[_data;$env[property]]"]
    ;property;type]

    $c[Calculate the exact execution time]
    $let[rawTime;$trim[$trimLines[$replace[$env[_time]; ;;-1]]]]
    $let[time;$function[
      $if[$isNumber[$get[rawTime]];
        $return[$get[rawTime]]
      ]
      $return[$parseString[$get[rawTime]]]
    ]]

    $c[Clean id]
    $let[id;$trim[$trimLines[$env[_id]]]]

    $c[Validate time input]
    $if[$get[time]<=0;
      $callFn[throwError;invalid time '$get[rawTime]' received]
      $return[false]
    ]

    $if[$get[time]>2147483647;
      $callFn[throwError;"time" exceeded the 32-Bit Integer Limit]
      $return[false]
    ]

    $c[Creating arguments to include in the "intervalsHandler"]
    $jsonLoad[arguments;{
      "restoredIterationsLimit": -1, $c[-1 = No limit, 0 = disable restoring lost iterations]
      "deleteOnRestart": false
    }]

    $c[Sanitize newlines to prevent JSON corruption during storage]
    $let[code;$replace[$env[_code];\n;{N};-1]]

    $c[Process dynamic data if provided via JSON]
    $if[$env[_data]!=;
      $if[$isValidJSON[$env[_data]]==false;
        $callFn[throwError;invalid JSON data received]
        $return[false]
      ]

      $if[$isArray[$env[_data]];
        $callFn[throwError;expected 'Object' in 'data' field, received 'Array']
        $return[false]
      ]

      $if[$jsonHas[_data;restoredIterationsLimit];
        $if[$isNumber[$env[_data;restoredIterationsLimit]]==false;
          $callFn[throwError;$callFn[propertyError;restoredIterationsLimit;Number]]
          $return[false]
        ]
        $!jsonSet[arguments;restoredIterationsLimit;$env[_data;restoredIterationsLimit]]
      ]

      $if[$jsonHas[_data;deleteOnRestart];
        $if[$isBoolean[$env[_data;deleteOnRestart]]==false;
          $callFn[throwError;$callFn[propertyError;deleteOnRestart;Boolean]]
          $return[false]
        ]
        $!jsonSet[arguments;deleteOnRestart;$env[_data;deleteOnRestart]]
      ]

      $jsonLoad[keys;$jsonKeys[_data]]

      $if[$arrayIncludes[keys;N];
        $callFn[throwError;Property 'N' is disallowed]
        $return[false]
      ]

      $c[Iterate through JSON keys and replace {keyName} in the code with values]
      $loop[$arrayLength[keys];
        $let[key;$env[keys;$math[$env[i] - 1]]]
        $let[_val;$env[_data;$get[key]]]
        
        $let[code;$replace[$get[code];{$get[key]};$get[_val];-1]]
      ;i;true]
    ]


    $c[Prepare the object for global storage]
    $jsonLoad[interval_data;{
      "time": "$get[time]",
      "lastIteration": null,
      "nextIteration": "$math[$getTimestamp + $get[time]]",
      "code": "$get[code]",
      "arguments": $env[arguments]
    }]

    $c[Prevent duplicate IDs to avoid overwriting active interval]
    $jsonLoad[intervals;$getGlobalVar[intervals;{}]]
    $if[$env[intervals;$get[id]]!=;
      $logger[Error;Failed to set interval with ID '$get[id]'. Reason: interval with this ID already exist]
      $return[false]
    ]
    $jsonSet[intervals;$get[id];$env[interval_data]]
    $setGlobalVar[intervals;$env[intervals]]

    $c[Schedule the interval]
    $setInterval[
      $jsonLoad[intervals;$getGlobalVar[intervals;{}]]
      $!jsonSet[intervals;$get[id];lastIteration;"$getTimestamp"]
      $!jsonSet[intervals;$get[id];nextIteration;"$math[$getTimestamp + $get[time]]"]
      $setGlobalVar[intervals;$env[intervals]]

      $c[Restore newlines and evaluate the escaped code]
      $executeIntervalCode[$get[code]]
    ;$get[time];$get[id]]

    $return[true]
  `
    }, {
        name: 'stopAdvancedInterval',
        params: [
            {
                name: '_id',
                description: 'Interval ID (name).',
                type: "String",
                required: true
            }
        ],
        code: `
    $let[id;$trimLines[$env[_id]]]
    $jsonLoad[intervals;$getGlobalVar[intervals;{}]]
    $if[$jsonHas[intervals;$get[id]];
      $!jsonDelete[intervals;$get[id]]
      $setGlobalVar[intervals;$env[intervals]]
    ]
    $return[$stopInterval[$get[id]]]
  `
    }, {
        name: 'advancedIntervalExists',
        description: 'Checks if an advanced interval with the given ID exists.',
        params: [
            {
                name: '_id',
                description: 'Interval ID.',
                type: 'String',
                required: true,
                rest: false,
            }
        ],
        code: `
    $jsonLoad[intervals;$getGlobalVar[intervals;{}]]
    $return[$jsonHas[intervals;$env[_id]]]
  `
    }, {
        name: "executeIntervalCode",
        description: "Executes given interval code. SYSTEM FUNCTION!",
        params: [
            {
                name: '_code',
                type: 'String',
                required: true,
                rest: false,
            }
        ],
        code: `
    $try[$eval[$resolveIntervalCode[$env[_code]];false]]
  `
    }, {
        name: "resolveIntervalCode",
        description: "Resolves given interval code and returns it. SYSTEM FUNCTION!",
        params: [
            {
                name: '_code',
                type: 'String',
                required: true,
                rest: false,
            }
        ],
        code: `
    $return[$replace[$env[_code];{N};\n;-1]]
  `
    }, {
        name: 'intervalRawData',
        description: "Returns interval's JSON data",
        params: [
            {
                name: "_intervalId",
                description: "Interval ID for data retrieval.",
                type: 'String',
                required: true,
                rest: false,
            }
        ],
        output: "Json",
        code: `
    $jsonLoad[intervals;$getGlobalVar[intervals;{}]]
    $return[$default[$env[intervals;$env[_intervalId]];{}]]
  `
    }];
//# sourceMappingURL=baseIntervalFunctions.js.map