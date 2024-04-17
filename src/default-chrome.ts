import { open } from "@raycast/api";

export default async function main() {
  await open("http://google.com/?q=finicky-set-chrome-primary");
}
