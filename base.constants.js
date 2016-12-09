/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('base.constants');
 * mod.thing == 'a thing'; // true
 */
 
const LOG_DEBUG = false;
module.exports.repairCutoff = 10000;
module.exports.criticalRepairCutoff = 100;
module.exports.maxCreeps = 16;

module.exports.ERR_SOURCES_FULL = -1;
module.exports.ERR_SOURCES_NO_ENERGY = -2;
module.exports.ERR_NO_CONSTRUCTION = -900;
