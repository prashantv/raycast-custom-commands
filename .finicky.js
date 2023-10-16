// Learn more about configuration options: https://github.com/johnste/finicky/wiki/Configuration

const chrome = "Google Chrome"
const brave = "Brave Browser"

var primary = brave;
var secondary = chrome;

module.exports = {
  defaultBrowser: () => primary,
	options: {
		hideIcon: false,
		checkForUpdate: false,
	},
	handlers: [
		{
			browser: () => secondary,
			match: checkDefaultFlip,
		},
		{
			browser: () => secondary,
			match: fnKeyPressed,
		},
	]
}

function fnKeyPressed(params) {
	return finicky.getKeys().function;
}

function checkDefaultFlip(params) {
	const prefix=  "http://google.com/?q=finicky-";
	if (!params.urlString.startsWith(prefix)) {
		return false;
	}

	const cmd = params.urlString.slice(prefix.length);
	finicky.notify("test", "notify");

	if (cmd == "flip-defaults") {
		var tmp = primary;
		primary = secondary;
		secondary = tmp;
		finicky.log("Defaults flipped: Primary: " + primary + " and Secondary: " + secondary);
	} else if (cmd == "set-chrome-primary") {
		primary = chrome;
		secondary = brave;
		finicky.log("Default to Chrome");
	} else if (cmd == "set-brave-primary") {
		primary = brave;
		secondary = chrome;
		finicky.log("Default to Brave");
	} else {
		finicky.log("Ignoring unknown command: " + cmd);
	}

	return false;
}
