import React from 'react';
import './Contacts.css';
import { FaDiscord, FaEnvelope } from 'react-icons/fa';

const Contacts = () => {
  return (
    <section id="contacts" className="elias-contacts-section">
      <div className="section-header">
        <h2 className="section-title"><span className="hash">#</span>contacts</h2>
        <div className="section-line"></div>
      </div>

      <div className="contacts-content">
        <div className="contacts-text">
          <p>
            I'm interested in freelance opportunities. However, if you have other request or question, don't hesitate to contact me
          </p>
        </div>
        
        <div className="contacts-box-container">
          <div className="contacts-box">
            <h3 className="contacts-box-title">Message me here</h3>
            <div className="contact-item">
              <FaDiscord className="contact-icon" />
              <span>!Elias#3519</span>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>elias@elias.me</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
