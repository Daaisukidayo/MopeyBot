module.exports = [{ 
name: "snora", 
type: "messageCreate", 
code: `
$reply

$let[cdTime;10s]
$callFunction[checking;]
$callFunction[cooldown;$get[cdTime]]

$description[
**===================Tier 2=====================
wd - White Dove
===================Tier 4=====================
pp - Pinky Pig
sp - Stinky Pig
===================Tier 5=====================
doe - Doe
mad - Marsh Deer
md - Musk Deer
gph - Golden Pheasant
===================Tier 7=====================
bm - Blue Macaw
sm - Spix's Macaw
ja - Jackass
===================Tier 8=====================
mm - Momaffie
mf - Momaffie Family
gir - Girabie
===================Tier 9=====================
jag - Jaguar
leo - leopard
bp - Black Panther
cht - Choco Toucan
kbt - Keel-Billed Toucan
ft - Fiery Toucan
lt - Lava Toucan
hht - Helmeted Hornbill Toucan
yp - Yellow Pufferfish
dp - Demon Pufferfish
===================Tier 10====================
wt - White Tiger
===================Tier 11====================
lc - Lion Cub
wlc - White Lion Cub
blc - Black Lion Cub
ln - Lioness
wln - White Lioness
bln - Black Lioness
bml - Black-Maned Lion
wl - White Lion
bl - Black Lion
arg - Argentavis
pr - Predator
shh - Shaheen
===================Tier 12====================
wr - White Rhino
br - Black Rhino
ge - Golden Eagle
he - Harpy Eagle
gse - Greater-Spotted Eagle
mh - Markhor
bg - Big Goat
===================Tier 13====================
wg - White Giraffe
wgf - White Giraffe Family
===================Tier 15====================
ay - Aqua Yeti
ssm - Shop Snowman 
lsm - Luck Snowman 
sbf - Shop Big Foot
lbf - Luck Big Foot
ssg - Shop Snowgirl
lsg - Luck Snowgirl
===================Tier 17====================
kd - King Dragon**]
$color[$getGlobalVar[luckyColor]]`}]