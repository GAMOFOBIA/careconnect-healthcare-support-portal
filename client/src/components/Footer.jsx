import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>
              <span className="logo-icon">+</span> CareConnect
            </h3>
            <p>
            <p>
  Connecting patients, caregivers, and volunteers through a unified
  healthcare support platform focused on community assistance,
  guidance, and meaningful support.
</p>
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/patient-support">Patient Support</Link></li>
              <li><Link to="/volunteer">Volunteer</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>Email: support@careconnect.org</p>
            <p>Phone: +91 98765 43210</p>
            <p>Hours: Mon–Fri, 9 AM – 6 PM</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} CareConnect. All rights reserved.</p>
          <p className="footer-tagline">Healthcare Support Portal — Built with compassion.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
