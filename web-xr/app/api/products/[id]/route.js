import { prisma } from '@/utils/connect'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
	const { id } = params

	try {
		const singleProduct = await prisma.product.findUnique({
			where: {
				id: parseInt(id),
			},
		})

		return new NextResponse(JSON.stringify(singleProduct), { status: 200 })
	} catch (error) {
		console.log(error)

		return new NextResponse('Somethiung went wrong', { status: 500 })
	}
}
