tag @a[scores={Dones=2}] add EnderDon
execute @e[type=ender_pearl] ~ ~ ~ effect @p[scores={Dones=2},r=2] night_vision 10 0 true
execute @e[type=ender_pearl] ~ ~ ~ effect @p[scores={Dones=2},r=2] regeneration 4 2 true
execute @a[scores={Dones=2}] ~ ~ ~ scoreboard players random @s[scores={ooo6=0}] ooo6 1 10

execute @e[type=enderman] ~ ~ ~ effect @a[r=5,scores={Dones=2}] health_boost 180 4

tag @a[scores={Dones=!2}] remove EnderDon
