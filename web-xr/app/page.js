import { Assistant } from '@/components/assistant'
import Link from 'next/link'

async function fetchNfts() {
	const res = await fetch('http://localhost:3000/api/products', {
		cache: 'no-cache',
	})

	if (!res.ok) throw new Error('something went wrong')

	const nftdata = await res.json()
	return nftdata
}

export default async function Home() {
	const nfts = await fetchNfts()

	return (
		<main className='h-screen flex flex-wrap justify-center items-center gap-4 bg-cyan-700'>
			{nfts.map((item) => (
				<Link
					key={item.id}
					href={`/collection/${item.id}`}
					className='size-40 p-4 rounded transition-all bg-fuchsia-600 hover:bg-red-700 text-white cursor-pointer'
				>
					<div className='flex flex-col gap-4'>
						<h1>{item.name}</h1>
						<p className='truncate'>{item.description}</p>
					</div>
				</Link>
			))}

			<Assistant />
		</main>
	)
}

// sk - shI2gv25dRL85mPztStqT3BlbkFJwtgA1D89f4TB0heDyJdX
