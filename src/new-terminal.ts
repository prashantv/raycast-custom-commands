import { closeMainWindow, getPreferenceValues } from "@raycast/api";
import { runAppleScript, showFailureToast } from "@raycast/utils";

interface Preferences {
  terminalApp: string;
}

export default async function main() {
  const prefs = getPreferenceValues<Preferences>();

  const script =  {
		"ghostty": ghosttyScript,
		"iterm": itermScript,
		"wezterm": weztermScript
	}[prefs.terminalApp] ?? terminalScript;

  const res = await runAppleScript<string>(script);
  if (res == "success") {
    closeMainWindow();
  } else {
    showFailureToast("unknown error: " + res);
  }
}

const ghosttyScript = `
if application "Ghostty" is running then
	tell application "Ghostty"
		tell application "System Events" to click menu item "New Window" of menu "File" of menu bar 1 of process "Ghostty"
		set returnValue to "success"
	end tell
else
	open application "Ghostty"
	set returnValue to "success"
end if
`;

const itermScript = `
if application "iTerm" is running then
tell application "iTerm"
	create window with default profile
	set returnValue to "success"
end tell
else
	open application "iTerm"
	set returnValue to "success"
end if
`;

const terminalScript = `
if application "Terminal" is running then
	tell application "Terminal"
		-- from https://superuser.com/questions/195633/applescript-to-open-a-new-terminal-window-in-current-space
		do script " "
		activate
		set returnValue to "success"
	end tell
else
	open application "Terminal"
	set returnValue to "success"
end if
`;

const weztermScript = `
if application "WezTerm" is running then
	do shell script "/Applications/WezTerm.app/Contents/MacOS/wezterm start"
else
	tell application "WezTerm"
		launch
		activate
	end tell
end if
set returnValue to "success"
`;
