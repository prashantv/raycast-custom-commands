import { open, closeMainWindow, Clipboard } from "@raycast/api";
import { runAppleScript, showFailureToast } from "@raycast/utils";

export async function newWindow(app: string): Promise<void> {
	const script = `
	on run argv
		set browserName to (item 1 of argv)
		if application browserName is running then
		tell application browserName
			make new window
			activate
			set returnValue to "success"
		end tell
		else
		set returnValue to "application-not-running"
		end if
	end run
	`;

	var res = await runAppleScript<string>(script, [app]);
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
