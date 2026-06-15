export default {
  type: "clientReady",
  code: `
    $loop[-1;    
      $arrayMap[$getGlobalVar[allUserIDs];id;
        $jsonLoad[UP;$getUserVar[userProfile;$env[id]]]
        $jsonLoad[data;{}]

        $!jsonSet[data;MC;"$env[UP;MC]"]
        $!jsonSet[data;ID;"$env[UP;ID]"]
        $!jsonSet[data;MUID;$env[UP;MUID]]
        
        $return[$env[data]]
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

      $setCache[cachedLB;$env[cachedLB]]
      $wait[2m]
    ]
  `
}