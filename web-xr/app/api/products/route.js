import { prisma } from '@/utils/connect'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const products = await prisma.product.findMany()

		return new NextResponse(JSON.stringify(products), { status: 200 })
	} catch (error) {
		console.log(error)
		return new NextResponse(
			{ message: 'Something went wrong' },
			{ status: 500 }
		)
	}
}
