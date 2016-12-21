/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('memory.core');
 * mod.thing == 'a thing'; // true
 */

// Base script for setting up memory. Current used for (add more as needed):
// Memory.static
// Memory.expansionRooms
// Memory.static.rooms
// Memory.static.sources

if(!Memory.baseMapped) {
    console.log("Remapping base memory");
    if(!Memory.expansionRooms) {
        Memory.expansionRooms = {};
    }
    
    if(!Memory.static) {
        Memory.static = {};
    }
    if(!Memory.static.rooms) {
        Memory.static.rooms = {};
    }
    if(!Memory.static.sources) {
        Memory.static.sources = {};
    }
    if(!Memory.ownedRooms) {
        Memory.ownedRooms = {};
    }

    if(!Memory.scout) {
        Memory.scout = {};
    }
    if(!Memory.scout.rooms) {
        Memory.scout.rooms = {};
    }

    if(!Memory.sources) {
        Memory.sources = {};
    }

    if(!Memory.schedulers) {
        Memory.schedulers = {};
    }
    
    Memory.baseMapped = true;
}