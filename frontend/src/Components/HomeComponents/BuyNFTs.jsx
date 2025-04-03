import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Zap, Hammer, Tag } from 'lucide-react';
import NFT0 from '../../assets/nfts/0.jpeg';
import NFT1 from '../../assets/nfts/1.jpeg';
import NFT2 from '../../assets/nfts/2.jpeg';
import NFT3 from '../../assets/nfts/3.jpeg';
import NFT4 from '../../assets/nfts/4.jpeg';
import NFT5 from '../../assets/nfts/5.jpeg';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { HALO_ABI, HALO_CONTRACT_ADDRS } from '../../Utils/Contract/Halo';
import { parseEther } from 'viem';

const nfts = [
    {
        id: 1,
        tokenId: 0,
        name: "Master Chief Helmet",
        creator: "HaloArtist",
        price: "0.001 ETH",
        image: NFT0,  // Imported image
        bidEnds: "12h 30m",
        description: "The iconic helmet worn by the legendary Spartan warrior, Master Chief, in Halo 2.",
        mintStatus: false, // Default mint status
    },
    {
        id: 2,
        tokenId: 1,
        name: "Covenant Elite Armor",
        creator: "HaloArtist",
        price: "0.001 ETH",
        image: NFT1,  // Imported image
        bidEnds: "6h 15m",
        description: "The battle-ready armor of the Covenant Elite, a fierce enemy from the Halo 2 universe.",
        mintStatus: false, // Default mint status
    },
    {
        id: 3,
        tokenId: 2,
        name: "Halo Ring Fragment",
        creator: "HaloArtist",
        price: "0.001 ETH",
        image: NFT2,  // Imported image
        bidEnds: "23h 45m",
        description: "A fragment of the Halo ring, a symbol of the ancient Forerunner technology in the Halo 2 saga.",
        mintStatus: false, // Default mint status
    },
    {
        id: 4,
        tokenId: 3,
        name: "Energy Sword",
        creator: "HaloArtist",
        price: "0.001 ETH",
        image: NFT3,  // Imported image
        bidEnds: "18h 00m",
        description: "The deadly and iconic Energy Sword used by the Covenant Elites in combat during the Halo 2 war.",
        mintStatus: false, // Default mint status
    },
    {
        id: 5,
        tokenId: 4,
        name: "Grunt Fuel Rod Gun",
        creator: "HaloArtist",
        price: "0.001 ETH",
        image: NFT4,  // Imported image
        bidEnds: "9h 45m",
        description: "The Grunt Fuel Rod Gun, a powerful yet quirky weapon used by the Covenant Grunts in the Halo 2 series.",
        mintStatus: false, // Default mint status
    },
    {
        id: 6,
        tokenId: 5,
        name: "Flood Infection Form",
        creator: "HaloArtist",
        price: "0.001 ETH",
        image: NFT5,  // Imported image
        bidEnds: "14h 00m",
        description: "A terrifying Flood Infection Form, a parasitic organism from the Halo 2 universe that threatens all life.",
        mintStatus: false, // Default mint status
    }
];


function BuyNFTs() {
    const { isConnected } = useAccount();
    const { data: hash, writeContract } = useWriteContract();

 


    const { isSuccess } = useWaitForTransactionReceipt();


    const [transactionStatus, setTransactionStatus] = useState(null);


    const { data: mintStatus } = useReadContract({
        address: HALO_CONTRACT_ADDRS,
        abi: HALO_ABI,
        functionName: "isTokenMinted",
        args: [0], // Token ID 0
    })
    console.log(mintStatus)

  

    const mintNFT = async (tokenId) => {

        if (!isConnected) {
            setTransactionStatus({ type: 'error', message: 'Please connect your wallet first!' });
            return;
        }

        const value = parseEther('0.001'); // This should be a valid BigNumber now
        try {
            setTransactionStatus({ type: 'pending', message: 'Processing transaction...' });
            await writeContract({
                address: HALO_CONTRACT_ADDRS,
                abi: HALO_ABI,
                functionName: "mint",
                args: [tokenId],
                value: value
            })
            setTransactionStatus({ type: 'success', message: 'Transaction successful!' });
        } catch (error) {
            setTransactionStatus({ type: 'error', message: 'Transaction failed' });
            console.error("Transaction failed:", error);
        }




    }




    const cardVariants = {
        inactive: {
            rotateY: 0,
            scale: 1,
            z: 0
        },
        active: {
            rotateY: 10,
            scale: 0.95,  // Reduced scale
            z: 50
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-indigo-900 to-black py-24">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="stars absolute inset-0 opacity-70"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/70 via-purple-900/50 to-pink-800/90"></div>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-6">
                        BUY NFTs
                    </h2>
                    <p className="text-gray-300 text-xl max-w-3xl mx-auto">
                        Explore and collect rare digital art from the far reaches of the universe. Own exclusive pieces of the cosmos through our curated NFT marketplace.
                    </p>
                </motion.div>

                {<AnimatePresence>
                    {isSuccess && (
                        <>
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className={`mt-4 p-3 rounded-lg text-center ${transactionStatus.type === 'success'
                                    ? 'bg-green-600/20 text-green-300'
                                    : transactionStatus.type === 'error'
                                        ? 'bg-red-600/20 text-red-300'
                                        : 'bg-yellow-600/20 text-yellow-300'
                                    }`}
                            >
                                {transactionStatus.message}
                            </motion.div>
                            <p>{hash && hash}</p>
                        </>
                    )}
                </AnimatePresence>}

                {/* 3D NFT Cards */}
                <motion.div
                    className="flex flex-wrap justify-center gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {nfts.map((nft) => (
                        <motion.div
                            key={nft.id}
                            className="relative perspective-1000"
                            variants={itemVariants}

                        >
                            <motion.div
                                className="w-64 bg-gradient-to-br from-indigo-900/90 to-purple-900/90 rounded-2xl shadow-xl backdrop-blur-sm border border-purple-800/50 overflow-hidden"
                                variants={cardVariants}

                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* Card Image */}
                                <div className="relative h-64 mb-4 overflow-hidden">
                                    <img
                                        src={nft.image}
                                        alt={nft.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                                        <div className="bg-purple-600/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">
                                            {nft.bidEnds}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400" />
                                            <span className="text-xs text-white">Featured</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-4">
                                    <h3 className="text-xl font-bold text-white mb-1">{nft.name}</h3>
                                    <p className="text-indigo-300 text-sm mb-3">By {nft.creator}</p>

                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <p className="text-xs text-gray-400">Current Price</p>
                                            <p className="text-white font-bold flex items-center">
                                                <Tag className="w-4 h-4 mr-1 text-purple-400" />
                                                {nft.price}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400">Highest Bid</p>
                                            <p className="text-white font-bold flex items-center justify-end">
                                                <Hammer className="w-4 h-4 mr-1 text-purple-400" />
                                                {nft.price}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-2">
                                        {nft.mintStatus ?

                                            <motion.button
                                                className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-2 px-4 rounded-lg flex-1 text-sm font-medium border border-purple-500 flex items-center justify-center"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}

                                            >
                                                <Zap className="w-4 h-4 mr-1" />
                                                Already Minted
                                            </motion.button>
                                            : <motion.button
                                                className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-2 px-4 rounded-lg flex-1 text-sm font-medium border border-purple-500 flex items-center justify-center"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => mintNFT(nft.tokenId)}
                                            >
                                                <Zap className="w-4 h-4 mr-1" />
                                                Mint
                                            </motion.button>
                                        }


                                    </div>
                                </div>
                            </motion.div>

                            {/* Reflection Effect */}
                            <div className="absolute -bottom-16 left-0 right-0 h-16 bg-gradient-to-b from-purple-600/30 to-transparent blur-md transform scale-y-50 opacity-50"></div>
                        </motion.div>
                    ))}
                </motion.div>



                {/* View More Button */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                >
                    <motion.button
                        className="bg-transparent border-2 border-purple-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-800/20 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View More NFTs
                    </motion.button>
                </motion.div>
            </div>

            {/* Add CSS for star background */}
            <style jsx>{`
        .stars {
          background-image: radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 90px 40px, #fff, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: stars-animation 8s linear infinite;
        }
        
        @keyframes stars-animation {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 0 200px;
          }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
        </section>
    );
}

export default BuyNFTs;