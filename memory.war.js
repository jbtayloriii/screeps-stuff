/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('memory.war');
 * mod.thing == 'a thing'; // true
 */

module.exports.getWarTargetsForRoom = function(mRoom) {
    if(!Memory.war) {
        return {};
    }
    if(!Memory.war[mRoom]) {
        return {};
    }
    return Memory.war[mRoom].targets;
}

module.exports.getWarTargetCountForRoom = function(mRoom) {
    if(Memory.war && Memory.war[mRoom.name] && Memory.war[mRoom.name].targets) {
        return Object.keys(Memory.war[mRoom.name].targets).length;
    }
    return 0;
}

module.exports.removeWarTarget = function(mRoom, mTargetRoom) {
    if(Memory.war[mRoom].targets) {
        delete Memory.war[mRoom].targets[mTargetRoom];
    }
}