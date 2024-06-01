import { NextResponse } from 'next/server'
import { prisma } from '../../../utils/connect'

export const GET = async () => {
	try {
		const fileUrls = await prisma.audioFile.findFirst({
			orderBy: {
				id: 'desc',
			},
		})

		return new NextResponse({ fileUrls }, { status: 200 })
	} catch (error) {
		console.log(error)
		return new NextResponse(
			{ message: 'Could not find any files' },
			{ status: 500 }
		)
	}
}

export const POST = async (req) => {
	const data = await req.json()

	try {
		await prisma.audioFile.create({ data: { fileUrl: data } })

		return new NextResponse({ message: 'Audio File Saved' }, { status: 201 })
	} catch (error) {
		console.log(error)
		return new NextResponse(
			{ message: 'Something wrong with saving the recording' },
			{ status: 400 }
		)
	}
}
