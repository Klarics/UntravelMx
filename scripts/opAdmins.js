// import { world } from "mojang-minecraft";
// import config from "./data/config";
// import { crypto, UUID, getPrefix, sendMsg, sendMsgToPlayer } from "util.js";

// const World = world;

// export function opAdmin(){
//     let player = player.hasTag('Adminer')

//     let hash = player.getDynamicProperty("hash");
//     let salt = player.getDynamicProperty("salt");
//     let args = config.modules.encryption.password;
//     let encode;

//     if (salt === undefined && args[0] === config.modules.encryption.password) {
//         player.setDynamicProperty("salt", UUID.generate());
//         salt = player.getDynamicProperty("salt");
//     }
//     // If no hash then create one
//     if (hash === undefined && args[0] === config.modules.encryption.password) {
//         encode = crypto(salt, config.modules.encryption.password);
//         player.setDynamicProperty("hash", encode);
//         hash = player.getDynamicProperty("hash");
//     }
//     else {
//         try {
//             encode = crypto(salt, config.modules.encryption.password);
//         }
//         catch (error) { }
//     }
//     if (hash === undefined || (hash !== encode && args !== config.modules.encryption.password) || !player.hasTag('Adminer')) {
//         return sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r You need to be Paradox-Opped to use this command.`);
//     }
//     else if (hash === encode && args === config.modules.encryption.password || player.hasTag('Adminer')) {
//         // Old stuff that makes up for less than 5% of the project
//         sendMsgToPlayer(player, `§r§b-§5§lUntravel§eMx§b-§r You are now op!`);
//         sendMsg("@a[tag=paradoxOpped]", `§r§b-§5§lUntravel§eMx§b-§r ${player.nameTag}§r is now Paradox-Opped.`);
//         player.addTag("paradoxOpped");
//         player.addTag('Admin');
//         player.addTag('Moderator');
//         player.addTag('Helper');
//         player.addTag('Ambassador');
//         return;
//     }

// }