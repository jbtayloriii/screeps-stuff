var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
require('memory.main');
var roleBase = require('role.base');
var creepCreator = require('room.creepCreator');
var creepAction = require('creep.action');
var creepActions = require('creep.actions');

var spawnManager = require('spawn.manager');

var testLog = require('testLog');

var memorySpawn = require('memory.spawn');

module.exports.loop = function () {
    var spawn = Game.spawns['spawn1'];
    spawn.refreshMemory();
    
    testLog.testLogLoopFunc();
    
    var sources = spawn.room.find(FIND_SOURCES);
    for(var i = 0; i < sources.length; i++) {
        var source = sources[i];
        source.refreshMemory(false);
    }
    
    // for(var roomName in Game.rooms) {
    //     roomManager.manage(Game.rooms[roomName]);
    // }
    
    spawnManager.manage(spawn);
    
    //spawn.room.refreshMemory(true);
    
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            //console.log('Clearing non-existing creep memory:', name);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        //reset all creeps if needed
        //creepAction.setupCreep(creep);
        
        if(!creep.memory.roleMapped) {
            creepAction.setupCreep(creep);
        }
        creep.room.refreshMemory(false);
        
        creep.act();
    }
}