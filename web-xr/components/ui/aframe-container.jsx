'use client'

import { useEffect, useRef, useState } from 'react'

const AframeContainer = ({ locked, image, video }) => {
	return (
		<a-scene className='h-48'>
			{!locked ? (
				<a-sky src={image} rotation='0 -130 0'></a-sky>
			) : (
				<>
					<a-assets>
						<video
							id='video'
							preload='auto'
							src={video}
							loop={true}
							crossOrigin='anonymous'
							muted
							autoPlay
						></video>
					</a-assets>
					<a-videosphere src='#video' rotation='0 -90 0'></a-videosphere>
				</>
			)}
		</a-scene>
	)
}

export default AframeContainer
