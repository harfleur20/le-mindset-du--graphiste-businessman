import React from 'react';
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

function App() {
  

  return (
    <div className="App">

      <Countdown />
      <Header />
      <Hero />
      <Author />
      <Book />
      <Preview />
      <Testimonials />
      <GoldenPage />
      <Purchase />
      <Footer />
    </div>
  );
}

export default App;