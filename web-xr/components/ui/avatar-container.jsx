'use client'

import { useState } from 'react'
import { Button } from '..'
import { Avatar } from '@readyplayerme/visage'

export const AvatarContainer = ({ modelUrl, locked, attributes }) => {
	const [showAnimationList, setShowAnimationList] = useState(false)

	console.log(attributes)

	return (
		<div className='flex gap-4 items-start'>
			<Avatar
				modelSrc={modelUrl}
				// animationSrc={'/webxr-assets/animation/M_Dances_001.fbx'}
				cameraInitialDistance={1.2}
			/>
			<div className='flex flex-col items-start gap-4'>
				<Button onClick={() => setShowAnimationList(!showAnimationList)}>
					Show animation list
				</Button>
				{showAnimationList && <Button>animation 1</Button>}
			</div>
		</div>
	)
}
