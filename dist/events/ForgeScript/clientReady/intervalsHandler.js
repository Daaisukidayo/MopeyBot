"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: 'clientReady',
    code: `
    $jsonLoad[intervals;$getGlobalVar[intervals;{}]]
    $if[$env[intervals]=={};$stop]
    $jsonLoad[intervalIds;$jsonKeys[intervals]]

    $c[Functions]
    $fn[elapsed;$return[$math[$getTimestamp - $env[lastExec]]];lastExec]
    $fn[updatelastIteration;
      $jsonLoad[intervals;$getGlobalVar[intervals]]
      $!jsonSet[intervals;$env[_id];lastIteration;"$getTimestamp"]
      $!jsonSet[intervals;$env[_id];nextIteration;"$math[$getTimestamp + $env[intervals;$env[_id];time]]"]
      $setGlobalVar[intervals;$env[intervals]]
    ;_id]

    $c[Looping through all stored intervals]
    $loop[$arrayLength[intervalIds];
      $let[id;$arrayAt[intervalIds;$math[$env[i] - 1]]]

      $if[$advancedIntervalExists[$get[id]]==false;$continue]

      $let[code;$env[intervals;$get[id];code]]
      $let[time;$env[intervals;$get[id];time]]
      $let[lastExec;$env[intervals;$get[id];lastIteration]]
      $if[$get[lastExec]==null;
        $let[lastExec;$getTimestamp]
      ]

      $c[System variables]
      $let[deleteOnRestart;$env[intervals;$get[id];arguments;deleteOnRestart]]
      $let[restoredIterationsLimit;$env[intervals;$get[id];arguments;restoredIterationsLimit]]


      $if[$get[deleteOnRestart];
        $stopAdvancedInterval[$get[id]]
        $continue
      ]

      $c[How many iterations were lost]
      $let[lostIters;$floor[$math[$callFn[elapsed;$get[lastExec]] / $get[time]]]]
      $if[$and[$get[lostIters]>$get[restoredIterationsLimit];$get[restoredIterationsLimit]>=0];
        $let[lostIters;$get[restoredIterationsLimit]]
      ]

      $if[$get[lostIters]>0;
        $loop[-1;
          $let[loopStart;$executionTime]
          $loop[$get[lostIters];
            $executeIntervalCode[$get[code]]
          ]
          $callFn[updatelastIteration;$get[id]]

          $let[totalTime;$math[($executionTime - $get[loopStart]) + ($get[time] - $callFn[elapsed;$get[lastExec]] % $get[time])]]

          $if[$get[totalTime]>=$get[time];
            $let[lostIters;$floor[$math[$get[totalTime] / $get[time]]]]
          ;
            $break
          ]
        ]
      ]

      $let[delay;$math[$get[time] - ($getTimestamp - $get[lastExec]) % $get[time]]]

      $setTimeout[
        $executeIntervalCode[$get[code]]
        $callFn[updatelastIteration;$get[id]]

        $setInterval[
          $executeIntervalCode[$get[code]]
          $callFn[updatelastIteration;$get[id]]
        ;$get[time];$get[id]]
      ;$get[delay]]
    ;i]
  `
};
//# sourceMappingURL=intervalsHandler.js.map