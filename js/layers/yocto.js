addLayer("a", {
    startData() { return {                 
        unlocked: true,                     
        points: new Decimal(0),
        auto1: false              
    }},
    name: "Yocto Factory",
    symbol: "y",
    color: "#404040",                      
    resource: "yoctopoints",           
    row: 0,        
    branches: ["b"],                       

    baseResource: "points",                
    baseAmount() { return player.points },  

    requires: new Decimal(10),              

    type: "normal",                         
    exponent: 0.5,  
    hotkeys: [
        {
            key: "1", 
            description: "1: reset for Yoctopoints", 
            onPress() { if (player.a.unlocked) doReset("a") }, 
        }
    ],                     

    gainMult() {
        let mult = new Decimal(1)  
        if (hasUpgrade('a', 13)) mult = mult.times(upgradeEffect('a', 13))
        if (hasUpgrade('a', 21)) mult = mult.times(upgradeEffect('a', 21))  
        if (hasUpgrade('b', 14)) mult = mult.times(upgradeEffect('b', 14))                    
                      
        return mult        
    },
    gainExp() {                             
        return new Decimal(1)
    },

    layerShown() { return true }, 
    passiveGeneration() {return hasMilestone("b", 4) ? 0.3:0
    },
    upgrades: {
        11: {
            title: "Start Your Company",
            description: "Gain 1 point per second.",
            cost: new Decimal(1),
        },
        12: {
            title: "Point Generator",
            description: "Points boost itself.",
            cost: new Decimal(1),
            effect() {
                let power = new Decimal(player.points.add(2).log(2))
                if (hasUpgrade('a', 42)) power = power.pow(5)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (hasUpgrade('a', 11))
            },
        },
        13: {
            title: "Conversion",
            description: "Points boost yoctopoints gain.",
            cost: new Decimal(10),
            effect() {
                let power = new Decimal(player.points.add(5).log(5))
                if (hasUpgrade('a', 43)) power = power.times(upgradeEffect('a', 43))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (hasUpgrade('a', 11))
            },
        },
        14: {
            title: "Useful Yoctos!",
            description: "Yoctopoints boost points gain.",
            cost: new Decimal(25),
            effect() {
                let power = new Decimal(player.a.points.add(4).log(4))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (hasUpgrade('a', 11))
            },
        },
        21: {
            title: "Reproduction",
            description: "Yoctopoints boost itself.",
            cost: new Decimal(60),
            effect() {
                let power = new Decimal(player.a.points.add(6).log(6))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (hasUpgrade('a', 11))
            },
        },
        22: {
            title: "Transascension",
            description: "Yoctopoints gain is buffed more by points.",
            cost: new Decimal(200),
            effect() {
                let power = new Decimal(player.points.add(3).log(3))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (hasUpgrade('a', 11))
            },
        },
        23: {
            title: "Branches",
            description: "Achievement power effect is squared.",
            cost: new Decimal(1500),
        },
        24: {
            title: "Machine",
            description: "Unlock machines.",
            cost: new Decimal(2000),
        },
        31: {
            title: "Machine II",
            description: "Unlock yocto-machine 2.",
            cost: new Decimal(1e20),
            unlocked(){
                return (hasUpgrade('b', 15))
            },
        },
        32: {
            title: "Powering up",
            description: "Zepto-upgrade 22 effect is squared.",
            cost: new Decimal(1e22),
            unlocked(){
                return (hasUpgrade('b', 15))
            },
        },
        33: {
            title: "Optimize!",
            description: "Yocto-machine 1 is boosted by yoctopoints.",
            cost: new Decimal(14),
            currencyLayer: "b",
			currencyInternalName: "points",
			currencyDisplayName: "zeptopoints",
            effect() {
                let power = new Decimal(player.a.points).add(1.3).log(1.3)
                if (hasUpgrade('a', 43)) power = power.times(upgradeEffect('a', 43))
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (hasUpgrade('b', 15))
            },
        },
        34: {
            title: "Ultratri I",
            description: "Boost yocto-machine 1 by ^1.3, and zepto-upgrade 12 by ^3. Also unlocks 3 new zepto-upgrades.",
            cost: new Decimal(1e22),
            unlocked(){
                return (hasUpgrade('b', 15))
            },
        },
        41: {
            title: "Yocto-games",
            description: "Yocto-machine 1 is boosted to a higher power based on your total yocto-upgrades (x^3.5).",
            cost: new Decimal(1e70),
            currencyLayer: "a",
			currencyInternalName: "points",
			currencyDisplayName: "yoctopoints",
            effect() {
                let power = new Decimal(player.a.upgrades.length).pow(3.5)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (hasChallenge('b', 11))
            },
        },
        42: {
            title: "No more pings!",
            description: "Yocto-upgrade 12 is now boosted to ^5.",
            cost: new Decimal(1e80),
            currencyLayer: "a",
			currencyInternalName: "points",
			currencyDisplayName: "yoctopoints",
            unlocked(){
                return (hasChallenge('b', 11))
            },
        },
        43: {
            title: "Optimize^2!",
            description: "Yocto-upgrade 33 is now boosted based on your effect coming from zepto-upgrade 12.",
            cost: new Decimal(3.16227766e88),
            currencyLayer: "a",
			currencyInternalName: "points",
			currencyDisplayName: "yoctopoints",
            effect() {
                let power = upgradeEffect('b', 12).pow(0.6)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (hasChallenge('b', 11))
            },
        },
        44: {
            title: "Secret ID",
            description: "The zeptopoints formula is slightly boosted (base 10 -> 13.11).",
            cost: new Decimal(1.28e131),
            currencyLayer: "a",
			currencyInternalName: "points",
			currencyDisplayName: "yoctopoints",
            unlocked(){
                return (hasChallenge('b', 11))
            },
        },



    },
    buyables: {
        11: {
            title: "Yocto-machine 1",
            cost(x) { 
                let cost = new Decimal(1000).times(new Decimal(2).pow(x.div(4)))
                cost = softcap(cost, new Decimal(1e5), new Decimal(1).add(cost.log(1e5).minus(1)))
                return cost
            },
            effect(x){
                let power = new Decimal(1).mul(x.pow(new Decimal(2).pow(0.5)).add(1))
                if (getBuyableAmount('a', 12).gte(1)) power = power.mul(buyableEffect('a', 12))
                if (hasUpgrade('a', 33)) power = power.mul(upgradeEffect('a', 33))
                if (hasUpgrade('a', 34)) power = power.pow(1.3)
                if (hasUpgrade('b', 23)) power = power.pow(1.3)
                if (hasUpgrade('a', 41)) power = power.mul(upgradeEffect('a', 41))
                if (hasChallenge('b', 11)) power = power.pow(1.1)
                if (inChallenge('b', 11)) power = power.pow(0)
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " yoctopoints\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Multiplies point gain by " + format(buyableEffect(this.layer, this.id))+"x"
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return hasUpgrade('a', 24)
            }
        },
        12: {
            title: "Yocto-machine 2",
            cost(x) { 
                let cost = new Decimal(1e20).times(new Decimal(5).pow(x.div(4)))
                cost = softcap(cost, new Decimal(1e40), new Decimal(1).add(cost.log(1e40).minus(1)))
                return cost
            },
            effect(x){
                let power = new Decimal(1).mul(x.pow(new Decimal(2).pow(1)).add(1))
                if (getBuyableAmount('a', 21).gte(1)) power = power.mul(buyableEffect('a', 21))
                if (hasChallenge('b', 11)) power = power.pow(1.1)
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " yoctopoints\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Multiplies yM1 boost by " + format(buyableEffect(this.layer, this.id))+"x"
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return hasUpgrade('a', 31)
            }
        },
        21: {
            title: "Yocto-machine 3",
            cost(x) { 
                let cost = new Decimal(1e38).times(new Decimal(25).pow(x.div(3)))
                cost = softcap(cost, new Decimal(1e60), new Decimal(1).add(cost.log(1e60).minus(1)))
                return cost
            },
            effect(x){
                let power = new Decimal(1).mul(x.pow(new Decimal(2).pow(2.5)).add(1))
                if (hasChallenge('b', 11)) power = power.pow(1.1)
                return power
            },
            display() { let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " yoctopoints\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Multiplies yM1 boost by " + format(buyableEffect(this.layer, this.id))+"x"
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() {
                return hasUpgrade('b', 22)
            }
        },

    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                "upgrades",
            ],
        },
        "Machines": {
            content: [
                "main-display",
                "buyables"
            ],
            unlocked() {
                return (hasUpgrade('a', 24))
            }
        },
    },
    doReset(resettingLayer) {
        let keep = []
        if (hasMilestone('b', 1)) keep.push("buyables")
        if (hasMilestone('b', 2)) keep.push("upgrades")
        if (layers[resettingLayer].row > this.row) layerDataReset("a", keep)
        if (hasMilestone("b", 0)) player.a.upgrades.push(11)
        if (hasMilestone('b', 1)) player.a.upgrades.push(24)
    },
    automate() {
        if (hasMilestone('b', 3) && player[this.layer].auto1 ) {
            buyBuyable('a', 11)
            if (hasUpgrade('a', 31)) {
                buyBuyable('a', 12)
            }
            if (hasUpgrade('b', 22)) {
                buyBuyable('a', 21)
            }
        }
    }
        

})
