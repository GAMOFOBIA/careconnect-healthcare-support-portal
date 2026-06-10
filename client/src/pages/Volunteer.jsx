import { useState } from 'react';
import { submitVolunteer } from '../services/api';

const initialForm = {
  fullName: '',
  email: '',
  city: '',
  skills: '',
  availability: '',
  motivation: '',
};

function Volunteer() {
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
      const response = await submitVolunteer(form);

      setSuccess({
        message: response.data.message,
        summary: response.data.data.summary,
      });
      setForm(initialForm);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.join(', ') ||
        'Failed to submit registration. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Volunteer Registration</h1>
        <p>
          Share your skills and availability to help patients and families in
          your community.
        </p>
      </div>

      <div className="form-container">
        {success && (
          <div className="alert alert-success">
            <strong>{success.message}</strong>
            <p className="summary-preview">
              <span>AI-Generated Summary:</span> {success.summary}
            </p>
          </div>
        )}

        {error && (
          <div className="alert alert-error">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
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
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                placeholder="Your city"
              />
            </div>
            <div className="form-group">
              <label htmlFor="skills">Skills *</label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                required
                placeholder="e.g. Counseling, Nursing, Translation"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="availability">Availability *</label>
            <input
              type="text"
              id="availability"
              name="availability"
              value={form.availability}
              onChange={handleChange}
              required
              placeholder="e.g. Weekends, 2 hours/week"
            />
          </div>

          <div className="form-group">
            <label htmlFor="motivation">Motivation *</label>
            <textarea
              id="motivation"
              name="motivation"
              value={form.motivation}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Tell us why you want to volunteer and how you can help..."
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Submitting...' : 'Register as Volunteer'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Volunteer;
