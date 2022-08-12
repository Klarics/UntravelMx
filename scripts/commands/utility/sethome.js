import config from "../../data/config.js";
import { getPrefix, sendMsgToPlayer } from "../../util.js";
function setHomeHelp(player, prefix) {
    let commandStatus;
    if (!config.customcommands.sethome) {
        commandStatus = "§d[§4DISABLED§d]§r";
    }
    else {
        commandStatus = "§d[§aENABLED§d]§r";
    }
    return sendMsgToPlayer(player, [
        `\n§b-§dCommand§b-§r: sethome`,
        `§b-§dStatus§b-§r: ${commandStatus}`,
        `§b-§dUsage§b-§r: sethome [optional]`,
        `§b-§dOptional§b-§r: name, help`,
        `§b-§dDescription§b-§r: Saves home location based on current coordinates. Up to ${config.modules.setHome.max} total.`,
        `§b-§dExamples§b-§r:`,
        `    ${prefix}sethome barn`,
        `    ${prefix}sethome help`,
    ]);
}
/**
 * @name sethome
 * @param {BeforeChatEvent} message - Message object
 * @param {string[]} args - Additional arguments provided (optional).
 */
export function sethome(message, args) {
    // Validate that required params are defined
    if (!message) {
        return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? ./commands/utility/sethome.js:26)");
    }
    message.cancel = true;
    let player = message.sender;
    // Check for custom prefix
    let prefix = getPrefix(player);
    // Are there arguements
    if (!args.length) {
        return setHomeHelp(player, prefix);
    }
    // Was help requested
    let argCheck = args[0];
    if ((argCheck && args[0].toLowerCase() === "help") || !config.customcommands.sethome) {
        return setHomeHelp(player, prefix);
    }
    if (player.hasTag('InSpawn')) {
        return sendMsgToPlayer(player, [`You can't do this here! `]);
    }
    // Get current location
    let { x, y, z } = player.location;
    let homex = x.toFixed(0);
    let homey = y.toFixed(0);
    let homez = z.toFixed(0);
    let currentDimension;
    // Don't allow spaces
    if (args.length > 1 || args[0].trim().length === 0) {
        setHomeHelp(player, prefix);
        sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r No spaces in names please!`);
    }
    // Make sure this name doesn't exist already and it doesn't exceed limitations
    let verify = false;
    let counter = 0;
    let tags = player.getTags();
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].startsWith(args[0].toString() + " X", 13)) {
            verify = true;
            sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r Home with name '${args[0]}' already exists!`);
            break;
        }
        if (tags[i].startsWith("LocationHome:")) {
            counter = ++counter;
        }
        if (counter >= config.modules.setHome.max && config.modules.setHome.enabled) {
            verify = true;
            sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r You can only have ${config.modules.setHome.max} saved locations at a time!`);
            break;
        }
    }
    if (verify === true) {
        return;
    }
    // Save which dimension they were in
    if (player.dimension.id === "minecraft:overworld") {
        currentDimension = "overworld";
    }
    if (player.dimension.id === "minecraft:nether") {
        currentDimension = "nether";
    }
    if (player.dimension.id === "minecraft:the_end") {
        return sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r Not allowed to set home in this dimension!`);
    }
    // Store their new home coordinates
    player.addTag(`LocationHome:${args[0]} X:${homex} Y:${homey} Z:${homez} Dimension:${currentDimension}`);
    sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r Home '${args[0]}' has been set at ${homex} ${homey} ${homez}!`);
}
