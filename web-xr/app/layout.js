import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Script from 'next/script'

const fontSans = FontSans({ subsets: ['latin'] })

export const metadata = {
	title: 'Nero Fs Phygitals',
	description: 'Explore your phygitals in a mixed reality',
}

export default function RootLayout({ children }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<link rel='manifest' href='/manifest.json' />
				<Script src='https://aframe.io/releases/1.5.0/aframe.min.js'></Script>
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
