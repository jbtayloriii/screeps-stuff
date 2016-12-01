/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.actions');
 * mod.thing == 'a thing'; // true
 */
 
 //var creepRoles = require('creep.roles');
 
 var creepActions = {
     
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
        return -2;
    },

    returnEnergyToStructures : function(creep, args) {
        var structureId = creep.getStructureIdNeedingEnergyWithPriority(args.priority, creep.carry);
        if(!structureId) {
            return -1;
        }
        
        var structure = Game.getObjectById(structureId);
        
        transferCode = creep.transfer(structure, RESOURCE_ENERGY);
        console.log(transferCode + " hello");
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
        return -2;
    },
    
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
            } else {
                creep.removeConstructionId();
                return 1;
            }
        }
        return -2;
    }
}

module.exports = creepActions;