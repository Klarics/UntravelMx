import { world } from "mojang-minecraft";
import { crypto, sendMsgToPlayer } from "../../../util.js";
import config from "../../../data/config.js";
const World = world;
const spamList = new WeakMap();
function antispam(msg) {
    // Get Dynamic Property
    let antiSpamBoolean = World.getDynamicProperty("antispam_b");
    if (antiSpamBoolean === undefined) {
        antiSpamBoolean = config.modules.antispam.enabled;
    }
    // Unsubscribe if disabled in-game
    if (antiSpamBoolean === false) {
        World.events.beforeChat.unsubscribe(antispam);
        return;
    }
    // Store player object
    let player = msg.sender;
    let message = msg.message;
    // Check for hash/salt and validate password
    let hash = player.getDynamicProperty("hash");
    let salt = player.getDynamicProperty("salt");
    let encode;
    encode = crypto(salt, config.modules.encryption.password) ?? null;
    if (hash === undefined || encode !== hash) {
        // gets current time
        const currentTime = Date.now();
        // gets spam data (and sets one if doesn't exist)
        if (!spamList.has(player))
            spamList.set(player, { lastMessage: message, lastSendTime: -Infinity, spamCounter: 0 });
        const spamData = spamList.get(player);
        let check = true;
        // resets spam data
        if (spamData?.lastSendTime !== undefined && currentTime - spamData.lastSendTime >= config.modules.antispam.cooldown * 50) {
            check = false;
            spamData.lastMessage = message;
            spamData.lastSendTime = currentTime;
            spamData.spamCounter = 0;
        }
        // Specific to Horion
        if (spamData && message.includes("the best minecraft bedrock utility mod")) {
            spamData.spamCounter = Infinity;
        }
        if (check && spamData) {
            // check if the player sends the same message with the previous one, otherwise resets the spam counter
            if (spamData.lastMessage === message) {
                spamData.spamCounter++;
                sendMsgToPlayer(player, `§r§4[§bUntravel§eMx§4]§r Do not spam the chat!`);
                msg.cancel = true;
            }
            // check if the player sends a message during cooldown
            else {
                msg.cancel = true;
                sendMsgToPlayer(player, `§r§4[§bUntravel§eMx§4]§r You are sending too many messages in a short time!`);
            }
        }
        // check if the spam counter goes above the threshold
        if (spamData && spamData.spamCounter > 12) {
            try {
                player.addTag("Reason:Spamming");
                player.addTag("By:Paradox");
                player.addTag("isBanned");
            }
            catch (error) {
                player.triggerEvent("paradox:kick");
            }
        }
    }
}
const AntiSpam = () => {
    World.events.beforeChat.subscribe(antispam);
};
export { AntiSpam };
