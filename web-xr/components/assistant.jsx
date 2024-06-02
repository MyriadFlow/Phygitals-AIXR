'use client'
import { useEffect } from 'react'

export const Assistant = ({ prompt }) => {
	const [responseData, setResponseData] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	const handleClick = async () => {
		setIsLoading(true)
		setError(null)

		try {
			const response = await fetch('http://js-cli-wrapper.lilypad.tech', {
				method: 'POST',
				body: JSON.stringify({
					pk: '0940934862b89b7a77ee21df96288ab0f1c78c27eabee6d5020e6bf95f3202f7',
					module: 'ollama-pipeline:llama3-8b-lilypad1',
					inputs: "-i Prompt='{your relevant prompt here}'",
					opts: { stream: true },
				}),
			})
			setResponseData(response.data)
		} catch (error) {
			setError(error)
		} finally {
			setIsLoading(false)
		}
	}

	return <div>Assistant</div>
}
