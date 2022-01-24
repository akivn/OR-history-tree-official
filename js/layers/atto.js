addLayer("c", {
    startData() { return {                 
        unlocked: false,                     
        points: new Decimal(0),            
    }},
    name: "Atto Factory",
    symbol: "a",
    color: "#606060",                      
    resource: "attopoints",           
    row: 2,                               

    baseResource: "zeptopoints",                
    baseAmount() { return player.b.points },  

    requires: new Decimal(58),              

    type: "normal",                         
    exponent: 16,
    hotkeys: [
        {
            key: "3", 
            description: "3: reset for Attopoints", 
            onPress() { if (player.c.unlocked) doReset("c") }, 
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
        let effect = new Decimal(1).times(new Decimal(75).pow(player.c.points))
        effect = softcap(effect, new Decimal(1e10), new Decimal(0.7).div(effect.log(1e7)))
        
        return effect
    },
    effectDescription(){
        return "boosting points and yoctopoints gain by x" + format(tmp[this.layer].effect)        
    },


    layerShown() { return player.a.best.gte(50000) || player.b.best.gte(1) }, 
    passiveGeneration() {
    },
    upgrades: {
    },
    challenges: {

    },
    milestones: {

    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "upgrades",
            ],
        },
    },

})