/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('memory.static.source');
 * mod.thing == 'a thing'; // true
 */

require('memory.core');

module.exports.mapSource = function(mSourceObj) {
    if(Memory.static.sources[mSourceObj.id]) {
        return true;
    }
    
    var sourceMemObj = {};
    sourceMemObj.x = mSourceObj.pos.x;
    sourceMemObj.x = mSourceObj.pos.y;
    Memory.static.sources[mSourceObj.id] = sourceMemObj;
    
    return true;
}