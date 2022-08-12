import { world, ItemStack, MinecraftItemTypes } from "mojang-minecraft";

function getSkill(player) {
    return world.scoreboard.getObjective('Dones').getScore(player.scoreboard);
}

function enderPearl(object) {
    
    const pearlItem = ["minecraft:ender_pearl"];
    if ( item.id in pearlItem && getSkill(object) === 2) {
        //object.cancel = true;
        let { item, source } = object;
        let hand = source.selectedSlot;
        let invContainer = source.getComponent("minecraft:inventory");
        invContainer.container.setItem(hand, new ItemStack(MinecraftItemTypes.air, 0));
        sendMsg("@a[tag=notify]", `§r§4[§bUntravel§eMx§4]§r Removed ${item.id.replace("minecraft:", "")} from ${source.nameTag}.`);
        sendMsgToPlayer(source, `§r§4[§bUntravel§eMx§4]§r Ender<Pearl are not allowed!`);
    }    
}


const ENDER_PEARL = () => {
    world.events.beforeItemUse.subscribe(enderPearl);
};
export { ENDER_PEARL };
