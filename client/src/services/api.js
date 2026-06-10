import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitPatientRequest = (data) => api.post('/patients', data);
export const getPatients = () => api.get('/patients');

export const submitVolunteer = (data) => api.post('/volunteers', data);
export const getVolunteers = () => api.get('/volunteers');

export const submitContact = (data) => api.post('/contact', data);
export const getContacts = () => api.get('/contact');

export default api;
