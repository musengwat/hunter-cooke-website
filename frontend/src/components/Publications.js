import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { apiURL } from "../utils/constants";

const getLogo = (pub) => {
  const logoURLPath = pub?.logo?.length > 0 && pub?.logo[0]?.url;

  if (logoURLPath) {
    const logoURL = logoURLPath.startsWith("http")
      ? logoURLPath
      : `${apiURL}${logoURLPath}`;
    return (
      <img
        src={logoURL}
        alt={pub?.name}
        className="h-16 mx-auto mb-4 object-contain"
      />
    );
  }
  return;
};

const Publications = ({ publications }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
            {publications.map((pub, index) => (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center"
              >
                {getLogo(pub)}
                <h3 className="text-lg font-semibold mb-2">
                  {pub?.name || "Publication Name"}
                </h3>
                <p className="text-gray-600 text-sm">
                  {pub?.description || "Publication Description"}
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
