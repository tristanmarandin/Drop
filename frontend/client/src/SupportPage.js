import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FileDownload from 'react-file-download';
import axios from 'axios';
import './HomePage.css';

const SupportPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
    
  const handleDownload = () => {
    const fileUrl = '../public/Documentation.pdf';
    FileDownload(fileUrl, 'documentation.pdf');
  };
  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send the form data to the backend API
      const response = await axios.post('http://localhost:4000/api/contact', {
        name,
        email,
        message,
      });

      console.log(response.data); // Optional: Handle the response from the backend

      // Clear the form fields after successful submission
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
    <div className="body-container">
      <div className="head-menu-container">
        <div className="head-container">
          <div className="logo-title-container">
            <div className="logo">
              <img src="Drop.jpg" alt="Logo" className="logo-image" />
            </div>
            <div className="head-title">DROP</div>
          </div>
        </div>
        <ul className="menu">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="separator">|</li>
          <li>
            <NavLink to="/community">Community</NavLink>
          </li>
          <li className="separator">|</li>
          <li>
            <NavLink to="/styleCollection">Style Collection</NavLink>
          </li>
          <li className="separator">|</li>
          <li>
            <NavLink to="/support">Support</NavLink>
          </li>
        </ul>
      </div>
      <div className="header">Support</div>
      <div>
        <h2>Documentation</h2>
        <button onClick={handleDownload}>Download PDF</button>
      </div>
      <div>
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={handleNameChange} placeholder="Name" />
        <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
        <textarea value={message} onChange={handleMessageChange} placeholder="Message"></textarea>
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
};

export default SupportPage;