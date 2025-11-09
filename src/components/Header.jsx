import React, { useState, useEffect } from 'react'
import logomindset from '../assets/logo-mindset.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Gestion du scroll pour l'effet de navbar fixed
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  // Fermer le menu en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.nav') && !event.target.closest('.mobile-menu-toggle')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img src={logomindset} alt="logo" />
          </div>
          
          {/* Menu Burger */}
          <div 
            className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul>
              <li>
                <a 
                  href="#accueil" 
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('accueil')
                  }}
                  className={isMenuOpen ? 'fade-in' : ''}
                >
                  Accueil
                </a>
              </li>
              <li>
                <a 
                  href="#auteur" 
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('auteur')
                  }}
                  className={isMenuOpen ? 'fade-in' : ''}
                >
                  L'Auteur
                </a>
              </li>
              <li>
                <a 
                  href="#livre" 
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('livre')
                  }}
                  className={isMenuOpen ? 'fade-in' : ''}
                >
                  Le Livre
                </a>
              </li>
              <li>
                <a 
                  href="#temoignages" 
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('temoignages')
                  }}
                  className={isMenuOpen ? 'fade-in' : ''}
                >
                  Témoignages
                </a>
              </li>
                <li>
                <a 
                    href="#preview" 
                    onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('preview')
                    }}
                    className={isMenuOpen ? 'fade-in' : ''}
                >
                    Feuilleter
                </a>
                </li>
              <li>
                <a 
                  href="#achat" 
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection('achat')
                  }}
                  className={isMenuOpen ? 'fade-in' : ''}
                >
                  Acheter
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header