/* eslint no-var: "off"*/
import { world } from "mojang-minecraft";
import config from "../../data/config.js";
import { crypto, getPrefix, sendMsg, sendMsgToPlayer } from "../../util.js";
const World = world;
function banHelp(player, prefix) {
    let commandStatus;
    if (!config.customcommands.ban) {
        commandStatus = "§d§o[§4DISABLED§d§o]§r";
    }
    else {
        commandStatus = "§d§o[§aENABLED§d§o]§r";
    }
    return sendMsgToPlayer(player, [
        `\n§b-§d§oCommand§b-§r: ban`,
        `§b-§d§oStatus§b-§r: ${commandStatus}`,
        `§b-§d§oUsage§b-§r: ban [optional]`,
        `§b-§d§oOptional§b-§r: username, reason, help`,
        `§b-§d§oDescription§b-§r: Bans the specified user and optionally gives a reason.`,
        `§b-§d§oExamples§b-§r:`,
        `    ${prefix}ban ${player.name}`,
        `    ${prefix}ban ${player.name} Hacker!`,
        `    ${prefix}ban ${player.name} Caught exploiting!`,
        `    ${prefix}ban help`,
    ]);
}
/**
 * @name ban
 * @param {BeforeChatEvent} message - Message object
 * @param {array} args - Additional arguments provided (optional).
 */
export function ban(message, args) {
    // validate that required params are defined
    if (!message) {
        return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? ./commands/moderation/ban.js:31)");
    }
    message.cancel = true;
    let player = message.sender;
    let reason = args.slice(1).join(" ") || "No reason specified";
    // Check for hash/salt and validate password
    let hash = player.getDynamicProperty("hash");
    let salt = player.getDynamicProperty("salt");
    let encode;
    try {
        encode = crypto(salt, config.modules.encryption.password);
    }
    catch (error) { }
    // make sure the user has permissions to run the command
    if ((hash === undefined || encode !== hash) && !player.hasTag('Helper')) {
        return sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r You need to be Helper++-Opped to use this command.`);
    }
    // Check for custom prefix
    let prefix = getPrefix(player);
    // Are there arguements
    if (!args.length) {
        return banHelp(player, prefix);
    }
    // Was help requested
    let argCheck = args[0];
    if ((argCheck && args[0].toLowerCase() === "help") || !config.customcommands.ban) {
        return banHelp(player, prefix);
    }
    // try to find the player requested
    let member;
    for (let pl of World.getPlayers()) {
        if (pl.nameTag.toLowerCase().includes(args[0].toLowerCase().replace(/"|\\|@/g, ""))) {
            member = pl;
        }
    }
    // Check if player exists
    if (!member) {
        return sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r Couldnt find that player!`);
    }
    // make sure they dont ban themselves
    if (member === player) {
        return sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r You cannot ban yourself.`);
    }
    try {
        member.addTag("Reason:" + reason);
        member.addTag("By:" + player.nameTag);
        member.addTag("isBanned");
    }
    catch (error) {
        return sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r I was unable to ban that player! Error: ${error}`);
    }
    return sendMsg("@a[tag=paradoxOpped]", `§r§b-§5§lUntravel§eMx§b-§r ${player.nameTag}§r has banned ${member.nameTag}§r. Reason: ${reason}`);
}
