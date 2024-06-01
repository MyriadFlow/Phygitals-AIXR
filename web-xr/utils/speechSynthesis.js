export const Speech = (text) => {
	const messsage = new SpeechSynthesisUtterance()
	messsage.text = text

	window.speechSynthesis.speak(messsage)
}
