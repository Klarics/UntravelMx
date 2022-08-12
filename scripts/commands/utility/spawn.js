import { getPrefix, sendMsgToPlayer } from "../../util.js";
//import config from "../../data/config.js";
//import { world } from "mojang-minecraft";

export function spawn(message) {
    message.cancel = true;
    let player = message.sender;
    if (player.hasTag('InCombat')) {
        return sendMsgToPlayer(player, [`You can't leave during a Fight `]);
    }
    //let prefix = getPrefix(player);
    //let hash = player.getDynamicProperty("hash");
    //let salt = player.getDynamicProperty("salt");
    //let encode;
    //try {
    //    encode = crypto(salt, config.modules.encryption.password);
    //}
    //catch (error) { }
    //if (hash === undefined || encode !== hash) {
    //return
    sendMsgToPlayer(player, [`§l§bGoing to spawn`])
    player.runCommand(`tp @s @e[type=armor_stand,name=§r§l§o§5Untravel]`)
}
