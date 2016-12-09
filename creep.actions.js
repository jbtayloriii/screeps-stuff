/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.actions');
 * mod.thing == 'a thing'; // true
 */
 
var logMsg = true;
var constants = require('base.constants');
 
 
module.exports.actions = {
    harvestClosestSource : "harvestClosestSource",
    returnEnergyToStructures : "returnEnergyToStructures",
    buildConstruction : "buildConstruction",
    upgradeSource : "upgradeSource",
    repairBuilding : "repairBuilding",
    getClosestEnergyStorage : 'getClosestEnergyStorage',
    powerHarvestSource : 'powerHarvestSource',
    getCarrierContainerEnergy : 'getCarrierContainerEnergy',
    die : 'die'
}
 
module.exports.functions = {
     
    harvestClosestSource : function(creep, args) {
        if(creep.carry.energy == creep.carryCapacity) {
            creep.forgetCurrentSourceId();
            return 1;
        }
        
        var sourceId = creep.getClosestEnergySourceId();
        if(sourceId == constants.ERR_SOURCES_FULL) {
            creep.say("Waiting on source");
            return 0;
        }
        if(!sourceId) {
            if(logMsg) {
                console.log("creep.actions: harvestClosestSource: No source Id; creep: " + creep.name);
            }
            creep.forgetCurrentSourceId();
            return -1;
        }
        
        var source = Game.getObjectById(sourceId);
        
        var harvestCode = creep.harvest(source);
        
        if(harvestCode == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
            return 0;
        } else if(harvestCode == OK) {
            if(creep.carry.energy < creep.carryCapacity) {
                return 0;
            } else {
                creep.forgetCurrentSourceId();
                return 1;
            }
        }
        if(creep.carry.energy == creep.carryCapacity) {
            creep.forgetCurrentSourceId();
            return 1;
        }
        
        creep.forgetCurrentSourceId();
        return -2;
    },
    
    die : function(creep, args) {
        creep.suicide();
    },
    
    powerHarvestSource : function(creep, args) {
        sourceCont = creep.getOpenPowerSourcePosition();
        if(!sourceCont) {
            return 0;
        }
        if(!(creep.pos.x == sourceCont.pos.x) || !(creep.pos.y == sourceCont.pos.y)) {
            creep.moveTo(sourceCont.pos);
            return 0;
        }
        
        var harvestCode = creep.harvest(Game.getObjectById(sourceCont.sourceId));
        return 0;
    },
    
    getCarrierContainerEnergy : function(creep, args) {
        var containerObj;
        
        var goodObj = false;
        
        
        if(creep.memory.currentCarrierSourceContainerId) {
            containerObj = Game.getObjectById(creep.memory.currentCarrierSourceContainerId);
            if(containerObj) {
                goodObj = true;
            }
        }
        
        if(!goodObj) {
            var sourceInfo = creep.room.memory.sources;
            for(var i = 0; i < sourceInfo.length; i++) {
                var sourceId = sourceInfo[i];
                if(!Memory.sources[sourceId].sourceContainer || Memory.sources[sourceId].sourceContainer.carrier) {
                    continue;
                }
                Memory.sources[sourceId].sourceContainer.carrier = creep.name;
                creep.memory.currentCarrierSourceContainerId = Memory.sources[sourceId].sourceContainer.containerId;
                console.log(creep.name + " carrying for source " + sourceId);
                containerObj = Game.getObjectById(creep.memory.currentCarrierSourceContainerId);
            }
        }
        
        if(!containerObj) {
            console.log(creep.name + ": No container Id found for carrier");
            return 0;
        }
        
        transferCode = creep.withdraw(containerObj, RESOURCE_ENERGY);
        if(creep.carry.energy == creep.carryCapacity) {
            return 1;
        }
        
        if(transferCode == ERR_NOT_IN_RANGE) {
            creep.moveTo(containerObj);
            return 0;
        }
        return -2;
    },
    
    getClosestEnergyStorage : function(creep, args) {
        var storageId = creep.getClosestEnergyStorageId(args.priority);
        var storageObj = Game.getObjectById(storageId);
        if(!storageId || ! storageObj) {
            console.log(creep.name + ": No storage Id found");
            return 0;
        }
        
        transferCode = creep.withdraw(storageObj, RESOURCE_ENERGY);
        if(creep.carry.energy == creep.carryCapacity) {
            return 1;
        }
        
        if(transferCode == ERR_NOT_IN_RANGE) {
            creep.moveTo(storageObj);
            return 0;
        }
        return -2;
    },

    //args : priority - a list of the priority to return energy to structures
    returnEnergyToStructures : function(creep, args) {
        var structureId = creep.getStructureIdNeedingEnergyWithPriority(args.priority, creep.carry);
        if(!structureId) {
            delete creep.memory.currentTargetStructureId;
            return -1;
        }
        
        var structure = Game.getObjectById(structureId);
        
        var transferCode = creep.transfer(structure, RESOURCE_ENERGY);
        if(creep.carry.energy == 0) {
            delete creep.memory.currentTargetStructureId;
            return 1;
        }
        if(transferCode == ERR_NOT_IN_RANGE) {
            creep.moveTo(structure);
            return 0;
        } else if(transferCode == OK) {
            if(creep.carry.energy > 0) {
                return 0;
            } else {
                delete creep.memory.currentTargetStructureId;
                return 1;
            }
        } else if(transferCode == ERR_NOT_ENOUGH_ENERGY) {
            delete creep.memory.currentTargetStructureId;
            return 1;
        }
        
        if(creep.carry.energy == 0) {
            delete creep.memory.currentTargetStructureId;
            return 1;
        }
        
        return -2;
    },
    
    //args : None
    buildConstruction : function(creep, args) {
        var constructionId = creep.getConstructionId();
        if(constructionId == constants.ERR_NO_CONSTRUCTION) {
            //console.log(creep.name + " would remove builder here");
            creep.removeConstructionId();
            //return -1;
            return -3;
        }
        
        var construction = Game.getObjectById(constructionId);
        var buildCode = creep.build(construction);
        if(buildCode == ERR_NOT_IN_RANGE) {
            creep.moveTo(construction);
            return 0;
        } else if(buildCode == OK) {
            if(creep.carry.energy > 0) {
                return 0;
            }
        }
        
        if(creep.carry.energy == 0) {
            creep.removeConstructionId();
            return 1;
        }
        return -2;
    },
    
    //args : none
    upgradeSource : function(creep, args) {
        if(!creep.room.controller) {
            if(logMsg) {
                console.log("creep.actions: upgradeSource: No controller");
            }
            return -1;
        }
        
        var upgradeCode = creep.upgradeController(creep.room.controller);
        if(upgradeCode == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
            return 0;
        } else if(upgradeCode == OK){
            if(creep.carry.energy > 0) {
                return 0;
            }
        }
        
        if(creep.carry.energy == 0) {
            return 1;
        }
        if(logMsg) {
            console.log("bad upgrade code reached " + upgradeCode);
        }
        return -2;
    },
    
    repairBuilding : function(creep, args) {
        if(creep.carry.energy == 0) {
            delete creep.memory.currentRepairId;
            return 1;
        }
        var repairId = creep.getRepairId();
        if(!repairId) {
            delete creep.memory.currentRepairId;
            return -1;
        }
        var repairObj = Game.getObjectById(repairId);
        if(!repairObj) {
            delete creep.memory.currentRepairId;
            return -1;
        }
        
        var repairCode = creep.repair(repairObj);
        if(repairCode == ERR_NOT_IN_RANGE) {
            creep.moveTo(repairObj);
            return 0;
        }
        if(repairCode == OK && repairObj.hits < repairObj.hitsMax && repairObj.hits <= constants.repairCutoff) {
            return 0;
        }
        if(repairCode == OK || repairObj.hits == repairObj.hitsMax || repairObj.hits > constants.repairCutoff) {
            delete creep.memory.currentRepairId;
            return 1;
        }
        
        return -2;
    },
    
    travelToRoom : function(creep, args) {
        var roomName = creep.memory.targetRoom;
        if(creep.room.name == roomName) {
            return 1;
        } else {
            var exit = creep.room.findExitTo(roomName);
            creep.moveTo(creep.pos.findClosestByRange(exit));
            return 0;
        }
    },
    
    travelToSpawnRoom : function(creep, args) {
        var spawnId = creep.memory.spawnId;
        if(!spawnId) {
            console.log("Creep does not have home spawn ID");
        }
        var spawnRoomName = Game.getObjectById(spawnId).room.name;
        if(creep.room.name == spawnRoomName) {
            return 1;
        } else {
            var exit = creep.room.findExitTo(spawnRoomName);
            creep.moveTo(creep.pos.findClosestByRange(exit));
            return 0;
        }
        return -2
    }
}