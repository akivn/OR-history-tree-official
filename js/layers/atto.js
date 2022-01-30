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
        if (hasUpgrade('c', 11)) mult = mult.times(upgradeEffect('c', 11))
        if (getBuyableAmount('c', 11).gte(1)) mult = mult.times(buyableEffect('c', 11))
        return mult        
    },
    gainExp() {                             
        return new Decimal(1)
    },
    effect() {
        let effect = new Decimal(1).times(new Decimal(75).pow(player.c.points))
        effect = softcap(effect, new Decimal(1e10), new Decimal(0.55).div(effect.log(1e10).pow(0.7)))
        effect = softcap(effect, new Decimal(1e50), new Decimal(0.5).div(effect.log(1e50).pow(0.9)))
        if (inChallenge('b', 21)) effect = new Decimal(1).times(new Decimal(1).pow(player.c.points))
        return effect
    },
    effectDescription(){
        return "boosting points and yoctopoints gain by x" + format(tmp[this.layer].effect)        
    },


    layerShown() { return player.a.best.gte(50000) || player.c.best.gte(1) }, 
    passiveGeneration() {
    },
    upgrades: {
        11: {
            title: "Social circle",
            description: "Boost attopoints gain based on your yoctopoints.",
            cost: new Decimal(200),
            effect() {
                let power = new Decimal(player.a.points.add(1e60).log(1e60))
                if (hasUpgrade('b', 31)) power = power.times(upgradeEffect('b', 31))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        12: {
            title: "Challenge - Atto!",
            description: "Unlock 2 new zepto-challenges.",
            cost: new Decimal(100000),
        },
        13: {
            title: "Static-Stronger!",
            description: "Unlock 2 new zepto-upgrades, and yocto-upgrade 22 is 1e30x stronger.",
            cost: new Decimal(1e8),
        },
        14: {
            title: "Atto-sale!",
            description: "Unlock 5 new zepto-upgrades, and yocto-machines are powered to ^1.2.",
            cost: new Decimal(3e8),
        },
        15: {
            title: "Yocto-creator!",
            description: "Boost Yoctopoints gain based on your Attopoints.",
            cost: new Decimal(5e10),
            effect() {
                let power = new Decimal(player.c.points.pow(3).add(1))
                power = softcap(power, new Decimal(1e25), new Decimal(1).div(power.add(1e25).log(1e25).pow(0.95)))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
    },
    challenges: {

    },
    milestones: {
        0: {
            requirementDescription: "2 attopoints",
            unlocked() {return true},
            done() {return player[this.layer].best.gte(2)},
            effectDescription: "Keep all yocto-upgrades on atto reset.",
        },
        1: {
            requirementDescription: "5 attopoints",
            unlocked() {return true},
            done() {return player[this.layer].best.gte(5)},
            effectDescription: "Keep all yocto-machines on atto reset, and you can buy max zeptopoints.",
        },
        2: {
            requirementDescription: "10 attopoints",
            unlocked() {return true},
            done() {return player[this.layer].best.gte(10)},
            effectDescription: "Keep all zepto-upgrades on reset.",
        },
        3: {
            requirementDescription: "25 attopoints",
            unlocked() {return true},
            done() {return player[this.layer].best.gte(25)},
            effectDescription: "Keep all zepto-challenges on reset.",
        },
        4: {
            requirementDescription: "100 attopoints",
            unlocked() {return true},
            done() {return player[this.layer].best.gte(100)},
            effectDescription: "Keep all zepto-milestones on reset.",
        },

    },
    buyables: {
        11: {
            title: "Yocto-machine 1",
            cost(x) { 
                let cost = new Decimal(1e10).times(new Decimal(2).pow(x))
                cost = softcap(cost, new Decimal(1e20), new Decimal(1).add(cost.log(1e5).minus(1)))
                return cost
            },
            effect(x){
                let power = new Decimal(1).mul(x.pow(new Decimal(2).pow(2.2)).add(1))
                if (hasUpgrade('b', 33)) power = power.pow(2)
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " yoctopoints\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Multiplies attopoint gain by " + format(buyableEffect(this.layer, this.id))+"x"
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return hasUpgrade('b', 32)
            }
        },
    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "upgrades",
                "milestones",
            ],
        },
        "Machines": {
            content: [
                "main-display",
                "prestige-button",
                "buyables",
            ],
            unlocked() {
                return hasUpgrade('b', 32)
            }
        },
    },

})