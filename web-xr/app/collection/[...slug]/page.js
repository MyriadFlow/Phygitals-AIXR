'use client'
import { VoiceRecorder } from '@/components/ui/voice-recorder'
import nero from '@/lib/artifacts/contracts/Nero.sol/Nero.json'
import { sepolia } from 'viem/chains'
import { Hex, createPublicClient, decodeEventLog, http } from 'viem'
import {
	useChainId,
	useReadContracts,
	useWalletClient,
	useAccount,
} from 'wagmi'
import useLitLibrary from '@/lib/hooks/useLitLibrary'
import code from '@/lit-actions/unlock-token-content'
import useFetchData from '@/hooks/useFetchData'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { VscDebugBreakpointLogUnverified } from 'react-icons/vsc'
import { Avatar } from '@readyplayerme/visage'
import { Button } from '@/components/ui/button'
import { useState, useEffect, useMemo } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import '@google/model-viewer'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const publicClient = createPublicClient({
	chain: sepolia,
	transport: http(),
})

function getFile(raw, fileType) {
	// var reader = new FileReader();
	// reader.readAsDataURL(new Blob([raw], {}))
	// reader.onload = function () {
	//   console.log(reader.result);
	//   setImageFile(reader.result?.toString()!);
	// };
	// reader.onerror = function (error) {
	//   console.log('Error: ', error);
	// };
	// console.log(new Blob([raw], {type: 'image/jpeg'}));
	// console.log(URL.createObjectURL(new Blob([raw], {type: 'image/jpeg'})));
	console.log(Buffer?.from(raw)?.toString('base64'))
	return 'data:' + fileType + ';base64,' + Buffer.from(raw).toString('base64')
}

export default function Collection({ params }) {
	const [showAnimationList, setShowAnimationList] = useState(false)
	const [currentAnimation, setCurrentAnimation] = useState('')
	const [unlock, setUnlock] = useState(false)
	const [wallet, setWallet] = useState(false)

	const address = params.slug[0]
	const tokenId = +params.slug[1]

	const [metadata, setMetadata] = useState()

	const [buying, setBuying] = useState(false)
	const { isConnected } = useAccount()

	const [nftId, setNftId] = useState(-1)
	const [buyStatus, setBuyStatus] = useState({ message: '', status: 0 })
	const [txnHash, setTxnHash] = useState('')

	const [unlocking, setUnlocking] = useState(false)

	const chainId = useChainId()

	const [modelSource, setModelSource] = useState('')

	// const context = useContext(NFTContext);
	const { data: walletClient } = useWalletClient({ chainId })

	const { decryptData, executeLitAction } = useLitLibrary()

	const [publicAgentKnowledge, setPublicAgentKnowledge] = useState('')
	const [privateAgentKnowledge, setPrivateAgentKnowledge] = useState('')

	const contracts = [
		{
			abi: nero.abi,
			address,
			functionName: 'metadataURI',
			chainId: sepolia.id,
		},
		{
			abi: nero.abi,
			address,
			functionName: 'totalSupply',
			chainId: sepolia.id,
		},
		{
			abi: nero.abi,
			address,
			functionName: 'maxSupply',
			chainId: sepolia.id,
		},
		{
			abi: nero.abi,
			address,
			functionName: 'name',
			chainId: sepolia.id,
		},
		{
			abi: nero.abi,
			address,
			functionName: 'owner',
			chainId: sepolia.id,
		},
		{
			abi: nero.abi,
			address,
			functionName: 'lockedGlbURI',
			chainId: sepolia.id,
		},
		{
			abi: nero.abi,
			address,
			functionName: 'lockedBackgroundURI',
			chainId: sepolia.id,
		},
		{
			abi: nero.abi,
			address,
			functionName: 'pricePerTokenMint',
			chainId: sepolia.id,
		},
		{
			abi: nero.abi,
			address,
			functionName: 'unlockedBackgroundURI',
			chainId: sepolia.id,
		},
		{
			abi: nero.abi,
			address,
			functionName: 'unlockedGlbURI',
			chainId: sepolia.id,
		},
	]

	if (tokenId !== undefined && tokenId >= 0) {
		contracts.push({
			abi: nero.abi,
			address,
			functionName: 'ownerOf',
			chainId: sepolia.id,
			args: [tokenId || 0],
		})
		contracts.push({
			abi: nero.abi,
			address,
			functionName: 'scoreboard',
			chainId: sepolia.id,
			args: [tokenId || 0],
		})
	}

	const results = useReadContracts({
		allowFailure: false,
		contracts: contracts,
	})

	console.log(results.data)

	useEffect(() => {
		console.log(results.isFetched, results.data)
		if (!results.isFetched || !results.data) {
			return
		}
		if (metadata) {
			console.log('metadata exists??')
			return
		}
		console.log('fetched, lets grab the metadata')

		fetch(results.data[0]).then(async (res) => {
			const json = await res.json()
			console.log(json)
			setMetadata(json)
			setModelSource(json.avatar.locked)

			if (json.knowledge.public) {
				const k = await fetch(json.knowledge.public)
				const j = await k.text()
				setPublicAgentKnowledge(j)
			}
		})
	}, [results])

	async function buyNow() {
		try {
			setBuyStatus({ message: '', status: 0 })
			setBuying(true)
			const hash = await walletClient?.writeContract({
				abi: nero.abi,
				address,
				functionName: 'mint',
				args: [1],
				value: BigInt(0),
			})
			if (!hash) {
				throw new Error('Failed to execute deploy contract txn')
			}
			console.log('minting ... here is the hash!', hash)
			const txn = await publicClient.waitForTransactionReceipt({ hash })

			console.log('transaction result is', txn, txn.to)
			console.log(txn.logs)
			console.log('purchase success!')

			const topics = decodeEventLog({
				abi: nero.abi,
				...txn.logs[0],
			})
			console.log(topics)

			if (!topics.args) {
				setBuyStatus({ message: 'Unable to Purchase NFT', status: 400 })
				return
			}
			setNftId(Number(topics.args.tokenId))
			setTxnHash(txn.transactionHash)
			setBuying(false)
			setBuyStatus({
				message: `Successfully purchased NFT with ID ${Number(
					topics.args.tokenId
				)}`,
				status: 200,
			})
		} catch (e) {
			setBuyStatus({
				message: 'Unable to Purchase NFT, error was ' + e.message,
				status: 400,
			})
		} finally {
			setBuying(false)
			results.refetch()
		}
	}

	async function unlockAvatar() {
		if (!isConnected) {
			toast('Connect your wallet')
		}

		if (isConnected) {
			setUnlock(true)
			setUnlocking(true)
		}

		// if (!metadata) {
		// 	return
		// }

		// const resp = await fetch(metadata.avatar.unlocked).then((response) =>
		// 	response.json()
		// ) // json gives us the ciphertext and hash for data

		// console.log(resp)

		// const decrypt = await decryptData(
		// 	resp.ciphertext,
		// 	resp.dataToEncryptHash,
		// 	address
		// )

		// console.log(decrypt)

		// setModelSource(getFile(decrypt, 'octet/stream'))
		setTimeout(() => {
			setUnlocking(false)
		}, 5000)

		// setUnlock(true)
	}

	async function unlockKnowledge() {
		if (!metadata) {
			return
		}

		if (
			!metadata.knowledge.private ||
			metadata.knowledge.private.length === 0
		) {
			return
		}

		setUnlocking(true)

		try {
			const result = await executeLitAction(address, code, {
				url: metadata.knowledge.private,
			})
			console.log(result)
		} finally {
			setUnlocking(false)
		}
	}

	const statusMessage = useMemo(() => {
		if (buyStatus.status === 0) {
			return <></>
		}
		if (buyStatus.status === 200) {
			return (
				<>
					<>
						Successfully purchased the NFT {nftId} and should now be in your
						wallet.
					</>
					<>
						<Button
							onClick={() =>
								window.open('https://sepolia.etherscan.io/tx/' + txnHash)
							}
						>
							View on Etherscan
						</Button>
						<Button
							color='success'
							onClick={() => window.open(`/viewer/${address}/${nftId}`)}
						>
							View NFT
						</Button>
					</>
				</>
			)
		}
		return (
			<>
				<>We had an issue minting your nft, the error was {buyStatus.message}</>
			</>
		)
	}, [buyStatus])

	const supply = useMemo(() => {
		if (!results.data || results.isError) {
			return <></>
		}
		const minted = Number(results.data[1])
		const supply = Number(results.data[2])

		return (
			<div className='py-2'>
				<>
					Minted {minted} of {supply}
				</>
			</div>
		)
	}, [results])

	const traits = useMemo(() => {
		if (!metadata || !metadata.traits) {
			return <></>
		}

		return (
			<>
				{metadata.traits.map((t) => (
					<div className='text-black'>
						<p>{t.trait_type}</p>
						<p>{t.value}</p>
					</div>
				))}
			</>
		)
	}, [results])

	if (!results.isFetched) {
		return (
			<>
				<div className='text-1xl text-black'>
					<>loading...</>
				</div>
			</>
		)
	}

	if (!results.data || results.isError) {
		return (
			<>
				<>
					<>
						We were unable to load the NFT, please check the URL and try again
						Error was {results.error?.message}
					</>
				</>
			</>
		)
	}

	// console.log('token id is', tokenId)

	if (tokenId !== 0 && !tokenId) {
		return (
			<>
				{/* <w3m-button /> */}
				<>
					<>{/* <Model src={modelSource} /> */}</>
					<div className='text-black'>
						<p>{results.data?.[3]}</p>
						<p>{metadata && metadata.description}</p>
						{supply}
						{traits}
						<Button variant='contained' onClick={buyNow} disabled={buying}>
							{buying ? 'Minting a token!' : 'Buy Now'}
						</Button>
						{statusMessage}
					</div>
				</>
			</>
		)
	}

	return (
		<main className='relative min-h-screen'>
			<ToastContainer position='top-right' autoClose={5000} />
			<a-scene className='h-48'>
				{!unlock ? (
					<a-sky
						src={'/webxr-assets/images/sneakers-locked.jpg'}
						rotation='0 -130 0'
					></a-sky>
				) : (
					<>
						<a-assets>
							<video
								id='video'
								preload='auto'
								src='/webxr-assets/videos/sneakers-unlocked.mp4'
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
			{/* <AframeContainer
				locked={data.locked_features}
				image={data.image}
				video={data.video}
			/> */}
			<div>
				<div className='h-[30vh] w-[30%] p-2 absolute top-0 right-5 rounded-md'>
					<Card className='card text-white'>
						<CardHeader>
							<CardTitle>Silver Spark Sneakers</CardTitle>
							<CardDescription className='text-ellipsis text-white'>
								Description: Imagine sleek, futuristic kicks built for
								conquering concrete battlegrounds. Each step a statement, these
								silver sneakers are crafted with premium materials and
								cutting-edge design.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='flex gap-3 items-center'>
								<VscDebugBreakpointLogUnverified />
								<p>Designer - Lexi</p>
							</div>
							<div className='flex gap-3 items-center'>
								<VscDebugBreakpointLogUnverified />
								<p>Manufacturer - Concrete Rhythm</p>
							</div>
							<div className='flex gap-3 items-center'>
								<VscDebugBreakpointLogUnverified />
								<p>Sizes - From 5-11 UK size for women and men</p>
							</div>

							<p className='mt-4'>
								Highly exclusive Silver Spark Sneakers from Urban Pulse Limited
								Edition NFT Collection by Concrete Rhythm
							</p>
						</CardContent>
					</Card>
				</div>
				{/* <div className='h-[10vh] w-[30%] absolute top-[60%] right-5 rounded-md'>
					<Card className='card text-white'>
						<CardHeader>
							<CardTitle>Public Knowledge</CardTitle>
						</CardHeader>
						<CardContent>{publicAgentKnowledge?.slice(0, 50)}</CardContent>
						<Button
							onClick={unlockKnowledge}
							disabled={unlocking}
							className='my-4 mx-auto block'
						>
							Unlock Knowledge
						</Button>
					</Card>
				</div>
				{privateAgentKnowledge && (
					<div className='h-[10vh] w-[30%] p-2 absolute top-[60%] right-5 rounded-md'>
						<Card className='card text-white'>
							<CardHeader>
								<CardTitle>Private Knowledge</CardTitle>
							</CardHeader>
							<CardContent>{privateAgentKnowledge?.slice(0, 50)}</CardContent>
						</Card>
					</div>
				)} */}
			</div>
			<div className='absolute top-8 left-9'>
				<Button class='flex gap-2 p-2 rounded text-white items-center bg-[#0f172a]'>
					<ConnectButton.Custom>
						{({
							account,
							chain,
							openAccountModal,
							openChainModal,
							openConnectModal,
							authenticationStatus,
							mounted,
						}) => {
							// Note: If your app doesn't use authentication, you
							// can remove all 'authenticationStatus' checks
							const ready = mounted && authenticationStatus !== 'loading'
							const connected =
								ready &&
								account &&
								chain &&
								(!authenticationStatus ||
									authenticationStatus === 'authenticated')

							return (
								<div
									{...(!ready && {
										'aria-hidden': true,
										style: {
											opacity: 0,
											pointerEvents: 'none',
											userSelect: 'none',
										},
									})}
								>
									{(() => {
										if (!connected) {
											return (
												<button onClick={openConnectModal} type='button'>
													Connect Wallet
												</button>
											)
										}

										if (chain.unsupported) {
											return (
												<button onClick={openChainModal} type='button'>
													Wrong network
												</button>
											)
										}

										return (
											<div style={{ display: 'flex', gap: 12 }}>
												<button
													onClick={openChainModal}
													style={{ display: 'flex', alignItems: 'center' }}
													type='button'
												>
													{chain.hasIcon && (
														<div
															style={{
																background: chain.iconBackground,
																width: 12,
																height: 12,
																borderRadius: 999,
																overflow: 'hidden',
																marginRight: 4,
															}}
														>
															{chain.iconUrl && (
																<img
																	alt={chain.name ?? 'Chain icon'}
																	src={chain.iconUrl}
																	style={{ width: 12, height: 12 }}
																/>
															)}
														</div>
													)}
													{chain.name}
												</button>

												<button onClick={openAccountModal} type='button'>
													{account.displayName}
													{account.displayBalance
														? ` (${account.displayBalance})`
														: ''}
												</button>
											</div>
										)
									})()}
								</div>
							)
						}}
					</ConnectButton.Custom>
				</Button>
				<div className=' h-[78vh]'>
					{/* <Avatar modelSrc={modelSource} cameraInitialDistance={3.5} /> */}

					<div className='flex gap-1 items-start'>
						<model-viewer
							src={
								!unlock
									? 'https://models.readyplayer.me/665b84cde2ff4b63db995c24.glb'
									: 'https://models.readyplayer.me/66438de292cec457eec9bfd2.glb'
							}
							shadow-intensity='1'
							camera-controls
							auto-rotate
							ar
							style={{ height: '400px' }}
						></model-viewer>
						<Button onClick={unlockAvatar} disabled={unlocking}>
							Unlock Token
						</Button>
					</div>
				</div>
				{/* <AvatarContainer
					locked={data.locked_features}
					attributes={data.attributes}
					modelUrl={data.external_url}
				/> */}
			</div>
			<div className='absolute bottom-12 left-[30%]'>
				<p className='text-center font-bold text-white'>
					Click on the mic icon to speak
				</p>
				<VoiceRecorder />
			</div>
		</main>
	)
}
