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
var memoryWar = require('memory.war');
var memoryOwned = require('memory.ownedRooms');
var roomExpansion = require('room.expansion');
var staticRoom = require('static.room');


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
    
    getMemoryObjNeeded : function(mRoom) {
        if(Object.keys(Game.creeps).length == 0) {
            return {role : "harvester"};
        }
        if(mRoom.controller.level == 1) {
            return {role : 'basicUpgrader'};
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
        var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
        

        
        var sites = Object.keys(Game.constructionSites).length;
        var repairSites = getBuildingsNeedingRepair(mRoom);
        
        if(powerHarvesters.length == 0) {
            return  {role : "powerHarvester"};
        }
        
        if (carrierCreepSpawn.length == 0) {
            return  {role : "carrierCreepSpawn"};
        }
        
        if (carrierTower.length == 0) {
            //return "carrierTower";
        }
        
        if (carrierStorage.length == 0) {
            return  {role : "carrierStorage"};
        }
        
        if(upgraders.length == 0) {
            return  {role : "upgrader"};
        }
        
        if(powerHarvesters.length < Memory.rooms[mRoom.name].sources.length) {
            return  {role : "powerHarvester"};
        }
        
        if (carrierStorage.length < Memory.rooms[mRoom.name].sources.length) {
            return  {role : "carrierStorage"};
        }

        if (carrierCreepSpawn.length < 2) {
            return  {role : "carrierCreepSpawn"};
        }
        
        //check expansions for adequate creeps
        for(var expRoom in memoryOwned.getExpansions(mRoom.name)) {
            if(!roomExpansion.getClaimer(expRoom)) {

                //console.log("need a claimer in room " + expRoom);
                //return  {
                //    role : "claimer",
                //    targetRoom : expRoom
                //};
            }
            var openHarvestExp = roomExpansion.getOpenHarvestSources(expRoom);
            var openCarrierExp = roomExpansion.getOpenStorageCarrierSources(expRoom);
            //console.log("Open harvesters: " + openHarvestExp.length);
            //console.log("Carriers: " + openCarrierExp.length);
            
            if(openHarvestExp.length > 0) {
                return {
                    role : 'expansionPowerHarvester',
                    targetRoom : expRoom,
                    targetSource : openHarvestExp[0]
                };
            }
            if(openCarrierExp.length > 0) {
                return {
                    role : 'expansionStorageCarrier',
                    targetRoom : expRoom,
                    targetSource : openCarrierExp[0]
                };
            }

        }

        
        if(sites > 0 && builders.length == 0) {
            return  {role : "builder"};
        }
        
        if(fighters.length < memoryWar.getWarTargetCountForRoom(mRoom)) {
            //console.log("hello");
            return  {
                role : "fighter",
                targetRoom : 'W73S46'
            };
        }
        
        
        //Need to set up how to get repairer here
        // if(repairSites > 0 && repairers.length == 0) {
        //     //return "repairer";
        // }
        
        if(sites > 0 && builders.length < 4) {
            return  {role : "builder"};
        }
        
        if(repairSites > 0 && repairers.length < 4) {
            //return "repairer";
        }
        
        //create upgraders to use extra energy in the room
        if(upgraders.length < 6) { //|| mRoom.storage.store[RESOURCE_ENERGY] > 300000) {
            return  {role : "upgrader"};
        }
        
        return null;
    },
    
    getBestBody: function(role, maxEnergy) {
        if(role == "harvester") {
            return [WORK,CARRY,MOVE];
        }
        
        if(role == "powerHarvester") {
            return [WORK,WORK,WORK,WORK,WORK,MOVE];
        }

        if(role == "basicUpgrader") {
            return [WORK,CARRY,MOVE];
        }
        if(role == "expansionPowerHarvester") {
            return [WORK,WORK,WORK,MOVE,MOVE,MOVE];
        }

        if(role == "expansionStorageCarrier") {
            return [CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
        }

        if(role == "carrierCreepSpawn" || role == "carrierStorage") {
            return [CARRY,MOVE,CARRY,CARRY,MOVE,CARRY];
        }
        
        if(role == "claimer") {
            return [MOVE, MOVE, CLAIM, CLAIM];
        }
        
        
        //console.log("Energy capacity for this:" + maxEnergy);
        var currentBody = [];
        var currentIndex = 0;
        
        maxEnergy = Math.min(maxEnergy, 800);
        
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