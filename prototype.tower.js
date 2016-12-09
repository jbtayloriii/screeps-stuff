/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('prototype.tower');
 * mod.thing == 'a thing'; // true
 */
var constants = require('base.constants');
 
StructureTower.prototype.repairStructures = function() {
    var room = this.room;
    
    
 
    var structure = this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => (structure.hits <= structure.hitsMax - 1000) && (structure.hits <= constants.repairCutoff)
    });
    
    if(structure) {
        repairCode = this.repair(structure);
    }
     
}

StructureTower.prototype.attackEnemy = function() {
    var closestHostile = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(closestHostile) {
        this.attack(closestHostile);
        return true;
    }
    return false;
}
 
 
 

module.exports = null;