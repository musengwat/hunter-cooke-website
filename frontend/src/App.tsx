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

const apiPath = "http://localhost:1337/";

const fetchDataByType = async (dataType: string) => {
  try {
    const response = await axios.get(`${apiPath}api/${dataType}?populate=*`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching ${dataType}:`, error);
  }
};

function App() {
  const [articles, setArticles] = useState([]);
  const [publications, setPublications] = useState([]);
  const [contactInfo, setContactInfo] = useState(undefined);
  const [aboutInfo, setAboutInfo] = useState(undefined);
  const [heroInfo, setHeroInfo] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from Strapi
    const fetchData = async () => {
      // const aboutData = await fetchDataByType("about-section");
      // const articlesData = await fetchDataByType("article-collections");
      // const contactData = await fetchDataByType("contact-information");
      // const heroData = await fetchDataByType("hero-description");
      // const publicationsData = await fetchDataByType("publication-collections");
      // setAboutInfo(aboutData);
      // setArticles(articlesData);
      // setContactInfo(contactData);
      // setHeroInfo(heroData);
      // setPublications(publicationsData);
      setAboutInfo(await fetchDataByType("about-section"));
      setArticles(await fetchDataByType("article-collections"));
      setContactInfo(await fetchDataByType("contact-information"));
      setHeroInfo(await fetchDataByType("hero-description"));
      setPublications(await fetchDataByType("publication-collections"));
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Navigation />
      <main>
        <Hero heroInfo={heroInfo} />
        <About aboutInfo={aboutInfo} publicationCount={publications?.length} />
        {articles?.length > 0 && (
          <Portfolio articles={articles} loading={loading} />
        )}
        {publications?.length > 0 && (
          <Publications publications={publications} />
        )}
        <Contact contactInfo={contactInfo} />
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
