/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('memory.spawn');
 * mod.thing == 'a thing'; // true
 */




/*
 * Spawn
 *  -   mapped
 *  -   info
 *  -   
 *
 *
 */


function isMapped(spawn) {
    return false;
    for(var memorySpawn in Game.memory.spawns) {
        if (spawn.id == memorySpawn.id) {
            return true;
        }
    }
    return false;
}

function mapSpawnObject(spawn) {
    
    var spawnInfo = {};
    //spawnInfo.creeps = spawn.room.creeps.length;
    
    return spawnInfo;
    

}

 StructureSpawn.prototype.refreshMemory = function(hardRefresh) {
     if(this.memory.mapped && !hardRefresh) {
         return this;
     }
     var spawnMemory = mapSpawnObject(this);
     
     console.log("test");
     this.memory.info = spawnMemory;
     this.memory.mapped = true;
     
     return this;
 }

module.exports = null;