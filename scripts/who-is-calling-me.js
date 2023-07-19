
const element_current_caller = document.getElementById("current-caller");
const element_button_lydia = document.getElementById("call-from-lydia");
const element_button_evy = document.getElementById("call-from-evy");
const element_button_stop = document.getElementById("call-stop");

element_button_lydia.onclick = () => playAudio("call-from-lydia");
element_button_evy.onclick = () => playAudio("call-from-evy");
element_button_stop.onclick = () => {
	audio_current.pause();
	element_current_caller.src = "";
}

let audio_current = null;
function playAudio(label) {

	if (audio_current != null) {
		audio_current.pause();
	}

	element_current_caller.src = `assets/${label}.png`

	audio_current = new Audio(`assets/audio/${label}.mp3`);
	audio_current.play();
}
