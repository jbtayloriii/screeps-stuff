/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('manual.war');
 * mod.thing == 'a thing'; // true
 */

module.exports.refreshWarMemory = function(mRoom) {
    if(!Memory.war) {
        Memory.war = {};
    }
    
    if(mRoom && !Memory.war[mRoom]) {
        Memory.war[mRoom] = {};
    }
}

// var man = require('manual.war'); man.addWarTarget(room, targetRoom, args);
// var man = require('manual.war'); man.addWarTarget('W73S47', 'W73S46');
// var man = require('manual.war'); man.addWarTarget('W73S47', 'W74S47');
module.exports.addWarTarget = function(mRoom, mTargetRoom, args) {
    module.exports.refreshWarMemory(mRoom);
    if(!Memory.war[mRoom].targets) {
        Memory.war[mRoom].targets = {};
    }
    Memory.war[mRoom].targets[mTargetRoom] = {};
}

module.exports.removeWarTarget = function(mRoom,mTargetRoom) {
    refreshWarMemory(mRoom);
    if(Memory.war[mRoom].targets) {
        delete Memory.war[mRoom].targets[mTargetRoom];
    }
}

module.exports.getWarTargets = function(mRoom) {
    refreshWarMemory();
}