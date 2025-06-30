import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { richTextStyles } from "../utils/constants.js";

const About = ({ aboutInfo, publicationCount }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  console.log(publicationCount);
  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center mb-8">About Me</h2>

          <div className="prose prose-lg mx-auto">
            {aboutInfo && (
              <BlocksRenderer
                content={aboutInfo?.about}
                blocks={richTextStyles}
              />
            )}

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-secondary mb-2">
                  {dayjs().diff(dayjs("2014-02-01"), "year")}+
                </h3>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-secondary mb-2">
                  1300+
                </h3>
                <p className="text-gray-600">Published Articles</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-secondary mb-2">
                  {publicationCount || 6}+
                </h3>
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
