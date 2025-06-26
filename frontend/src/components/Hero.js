import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

const Hero = ({ heroInfo }) => {
  console.log(heroInfo);
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-gray-800 text-white"
    >
      <div className="text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          Hunter Cooke
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-4 text-gray-300"
        >
          {/* Sports Journalist • Esports Expert • Sports Business Reporter */}
          {heroInfo?.specializations.map((item, index) => (
            <span key={index}>
              {item.title}
              {index < heroInfo.specializations.length - 1 ? " • " : ""}
            </span>
          ))}
        </motion.p>

        {heroInfo?.featuredIn && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg mb-8 text-gray-400"
          >
            Featured in:{" "}
            {heroInfo?.featuredIn.map((item, index) => (
              <span key={index}>
                {item.title}
                {index < heroInfo.featuredIn.length - 1 ? ", " : ""}
              </span>
            ))}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="portfolio" smooth={true} duration={500}>
            <button className="btn-primary">View My Work</button>
          </Link>
          <Link to="contact" smooth={true} duration={500}>
            <button className="btn-secondary">Get In Touch</button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
