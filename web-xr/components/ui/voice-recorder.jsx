'use client'
import { useState, useRef } from 'react'
import {
	FaMicrophoneAltSlash,
	FaMicrophoneAlt,
	FaPause,
	FaStop,
	FaPlay,
} from 'react-icons/fa'

export const VoiceRecorder = () => {
	const mediaRecorder = useRef(null)
	const [permission, setPermission] = useState(false)
	const [recordingStatus, setRecordingStatus] = useState('inactive')
	const [stream, setStream] = useState(null)
	const [audioChunks, setAudioChunks] = useState([])
	const [audio, setAudio] = useState(null)

	const mimeType = 'audio/webm'

	const sendFile = async (url) => {
		try {
			await fetch(`http://localhost:3000/api/recording`, {
				method: 'POST',
				body: JSON.stringify(url),
			})
		} catch (error) {
			console.log(error)
			alert(error)
		}
	}

	const connectMicrophone = async () => {
		if (window) {
			try {
				const streamData = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: false,
				})
				setPermission(true)
				setStream(streamData)
			} catch (error) {
				alert(error.message)
			}
		}
	}

	const startRecording = async () => {
		setRecordingStatus('recording')

		//we create a new Media recorder instance using the stream

		const media = new MediaRecorder(stream, { type: mimeType })

		//set the mediarecorder instance to the mediarecord ref
		mediaRecorder.current = media

		//invokes the start method to start the recording process
		mediaRecorder.current.start()

		let localAudioChunks = []
		mediaRecorder.current.ondataavailable = (event) => {
			if (typeof event.data === 'undefined') return
			if (event.data.size === 0) return
			localAudioChunks.push(event.data)
		}

		setAudioChunks(localAudioChunks)
	}

	const stopRecording = () => {
		setRecordingStatus('inactive')

		//stops the recording instance
		mediaRecorder.current.stop()
		mediaRecorder.current.onstop = () => {
			//creates a blob file from the audiochunks data
			const audioBlob = new Blob(audioChunks, { type: mimeType })
			//creates a playable URL from the blob file

			const audioUrl = URL.createObjectURL(audioBlob)

			sendFile(audioUrl.slice(5))

			setAudio(audioUrl)
			setAudioChunks([])
		}
	}

	const displayText = async () => {
		console.log('Media' + media)

		const data = {
			providers: ['openai'],
			language: 'en',
			file_url: media,
			speakers: 2,
			profanity_filter: false,
			convert_to_wav: false,
		}

		const options = {
			method: 'POST',

			headers: {
				Authorization: `Bearer ${TOKEN}`,
				accept: 'application/json',
				'content-type': 'application/json',
			},
			body: JSON.stringify(data),
		}

		try {
			const res = await fetch(
				'https://api.edenai.run/v2/audio/speech_to_text_async',
				options
			)
			const data = await res.json()

			setConvertedText(data?.results?.openai.text)

			localStorage.setItem('Texts', JSON.stringify(data?.results?.openai))
		} catch (error) {
			console.log('error' + error)
		}
	}

	return (
		<div className='w-80 h-10 bg-slate-950 text-white border-white border rounded-full flex justify-center p-8'>
			{!permission ? (
				<div onClick={connectMicrophone}>
					<FaMicrophoneAltSlash color='white' />
				</div>
			) : (
				<div className='flex gap-4'>
					<div onClick={startRecording}>
						<FaMicrophoneAlt color='white' />
					</div>

					<div onClick={stopRecording}>
						<FaStop color='white' />
					</div>
				</div>
			)}
		</div>
	)
}
