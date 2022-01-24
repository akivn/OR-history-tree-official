addLayer("b", {
    startData() { return {                 
        unlocked: false,                     
        points: new Decimal(0),            
    }},
    name: "Zepto Factory",
    symbol: "z",
    color: "#505050",                      
    resource: "zeptopoints",           
    row: 1,  
    branches: ["c"],                             

    baseResource: "yoctopoints",                
    baseAmount() { return player.a.points },  

    requires: new Decimal(100000),              

    type: "static",                         
    exponent: 1.3,
    base: 5,  
    hotkeys: [
        {
            key: "2", 
            description: "2: reset for Zeptopoints", 
            onPress() { if (player.b.unlocked) doReset("b") }, 
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
        let effect = new Decimal(1).times(new Decimal(3).pow(player.b.points))
        if (hasUpgrade('b', 13)) effect = new Decimal(1).times(new Decimal(10).pow(player.b.points))
        if (hasUpgrade('b', 13) && hasUpgrade('a', 44)) effect = new Decimal(1).times(new Decimal(13.1128).pow(player.b.points))
        if (inChallenge('b', 12) && hasUpgrade('a', 44)) effect = new Decimal(1).times(new Decimal(3.1128).pow(player.b.points))
        if (inChallenge('b', 12) && !hasUpgrade('a', 44)) effect = new Decimal(1).times(new Decimal(1).pow(player.b.points))
        if (hasUpgrade('b', 11)) effect = effect.times(tmp.ac.effect)
        if (hasUpgrade('b', 12)) effect = effect.times(upgradeEffect('b', 12))
        
        return effect
    },
    effectDescription(){
        return "boosting points gain by x" + format(tmp[this.layer].effect)        
    },


    layerShown() { return player.a.best.gte(50000) || player.b.best.gte(1) }, 
    passiveGeneration() {
    },
    upgrades: {
        11: {
            title: "Zepto-Stronger!",
            description: "Boost zeptopoints effect by achievement power.",
            cost: new Decimal(2),
        },
        12: {
            title: "Loyalty",
            description: "Yoctopoints boost zeptopoints effect.",
            cost: new Decimal(3),
            effect() {
                let power = new Decimal(player.a.points.add(10).log(10))
                if (hasUpgrade('a', 32)) power = power.pow(2)
                if (hasUpgrade('a', 34)) power = power.pow(3)
                if (hasUpgrade('b', 25)) power = power.times(50)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (hasUpgrade('b', 11))
            },
        },
        13: {
            title: "Zepto-work!",
            description: "Zeptopoints base is now 10.",
            cost: new Decimal(4),
            unlocked(){
                return (hasUpgrade('b', 12))
            },
        },
        14: {
            title: "Zepto-GAS!",
            description: "Zeptopoints now boost yoctopoints gain, but at a base of 3, and not affected by the previous upgrades.",
            cost: new Decimal(6),
            effect() {
                let power = new Decimal(1).times(new Decimal(3).pow(player.b.points))
                if (hasUpgrade('b', 25)) power = power.times(50)
                return power
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked(){
                return (hasUpgrade('b', 13))
            },
        },
        15: {
            title: "Zepto-Sale!",
            description: "Unlock new yocto-upgrades.",
            cost: new Decimal(11),
            unlocked(){
                return (hasUpgrade('b', 14))
            },
        },
        22: {
            title: "Cubed",
            description: "Unlock yocto-machine 3.",
            cost: new Decimal(20),
            unlocked(){
                return (hasUpgrade('a', 34))
            },
        },
        23: {
            title: "Tri-squared!",
            description: "Boost to yM1 by yocto-upgrade 34 is now ^1.69. (1.3^2)",
            cost: new Decimal(25),
            unlocked(){
                return (hasUpgrade('a', 34))
            },
        },
        24: {
            title: "Challenge to yoctos!",
            description: "Unlock Challenges.",
            cost: new Decimal(30),
            unlocked(){
                return (hasUpgrade('a', 34))
            },
        },
        25: {
            title: "50 zepto-subscribers!",
            description: "Multiply all Dynamic zepto-upgrades effect by 50, and achievement power effect by ^5.",
            cost: new Decimal(50),
            unlocked(){
                return (hasUpgrade('b', 24))
            },
        },



    },
    challenges: {
        11: {
            name: "Yocto-Strike",
            challengeDescription: "Yocto-machine 1 is disabled.",
            goalDescription: "1e48 points",
            rewardDescription: "Every yocto-machines effect are powered to ^1.1, and unlock 4 new yocto-upgrades.",
            canComplete: function() {
            return player.points.gte(1e48)
            },
            unlocked() {
                return hasUpgrade('b', 24)
            }
        },
        12: {
            name: "Zepto-strike",
            challengeDescription: "Zeptopoints boost base is 10 lower.",
            goalDescription: "5e152 points",
            rewardDescription: "UNLOCK ATTO FACTORY, and yocto-upgrade 11 is now 10x stronger.",
            canComplete: function() {
            return player.points.gte(5e152)
            },
            unlocked() {
                return hasUpgrade('b', 24)
            }
        },

    },
    milestones: {
        0: {
            requirementDescription: "1 zeptopoint",
            unlocked() {return true},
            done() {return player[this.layer].best.gte(1)},
            effectDescription: "Always keep yocto-upgrade 1 on zepto-reset.",
        },
        1: {
            requirementDescription: "3 zeptopoints",
            unlocked() {return true},
            done() {return player[this.layer].best.gte(3)},
            effectDescription: "Keep yocto-machines on zepto-reset.",
        },
        2: {
            requirementDescription: "6 zeptopoints",
            unlocked() {return true},
            done() {return player[this.layer].best.gte(6)},
            effectDescription: "Keep upgrades on zepto-reset.",
        },
        3: {
            requirementDescription: "12 zeptopoints",
            unlocked() {return true},
            done() {return player[this.layer].best.gte(12)},
            effectDescription: "You can autobuy yocto-machines.",
            toggles: [
                ["a", "auto1"]
            ],
        },
        4: {
            requirementDescription: "16 zeptopoints",
            unlocked() {return true},
            done() {return player[this.layer].best.gte(16)},
            effectDescription: "Passively gain 30% of the yoctopoints pending every second.",
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
        "Milestones": {
            content: [
                "main-display",
                "prestige-button",
                "milestones",
            ],
        },
        "Challenges": {
            content: [
                "main-display",
                "challenges",
            ],
            unlocked () {
                return hasUpgrade('b', 24)
            }
        },
    },

})