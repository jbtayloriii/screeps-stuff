/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.roles');
 * mod.thing == 'a thing'; // true
 */
 
 var creepActions = require('creep.actions');

 var actions = {
     harvestClosestSourceInRoom : 1,
     returnEnergyToStructures : 2,
     buildConstruction : 3
 }
 
 module.exports.role = {};

module.exports.role.harvester = {
    1 : {"action" : actions.harvestClosestSourceInRoom, "next" : 2 },
    2 : {"action" : actions.returnEnergyToStructures, "next" : 1, "priority" : [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_CONTAINER], "alt" : 3 },
    3 : {"action" : actions.buildConstruction, "next" : 1 }
};

module.exports.role.builder = {
    1 : {"action" : actions.harvestClosestSourceInRoom, "next" : 2 },
    2 : {"action" : actions.buildConstruction, "next" : 1, "alt" : 3 },
    3 : {"action" : actions.harvestClosestSourceInRoom, "next" : 2 } //switch this for repairing or something
}


module.exports.actions = creepActions;