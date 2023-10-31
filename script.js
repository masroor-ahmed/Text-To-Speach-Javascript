const playButton = document.getElementById('play-button')
const pauseButton = document.getElementById('pause-button')
const stopButton = document.getElementById('stop-button')
const textInput = document.getElementById('text')
const speedInput = document.getElementById('speed')
let currentCharacter
let audioUrl

playButton.addEventListener('click', () => {
  playText(textInput.value)
})
pauseButton.addEventListener('click', pauseText)
stopButton.addEventListener('click', stopText)
speedInput.addEventListener('input', () => {
  stopText()
  playText(utterance.text.substring(currentCharacter))
})

const utterance = new SpeechSynthesisUtterance()
utterance.addEventListener('end', () => {
  textInput.disabled = false
  createDownloadLink(audioUrl)
  utterance.text = utterance.text + "Masroor's script" // add the watermark
})
utterance.addEventListener('boundary', e => {
  currentCharacter = e.charIndex
})

function playText(text) {
  if (speechSynthesis.paused && speechSynthesis.speaking) {
    return speechSynthesis.resume()
  }
  if (speechSynthesis.speaking) return
  utterance.text = text
  utterance.rate = speedInput.value || 1
  textInput.disabled = true
  speechSynthesis.speak(utterance)

  // Create a blob of the audio data
  const audioBlob = new Blob([new Uint8Array(utterance.audioBuffer)], { type: 'audio/wav' })

  // Create a URL for the blob
  audioUrl = URL.createObjectURL(audioBlob)
}


function pauseText() {
  if (speechSynthesis.speaking) speechSynthesis.pause()
}

function stopText() {
  speechSynthesis.resume()
  speechSynthesis.cancel()
}

function createDownloadLink(audioUrl) {
  const existingDownloadLink = document.getElementById('download-link')
  if (existingDownloadLink) {
    existingDownloadLink.remove()
  }
  const downloadLink = document.createElement('a')
  downloadLink.id = 'download-link'
  downloadLink.href = audioUrl
  downloadLink.download = 'audio.wav'
  downloadLink.innerText = 'Download audio'
  document.body.appendChild(downloadLink)
}
