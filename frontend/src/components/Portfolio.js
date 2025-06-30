import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { richTextStyles } from "../utils/constants.js";

const Portfolio = ({ articles, loading }) => {
  // const [filter, setFilter] = useState("all");
  const filter = "all";
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filteredArticles =
    filter === "all"
      ? articles
      : articles.filter((article) => article.category === Array(filter));

  // const uniqueCategories = [
  //   "all",
  //   ...Array.from(new Set(articles.map((a) => a.category[0]))),
  // ];

  return (
    <section id="portfolio" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center mb-8">Portfolio</h2>

          {/* Filter Buttons */}
          {/* <div className="flex flex-wrap justify-center gap-4 mb-12">
            {uniqueCategories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  filter === category
                    ? "bg-secondary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category?.charAt(0).toUpperCase() +
                  category?.slice(1).replace("-", " ")}
              </button>
            ))}
          </div> */}

          {loading ? (
            <div className="text-center">Loading articles...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
                >
                  <h3 className="text-xl font-bold mb-3 text-primary">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-secondary transition-colors"
                    >
                      {article.title}
                    </a>
                  </h3>
                  <BlocksRenderer
                    content={article.excerpt}
                    blocks={richTextStyles}
                  />
                  <div className="mt-auto flex items-center justify-between text-sm w-full pt-4 border-t border-gray-100">
                    <span className="text-accent font-semibold">
                      {article.publication_collection?.name}
                    </span>
                    <time className="text-gray-500">
                      {new Date(article.date).toLocaleDateString()}
                    </time>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
