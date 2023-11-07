import dgram from 'dgram';
import { closeMainWindow, showHUD } from "@raycast/api";
import { runAppleScript, showFailureToast } from "@raycast/utils";

const targetMacAddress = 'D8:5E:D3:85:E8:F9';

const magicPacket = Buffer.from(
  'FFFFFFFFFFFF' + targetMacAddress.replace(/:/g, '').repeat(16),
  'hex'
);

export default async function main() {
	const udpClient = dgram.createSocket('udp4');
	udpClient.bind(9000, undefined, function() {
		udpClient.setBroadcast(true);
		udpClient.send(magicPacket, 0, magicPacket.length, 9, '10.10.10.255', (error) => {
			if (error) {
				console.error('Error sending WoL packet:', error);
				showFailureToast('error sending wol:' + error.message);
			} else {
				showHUD('WoL packet sent');
			}
			udpClient.close();
		});
	});
}