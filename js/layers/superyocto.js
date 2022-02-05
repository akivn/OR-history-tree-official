addLayer("sy", {
    startData() { return {                 
        unlocked: false,                     
        points: new Decimal(0),  
        auto4: true,          
    }},
    name: "Super-yotto Factory",
    symbol: "Sy",
    color: "#484848",                      
    resource: "super-yocto credits",           
    row: 1,                               

    baseResource: "yoctopoints",                
    baseAmount() { return player.a.points },  

    requires: new Decimal('1e2000'),              

    type: "static",                         
    exponent: 1.2,
    base: 1e100,
    hotkeys: [
        {
            key: "cmd+1", 
            description: "1: reset for Attopoints", 
            onPress() { if (player.sy.unlocked) doReset("sy") }, 
        }
    ],                     

    gainMult() {
        let mult = new Decimal(1)                     
        return mult        
    },
    gainExp() {                             
        return new Decimal(1)
    },
    effect() {
        let effect = new Decimal(1)
        effect = new Decimal(1e10).pow(player.sy.points)
        effect = softcap(effect, new Decimal(1e100), new Decimal(1).div(player.sy.points.pow(0.8)))
        if (inChallenge('b', 22)) effect = effect.pow(0.5)
        if (hasUpgrade('a', 15)) effect = effect.pow(1.6)
        if (inChallenge('b', 31)) effect = new Decimal(1)

        return effect
    },
    effectDescription(){
        return "boosting yocto-generators by x" + format(tmp[this.layer].effect)        
    },


    layerShown() { return player.a.best.gte('1e1950') || player.sy.best.gte(1) || player.d.best.gte(1)}, 
    passiveGeneration() {
    },
    autoPrestige() {
    return player[this.layer].auto4 && hasMilestone('sy', 2)
    },
    upgrades: {
    },
    challenges: {

    },
    milestones: {
        0: {
            requirementDescription: "2 SY credits",
            unlocked() {return true},
            done() {return player[this.layer].best.gte(2)},
            effectDescription: "Atto-resets will not sacrifice credits.",
        },
        1: {
            requirementDescription: "6 SY credits",
            unlocked() {return true},
            done() {return player[this.layer].best.gte(6)},
            effectDescription: "Unlock 9 new yocto-upgrades.",
        },
        2: {
            requirementDescription: "32 SY credits",
            unlocked() {return true},
            done() {return player[this.layer].best.gte(32)},
            effectDescription: "Autobuy atto-machines and SY credits.",
            toggles: [
                ["c", "auto3"],
                ["sy", "auto4"]

            ],
        },
    },
    buyables: {

    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "milestones",
            ],
        },
    },
    doReset(resettingLayer) {
        let keep = []
        if (layers[resettingLayer].row < 3) keep.push("milestones")
        if (hasMilestone('sy', 0) && layers[resettingLayer].row < 3) keep.push("points")


        if (layers[resettingLayer].row > this.row) layerDataReset("sy", keep)
    },

})