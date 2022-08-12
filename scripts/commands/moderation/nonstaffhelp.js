import { crypto, getPrefix, sendMsgToPlayer } from "../../util.js";
import config from "../../data/config.js";
/**
 * @name nonstaffhelp
 * @param {BeforeChatEvent} message - Message object
 */
export function nonstaffhelp(message) {
    // validate that required params are defined
    if (!message) {
        return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? (./commands/moderation/nonstaffhelp.js:7)");
    }
    message.cancel = true;
    let player = message.sender;
    // Check for custom prefix
    let prefix = getPrefix(player);
    // Check for hash/salt and validate password
    let hash = player.getDynamicProperty("hash");
    let salt = player.getDynamicProperty("salt");
    let encode;
    try {
        encode = crypto(salt, config.modules.encryption.password);
    }
    catch (error) { }
    // Non staff commands
    if (hash === undefined || encode !== hash) {
        return sendMsgToPlayer(player, [
            `§l§o§b-§6World Commands§o§b-§r`,
            config.customcommands.report ? `§o§d${prefix}report <username>§r - Report suspicious players to staff.` : `§o§d${prefix}report <username>§r - Command §cDISABLED§r.`,
            config.customcommands.sethome ? `§o§d${prefix}sethome <name>§r - Saves current coordinates as home.` : `§o§d${prefix}sethome <name>§r - Command §cDISABLED§r.`,
            config.customcommands.gohome ? `§o§d${prefix}gohome <name>§r - Teleport back to saved home coordinates.` : `§o§d${prefix}gohome <name>§r - Command §cDISABLED§r.`,
            config.customcommands.listhome ? `§o§d${prefix}listhome§r - Shows your list of saved locations.` : `§o§d${prefix}listhome§r - Command §cDISABLED§r.`,
            config.customcommands.delhome ? `§o§d${prefix}delhome <name>§r - Deletes a saved location from list.` : `§o§d${prefix}delhome <name>§r - Command §cDISABLED§r.`,
            config.customcommands.tpr ? `§o§d${prefix}tpr <username>§r - Sends a request to teleport to a player or blocks/unblocks requests.` : `§o§d${prefix}tpr <username>§r - Command §cDISABLED§r.`,
            config.customcommands.spawn ? `§o§d${prefix}spawn§r - Teleport to Spawn World.` : `§o§d${prefix}spawn§r - Command §cDISABLED§r.`
        ]);
    }
}
