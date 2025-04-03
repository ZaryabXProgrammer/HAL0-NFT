import React from 'react'
import { motion } from 'framer-motion';
import { Search, TrendingUp, Users, Plus } from 'lucide-react';
import ConnectWalletBtn from '../Common/ConnectWalletBtn'



const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full backdrop-blur-[2px] px-6 py-4 flex items-center justify-between z-50">
            <motion.h1
                className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                NFT
            </motion.h1>
            <div className="flex items-center space-x-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search NFT collections..."
                        className="bg-gray-800 rounded-full py-2 pl-10 pr-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                    />
                </div>
                <ConnectWalletBtn />
            </div>
        </nav>
    )
}

export default Navbar