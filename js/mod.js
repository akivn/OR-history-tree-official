let modInfo = {
	name: "The Factory Tree",
	id: "akivn",
	author: "akivn",
	pointsName: "points",
	modFiles: ["layers/yocto.js", "layers/zepto.js", "layers/atto.js", "layers/achievements.js", "func.js", "tree.js"],

	discordName: "Origin Franchise Discord",
	discordLink: "https://discord.gg/bJ6WthRw5M",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "Rewritten-Beta-5 - Year 4 Update",
}

let changelog = `<h1>Changelog:</h1><br>
	`
		

let winText = `Congratulations! You have reached the point that every factories in the universe can't afford, becoming a black hole, eating everything, caused a big crunch and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
	if (hasUpgrade('a', 11)) gain = new Decimal(1)
	if (hasUpgrade('a', 11) && hasChallenge('b', 12)) gain = new Decimal(10)
	if (hasUpgrade('a', 12)) gain = gain.times(upgradeEffect('a', 12))
	if (hasUpgrade('a', 14)) gain = gain.times(upgradeEffect('a', 14))
	if (hasUpgrade('a', 22)) gain = gain.times(upgradeEffect('a', 22))
	if (getBuyableAmount('a', 11).gte(1)) gain = gain.times(buyableEffect('a', 11))
	gain = gain.times(tmp.ac.effect)
	gain = gain.times(tmp.b.effect)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	"<br>",
	function() { return `<h3>Current Endgame: </h3> ${GetEffectText("h3", 1, tmp.c.color)} Attopoint` },
]

// Determines when the game "ends"
function isEndgame() {
	return player.c.points.gte(1)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}