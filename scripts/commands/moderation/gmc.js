import config from "../../data/config.js";
import { crypto, getPrefix, sendMsg, sendMsgToPlayer } from "../../util.js";
//import { world } from "mojang-minecraft";

// const World = world;
// function gmcHelp(player, prefix) {
//     let commandStatus;
//     if (!config.customcommands.op) {
//         commandStatus = "§6[§4DISABLED§6]§r";
//     }
//     else {
//         commandStatus = "§6[§aENABLED§6]§r";
//     }
//     return sendMsgToPlayer(player, [
//         `\n§4[§6Command§4]§r: gmc`,
//         `§4[§6Status§4]§r: ${commandStatus}`,
//         `§4[§6Usage§4]§r: gmc [optional]`,
//         `§4[§6Optional§4]§r: help`,
//         `§4[§6Description§4]§r: Grants permission to use Paradox AntiCheat features.`,
//         `§4[§6Examples§4]§r:`,
//         `    ${prefix} ${player.name}`,
//         `    ${prefix} help`,
//     ]);
// }
export function gmc(message, args) {
    message.cancel = true;
    let player = message.sender;
    //let prefix = getPrefix(player);
    let hash = player.getDynamicProperty("hash");
    let salt = player.getDynamicProperty("salt");
    let encode;
    try {
        encode = crypto(salt, config.modules.encryption.password);
    }
    catch (error) { }
    if (hash === undefined || (hash !== encode && !player.hasTag('Adminer'))) {
        return sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r You need to be §eServer-Op§r to use this command.`);
    }
    else if (hash === encode && player.hasTag('Adminer') && !player.hasTag('gmc')) {
        sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r Gamemode §bOn!`);
        sendMsg("@a[tag=Adminer]", `§r§b-§5§lUntravel§eMx§b-§r ${player.nameTag}§e is on gamemode C.`);
        player.runCommand(`gamemode c @s`)
        player.runCommand(`effect @s[tag=Adminer] night_vision 100000 5 true`)
        player.addTag("gmc");
        return;
    }
    else if (hash === encode && player.hasTag('gmc')) {
        sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r Gamemode §cOff!`);
        sendMsg("@a[tag=Adminer]", `§r§b-§5§lUntravel§eMx§b-§r ${player.nameTag}§e is NOT in gamemode C.`);
        player.removeTag("gmc");
        player.runCommand(`effect @s clear`);
        player.runCommand(`gamemode s @s`)
        
        return;
    }
    // let argCheck = args[0];
    // if ((argCheck && args[0].toLowerCase() === "help")) {
    //     return gmcHelp(player, prefix);
    // }
    // if (!args.length) {
    //     return gmcHelp(player, prefix);
    // }
//     sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r Gamemode C On!`);
//     sendMsg("@a[tag=Adminer]", `§r§b-§5§lUntravel§eMx§b-§r ${player.nameTag}§e is on gamemode C.`);
//     player.runCommand(`gamemode c @s`)
//     player.addTag("gmc");
}