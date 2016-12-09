/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('memory.cache');
 * mod.thing == 'a thing'; // true
 */

module.exports.reset = function() {
    console.log("Resetting static cache");
    Memory.cache = {};
}