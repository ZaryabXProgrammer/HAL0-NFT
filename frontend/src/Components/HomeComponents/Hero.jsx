import React from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Users, Plus } from 'lucide-react';

function Hero() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stats = [
    { label: 'Artworks', value: '70K', icon: TrendingUp },
    { label: 'Artists', value: '17K', icon: Users },
    { label: 'Auctions', value: '97K', icon: Plus },
  ];

  return (
    <section className="min-h-screen relative bg-cover bg-no-repeat bg-fixed"
      style={{ backgroundImage: 'url(/starsBg.jpg)' }}>
      {/* Navigation */}
     

      {/* Hero Section */}
      <aside className="container pt-[9%] mx-auto px-[5%] flex items-center justify-between">
        <motion.div
          className="max-w-2xl"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="text-5xl leading-[1.3] font-bold text-white mb-6">
            Join Master Chief<br />and the Covenant<br />in the Fight for Humanity!
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Discover epic battles, iconic weapons, and legendary heroes from the Halo 2 universe.
            Explore the stories of Master Chief, the Covenant, and the Flood, and immerse yourself in
            the ultimate sci-fi adventure.
          </p>
          <div className="flex space-x-4">
            <motion.button
              className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Halo 2
            </motion.button>
            <motion.button
              className="border-2 border-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-600/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Your Legend
            </motion.button>
          </div>


          {/* Stats */}
          <div className="flex space-x-12 mt-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <stat.icon className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://f8n-ipfs-production.imgix.net/QmckiDhA8j8WhdV15MqRctQq4Li95knwTbPwPYa6aSwTXy/nft.jpg"
            alt="Featured NFT"
            className="w-[550px] h-[550px] object-cover rounded-2xl"
          />
       
        </motion.div>
      </aside>
    </section>
  );
}

export default Hero;