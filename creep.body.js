/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.body');
 * mod.thing == 'a thing'; // true
 */

var template = {
    baseWork : {
        template : [WORK,CARRY,WORK,WORK],
        moveParts : 2
    },
    longDistanceCarry : {
        template : [WORK,CARRY],
        moveParts : 1
    }
}
 
 
 //Mapping creep roles to body templates

module.exports.harvester = {
    template : [WORK,CARRY,WORK,WORK],
    moveParts : 2
};

module.exports.fighter = {
    template : [ATTACK],
    moveParts : 1
}

module.exports.upgrader = {
    template : [WORK,CARRY,WORK,WORK],
    moveParts : 2
};

module.exports.builder = {
    template : [WORK,CARRY,WORK,WORK],
    moveParts : 2
};

module.exports.repairer = {
    template : [WORK,CARRY,WORK,WORK],
    moveParts : 2
};

module.exports.carrierStorage = {
    template : [CARRY],
    moveParts : 2
}

module.exports.carrierCreepSpawn = {
    template : [CARRY],
    moveParts : 2
}

module.exports.carrierTower = {
    template : [CARRY],
    moveParts : 2
}
module.exports.longDistanceHarvester = template.longDistanceCarry;