import React, { useState, useEffect } from "react";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: "Ce livre a changé ma vision du métier de graphiste. Grâce aux conseils de Kenne, j'ai triplé mes revenus en seulement 3 mois!",
      author: "Marie G.",
      role: "Graphiste freelance, Douala",
      avatar: "/photo-2.png",
    },
    {
      id: 2,
      text: "Enfin un livre qui parle des réalités du graphisme en Afrique! Les stratégies sont concrètes et applicables immédiatement.",
      author: "Pierre D.",
      role: "Designer, Yaoundé",
      avatar: "/photo-1.jpg",
    },
    {
      id: 3,
      text: "La section sur la fixation des prix m'a particulièrement aidé. Je ne sous-estime plus ma valeur et mes clients me respectent davantage.",
      author: "Aïcha S.",
      role: "Illustratrice, Abidjan",
      avatar: "/photo-3.png",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  return (
    <section className="testimonials-section" id="temoignages">
      <div className="container">
        <h2 className="section-title">Témoignages</h2>
        <div className="testimonials-carousel">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`testimonial ${
                index === currentTestimonial ? "active" : ""
              }`}
            >
              <div className="testimonial-content">
                <p>{testimonial.text}</p>
                <div className="testimonial-author">
                  <img src={testimonial.avatar} alt={testimonial.author} />
                  <div className="author-details">
                    <h4>{testimonial.author}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="carousel-controls">
            <button className="carousel-prev" onClick={prevTestimonial}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="carousel-next" onClick={nextTestimonial}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          <div className="carousel-indicators">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`indicator ${
                  index === currentTestimonial ? "active" : ""
                }`}
                onClick={() => goToTestimonial(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
