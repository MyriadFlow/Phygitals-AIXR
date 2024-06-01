'use client'

import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Avatar } from '@readyplayerme/visage'
import { Button } from '@/components/ui/button'

export default function Home() {
	return (
		<main className='h-screen flex bg-cyan-700'>
			<div className='h-screen basis-2/4 flex items-center justify-center'>
				<Avatar
					modelSrc={
						'https://models.readyplayer.me/664b7de7c48ec50b6c8d41c8.glb'
					}
					cameraInitialDistance={3.5}
				/>
			</div>
			<div className='h-screen basis-2/4 p-12 bg-white'>
				<div className='mb-32 rounded-l'>
					<h1 className='text-4xl'>Welcome to Nero</h1>
					<p className='text-xl'>Scan tag to get the full WebXR experience</p>
				</div>
				<Button>
					<ConnectButton />
				</Button>
			</div>
		</main>
	)
}
