export default {
  type: 'clientReady',
  code: `
    $c[
      The limit of interval iterations that can be recovered. 
      0 - disable restoring
      -1 - remove limit
    ]
    $let[restoredIterationsLimit;50]

    $jsonLoad[intervals;$getGlobalVar[intervals;{}]]
    $jsonLoad[keys;$jsonKeys[intervals]]
    $if[$arrayLength[keys]==0;$stop]

    $c[Functions]
    $fn[elapsed;$return[$math[$getTimestamp - $env[lastExec]]];lastExec]
    $fn[execute;$try[$eval[$env[code];false]];code]
    $fn[updateLastExecution;
      $jsonLoad[intervals;$getGlobalVar[intervals]]
      $!jsonSet[intervals;$env[id];lastExecution;$getTimestamp]
      $setGlobalVar[intervals;$env[intervals]]
    ;id]

    $c[Looping through all stored intervals]
    $arrayForEach[keys;key;
      $let[code;$env[intervals;$env[key];code]]
      $let[time;$env[intervals;$env[key];time]]
      $let[lastExec;$env[intervals;$env[key];lastExecution]]

      $let[lostIters;$floor[$math[$callFn[elapsed;$get[lastExec]] / $get[time]]]] $c[How many iterations were lost]
      $if[$and[$get[lostIters]>$get[restoredIterationsLimit];$get[restoredIterationsLimit]!=-1];
        $let[lostIters;$get[restoredIterationsLimit]]
      ]

      $loop[-1;
        $let[loopStart;$executionTime]
        $loop[$get[lostIters];
          $callFn[execute;$get[code]]
        ]
        $callFn[updateLastExecution;$env[key]]

        $let[totalTime;$math[($executionTime - $get[loopStart]) + ($get[time] - $callFn[elapsed;$get[lastExec]] % $get[time])]]

        $if[$get[totalTime]>=$get[time];
          $let[lostIters;$floor[$math[$get[totalTime] / $get[time]]]]
        ;
          $break
        ]
      ]

      $let[delay;$math[$get[time] - ($getTimestamp - $get[lastExec]) % $get[time]]]

      $setTimeout[
        $callFn[execute;$get[code]]
        $callFn[updateLastExecution;$env[key]]

        $setInterval[
          $callFn[execute;$get[code]]
          $callFn[updateLastExecution;$env[key]]
        ;$get[time];$env[key]]
      ;$get[delay]]
    ]
  `
}
