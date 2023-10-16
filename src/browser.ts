import { open, closeMainWindow, Clipboard } from "@raycast/api";
import { runAppleScript, showFailureToast } from "@raycast/utils";

const newOrFocusAppscript = `
on countWindows(appName)
	tell application "System Events"
		tell process appName
			return count of windows
		end tell
	end tell
end countWindows

on run argv
	set browserName to (item 1 of argv)
	set focusExisting to (item 2 of argv)
	if application browserName is running then
		tell application browserName
			if my countWindows(browserName) = 0 or focusExisting = "false" then
				make new window
				activate
			else
				activate
			end if
			set returnValue to "success"
		end tell
	else
		set returnValue to "application-not-running"
	end if
end run


`

export async function newWindow(app: string, focusExistingOpt?: boolean): Promise<void> {
	var focusExisting = JSON.stringify(!!focusExistingOpt)
	var res = await runAppleScript<string>(newOrFocusAppscript, [app, focusExisting]);
	if (res == "success") {
			closeMainWindow();
	} else if (res == "application-not-running") {
		showFailureToast("${app} is not running");
	} else {
		showFailureToast("unknown error: " + res);
	}
}


export async function openURLClipboard(app: string): Promise<undefined> {
	var url = await Clipboard.readText();
	if (!url) {
		showFailureToast("clipboard contents not text");
		return
	}
	url = url.trim();
	if (!url.startsWith("http")) {
		showFailureToast("clipboard contents don't contain url");
		return
	}

	await open(url, app);
	closeMainWindow();
}
