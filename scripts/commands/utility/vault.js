import { getPrefix, sendMsgToPlayer } from "../../util";

export function vault(message) {
    message.cancel = true
    let player = message.sender;
    if (player.hasTag('InCombat')) {
        return sendMsgToPlayer(player, [`You can't leave during a Fight `]);
    }
    sendMsgToPlayer(player, [`§l§bGoing to Vault`])
    player.runCommand(`tp @s @e[type=armor_stand,name=§r§r§l§dSave]`)
}