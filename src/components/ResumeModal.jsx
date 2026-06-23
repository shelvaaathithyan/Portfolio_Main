import React from 'react';
import { FiX, FiDownload, FiExternalLink } from 'react-icons/fi';
import './ProjectModal.css';

const ResumeModal = ({ onClose }) => {
  return (
    <div className="project-modal-overlay">
      <div className="project-modal-content" style={{ maxWidth: '600px', textAlign: 'center', padding: '3rem' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <FiX />
        </button>

        <h2 className="modal-title key-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Resume</h2>
        <p className="modal-context text-blue" style={{ marginBottom: '3rem' }}>Shelvaaathithyan VK - AI/ML Engineer</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <button className="cta-btn primary-btn" style={{ justifyContent: 'center' }} onClick={() => alert("Downloading PDF...")}>
            <FiDownload className="btn-icon" /> Download PDF
          </button>
          <button className="cta-btn secondary-btn" style={{ justifyContent: 'center' }} onClick={() => window.open('#', '_blank')}>
            <FiExternalLink className="btn-icon" /> View Online
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
