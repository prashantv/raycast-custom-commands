import { closeMainWindow } from "@raycast/api";
import { runAppleScript, showFailureToast } from "@raycast/utils";


export default async function main() {
	const script = `
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
	
		var res = await runAppleScript<string>(script);
		if (res == "success") {
			closeMainWindow();
		} else {
			showFailureToast("unknown error: " + res);
		}
	}