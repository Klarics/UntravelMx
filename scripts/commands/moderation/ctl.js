import config from "../../data/config.js";
import { crypto, sendMsg, sendMsgToPlayer } from "../../util.js";

export function ctl(message) {
    message.cancel = true;
    let player = message.sender;
    let hash = player.getDynamicProperty("hash");
    let salt = player.getDynamicProperty("salt");
    let encode;
    try {
        encode = crypto(salt, config.modules.encryption.password);
    }
    catch (error) { }
    if ((hash === undefined || hash !== encode) && !player.hasTag('Adminer')) {
        return sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r You need to be §eServer-Op§r to use this command.`);
    }
    else if (hash === encode && player.hasTag('Adminer')) {
        sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r Tp to control!`);
        sendMsg("@a[tag=Adminer]", `§r§b-§5§lUntravel§eMx§b-§r ${player.nameTag}§e was tp to Control.`);
        player.runCommand(`tp @s 50018 202 50006`)
        return;
    }
}