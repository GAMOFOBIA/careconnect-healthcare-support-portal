import { useState } from 'react';
import { submitPatientRequest } from '../services/api';

const SUPPORT_TYPES = [
  'Emotional Support',
  'Caregiver Guidance',
  'Financial Help',
  'Medical Information',
];

const initialForm = {
  fullName: '',
  age: '',
  city: '',
  phoneNumber: '',
  supportType: '',
  description: '',
};

function PatientSupport() {
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
      const response = await submitPatientRequest({
        ...form,
        age: Number(form.age),
      });

      setSuccess({
        message: response.data.message,
        summary: response.data.data.summary,
      });
      setForm(initialForm);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.join(', ') ||
        'Failed to submit request. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Patient Support Request</h1>
        <p>
          Tell us what you need and our team will connect you with the right
          support resources.
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
              <label htmlFor="age">Age *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={form.age}
                onChange={handleChange}
                required
                min="0"
                max="150"
                placeholder="Your age"
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
              <label htmlFor="phoneNumber">Phone Number *</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                required
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="supportType">Support Type *</label>
            <select
              id="supportType"
              name="supportType"
              value={form.supportType}
              onChange={handleChange}
              required
            >
              <option value="">Select support type</option>
              {SUPPORT_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Describe the support you need in detail..."
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Support Request'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PatientSupport;
