import config from "../../data/config.js";
import { crypto, getPrefix, sendMsg, sendMsgToPlayer } from "../../util.js";
function vanishHelp(player, prefix) {
    let commandStatus;
    if (!config.customcommands.vanish) {
        commandStatus = "§o§d[§4DISABLED§o§d]§r";
    }
    else {
        commandStatus = "§o§d[§aENABLED§o§d]§r";
    }
    return sendMsgToPlayer(player, [
        `\n§b-§o§dCommand§b-§r: vanish`,
        `§b-§o§dStatus§b-§r: ${commandStatus}`,
        `§b-§o§dUsage§b-§r: vanish [optional]`,
        `§b-§o§dOptional§b-§r: help`,
        `§b-§o§dDescription§b-§r: Turns the player invisible to monitor online player's.`,
        `§b-§o§dExamples§b-§r:`,
        `    ${prefix}vanish`,
        `    ${prefix}vanish help`,
    ]);
}
/**
 * @name vanish
 * @param {BeforeChatEvent} message - Message object
 * @param {string[]} args - Additional arguments provided (optional).
 */
export function vanish(message, args) {
    // validate that required params are defined
    if (!message) {
        return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? (./utility/vanish.js:26)");
    }
    message.cancel = true;
    let player = message.sender;
    // Check for hash/salt and validate password
    let hash = player.getDynamicProperty("hash");
    let salt = player.getDynamicProperty("salt");
    let encode;
    try {
        encode = crypto(salt, config.modules.encryption.password);
    }
    catch (error) { }
    // make sure the user has permissions to run the command
    if ((hash === undefined || encode !== hash) && !player.hasTag('Moderator')) {
        return sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r You need to be Moderator-Opped to use this command.`);
    }
    // Check for custom prefix
    let prefix = getPrefix(player);
    // Was help requested
    let argCheck = args[0];
    if ((argCheck && args[0].toLowerCase() === "help") || !config.customcommands.vanish) {
        return vanishHelp(player, prefix);
    }
    if (player.hasTag("vanish")) {
        player.addTag("novanish");
    }
    if (player.hasTag("novanish")) {
        player.removeTag("vanish");
    }
    if (player.hasTag("novanish")) {
        //player.runCommand(`event entity @s unvanish`);
        player.runCommand(`gamemode s @s`);
        sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r You are no longer vanished.`);
        sendMsg(`@a[tag=paradoxOpped]`, `${player.nameTag}§r is no longer in vanish.`);
    }
    if (!player.hasTag("novanish")) {
        player.addTag("vanish");
    }
    if (player.hasTag("vanish") && !player.hasTag("novanish")) {
        //player.runCommand(`event entity @s vanish`);
        player.runCommand(`gamemode 6 @s`);
        sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r You are now vanished!`);
        sendMsg(`@a[tag=paradoxOpped]`, `${player.nameTag}§r is now vanished!`);
    }
    if (player.hasTag("novanish")) {
        player.removeTag("novanish");
    }
}
