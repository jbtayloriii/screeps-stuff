/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('room.creepCreator');
 * mod.thing == 'a thing'; // true
 */
 
 var roleHarvester = require('role.harvester');
 
var maxCreeps = 10; //maximum creeps per spawn room



var creepCreator = {
    
    
    shouldCreateCreep : function(spawn) {
        if(spawn.room.find(FIND_MY_CREEPS).length < maxCreeps) {
            return true;
        }
        return false;
    },
    
    getCreepRoleNeeded : function(mRoom) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        
        if(harvesters.length == 0) {
            return "harvester";
        }
        if(upgraders.length == 0) {
            return "upgrader";
        }
        if(repairers.length == 0) {
            return "repairer";
        }
        if(mRoom.find(FIND_CONSTRUCTION_SITES).length > 0 && builders.length == 0) {
            return "builder";
        }
        
        if(harvesters.length < 4) {
            return "harvester";
        }
        
        if(upgraders.length < 3) {
            return "upgrader";
        }
        
        return "repairer";
    },
    
    queueCreep : function(room) {
        
    },
    
    getBody : function(spawn) {
        
    },

    createCreep : function(spawn) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        
        
        if(harvesters.length < 4) {
            var harvesterBody = roleHarvester.getBody(spawn);
            if(harvesterBody.length > 0) {
                var newName = spawn.createCreep(harvesterBody, undefined, {role: 'harvester'});
                console.log('Spawning new harvester with body: ' + harvesterBody.toString() + " name: " + newName);
            } else {
            }
        }
        
        if(upgraders.length < 3) {
            console.log("Trying to create upgrader");
            var newName = spawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
            console.log(newName);
        } else if(builders.length < 3 && spawn.room.find(FIND_CONSTRUCTION_SITES).length > 0) {
            if(spawn.canCreateCreep([WORK, CARRY, MOVE, MOVE], undefined) == OK) {
                var newName = spawn.createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
                console.log('Spawning new builder: ' + newName);
            }
        }
    }
    
    
}

module.exports = creepCreator;