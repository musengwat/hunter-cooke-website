import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center mb-8">About Hunter</h2>

          <div className="prose prose-lg mx-auto">
            <p className="text-gray-700 leading-relaxed mb-6">
              I'm Hunter Cooke, a sports journalist whose work has been featured
              across major publications including SI.com and SBNation.com, with
              my reporting contributing to Netflix's acclaimed 'Last Chance U'
              documentary series.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Currently, I'm a staff writer at Sports Business Journal focusing
              on the esports industry, while freelancing for Big 12 DieHards,
              the Austin Statesman, and Texas Sports Monthly. I cover everything
              from college athletics to the evolving esports landscape.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              My expertise spans traditional sports coverage, esports business
              analysis, and the intersection of technology and athletics. I've
              developed deep sources within organizations like GameSquare, TSM,
              and emerging teams that are reshaping competitive gaming.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-secondary mb-2">5+</h3>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-secondary mb-2">200+</h3>
                <p className="text-gray-600">Published Articles</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-secondary mb-2">6</h3>
                <p className="text-gray-600">Major Publications</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
