import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">Healthcare Support Portal</span>
          <h1>Compassionate Care, Connected Community</h1>
          <p>
            CareConnect bridges the gap between patients, families, and dedicated
            volunteers. Whether you need emotional support, caregiver guidance,
            or want to make a difference — we are here for you.
          </p>
          <div className="hero-actions">
            <Link to="/patient-support" className="btn btn-primary">
              Request Support
            </Link>
            <Link to="/volunteer" className="btn btn-secondary">
              Become a Volunteer
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-stat">
              <span className="stat-number">150+</span>
              <span className="stat-label">Families Supported</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">45+</span>
              <span className="stat-label">Active Volunteers</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">12+</span>
              <span className="stat-label">Cities Covered</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">About Us</span>
            <h2>Building a Network of Care</h2>
          </div>
          <div className="about-grid">
            <div className="about-text">
              <p>
                CareConnect is a Mini healthcare support portal designed to help
                patients and families navigate challenging times. We believe that
                no one should face health challenges alone.
              </p>
              <p>
                Our platform connects those in need with trained volunteers,
                community resources, and professional guidance — creating a
                compassionate ecosystem of support.
              </p>
            </div>
            <div className="about-features">
              <div className="feature-item">
                <div className="feature-icon"></div>
                <h3>Community Driven</h3>
                <p>Powered by volunteers who genuinely care about making a difference.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"></div>
                <h3>Safe & Confidential</h3>
                <p>Your information is handled with the utmost privacy and respect.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon"></div>
                <h3>Fast Response</h3>
                <p>Requests are reviewed and matched within 24–48 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services section section-alt">
        <div className="section-container">
          <div className="section-header center">
            <span className="section-tag">Our Services</span>
            <h2>How We Can Help</h2>
            <p className="section-subtitle">
              Comprehensive support tailored to your unique needs
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon"></div>
              <h3>Emotional Support</h3>
              <p>
                Connect with compassionate listeners who understand what you are
                going through. Mental wellness matters.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon"></div>
              <h3>Caregiver Guidance</h3>
              <p>
                Practical advice and resources for family members caring for
                loved ones with health conditions.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon"></div>
              <h3>Financial Help</h3>
              <p>
                Navigate medical costs, insurance questions, and access financial
                assistance programs.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon"></div>
              <h3>Medical Information</h3>
              <p>
                Understand treatment options, medications, and healthcare processes
                in clear, accessible language.
              </p>
            </div>
          </div>
          <div className="section-cta">
            <Link to="/patient-support" className="btn btn-primary">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-banner section">
        <div className="section-container">
          <div className="cta-content">
            <h2>Ready to Make a Difference?</h2>
            <p>
              Join our community of volunteers and help families in your city
              access the support they deserve.
            </p>
            <Link to="/volunteer" className="btn btn-white">
              Join as Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
