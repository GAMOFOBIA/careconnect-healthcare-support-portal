import { useState } from 'react';
import { submitContact } from '../services/api';

const initialForm = {
  name: '',
  email: '',
  message: '',
};

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await submitContact(form);
      setSuccess(response.data.message);
      setForm(initialForm);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.join(', ') ||
        'Failed to send message. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>Have a question or feedback? We would love to hear from you.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-info">
          <div className="info-card">
            <h3>📧 Email</h3>
            <p>support@careconnect.org</p>
          </div>
          <div className="info-card">
            <h3>📞 Phone</h3>
            <p>+91 98765 43210</p>
          </div>
          <div className="info-card">
            <h3>🕐 Office Hours</h3>
            <p>Monday – Friday, 9 AM – 6 PM</p>
          </div>
          <div className="info-card">
    <h3>Address</h3>
    <p>Healthcare Support Center<br />Raipur, Chhattisgarh, India</p>
  </div>
        </div>

        <div className="form-container">
          {success && (
            <div className="alert alert-success">{success}</div>
          )}

          {error && (
            <div className="alert alert-error">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Write your message here..."
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
