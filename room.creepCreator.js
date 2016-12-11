/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('room.creepCreator');
 * mod.thing == 'a thing'; // true
 */
 
var creepBodies = require('creep.body');
var constants = require('base.constants');
var powerHarvester = require('role.powerHarvester');
var memoryWar = require('memory.war');
var memoryExpansion = require('expansion.memory');

var partCost = {
    "work" : 100,
    "move" : 50,
    "carry" : 50,
    "attack" : 80,
    "ranged_attack" : 150,
    "heal" : 250,
    "claim" : 600,
    "tough" : 10
}

function getBuildingsNeedingRepair(mRoom) {
    var repairSites = mRoom.find(FIND_STRUCTURES, {
        filter: (structure) => (structure.hits < structure.hitsMax) && (structure.hits <= constants.repairCutoff)
    });
    return repairSites.length;
}


var creepCreator = {
    
    
    shouldCreateCreep : function(spawn) {
        if(spawn.room.find(FIND_MY_CREEPS).length < constants.maxCreeps) {
            return true;
        }
        return false;
    },
    
    getCreepRoleNeeded : function(mRoom) {
        if(Object.keys(Game.creeps).length == 0) {
            return "harvester";
        }
        
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        var powerHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'powerHarvester');
        var carrierTower = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrierTower');
        var carrierCreepSpawn = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrierCreepSpawn');
        var carrierStorage = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrierStorage');
        var fighters = _.filter(Game.creeps, (creep) => creep.memory.role == 'fighter');
        var expansionPowerHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'expansionPowerHarvester');
        var expansionStorageCarrier = _.filter(Game.creeps, (creep) => creep.memory.role == 'expansionStorageCarrier');
        
        
        
        var sites = mRoom.find(FIND_CONSTRUCTION_SITES).length;
        var repairSites = getBuildingsNeedingRepair(mRoom);
        
        if(powerHarvesters.length == 0) {
            return "powerHarvester";
        }
        
        if (carrierCreepSpawn.length == 0) {
            return "carrierCreepSpawn";
        }
        
        if (carrierTower.length == 0) {
            //return "carrierTower";
        }
        
        if (carrierStorage.length == 0) {
            return "carrierStorage";
        }
        
        if(upgraders.length == 0) {
            return "upgrader";
        }
        
        if(powerHarvesters.length < Memory.rooms[mRoom.name].sources.length) {
            return "powerHarvester";
        }
        
        if (carrierStorage.length < Memory.rooms[mRoom.name].sources.length) {
            return "carrierStorage";
        }
        
        if(memoryExpansion.getExpansionCount(mRoom.name) > expansionPowerHarvesters.length) {
            //console.log("expansions");
        }
        

        
        if(sites > 0 && builders.length == 0) {
            return "builder";
        }
        
        if(fighters.length < memoryWar.getWarTargetCountForRoom(mRoom)) {
            //console.log("hello");
            return "fighter";
        }
        
        
        //Need to set up how to get repairer here
        // if(repairSites > 0 && repairers.length == 0) {
        //     //return "repairer";
        // }
        
        if(sites > 0 && builders.length < 4) {
            return "builder";
        }
        
        if(repairSites > 0 && repairers.length < 4) {
            //return "repairer";
        }
        
        //create upgraders to use extra energy in the room
        if(upgraders.length < 6) { //|| mRoom.storage.store[RESOURCE_ENERGY] > 300000) {
            return "upgrader";
        }
        
        return "";
    },
    
    getBestBody: function(role, maxEnergy) {
        if(role == "harvester") {
            return [WORK,CARRY,MOVE];
        }
        
        if(role == "powerHarvester") {
            return powerHarvester.getBody();
        }
        if(role == "carrierCreepSpawn" || role == "carrierStorage") {
            return [CARRY,MOVE,CARRY,CARRY,MOVE,CARRY];
        }
        
        
        //console.log("Energy capacity for this:" + maxEnergy);
        var currentBody = [];
        var currentIndex = 0;
        
        maxEnergy = Math.min(maxEnergy, 600);
        
        if(!creepBodies[role]) {
            console.log("room.creepCreator: Error getting body for role " + role);
            return [WORK,MOVE,CARRY];
        }
        var templateObj = creepBodies[role];
        var template = templateObj.template;
        var partsCount = templateObj.moveParts;
        
        var moveCount = 0;
        while(maxEnergy >= 0) {
            if(currentIndex >= template.length) {
                currentIndex = 0;
            }
            var nextPart = template[currentIndex];
            var nextCost = partCost[nextPart];
            if(moveCount == 0) {
                nextCost +=50;
            }
            
            if(maxEnergy < nextCost) {
                if(currentBody.length > 3) {
                    return currentBody
                } else {
                    //return a default body instead of creating some mangled thing
                    return [WORK,MOVE,CARRY];
                }
            }
            
            currentBody.push(nextPart);
            if(moveCount == 0) {
                currentBody.push(MOVE);
            }
            
            if(moveCount >= partsCount - 1) {
                moveCount = 0;
            } else {
                moveCount++;
            }
            maxEnergy -= nextCost;
            currentIndex++;
        }
        
        console.log("room.creepCreator: Creating default body2 instead of " + currentBody + " for role " + role);
        return [WORK,MOVE,CARRY];
    }
    
    
}

module.exports = creepCreator;