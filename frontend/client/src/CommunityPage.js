import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa';

import './HomePage.css';
import './CommunityPage.css';

const CommunityPage = () => {
  const [research, setResearch] = useState('');
  const [clickedImageId, setClickedImageId] = useState(null);
  const [CommuneImages, setCommuneImages] = useState([]);


  const handleResearchChange = (event) => {
    setResearch(event.target.value);
  };

  
  const handleSendResearch = async () => {
    try {
      // Get the instruction from the user input field
      const researchTextArea = document.getElementById('researchInput');
      const research = researchTextArea.value;

      // Send the instruction to the backend
      const response = await fetch('http://localhost:3000/api/image/getImagesCommunity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ research }),
      });
      

      if (!response.ok) {
        throw new Error('Failed to get search results');
      }

      // Parse the response data
      const searchData = await response.json();

      // Update the state with the matching images
      setCommuneImages(searchData);

      // Clear the instruction input field
      researchTextArea.value = '';
    } catch (error) {
      console.error(error);
      // Handle the error if necessary
    }
  };

  const handleImageClick = async (event, id) => {
    // Check if the user clicked outside of the modal content
    if (event.target.className === 'modal') {
      setClickedImageId(null);
    } else {
      setClickedImageId(id);
    }
  }; 
  
  const handleDownload = async (src) => {
    // Fetch the image data
    const response = await fetch(src);
    const blob = await response.blob();
  
    // Create an object URL for the image data
    const url = URL.createObjectURL(blob);
  
    // Create a temporary anchor element and click it to start the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'image.jpg'; // or any other filename you want
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    // FUNCTION to select the commune images
    const fetchImages = async () => {
      try {
        // Fetch the images with community = true from the backend API
        const response = await fetch('http://localhost:3000/api/image/getImagesCommunity');
        const data = await response.json();

        // Update the images state with the fetched images
        setCommuneImages(data.images);
      } catch (error) {
        console.error(error);
      }
    };

    //fetchImages();
  }, []);
  

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
          <li className='activeLink'>
            <NavLink to="/community">Community</NavLink>
          </li>
        </ul>
      </div>
      
      <div className="research-area">
        <div className="research-icon">
          <FaSearch /> {/* Using the FaSearch icon from react-icons/fa */}
        </div>
        <input 
          type="text" 
          id="researchInput"
          className="research-input" 
          placeholder="What are you looking for?" 
          value={research}
          onChange={handleResearchChange}  
        />
        <button onClick={() => { handleSendResearch(); }} className="send-research-button">
          <i className="arrow right"></i>
        </button>
      </div>

      <div className="gallery-container">
        {CommuneImages.length === 0 ? (
            <p>No matching images found.</p>
          ) : (
          <div className="masonry-gallery">
            {CommuneImages.map((image) => (
              <div className="communityGalleryImages" onClick={(event) => handleImageClick(event, image._id)} key={image._id}>
                <img
                  key={image._id}
                  src={image.imageUrl}
                  alt={image.prompt}
                  className={"communityGalleryImage"}
                  loading="lazy" // Enable lazy loading for the image
                  onClick={(event) => handleImageClick(event, image._id)}
                />
                
                {clickedImageId === image._id && 
                  <div className="modal" onClick={(event) => handleImageClick(event, image._id)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                      <div className="modal-text">
                        <div className="modal-prompt">
                          <p>{image.prompt}</p>
                        </div>
                        <div className="modal-parameters">
                          <p>Width<br/><span>{image.width}</span></p>
                          <p>Height<br/><span>{image.height}</span></p>
                          <p>Generation Step<br/><span>{image.generationStep}</span></p>
                          <p>Seed<br/><span>{image.seed}</span></p>
                          <p>Guidance Scale<br/><span>{image.guidanceScale}</span></p>
                        </div>
                      </div>
                      <div className="modal-image">
                        <img
                          id={image._id}
                          src={image.imageUrl}
                          alt={image._id}
                          className="communityGalleryImage"
                        />
                        <button onClick={() => handleDownload(image.imageUrl)} className="download-button">
                          <FaDownload />
                        </button>
                      </div>
                    </div>
                  </div>
                }
              </div>
            ))}
          </div>
          )}
      </div>
   </div>
  );
};

export default CommunityPage;