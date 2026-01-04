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


import MobileStickyCTA from './components/MobileStickyCTA';

function App() {
  return (
    <div className="App">
      {/* Le compte à rebours est placé en premier, tout en haut */}
      <Countdown onVisibilityChange={() => {}} />
      
      <Chatbot />
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

      <MobileStickyCTA />
    </div>
  );
}

export default App;