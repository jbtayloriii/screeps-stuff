/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.roles');
 * mod.thing == 'a thing'; // true
 */
 
var creepActions = require('creep.actions');
var functions = creepActions.functions;
var actions2 = creepActions.actions;
 
module.exports.role = {};

module.exports.role.powerHarvester = {
    start : "harvest",
    actions : {
        "harvest" : {
            action : actions2.powerHarvestSource,
            next : "harvest"
        }
    }
}

module.exports.role.expansionPowerHarvester = {
    start : "findRoom",
    actions : {
        "findRoom" : {
            action : actions2.travelToRoom,
            next : "harvest"
        },
        "harvest" : {
            action : actions2.powerHarvestSource,
            next : "harvest"
        }
    }
}

module.exports.role.fighter = {
    start : "findRoom",
    actions : {
        "findRoom" : {
            action : actions2.travelToRoom,
            next : "fight"
        },
        "fight" : {
            action : actions2.meleeAttackEnemies,
            next : "fight"
        }
    }
}


//TODO
module.exports.role.expansionStorageCarrier = {
    start : "findRoom",
    actions : {
        "findRoom" : {
            action : actions2.travelToRoom,
            next : "getEnergy"
        },
        "getEnergy" : {
            action : actions2.getCarrierContainerEnergy,
            next : "findSpawn"
        },
        "findSpawn" : {
            action : actions2.travelToSpawnRoom,
            next : "deposit"
        },
        "deposit" : {
            action : actions2.returnEnergyToStructures,
            next : "findRoom",
            args : {
                priority : [STRUCTURE_STORAGE]
            }
        }
    }
}

module.exports.role.returnEnergyAndDie = {
    start : "returnEnergy",
    actions : {
        "returnEnergy" : {
            action : actions2.returnEnergyToStructures,
            next : "die",
            args : {
                priority : [STRUCTURE_STORAGE]
            }
        },
        "die" : {
            action : actions2.die,
            next : "returnEnergy"
        }
    }
}

module.exports.role.carrierTower = {
    start : "getResources",
    actions : {
        "getResources" : {
            action : actions2.getClosestEnergyStorage,
            next : "store"
        },
        "store" : {
            action : actions2.returnEnergyToStructures,
            next : "getResources",
            args : {
                priority : [STRUCTURE_TOWER]
            }
        }
    }
}

module.exports.role.carrierCreepSpawn = {
    start : "getResources",
    actions : {
        "getResources" : {
            action : actions2.getClosestEnergyStorage,
            next : "store"
        },
        "store" : {
            action : actions2.returnEnergyToStructures,
            next : "getResources",
            args : {
                priority : [STRUCTURE_EXTENSION, STRUCTURE_TOWER, STRUCTURE_SPAWN]
            }
        }
    }
}

module.exports.role.carrierStorage = {
    start : "getResources",
    actions : {
        "getResources" : {
            action : actions2.getCarrierContainerEnergy,
            next : "store",
        },
        "store" : {
            action : actions2.returnEnergyToStructures,
            next : "getResources",
            args : {
                priority : [STRUCTURE_STORAGE]
            }
        }
    }
}

module.exports.role.harvester = {
    start : "harvest",
    
    actions : {
        "harvest" : {
            action : actions2.harvestClosestSource,
            next : "returnToStructure"
        },
        "returnToStructure" : {
            action : actions2.returnEnergyToStructures,
            next : "harvest",
            args : {
                priority : [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_TOWER, STRUCTURE_CONTAINER]
            }
        }
    }
}

module.exports.role.upgrader = {
    start : "harvest",
    actions : {
        "harvest" : {
            action : actions2.getClosestEnergyStorage,
            next : "upgrade"
        },
        "upgrade" : {
            action : actions2.upgradeSource,
            next : "harvest"
        }
    }
}

module.exports.role.repairer = {
    start : "harvest",
    actions : {
        "harvest" : {
            action : actions2.getClosestEnergyStorage,
            next : "repair"
        },
        "repair" : {
            action : actions2.repairBuilding,
            next : "harvest"
        }
    }
}

module.exports.role.builder = {
    start : "harvest",
    actions : {
        "harvest" : {
            action : actions2.getClosestEnergyStorage,
            next : "build"
        },
        "build" : {
            action : actions2.buildConstruction,
            next : "harvest"
        }
    }
}

module.exports.longDistanceHarvester = {
    start : "travel",
    actions : {
        "travel" : {
            action : actions2.harvestClosestSource
        }
    }
}

// module.exports.role.harvester = {
//     start : "harvest",
    
//     actions : {
//         "harvest" : {
//             action : actions2.harvestClosestSource,
//             next : "returnToStructure"
//         },
//         "returnToStructure" : {
//             action : actions2.returnEnergyToStructures,
//             next : "harvest",
//             args : {
//                 priority : [STRUCTURE_STORAGE, STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_TOWER, STRUCTURE_CONTAINER]
//             }
//         }
//     }
// }

// module.exports.role.upgrader = {
//     start : "harvest",
//     actions : {
//         "harvest" : {
//             action : actions2.harvestClosestSource,
//             next : "upgrade"
//         },
//         "upgrade" : {
//             action : actions2.upgradeSource,
//             next : "harvest"
//         }
//     }
// }

// module.exports.role.repairer = {
//     start : "harvest",
//     actions : {
//         "harvest" : {
//             action : actions2.harvestClosestSource,
//             next : "repair"
//         },
//         "repair" : {
//             action : actions2.repairBuilding,
//             next : "harvest"
//         }
//     }
// }

// module.exports.role.builder = {
//     start : "harvest",
//     actions : {
//         "harvest" : {
//             action : actions2.harvestClosestSource,
//             next : "build"
//         },
//         "build" : {
//             action : actions2.buildConstruction,
//             next : "harvest"
//         }
//     }
// }

// module.exports.longDistanceHarvester = {
//     start : "travel",
//     actions : {
//         "travel" : {
//             action : actions2.harvestClosestSource
//         }
//     }
// }


module.exports.actions = creepActions;