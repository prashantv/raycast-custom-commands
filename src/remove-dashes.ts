import { Clipboard, showHUD, showToast } from "@raycast/api";
import { showFailureToast } from "@raycast/utils";

export default async function main() {
  let text = await Clipboard.readText();
  if (!text) {
    showFailureToast("clipboard contents not text");
    return;
  }

  text = text.trim();
  text = text.replaceAll("-", "");
  Clipboard.copy(text);

  showHUD("Removed dashes in clipboard text");
}
