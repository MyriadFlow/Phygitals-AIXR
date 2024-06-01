import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './card'

import { VscDebugBreakpointLogUnverified } from 'react-icons/vsc'

export const Metacard = ({ name, gender, description, locked }) => {
	return (
		<Card className='card text-white'>
			<CardHeader>
				<CardTitle>{name}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex gap-3 items-center'>
					<VscDebugBreakpointLogUnverified />
					<p>{gender}</p>
				</div>
				<div className='flex gap-3 items-center'>
					<VscDebugBreakpointLogUnverified />
					<p>{locked ? 'Not Owned' : 'Owned'}</p>
				</div>
			</CardContent>
		</Card>
	)
}
