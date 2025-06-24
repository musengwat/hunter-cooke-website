import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Publications from "./components/Publications";
import Contact from "./components/Contact";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from Strapi
    const fetchData = async () => {
      try {
        const articlesRes = await axios.get(
          "http://localhost:1337/api/articles?populate=*"
        );
        const pubsRes = await axios.get(
          "http://localhost:1337/api/publications?populate=*"
        );

        setArticles(articlesRes.data.data);
        setPublications(pubsRes.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Portfolio articles={articles} loading={loading} />
        <Publications publications={publications} />
        <Contact />
      </main>
      <footer className="bg-primary text-white py-8 text-center">
        <p>
          &copy; {new Date().getFullYear()} Hunter Cooke. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
