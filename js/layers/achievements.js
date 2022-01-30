addLayer("ac", {
    startData() { return {                 
        unlocked: true,                     
        points: new Decimal(0),             
    }},
    name: "Achievement",
    symbol: "A",
    color: "#ffff00",                      
    resource: "Achievement Power",           
    row: "side",                               

    baseResource: "points",                
    baseAmount() { return player.points },  

    requires: new Decimal(10),              

    type: "none",                                                

    layerShown() { return true },
    achievements: {
        111: {
            name: "Start",
            tooltip: "Begin generating points and get 1 point.",
            done() { return player.points.gte(1) && hasUpgrade('a', 11)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        112: {
            name: "2",
            tooltip: "Gain 10 points in total.",
            done() { return player.points.gte(10) && hasUpgrade('a', 11)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        113: {
            name: "3",
            tooltip: "Gain 100 points.",
            done() { return player.points.gte(1e2)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        114: {
            name: "4",
            tooltip: "Gain 10k points.",
            done() { return player.points.gte(1e4)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        115: {
            name: "5",
            tooltip: "Gain 100M points.",
            done() { return player.points.gte(1e8)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        121: {
            name: "6",
            tooltip: "Gain 1e16 points.",
            done() { return player.points.gte(1e16)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        122: {
            name: "7",
            tooltip: "Gain 1e256 points.",
            done() { return player.points.gte(1e256)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        123: {
            name: "8",
            tooltip: "Gain 1e4096 points.",
            done() { return player.points.gte('1e4096')
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        124: {
            name: "9",
            tooltip: "Gain 1e65536 points.",
            done() { return player.points.gte('1e65536')
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        125: {
            name: "10",
            tooltip: "Gain 1e1048576 points.",
            done() { return player.points.gte('1e1048576')
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        131: {
            name: "y1",
            tooltip: "Gain 1 yoctopoint.",
            done() { return player.a.points.gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        132: {
            name: "y2",
            tooltip: "Gain 100 yoctopoints.",
            done() { return player.a.points.gte(100)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        133: {
            name: "y3",
            tooltip: "Gain 10,000 yoctopoints.",
            done() { return player.a.points.gte(10000)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        134: {
            name: "y4",
            tooltip: "Gain 1e8 yoctopoints.",
            done() { return player.a.points.gte(1e8)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        135: {
            name: "y5",
            tooltip: "Gain 1e16 yoctopoints.",
            done() { return player.a.points.gte(1e16)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        141: {
            name: "y6",
            tooltip: "Gain 1e256 yoctopoints.",
            done() { return player.a.points.gte(1e256)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        142: {
            name: "y7",
            tooltip: "Gain 1e4096 yoctopoints.",
            done() { return player.a.points.gte('1e4096')
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        143: {
            name: "y8",
            tooltip: "Gain 1e65536 yoctopoints.",
            done() { return player.a.points.gte('1e65536')
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        144: {
            name: "y9",
            tooltip: "Gain 1e1048576 yoctopoints.",
            done() { return player.a.points.gte('1e1048576')
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        145: {
            name: "y10",
            tooltip: "Gain ee12 yoctopoints.",
            done() { return player.a.points.gte('1e1e12')
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        151: {
            name: "z1",
            tooltip: "Gain 1 zeptopoint.",
            done() { return player.b.points.gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        152: {
            name: "z2",
            tooltip: "Gain 10 zeptopoints.",
            done() { return player.b.points.gte(10)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        153: {
            name: "z3",
            tooltip: "Gain 100 zeptopoints.",
            done() { return player.b.points.gte(100)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        154: {
            name: "z4",
            tooltip: "Gain 1e4 zeptopoints.",
            done() { return player.b.points.gte(1e4)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        155: {
            name: "z5",
            tooltip: "Gain 1e8 zeptopoints.",
            done() { return player.b.points.gte(1e8)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        161: {
            name: "z6",
            tooltip: "Finish zepto-challenge 1.",
            done() { return hasChallenge('b', 11)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        162: {
            name: "z7",
            tooltip: "Finish zepto-challenge 2.",
            done() { return hasChallenge('b', 12)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        163: {
            name: "z8",
            tooltip: "Finish zepto-challenge 3.",
            done() { return hasChallenge('b', 21)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        164: {
            name: "z9",
            tooltip: "Finish zepto-challenge 4.",
            done() { return hasChallenge('b', 22)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        165: {
            name: "z10",
            tooltip: "Finish zepto-challenge 5.",
            done() { return hasChallenge('b', 31)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        171: {
            name: "a1",
            tooltip: "Get 1 attopoint.",
            done() { return player.c.points.gte(1)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        172: {
            name: "a2",
            tooltip: "Get 10 attopoints.",
            done() { return player.c.points.gte(10)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        173: {
            name: "a3",
            tooltip: "Get 10,000 attopoints.",
            done() { return player.c.points.gte(10000)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        174: {
            name: "a4",
            tooltip: "Get 100,000,000 attopoints.",
            done() { return player.c.points.gte(1e8)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
        175: {
            name: "a5",
            tooltip: "Get 1e16 attopoints.",
            done() { return player.c.points.gte(1e16)
            },
            onComplete() {
                player[this.layer].points = player[this.layer].points.add(1)
            }
        },
    },
        
    effect() {
        let effect = new Decimal(1.1).pow(player.ac.points)
        if(hasUpgrade('a', 23)) effect = effect.pow(2)
        if (hasUpgrade('b', 25)) effect = effect.pow(5)
        return effect
    },
    effectDescription(){
            return "boosting points gain by x" + format(tmp[this.layer].effect)        
    },

    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "achievements",
            ],
        },
    },
 
    
})
