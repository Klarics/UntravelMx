import config from "../../data/config.js";
import { getPrefix, sendMsgToPlayer } from "../../util.js";
function listHomeHelp(player, prefix) {
    let commandStatus;
    if (!config.customcommands.listhome) {
        commandStatus = "§d[§4DISABLED§d]§r";
    }
    else {
        commandStatus = "§d[§aENABLED§d]§r";
    }
    return sendMsgToPlayer(player, [
        `\n§b-§dCommand§b-§r: listhome`,
        `§b-§dStatus§b-§r: ${commandStatus}`,
        `§b-§dUsage§b-§r: listhome [optional]`,
        `§b-§dOptional§b-§r: help`,
        `§b-§dDescription§b-§r: Shows a list of saved home locations.`,
        `§b-§dExamples§b-§r:`,
        `    ${prefix}listhome`,
        `    ${prefix}listhome help`,
    ]);
}
/**
 * @name listhome
 * @param {BeforeChatEvent} message - Message object
 * @param {string[]} args - Additional arguments provided (optional).
 */
export function listhome(message, args) {
    // Validate that required params are defined
    if (!message) {
        return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? ./commands/utility/listhome.js:26)");
    }
    message.cancel = true;
    let player = message.sender;
    // Check for custom prefix
    let prefix = getPrefix(player);
    // Was help requested
    let argCheck = args[0];
    if ((argCheck && args[0].toLowerCase() === "help") || !config.customcommands.listhome) {
        return listHomeHelp(player, prefix);
    }
    let tags = player.getTags();
    let counter = 0;
    let verify = false;
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].startsWith("LocationHome:")) {
            // Split string into array
            let coordinatesArray = tags[i].split(" ");
            let home;
            let homex;
            let homey;
            let homez;
            let dimension;
            counter = ++counter;
            for (let i = 0; i < coordinatesArray.length; i++) {
                // Get their location from the array
                if (coordinatesArray[i].includes("LocationHome:")) {
                    home = coordinatesArray[i].replace("LocationHome:", "");
                }
                if (coordinatesArray[i].includes("X:")) {
                    homex = parseInt(coordinatesArray[i].replace("X:", ""));
                }
                if (coordinatesArray[i].includes("Y:")) {
                    homey = parseInt(coordinatesArray[i].replace("Y:", ""));
                }
                if (coordinatesArray[i].includes("Z:")) {
                    homez = parseInt(coordinatesArray[i].replace("Z:", ""));
                }
                if (coordinatesArray[i].includes("Dimension:")) {
                    dimension = coordinatesArray[i].replace("Dimension:", "");
                }
                if (!homex || !homey || !homez || !dimension) {
                    continue;
                }
                else {
                    verify = true;
                    if (counter === 1) {
                        sendMsgToPlayer(player, `§l§b-§6List Of Homes§b-§r`);
                    }
                    sendMsgToPlayer(player, ` | §b-§f${home}§b-§r §d=>§r ${homex} ${homey} ${homez} §d<=§r §b-§f${dimension}§b-§r`);
                    continue;
                }
            }
            continue;
        }
        continue;
    }
    if (verify === false) {
        sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r You have none saved locations.`);
    }
    return;
}
