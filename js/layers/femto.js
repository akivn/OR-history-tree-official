addLayer("d", {
    startData() { return {                 
        unlocked: false,                     
        points: new Decimal(0),  
        auto4: true,          
    }},
    name: "Femto-factory",
    symbol: "f",
    color: "#707070",                      
    resource: "femtopoints",           
    row: 3,                               

    baseResource: "points",                
    baseAmount() { return player.points },  

    requires: new Decimal('1e20000'),              

    type: "static",                         
    exponent: 1.5,
    base: 1e1000,
    hotkeys: [
        {
            key: "4", 
            description: "f: reset for Femtopoints", 
            onPress() { if (player.d.unlocked) doReset("d") }, 
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
        effect = new Decimal(1e100).pow(player.d.points)
        effect = softcap(effect, new Decimal('1e2000'), new Decimal(1).div(player.d.points.minus(19).pow(0.8)))
        if (inChallenge('b', 22)) effect = effect.pow(0.5)
        if (inChallenge('b', 31)) effect = new Decimal(1)

        return effect
    },
    effectDescription(){
        return "boosting yoctopoints gain by x" + format(tmp[this.layer].effect) + " and attopoints gain by x" + format(tmp[this.layer].effect.pow(0.01))      
    },


    layerShown() { return hasChallenge("b", 31) || player.d.best.gte(1)}, 
    passiveGeneration() {
    },
    upgrades: {
    },
    challenges: {

    },
    milestones: {
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
        keep.push("milestones")


        if (layers[resettingLayer].row > this.row) layerDataReset("f", keep)
    },

})