import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Publications = ({ publications }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Sample data for when Strapi isn't connected
  const samplePublications = [
    {
      id: 1,
      attributes: {
        name: "Sports Business Journal",
        description: "Staff writer covering the business of esports and gaming",
        logo: "https://via.placeholder.com/200x80",
      },
    },
    {
      id: 2,
      attributes: {
        name: "SI.com",
        description: "Contributing writer for sports and esports coverage",
        logo: "https://via.placeholder.com/200x80",
      },
    },
    {
      id: 3,
      attributes: {
        name: "Netflix - Last Chance U",
        description: "Contributing journalist for documentary series",
        logo: "https://via.placeholder.com/200x80",
      },
    },
    {
      id: 4,
      attributes: {
        name: "Big 12 DieHards",
        description: "Freelance coverage of Big 12 Conference athletics",
        logo: "https://via.placeholder.com/200x80",
      },
    },
  ];

  const displayPublications =
    publications.length > 0 ? publications : samplePublications;

  return (
    <section id="publications" className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12">Publications</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayPublications.map((pub, index) => (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center"
              >
                <img
                  src={pub.attributes.logo}
                  alt={pub.attributes.name}
                  className="h-16 mx-auto mb-4 object-contain"
                />
                <h3 className="text-lg font-semibold mb-2">
                  {pub.attributes.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {pub.attributes.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Publications;
