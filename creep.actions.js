/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.actions');
 * mod.thing == 'a thing'; // true
 */
 
 //var creepRoles = require('creep.roles');
 
 
module.exports.actions2 = {
    harvestClosestSource : "harvestClosestSource",
    returnEnergyToStructures : "returnEnergyToStructures",
    buildConstruction : "buildConstruction",
    upgradeSource : "upgradeSource",
    repairBuilding : "repairBuilding"
}
 
module.exports.functions = {
     
    harvestClosestSource : function(creep, args) {
        var sourceId = creep.getClosestEnergySourceId();

        if(!sourceId) {
            return -1;
        }
        
        var source = Game.getObjectById(sourceId);
        
        harvestCode = creep.harvest(source);
        
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
        
        return -2;
    },

    //args : priority - a list of the priority to return energy to structures
    returnEnergyToStructures : function(creep, args) {
        var structureId = creep.getStructureIdNeedingEnergyWithPriority(args.priority, creep.carry);
        if(!structureId) {
            return -1;
        }
        
        var structure = Game.getObjectById(structureId);
        
        transferCode = creep.transfer(structure, RESOURCE_ENERGY);
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
        if(!constructionId) {
            return -1;
        }
        
        var construction = Game.getObjectById(constructionId);
        buildCode = creep.build(construction);
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
            return -1; //room does not have a controller
        }
        
        upgradeCode = creep.upgradeController(creep.room.controller);
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
        
        console.log("bad upgrade code reached " + upgradeCode);
        return -2;
    },
    
    repairBuilding : function(creep, args) {
        var repairId = creep.getRepairId();
        if(!repairId) {
            return -1;
        }
        var repairObj = Game.getObjectById(repairId);
        if(!repairObj) {
            return -1;
        }
        
        repairCode = creep.repair(repairObj);
        if(repairCode == ERR_NOT_IN_RANGE) {
            creep.moveTo(repairObj);
            return 0;
        }
        if(repairCode == OK && repairObj.hits < repairObj.hitsMax && repairObj.hits <= 20000) {
            return 0;
        }
        if(repairCode == OK || repairObj.hits == repairObj.hitsMax || repairObj.hits > 20000) {
            return 1;
        }
        
        return -2;
    }
}

module.exports.actions = {
     harvestTest : "testAction",
     harvestClosestSourceInRoom : 1,
     returnEnergyToStructures : 2,
     buildConstruction : 3
}
