import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Portfolio = ({ articles, loading }) => {
  const [filter, setFilter] = useState("all");
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Sample data for when Strapi isn't connected
  const sampleArticles = [
    {
      id: 1,
      attributes: {
        title:
          "GameSquare's Integration of Gaming Content Creators Sets New Industry Standard",
        publication: "Sports Business Journal",
        date: "2023-11-15",
        excerpt:
          "While esports-focused businesses have long targeted the reach of gaming content creators, no one has integrated them into the business quite like GameSquare.",
        category: "esports",
        url: "#",
      },
    },
    {
      id: 2,
      attributes: {
        title: "100 Thieves Launches Bank Heist in Fortnite's Unreal Editor",
        publication: "Sports Business Journal",
        date: "2023-10-20",
        excerpt:
          "100 Thieves president John Robinson tells SBJ that their Project X team is still focused on developing an in-house video game.",
        category: "esports",
        url: "#",
      },
    },
    {
      id: 3,
      attributes: {
        title: "Big 12's Push into Competitive Gaming",
        publication: "Big 12 DieHards",
        date: "2023-11-01",
        excerpt:
          "Conference officials see esports as key to engaging younger fans and creating new revenue streams.",
        category: "college-sports",
        url: "#",
      },
    },
  ];

  const displayArticles = articles.length > 0 ? articles : sampleArticles;
  const filteredArticles =
    filter === "all"
      ? displayArticles
      : displayArticles.filter(
          (article) => article.attributes.category === filter
        );

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
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["all", "esports", "sports-business", "college-sports"].map(
              (category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    filter === category
                      ? "bg-secondary text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category.charAt(0).toUpperCase() +
                    category.slice(1).replace("-", " ")}
                </button>
              )
            )}
          </div>

          {/* Articles Grid */}
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
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-accent font-semibold text-sm mb-2">
                    {article.attributes.publication}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary">
                    <a
                      href={article.attributes.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-secondary transition-colors"
                    >
                      {article.attributes.title}
                    </a>
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {article.attributes.excerpt}
                  </p>
                  <time className="text-sm text-gray-500">
                    {new Date(article.attributes.date).toLocaleDateString()}
                  </time>
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
