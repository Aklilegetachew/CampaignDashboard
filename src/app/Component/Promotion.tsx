// components/AppDownloadSection.tsx

import Image from "next/image";
import { motion } from "framer-motion";

export default function AppDownloadSection() {
  return (
    <section className=" bg-[##0d1518] flex flex-col md:flex-row items-center justify-center py-12 md:py-24 px-6 md:px-12">
      <div className="flex justify-center mb-6 md:mb-0 md:mr-8 relative">
        <div className="relative flex space-x-4">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            whileHover={{ scale: 1.05, rotate: -10 }}
          >
            <img
              src="/app1rd.png"
              alt="Mobile app screen"
              width={280}
              height={360}
              className="transform rotate-[-15deg] shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            whileHover={{ scale: 1.05, rotate: 10 }}
          >
            <img
              src="/app2rd.png"
              alt="Mobile app screen"
              width={280}
              height={260}
              className="transform rotate-[15deg] shadow-lg"
            />
          </motion.div>
        </div>
      </div>
      <motion.div
        className="text-center md:text-left max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Stay Connected With <br />
          Tomoca Coffee: Download <br />
          Our App Today!
        </h2>
        <p className=" mb-6 text-slate-400">
          Experience the world of Tomoca Coffee at your fingertips with our
          user-friendly mobile app. From browsing our latest coffee selections
          to receiving exclusive offers and updates, our app brings the Tomoca
          Coffee experience directly to your smartphone.
        </p>
        <motion.button
          className="border border-white px-6 py-2 text-sm font-semibold transition-colors duration-200 hover:bg-black hover:text-white text-slate-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          DOWNLOAD HERE
        </motion.button>
      </motion.div>
    </section>
  );
}
