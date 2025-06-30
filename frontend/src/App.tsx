import { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Publications from "./components/Publications";
import Contact from "./components/Contact";
import { apiURL } from "./utils/constants";
import "./App.css";

const fetchDataByType = async (dataType: string) => {
  try {
    const response = await axios.get(`${apiURL}/api/${dataType}?populate=*`);
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
    const fetchData = async () => {
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
