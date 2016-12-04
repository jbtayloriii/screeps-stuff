/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.roles');
 * mod.thing == 'a thing'; // true
 */
 
var creepActions = require('creep.actions');
var functions = creepActions.functions;
var actions = creepActions.actions;
var actions2 = creepActions.actions2;
 
module.exports.role = {};

module.exports.role.harvester = {
    start : "harvest",
    
    actions : {
        "harvest" : {
            action : actions2.harvestClosestSource,
            next : "returnToStructure"
        },
        "returnToStructure" : {
            action : actions2.returnEnergyToStructures,
            next : "harvest",
            args : {
                priority : [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_CONTAINER]
            }
        }
    }
}


module.exports.role.upgrader = {
    start : "harvest",
    actions : {
        "harvest" : {
            action : actions2.harvestClosestSource,
            next : "upgrade"
        },
        "upgrade" : {
            action : actions2.upgradeSource,
            next : "harvest"
        }
    }
}

module.exports.role.repairer = {
    start : "harvest",
    actions : {
        "harvest" : {
            action : actions2.harvestClosestSource,
            next : "repair"
        },
        "repair" : {
            action : actions2.repairBuilding,
            next : "harvest"
        }
    }
}

module.exports.role.builder = {
    start : "harvest",
    actions : {
        "harvest" : {
            action : actions2.harvestClosestSource,
            next : "build"
        },
        "build" : {
            action : actions2.buildConstruction,
            next : "harvest"
        }
    }
}


module.exports.actions = creepActions;