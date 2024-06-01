import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const fontSans = FontSans({ subsets: ['latin'] })

export const metadata = {
	title: 'TTS - STT Demo',
	description: 'A pwa to test voices',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<link rel='manifest' href='/manifest.json' />
				<script src='https://aframe.io/releases/1.5.0/aframe.min.js'></script>
			</head>

			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					fontSans.variable
				)}
			>
				{children}
			</body>
		</html>
	)
}
