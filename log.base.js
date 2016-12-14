/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('log.base');
 * mod.thing == 'a thing'; // true
 */

module.exports.initLog = function() {
    if(!Memory.log) {
        Memory.log = {};
    }
    if(!Memory.log.journal) {
        Memory.log.journal = {};
    }
    if(!Memory.log.report) {
        Memory.log.report = {};
    }
    
    if(!Memory.log.journal.entries) {
        Memory.log.journal.entries = [];
        Memory.log.journal.oldEntries = 0;
    }
}