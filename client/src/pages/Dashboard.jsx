import { useState, useEffect } from 'react';
import { getPatients, getVolunteers, getContacts } from '../services/api';

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [patientsRes, volunteersRes, contactsRes] = await Promise.all([
        getPatients(),
        getVolunteers(),
        getContacts(),
      ]);

      setPatients(patientsRes.data.data);
      setVolunteers(volunteersRes.data.data);
      setContacts(contactsRes.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to load dashboard data. Make sure the server is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="page dashboard-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page dashboard-page">
      <div className="page-header dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Overview of all submitted requests, volunteers, and messages.</p>
        </div>
        <button onClick={fetchData} className="btn btn-secondary btn-sm">
          Refresh Data
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-value">{patients.length}</span>
          <span className="stat-title">Patient Requests</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{volunteers.length}</span>
          <span className="stat-title">Volunteers</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{contacts.length}</span>
          <span className="stat-title">Contact Messages</span>
        </div>
      </div>

      <section className="dashboard-section">
        <h2>Section A — Patient Requests</h2>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Support Type</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              {patients.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-row">No patient requests yet.</td>
                </tr>
              ) : (
                patients.map((patient) => (
                  <tr key={patient._id}>
                    <td>{patient.fullName}</td>
                    <td>{patient.city}</td>
                    <td>
                      <span className="badge">{patient.supportType}</span>
                    </td>
                    <td className="summary-cell">{patient.summary}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Section B — Volunteers</h2>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Skills</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-row">No volunteer registrations yet.</td>
                </tr>
              ) : (
                volunteers.map((volunteer) => (
                  <tr key={volunteer._id}>
                    <td>{volunteer.fullName}</td>
                    <td>{volunteer.city}</td>
                    <td>{volunteer.skills}</td>
                    <td className="summary-cell">{volunteer.summary}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Section C — Contact Messages</h2>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan="3" className="empty-row">No contact messages yet.</td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact._id}>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td className="message-cell">{contact.message}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
