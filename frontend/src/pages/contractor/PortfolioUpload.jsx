import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import apiClient from '../../config/axios';
import upload from '../../config/upload';
import './PortfolioUpload.css';
import { FiUpload, FiTrash2 } from 'react-icons/fi';

export const PortfolioUpload = ({ contractorId }) => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', category: 'other' });
  const [loading, setLoading] = useState(false);
  const [uploads, setUploads] = useState([]);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    setLoading(true);

    try {
      for (let file of files) {
        const data = new FormData();
        data.append('file', file);
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('category', formData.category);

        const response = await apiClient.post('/api/portfolio/upload', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        setUploads(prev => [...prev, response.data.portfolioItem]);
      }

      setFiles([]);
      setFormData({ title: '', description: '', category: 'other' });
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await apiClient.delete(`/api/portfolio/${itemId}`);
      setUploads(prev => prev.filter(item => item._id !== itemId));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="portfolio-upload">
      <h2>My Portfolio</h2>

      <form onSubmit={handleUpload} className="upload-form">
        <div className="form-group">
          <label>File</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*,video/*"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Project name"
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleInputChange}>
              <option value="other">Other</option>
              <option value="wedding">Wedding</option>
              <option value="travel">Travel</option>
              <option value="adventure">Adventure</option>
              <option value="event">Event</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Tell about this project"
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          <FiUpload /> {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      <div className="portfolio-list">
        {uploads.map(item => (
          <div key={item._id} className="portfolio-card">
            {item.imageUrl && <img src={item.imageUrl} alt={item.title} />}
            <div className="portfolio-info">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
            <button
              onClick={() => handleDelete(item._id)}
              className="btn btn-outline btn-small"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
