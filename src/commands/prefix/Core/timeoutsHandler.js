export default {
  type: 'clientReady',
  code: `
    $jsonLoad[timeouts;$getGlobalVar[timeouts;{}]]
    $jsonLoad[keys;$jsonKeys[timeouts]]
    $arrayForEach[keys;key;
      $let[code;$env[timeouts;$env[key];code]]
      $let[endTime;$env[timeouts;$env[key];endTime]]

      $setTimeout[
        $try[$eval[$get[code];false]]
        $jsonLoad[timeouts;$getGlobalVar[timeouts;{}]]
        $if[$env[timeouts;$env[key]]!=;
          $!jsonDelete[timeouts;$env[key]]
          $setGlobalVar[timeouts;$env[timeouts]]
        ]
      ;$max[500;$math[$get[endTime] - $getTimestamp]];$env[key]]
    ]
  `
}