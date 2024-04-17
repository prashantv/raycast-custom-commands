import { openURLClipboard } from "./browser";

export default async function main() {
  await openURLClipboard("Google Chrome");
}
