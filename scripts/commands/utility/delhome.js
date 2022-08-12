import config from "../../data/config.js";
import { getPrefix, sendMsgToPlayer } from "../../util.js";
function delhomeHelp(player, prefix) {
    let commandStatus;
    if (!config.customcommands.delhome) {
        commandStatus = "§d[§4DISABLED§d]§r";
    }
    else {
        commandStatus = "§d[§aENABLED§d]§r";
    }
    return sendMsgToPlayer(player, [
        `\n§b-§dCommand§b-§r: delhome`,
        `§b-§dStatus§b-§r: ${commandStatus}`,
        `§b-§dUsage§b-§r: delhome [optional]`,
        `§b-§dOptional§b-§r: name, help`,
        `§b-§dDescription§b-§r: Will delete specified saved home location.`,
        `§b-§dExamples§b-§r:`,
        `    ${prefix}delhome cave`,
        `    ${prefix}delhome help`,
    ]);
}
/**
 * @name delhome
 * @param {BeforeChatEvent} message - Message object
 * @param {string[]} args - Additional arguments provided (optional).
 */
export function delhome(message, args) {
    // Validate that required params are defined
    if (!message) {
        return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? ./commands/utility/delhome.js:26)");
    }
    message.cancel = true;
    let player = message.sender;
    // Check for custom prefix
    let prefix = getPrefix(player);
    // Are there arguements
    if (!args.length) {
        return delhomeHelp(player, prefix);
    }
    // Was help requested
    let argCheck = args[0];
    if ((argCheck && args[0].toLowerCase() === "help") || !config.customcommands.delhome) {
        return delhomeHelp(player, prefix);
    }
    // Don't allow spaces
    if (args.length > 1) {
        sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r No spaces in names please!`);
    }
    // Find and delete this saved home location
    let verify = false;
    let tags = player.getTags();
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].startsWith(args[0].toString() + " X", 13)) {
            verify = true;
            player.removeTag(tags[i]);
            sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r Successfully deleted home '${args[0]}'!`);
            break;
        }
    }
    if (verify === true) {
        return;
    }
    else {
        sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r Home '${args[0]}' does not exist!`);
    }
}
