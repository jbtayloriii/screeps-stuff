/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('memory.main');
 * mod.thing == 'a thing'; // true
 */
 
require('memory.room');
require('memory.source');
require('memory.spawn');
var memoryCache = require('memory.cache');
var memoryCreep = require('memory.creep');


var memoryMain = {
    
    refreshMemory : function(hardReset) {
        if(hardReset) {
            console.log("Hard reset of memory");
            delete Memory.static;
        }
        
        if(hardReset || !Memory.cache) {
            memoryCache.reset();
        }
        
        if(!Memory.static) {
            Memory.static = {};
        }
        
        for(var roomName in Game.rooms) {
            Game.rooms[roomName].refreshMemory(hardReset);
            var sources = Game.rooms[roomName].find(FIND_SOURCES);
            for(var sourceName in sources) {
                sources[sourceName].refreshMemory(hardReset);
            }
        }
        
        for(var spawnName in Game.spawns) {
            Game.spawns[spawnName].refreshMemory(hardReset);
        }
        

        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            creep.refreshMemory(hardReset);
        }
        
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                memoryCreep.deleteCreep(name);
            }
        }
    }
}

module.exports = memoryMain;