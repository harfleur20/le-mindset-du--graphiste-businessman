import React from 'react';
import Chatbot from './Chatbot';
import Countdown from './components/Countdown';
import Header from './components/Header';
import Hero from './components/Hero';
import Author from './components/Author';
import Book from './components/Book';
import Preview from './components/Preview/Preview';
import Testimonials from './components/Testimonials';
import GoldenPage from './components/GoldenPage';
import Purchase from './components/Purchase';
import Footer from './components/Footer';
import Faq from './components/Faq';

function App() {
  

  return (
    <div className="App">
      <Chatbot />
      <Countdown />
      <Header />
      <Hero />
      <Author />
      <Book />
      <Preview />
      <Testimonials />
      <GoldenPage />
      <Purchase />
      <Faq />
      <Footer />
    </div>
  );
}

export default App;