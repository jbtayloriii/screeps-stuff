var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roomAnalyzer = require('roomAnalyzer');
require('memory.main');
var spawnRoom = require('spawnRoom.manager');
var roleBase = require('role.base');
var creepCreator = require('room.creepCreator');
var creepAction = require('creep.action');
var creepActions = require('creep.actions');

var memorySpawn = require('memory.spawn');

module.exports.loop = function () {
    var spawn = Game.spawns['spawn1'];
    spawn.refreshMemory();
    
    var sources = spawn.room.find(FIND_SOURCES);
    for(var i = 0; i < sources.length; i++) {
        var source = sources[i];
        source.refreshMemory(false);
    }
    
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            //console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    if(creepCreator.shouldCreateCreep(spawn)) {
        creepCreator.createCreep(spawn);
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        //test
        //creepAction.setupCreep(creep);
        
        
        if(!creep.memory.roleMapped) {
            creepAction.setupCreep(creep);
        }
        
        creep.room.refreshMemory(false);
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
            creep.act();
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}