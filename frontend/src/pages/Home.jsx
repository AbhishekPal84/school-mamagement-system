import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../App.css";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/gallery/images/")
      .then((response) => response.json())
      .then((data) => {
    console.log("Gallery Data:", data);
    setGallery(data);
      })
      .catch((error) => {
        console.log("Gallery Error:", error);
      });
  }, []);

  return (
    <div className="home-page">

      {/* =========================
          NAVBAR
      ========================== */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
        <div className="container">

          <Link className="navbar-brand fw-bold" to="/">
            🏫 MKM SCHOOL & Skill center
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">

            <ul className="navbar-nav ms-auto align-items-lg-center">

              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#gallery">
                  Gallery
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#facilities">
                  Facilities
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>

              {/* LOGIN */}
              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                <Link
                  className="btn login-btn fw-bold px-4"
                  to="/login"
                >
                  🔐 Login
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>


      {/* =========================
          HERO SECTION
      ========================== */}
      <section className="hero-section">

        <div className="container">

          <div className="row align-items-center">

            {/* LEFT */}
            <div className="col-lg-6 hero-content">

              <div className="hero-small-text">
                🎓 QUALITY EDUCATION • BRIGHT FUTURE
              </div>

              <h1 className="hero-title">
                Learn Today,
                <br />
                <span>Lead Tomorrow</span>
              </h1>

              <p className="hero-description">
                A place where learning, creativity and growth come together.
                We provide quality education and a positive environment for
                every student.
              </p>

              <div className="hero-buttons">

                <a href="#about" className="btn hero-primary-btn">
                  Learn More →
                </a>

                <a href="#contact" className="btn hero-secondary-btn">
                  Contact Us
                </a>

              </div>

            </div>


            {/* RIGHT IMAGE */}
            <div className="col-lg-6">

              <div className="hero-image-wrapper">

                <img
                  src="/images/school.png"
                  alt="MKM School & Skill Centre"
                  className="hero-school-image"
                />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          ABOUT SECTION
      ========================== */}
      <section id="about" className="about-section">

        <div className="container">

          <div className="row align-items-center">

            {/* IMAGE */}
            <div className="col-lg-6 mb-4 mb-lg-0">

              <div className="about-image-wrapper">

                <img
                  src="/images/school.png"
                  alt="About School"
                  className="about-school-image"
                />

              </div>

            </div>


            {/* CONTENT */}
            <div className="col-lg-6 text-center text-lg-start">

              <div className="section-small-title">
                ABOUT OUR SCHOOL
              </div>

              <h2 className="section-title">
                Building Bright Futures
              </h2>

              <p className="section-description">
                Our school is committed to providing students with quality
                education, modern learning facilities and opportunities to
                develop their skills.
              </p>

              <p className="section-description">
                We believe that education is not only about academic knowledge
                but also about creativity, discipline, confidence and overall
                personality development.
              </p>


              {/* STATS */}
              <div className="row about-stats">

                <div className="col-6">
                  <div className="stat-box">
                    <h3>500+</h3>
                    <p>Students</p>
                  </div>
                </div>

                <div className="col-6">
                  <div className="stat-box">
                    <h3>15+</h3>
                    <p>Teachers</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          GALLERY SECTION
      ========================== */}
      <section id="gallery" className="gallery-section">

        <div className="container">

          <div className="text-center mb-5">

            <div className="section-small-title">
              SCHOOL GALLERY
            </div>

            <h2 className="section-title">
              Explore Our School
            </h2>

            <p className="section-description">
              A place where learning, creativity and growth come together.
            </p>

          </div>


          <div className="row">

            {gallery.length > 0 ? (
            gallery.map((item) => (
          <div
          className="col-lg-4 col-md-6 mb-4"
           key={item.id}
          >
          <div className="gallery-card">

          <img
           src={item.image}
           alt={item.title}
           className="gallery-image"
          />

      <div className="gallery-content">
        <h5>🏫 {item.title}</h5>

        <p>{item.description}</p>

      </div>

    </div>
  </div>
))
) : (
  <div className="col-12 text-center">
    <div className="gallery-empty">
      <h5>🏫 School Gallery</h5>
      <p>Our school memories and activities will appear here.</p>
    </div>
  </div>
)}

          </div>

        </div>

      </section>

       {/* =========================
    FACILITIES SECTION
========================= */}
<section id="facilities" className="facilities-section">

  <div className="container">

    <div className="text-center mb-5">
      <div className="section-small-title">
        OUR FACILITIES
      </div>

      <h2 className="section-title">
        Everything Students Need
      </h2>
    </div>

    <div className="row">

      {/* Modern Library */}
      <div className="col-lg-4 col-md-6 mb-4">
        <div
          className="facility-card"
          onClick={() => setSelectedFacility("library")}
          style={{ cursor: "pointer" }}
        >
          <div className="facility-icon">
            📚
          </div>

          <h4>Modern Library</h4>

          <p>
            A peaceful and well-equipped library for students
            to learn and explore new ideas.
          </p>
        </div>
      </div>


      {/* Computer Lab */}
      <div className="col-lg-4 col-md-6 mb-4">
        <div className="facility-card"
        onClick={() => setSelectedFacility("computer")}
        style = {{cursor: "pointer"}}
        >
          <div className="facility-icon">
            💻
          </div>

          <h4>Computer Lab</h4>

          <p>
            Modern computer facilities to develop technical
            and digital skills.
          </p>
        </div>
      </div>


      {/* Sports */}
      <div className="col-lg-4 col-md-6 mb-4">
        <div className="facility-card"
        onClick={() => setSelectedFacility("sports")}
          style={{ cursor: "pointer" }}
        >
          <div className="facility-icon">
            ⚽
          </div>

          <h4>Sports & Activities</h4>

          <p>
            Sports and extracurricular activities for overall
            student development.
          </p>
        </div>
      </div>


      {/* Science Lab */}
      <div className="col-lg-4 col-md-6 mb-4">
        <div className="facility-card"
        onClick={() => setSelectedFacility("science")}
          style={{ cursor: "pointer" }}
        >
          <div className="facility-icon">
            🔬
          </div>

          <h4>Science Lab</h4>

          <p>
            Practical learning facilities that encourage
            curiosity and scientific thinking.
          </p>
        </div>
      </div>


      {/* Transport */}
      <div className="col-lg-4 col-md-6 mb-4">
        <div className="facility-card"
        onClick={() => setSelectedFacility("transport")}
          style={{ cursor: "pointer" }}
        >
          <div className="facility-icon">
            🚌
          </div>

          <h4>Transport</h4>

          <p>
            Safe and convenient transportation facilities
            for students.
          </p>
        </div>
      </div>


      {/* Expert Teachers */}
      <div className="col-lg-4 col-md-6 mb-4">
        <div className="facility-card"
        onClick={() => setSelectedFacility("teachers")}
          style={{ cursor: "pointer" }}
        >
          <div className="facility-icon">
            👨‍🏫
          </div>

          <h4>Expert Teachers</h4>

          <p>
            Experienced teachers dedicated to quality
            education and student success.
          </p>
        </div>
      </div>

    </div>
  </div>

{selectedFacility && (
  <div
    className="library-popup-overlay"
    onClick={() => setSelectedFacility(null)}
  >
    <div
      className="library-popup"
      onClick={(e) => e.stopPropagation()}
    >

      <button
        className="library-close"
        onClick={() => setSelectedFacility(null)}
      >
        ×
      </button>

      {selectedFacility === "library" && (
        <>
          <div className="facility-icon">📚</div>
          <h2>Modern Library</h2>
          <p>
            Our modern library provides a peaceful and comfortable
            environment for students to read, learn and explore new ideas.
          </p>
          <p>
            📖 Thousands of books<br />
            🪑 Comfortable reading area<br />
            💻 Digital learning resources<br />
            🌐 Internet access
          </p>
        </>
      )}

      {selectedFacility === "computer" && (
        <>
          <div className="facility-icon">💻</div>
          <h2>Computer Lab</h2>
          <p>
            Our modern computer lab provides students with
            advanced computers and digital learning facilities.
          </p>
          <p>
            🖥️ Modern Computers<br />
            🌐 High-Speed Internet<br />
            💻 Programming Practice<br />
            📚 Digital Learning
          </p>
        </>
      )}

      {selectedFacility === "sports" && (
        <>
          <div className="facility-icon">⚽</div>
          <h2>Sports & Activities</h2>
          <p>
            We provide excellent sports and extracurricular
            activities for the overall development of students.
          </p>
          <p>
            ⚽ Football<br />
            🏏 Cricket<br />
            🏃 Athletics<br />
            🏆 Indoor & Outdoor Games
          </p>
        </>
      )}

      {selectedFacility === "science" && (
        <>
          <div className="facility-icon">🔬</div>
          <h2>Science Lab</h2>
          <p>
            Our science laboratory helps students understand
            concepts through practical experiments.
          </p>
          <p>
            🧪 Practical Experiments<br />
            🔬 Modern Equipment<br />
            🧬 Biology Experiments<br />
            ⚗️ Chemistry Experiments
          </p>
        </>
      )}

      {selectedFacility === "transport" && (
        <>
          <div className="facility-icon">🚌</div>
          <h2>Transport</h2>
          <p>
            Safe and convenient transportation facilities are
            available for students.
          </p>
          <p>
            🚌 School Buses<br />
            🛡️ Safe Transportation<br />
            👨‍✈️ Experienced Drivers<br />
            📍 Multiple Routes
          </p>
        </>
      )}

      {selectedFacility === "teachers" && (
        <>
          <div className="facility-icon">👨‍🏫</div>
          <h2>Expert Teachers</h2>
          <p>
            Our experienced teachers are dedicated to providing
            quality education and helping students succeed.
          </p>
          <p>
            👨‍🏫 Experienced Faculty<br />
            📚 Quality Education<br />
            🎓 Subject Experts<br />
            🌟 Student Support
          </p>
        </>
      )}

    </div>
  </div>
)}

</section>


      {/* =========================
          CONTACT SECTION
      ========================== */}
      <section id="contact" className="contact-section">

        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-6 mb-4 mb-lg-0">

              <div className="section-small-title">
                CONTACT US
              </div>

              <h2 className="section-title">
                Get In Touch
              </h2>

              <p className="section-description">
                We would love to hear from you. Feel free to contact us for
                admissions, enquiries and other information.
              </p>

            </div>


            <div className="col-lg-6">

              <div className="contact-card">

                <div className="contact-item">
                  <span>📍</span>
                  <div>
                  <h5>Address</h5>
                <p>MKM School & Skill Centre, Newada bela prayagraj</p>
                  </div>
                </div>


                <div className="contact-item">
                  <span>📞</span>
                  <div>
                     <h5>Phone</h5>
                     <p>+91 8318648483</p>
                  </div>
                </div>


                <div className="contact-item">
                  <span>📧</span>
                  <div>
                     <h5>Email</h5>
                     <p>mkm123@gmail.com</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          FOOTER
      ========================== */}
      <footer className="footer">

        <div className="container text-center">

          <h5>
            🏫 MKM SCHOOL & Skill center
          </h5>

          <p>
            Quality Education • Bright Future
          </p>

          <hr />

          <p className="mb-0">
            © 2026 Abhishek Pal. All Rights Reserved.
          </p>

        </div>

      </footer>
      {selectedFacility && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.65)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      padding: "20px"
    }}
    onClick={() => setSelectedFacility(null)}
  >
    <div
      style={{
        backgroundColor: "#fff",
        width: "500px",
        maxWidth: "95%",
        borderRadius: "20px",
        padding: "35px",
        textAlign: "center",
        boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
      }}
      onClick={(e) => e.stopPropagation()}
    >

      {selectedFacility === "library" && (
        <>
          <div style={{ fontSize: "55px" }}>📚</div>
          <h2>Modern Library</h2>
          <p>
            Our modern library provides a peaceful environment where
            students can read, study and explore new ideas.
          </p>
          <p>📖 5000+ Books</p>
          <p>💻 Digital Library</p>
          <p>🪑 Comfortable Reading Room</p>
          <p>⏰ Timing: 8:00 AM - 4:00 PM</p>
        </>
      )}

      {selectedFacility === "computer" && (
        <>
          <div style={{ fontSize: "55px" }}>💻</div>
          <h2>Computer Lab</h2>
          <p>
            Well-equipped computer laboratory for practical learning,
            programming and digital skills.
          </p>
          <p>🖥️ Modern Computers</p>
          <p>🌐 High Speed Internet</p>
          <p>💡 Programming Practice</p>
        </>
      )}

      {selectedFacility === "sports" && (
        <>
          <div style={{ fontSize: "55px" }}>⚽</div>
          <h2>Sports & Activities</h2>
          <p>
            Students can participate in various sports and
            extracurricular activities.
          </p>
          <p>⚽ Football</p>
          <p>🏏 Cricket</p>
          <p>🏸 Badminton</p>
          <p>🏆 Annual Sports Events</p>
        </>
      )}

      {selectedFacility === "science" && (
        <>
          <div style={{ fontSize: "55px" }}>🔬</div>
          <h2>Science Lab</h2>
          <p>
            Practical science laboratory where students learn
            through experiments.
          </p>
          <p>🧪 Chemistry Experiments</p>
          <p>🔬 Biology Equipment</p>
          <p>⚡ Physics Experiments</p>
        </>
      )}

      {selectedFacility === "transport" && (
        <>
          <div style={{ fontSize: "55px" }}>🚌</div>
          <h2>School Transport</h2>
          <p>
            Safe and convenient transportation facilities are
            available for students.
          </p>
          <p>🚌 School Bus Service</p>
          <p>🛡️ Safe Transportation</p>
          <p>📍 Multiple Routes</p>
        </>
      )}

      {selectedFacility === "teachers" && (
        <>
          <div style={{ fontSize: "55px" }}>👨‍🏫</div>
          <h2>Expert Teachers</h2>
          <p>
            Experienced and dedicated teachers help students achieve
            academic and personal success.
          </p>
          <p>👨‍🏫 Experienced Faculty</p>
          <p>📚 Quality Education</p>
          <p>🎯 Student Guidance</p>
        </>
      )}

      <button
        className="btn btn-primary mt-3"
        onClick={() => setSelectedFacility(null)}
      >
        Close
      </button>

    </div>
  </div>
)}

    </div>
  );
}

export default Home;