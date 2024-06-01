import { useState, useEffect } from 'react'

const useFetchData = (id) => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (!id) return

		const fetchData = async () => {
			setLoading(true)
			setError(null)

			try {
				const response = await fetch(`http://localhost:3000/api/products/${id}`)
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const result = await response.json()
				setData(result)
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [id])

	return { data, loading, error }
}

export default useFetchData
