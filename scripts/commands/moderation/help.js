import config from "../../data/config.js";
import { crypto, getPrefix, sendMsgToPlayer } from "../../util.js";
import { nonstaffhelp } from "./nonstaffhelp.js";
/**
 * @name help
 * @param {BeforeChatEvent} message - Message object
 */
export function help(message) {
    // validate that required params are defined
    if (!message) {
        return console.warn(`${new Date()} | ` + "Error: ${message} isnt defined. Did you forget to pass it? (./commands/moderation/help.js:8)");
    }
    message.cancel = true;
    let player = message.sender;
    // Check for custom prefix
    let prefix = getPrefix(player);
    // make sure the user has permissions to run the command
    // if not then show them non staff commands
    // Check for hash/salt and validate password
    let hash = player.getDynamicProperty("hash");
    let salt = player.getDynamicProperty("salt");
    let encode;
    try {
        encode = crypto(salt, config.modules.encryption.password);
    }
    catch (error) { }
    if (hash === undefined || encode !== hash) {
        return nonstaffhelp(message);
    }
    // Make sure the help command wasn't disabled
    if (config.customcommands.help === false) {
        config.customcommands.help = true;
    }
    const textDisabled = "Command §4DISABLED§r.";
    return sendMsgToPlayer(player, [
        `§l§b-§5Untravel§eMx §c& Paradox Command Help§b-§r`,
        ` `,
        `§l§b-§cModeration Commands§b-§r`,
        `§d${prefix}help§r - Shows this help page.`,
        `§d${prefix}ban <username> <reason>§r - ${config.customcommands.ban ? `Ban the specified user.` : textDisabled}`,
        `§d${prefix}unban <username>§r - ${config.customcommands.unban ? `Allows specified players to join if banned (Doesn't include global ban).` : textDisabled}`,
        `§d${prefix}kick <username> <reason>§r - ${config.customcommands.kick ? `Kick the specified user.` : textDisabled}`,
        `§d${prefix}mute <username> <reason>§r - ${config.customcommands.mute ? `Mute the specified user.` : textDisabled}`,
        `§d${prefix}unmute <username> <reason>§r - ${config.customcommands.unmute ? `Unmute the specified user.` : textDisabled}`,
        `§d${prefix}notify§r - ${config.customcommands.notify ? `Toggles cheat notifications.` : textDisabled}`,
        `§d${prefix}credits§r - Shows credits, thats it.`,
        `§d${prefix}op <username>§r - ${config.customcommands.op ? `Op's player in Paradox AntiCheat features.` : textDisabled}`,
        `§d${prefix}deop <username>§r - ${config.customcommands.deop ? `Revokes Op player in Paradox AntiCheat features.` : textDisabled}`,
        `§d${prefix}modules§r - ${config.customcommands.modules ? `View all enabled or disabled modules.` : textDisabled}`,
        `§d${prefix}prefix <prefix>§r - Change the prefix for commands. Max is two characters.`,
        `§d${prefix}prefix reset§r - Reset the prefix for commands.`,
        `§d${prefix}lockdown§r - ${config.customcommands.lockdown ? `Kicks player's from server excluding Staff for maintenance.` : textDisabled}`,
        `§d${prefix}punish <username>§r - ${config.customcommands.punish ? `Removes all items from player's inventory and ender chest.` : textDisabled}`,
        `§d${prefix}tpa <username>§r - ${config.customcommands.tpa ? `Teleport to a player or vice versa.` : textDisabled}`,
        `§d${prefix}despawn <entityName>:all§r - ${config.customcommands.despawn ? `Despawns all or specified entities if they exist.` : textDisabled}`,
        ` `,
        `§l§b-§cOptional Features§b-§r`,
        `§d${prefix}allowgma§r - ${config.customcommands.allowgma ? `Toggles Gamemode 2(Adventure) to be used.` : textDisabled}`,
        `§d${prefix}allowgmc§r - ${config.customcommands.allowgmc ? `Toggles Gamemode 1(Creative) to be used.` : textDisabled}`,
        `§d${prefix}allowgms§r - ${config.customcommands.allowgms ? `Toggles Gamemode 0(Survival) to be used.` : textDisabled}`,
        `§d${prefix}removecb§r - ${config.customcommands.removecommandblocks ? `Toggles Anti Command Blocks (Clears all when enabled).` : textDisabled}`,
        `§d${prefix}bedrockvalidate§r - ${config.customcommands.bedrockvalidate ? `Checks validation of bedrock.` : textDisabled}`,
        `§d${prefix}overridecbe§r - ${config.customcommands.overidecommandblocksenabled ? `Forces the commandblocksenabled gamerule to be enabled or disabled at all times.` : textDisabled}`,
        `§d${prefix}worldborder <value>§r - ${config.customcommands.worldborder ? `Sets the World Border for Overworld or Nether.` : textDisabled}`,
        `§d${prefix}autoclicker§r - ${config.customcommands.autoclicker ? `Toggles Anti Autoclicker.` : textDisabled}`,
        `§d${prefix}jesusa§r - ${config.customcommands.jesusa ? `Checks if player's are walking on water and lava.` : textDisabled}`,
        `§d${prefix}enchantedarmor§r - ${config.customcommands.enchantedarmor ? `Toggles Anti Enchanted Armor for all players.` : textDisabled}`,
        `§d${prefix}autoaura§r - ${config.customcommands.autoaura ? `Toggles Auto KillAura checks for all players.` : textDisabled}`,
        `§d${prefix}antikb§r - ${config.customcommands.antikb ? `Toggles Anti Knockback for all players.` : textDisabled}`,
        `§d${prefix}badpackets1§r - ${config.customcommands.badpackets1 ? `Checks message length for each broadcast.` : textDisabled}`,
        `§d${prefix}spammera§r - ${config.customcommands.spammera ? `Checks if message is sent while moving.` : textDisabled}`,
        `§d${prefix}spammerb§r - ${config.customcommands.spammerb ? `Checks if message is sent while swinging.` : textDisabled}`,
        `§d${prefix}spammerc§r - ${config.customcommands.spammerc ? `Checks if message is sent while using items.` : textDisabled}`,
        `§d${prefix}spammerd§r - ${config.customcommands.spammerd ? `Checks if message is sent while GUI is open.` : textDisabled}`,
        `§d${prefix}antispam§r - ${config.customcommands.antispam ? `Checks for spamming in chat with 2 second cooldown.` : textDisabled}`,
        `§d${prefix}crashera§r - ${config.customcommands.crashera ? `Prevents Horion crasher.` : textDisabled}`,
        `§d${prefix}crasherb§r - ${config.customcommands.crasherb ? `Prevents Arrow crasher.` : textDisabled}`,
        `§d${prefix}namespoofa§r - ${config.customcommands.namespoofa ? `Checks if player's name exceeds character limitations.` : textDisabled}`,
        `§d${prefix}namespoofb§r - ${config.customcommands.namespoofb ? `Checks if player's name has Non ASCII characters.` : textDisabled}`,
        `§d${prefix}reacha§r - ${config.customcommands.reacha ? `Checks if player's place blocks beyond reach.` : textDisabled}`,
        `§d${prefix}reachb§r - ${config.customcommands.reachb ? `Checks if player's break blocks beyond reach.` : textDisabled}`,
        `§d${prefix}reachc§r - ${config.customcommands.reachc ? `Checks if player's attack beyond reach.` : textDisabled}`,
        `§d${prefix}noslowa§r - ${config.customcommands.noslowa ? `Checks if player's are speed hacking.` : textDisabled}`,
        `§d${prefix}flya§r - ${config.customcommands.flya ? `Checks if player's are flying in survival.` : textDisabled}`,
        `§d${prefix}illegalitemsa§r - ${config.customcommands.illegalitemsa ? `Checks if player's have illegal items in inventory.` : textDisabled}`,
        `§d${prefix}illegalitemsb§r - ${config.customcommands.illegalitemsb ? `Checks if player's use illegal items.` : textDisabled}`,
        `§d${prefix}illegalitemsc§r - ${config.customcommands.illegalitemsc ? `Checks if player's place illegal items.` : textDisabled}`,
        `§d${prefix}illegalitemsd§r - ${config.customcommands.illegalitemsd ? `Checks for illegal dropped items in the world.` : textDisabled}`,
        `§d${prefix}illegalenchant§r - ${config.customcommands.illegalenchant ? `Checks items for illegal enchants.` : textDisabled}`,
        `§d${prefix}illegallores§r - ${config.customcommands.illegallores ? `Checks for illegal lores in items.` : textDisabled}`,
        `§d${prefix}invalidsprinta§r - ${config.customcommands.invalidsprinta ? `Toggles checks for illegal sprint with blindness.` : textDisabled}`,
        `§d${prefix}stackban§r - ${config.customcommands.stackban ? `Checks if player's have illegal stacks over 64.` : textDisabled}`,
        `§d${prefix}antiscaffolda§r - ${config.customcommands.antiscaffolda ? `Checks player's for illegal scaffolding.` : textDisabled}`,
        `§d${prefix}antinukera§r - ${config.customcommands.antinukera ? `Checks player's for nuking blocks.` : textDisabled}`,
        `§d${prefix}xraya§r - ${config.customcommands.xraya ? `Notify's staff when and where player's mine specific ores.` : textDisabled}`,
        `§d${prefix}chatranks§r - ${config.customcommands.chatranks ? `Toggles chat ranks.` : textDisabled}`,
        `§d${prefix}antishulker§r - ${config.customcommands.antishulker ? `Toggles shulkers in the world.` : textDisabled}`,
        `§d${prefix}antiteleport§r - ${config.customcommands.antiteleport ? `Prevents player's from illegally teleporting.` : textDisabled}`,
        `§d${prefix}rbcr§r - ${config.customcommands.rbcr ? `Toggles option to use Realm Bot Chat Relay.` : textDisabled}`,
        `§d${prefix}ops§r - ${config.customcommands.ops ? `Toggles One Player Sleep (OPS) for all online players.` : textDisabled}`,
        `§d${prefix}salvage§r - ${config.customcommands.salvage ? `Toggles new salvage system [Experimental].` : textDisabled}`,
        `§d${prefix}badpackets2§r - ${config.customcommands.badpackets2 ? `Toggles checks for invalid selected slots by player.` : textDisabled}`,
        `§d${prefix}clearlag§r - ${config.customcommands.clearlag ? `Clears items and entities with timer.` : textDisabled}`,
        ` `,
        `§l§b-§cTools and Utilites§b-§r`,
        `§d${prefix}give <username> <item> <amount>§r - ${config.customcommands.give ? `Gives player items.` : textDisabled}`,
        `§d${prefix}auracheck <username>§r - ${config.customcommands.auracheck ? `Manual test for KillAura.` : textDisabled}`,
        `§d${prefix}ecwipe <username>§r - ${config.customcommands.ecwipe ? `Clears a players ender chest.` : textDisabled}`,
        `§d${prefix}fly <username>§r - ${config.customcommands.fly ? `Toggles fly mode in survival.` : textDisabled}`,
        `§d${prefix}freeze <username>§r - ${config.customcommands.freeze ? `Freeze a player and make it so they cant move.` : textDisabled}`,
        `§d${prefix}stats <username>§r - ${config.customcommands.stats ? `View a specific players anticheat logs.` : textDisabled}`,
        `§d${prefix}fullreport§r - ${config.customcommands.fullreport ? `View everyones anticheat logs.` : textDisabled}`,
        `§d${prefix}vanish§r - ${config.customcommands.vanish ? `Toggles vanish (Used for spying on suspects).` : textDisabled}`,
        `§d${prefix}chatranks§r - ${config.customcommands.chatranks ? `Toggles chat ranks.` : textDisabled}`,
        `§d${prefix}clearchat§r - ${config.customcommands.clearchat ? `Clears chat.` : textDisabled}`,
        `§d${prefix}invsee <username>§r - ${config.customcommands.invsee ? `Lists all the items in the usernames inventory.` : textDisabled}`,
        `§d${prefix}sethome <name>§r - ${config.customcommands.sethome ? `Saves current coordinates as home.` : textDisabled}`,
        `§d${prefix}gohome <name>§r - ${config.customcommands.gohome ? `Teleport back to saved home coordinates.` : textDisabled}`,
        `§d${prefix}listhome§r - ${config.customcommands.listhome ? `Shows your list of saved locations.` : textDisabled}`,
        `§d${prefix}delhome <name>§r - ${config.customcommands.delhome ? `Deletes a saved location from list.` : textDisabled}`,
        `§d${prefix}tpr <username>§r - ${config.customcommands.tpr ? `Sends a request to teleport to a player or blocks/unblocks requests.` : textDisabled}`,
        `§d${prefix}hotbar <optional>§r - ${config.customcommands.hotbar ? `Toggles hotbar message for all players. Optional: Message` : textDisabled}`,
        ` `,
        `§l§b-§cDebugging Utilites§b-§r`,
        `§d${prefix}listitems§r - ${config.debug ? `Prints every item in the game and their max stack.` : textDisabled}`,
        ` `,
        `§l§b-§cFor more info execute the command with §6help§b-§r`,
    ]);
}
