export default {
  type: "clientReady",
  code: `
    $loop[-1;    
      $arrayMap[$getGlobalVar[allUserIDs];id;
        $jsonLoad[UP;$getProfile[$env[id]]]
        
        $return[{
          "MC": "$env[UP;MC]",
          "ID": "$env[UP;ID]",
          "MUID": $env[UP;MUID]
        }]
      ;profiles]

      $arrayAdvancedSort[profiles;A;B;
        $return[$math[$env[B;MC] - $env[A;MC]]]
      ;result]

      $let[pos;0]
      $arrayMap[result;elem;
        $letSum[pos;1]
        $!jsonSet[elem;pos;$get[pos]]
        $return[$env[elem]]
      ;cachedLB]

      $setCache[leaderboard;cachedLB;$env[cachedLB]]
      $wait[5m]
    ]
  `
}