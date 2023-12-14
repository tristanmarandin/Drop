import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa';
import { FaImage , FaFileImage , FaRulerCombined, FaSortAmountDownAlt, FaRandom, FaSeedling } from 'react-icons/fa';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';

import './HomePage.css';

const HomePage = () => {
  const [instruction, setInstruction] = useState('');
  const [imageData, setImageData] = useState([
    { id: 'image1', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Siberischer_tiger_de_edit02.jpg/640px-Siberischer_tiger_de_edit02.jpg', prompt: '', width: '', height: '', generationStep: '', seed: '', guidanceScale: '' },
    { id: 'image2', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Siberischer_tiger_de_edit02.jpg/640px-Siberischer_tiger_de_edit02.jpg', prompt: '', width: '', height: '', generationStep: '', seed: '', guidanceScale: '' },
    { id: 'image3', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Siberischer_tiger_de_edit02.jpg/640px-Siberischer_tiger_de_edit02.jpg', prompt: '', width: '', height: '', generationStep: '', seed: '', guidanceScale: '' },
    { id: 'image4', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Siberischer_tiger_de_edit02.jpg/640px-Siberischer_tiger_de_edit02.jpg', prompt: '', width: '', height: '', generationStep: '', seed: '', guidanceScale: '' },
  ]);
  const [isInstructionTutorialDone, setIsInstructionTutorialDone] = useState(false);  
  const [isInstructionButtonClicked, setIsInstructionButtonClicked] = useState(false);
  const [clickedImageId, setClickedImageId] = useState(null);
  const [isSubmitButtonClicked, setIsSubmitButtonClicked] = useState(false);
  const [activeTabs, setActiveTabs] = useState({
    Style: false,
    Format: false,
    Parameters: false,
  });
  const [buttonStates, setButtonStates] = useState({
    detailed: false,
    colorful: false,
    bw: false,
    highcontrast: false,
    realistic: false,
    myasaki: false,
    steampunk: false,
    japanesestyle: false,
    comics: false,
    closeup: false,
    longshot: false,
    landscape: false,
    background: false,
    portrait: false,
  });
  const [showContinueButtonStyle, setShowContinueButtonStyle] = useState(true);
  const [showContinueButtonFormat, setShowContinueButtonFormat] = useState(true);
  const possibleImageDimensions = [
    { value: '1152 x 768', width: '1024', height: '688'},
    { value: '1088 x 896', width: '1024', height: '848'},
    { value: '1024 x 1024', width: '1024', height: '1024'},
    { value: '896 x 1088', width: '848', height: '1024'},
    { value: '768 x 1152', width: '688', height: '1024'}
  ];  
  const [imageDimensions, setImageDimensions] = useState(possibleImageDimensions [2].value); // Default to '1024 x 1024'
  const imageDimensionsSources = [
    '768x1152.jpg',
    '896x1088.jpg',
    '1024x1024.jpg',
    '1088x896.jpg',
    '1152x768.jpg'
  ];
  const [seed, setSeed] = useState('');
  const [generationSteps, setGenerationSteps] = useState('20');
  const [guidanceScale, setGuidanceScale] = useState('7.5');
  const [galleryImages, setGalleryImages] = useState([]);

  // INITIAL ANIMATION
  useEffect(() => {
    let isFirstVisit = !localStorage.getItem("visitedBefore");

    if (isFirstVisit) {
      setTimeout(() => {
        const fullscreenLogo = document.querySelector(".fullscreen-logo");
        fullscreenLogo.style.opacity = "0"; // Start the fade out

        fullscreenLogo.addEventListener("transitionend", () => {
          fullscreenLogo.style.display = "none"; // Hide the logo after fade out
        });
      }, 1000); // Wait for 1 second before starting the fade out

      localStorage.setItem("visitedBefore", "true");
    } else {
      const fullscreenLogo = document.querySelector(".fullscreen-logo");
      fullscreenLogo.style.display = "none"; // If not the first visit, hide the logo immediately
    }
  }, []);
  

  // FUNCTIONS

  const handleInstructionChange = (event) => {
    setInstruction(event.target.value);
  
    // Check if the Enter key was pressed
    if (event.key === 'Enter') {
      handleSendInstructionTutorial();
    }
  };

  const handleImageClick = async (event, id) => {
    // Check if the user clicked outside of the modal content
    if (event.target.className === 'modal') {
      setClickedImageId(null);
    } else {
      setClickedImageId(id);
  
      // Fetch the clicked image
      const response = await fetch(`http://localhost:3000/api/images/${id}`);
      if (response.ok) {
        const { image } = await response.json();
        // Update the isSubmitButtonClicked state based on the 'community' attribute of the clicked image
        setIsSubmitButtonClicked(image.community);
      } else {
        console.error('Failed to fetch image');
      }
    }
  };

  const handleSuggestToCommunity = async (imageId) => {
    try {
      setIsSubmitButtonClicked(prevState => !prevState);
      const updateResponse = await fetch(`http://localhost:3000/api/images/${imageId}/community`, {
        method: 'PUT',
      });
  
      if (updateResponse.ok) {
        const updatedImage = await updateResponse.json();
        setIsSubmitButtonClicked(updatedImage.image.community);
        console.log('Image community attribute updated successfully');
      } else {
        console.error('Failed to update image community attribute');
      }
    } catch (error) {
      console.error(error);
    }
  }  
  
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
  
  const handleTabSelect = (tabName, shouldScroll = false) => {
    setActiveTabs(prevState => ({
      ...prevState,
      [tabName]: !prevState[tabName] // Toggle the active state
    }));
  
    if (shouldScroll) {
      scrollToTab(tabName);
    }
  };
  
  const openTabSelect = (tabName, shouldScroll = false) => {
    setActiveTabs(prevState => ({
      ...prevState,
      [tabName]: true // Toggle the active state
    }));
  
    if (shouldScroll) {
      scrollToTab(tabName);
    }
  };

  const handleContinueToStyle = () => {
    openTabSelect('Style', true);
  };

  const handleContinueToFormat = () => {
    openTabSelect('Format', true);
    setShowContinueButtonStyle(false); // Hide the button after click
  };

  const handleContinueToParameters = () => {
    openTabSelect('Parameters', true);
    setShowContinueButtonFormat(false); // Hide the Format section's continue button
  };
  

  const scrollToTab = (tabName) => {
    const tabElement = document.getElementById(`${tabName.toLowerCase()}Tab`);
    if (tabElement) {
      tabElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0, // Scroll to the top of the window
      behavior: 'smooth' // Smooth scroll
    });
  };  

  const handleButtonToggle = (buttonName, tabName) => {
    setButtonStates((prevState) => ({
      ...prevState,
      [buttonName]: !prevState[buttonName],
    }));
  };

  const getButtonLabelsByTab = (tabName) => {
    const buttonLabels = {
      Style: {
        detailed: 'highly detailed',
        colorful: 'colorful, color',
        bw: 'black and white',
        highcontrast: 'high contrast',
        realistic: 'realistic',
        myasaki: 'Myasaki',
        steampunk: 'steampunk',
        japanesestyle: 'japanese style, oriental style',
        comics: 'marvel, DC Comics',
      },
      Format: {
        closeup: 'close up',
        longshot: 'longshot',
        landscape: 'landscape',
        background: 'background',
        portrait: 'portrait',
      }
    };
  
    return buttonLabels[tabName] || {};
  };

  // Function to handle image width change
  const handleImageDimensionsChange = (event) => {
    const imageDimensionsIndex = event.target.value;
    setImageDimensions(possibleImageDimensions[imageDimensionsIndex].value);
  };

  // Function to handle generation steps change
  const handleGenerationStepsChange = (event) => {
    setGenerationSteps(event.target.value);
  };

  // Function to handle guidance scale change
  const handleGuidanceScaleChange = (event) => {
    setGuidanceScale(event.target.value);
  };

  // Function to handle seed change
  const handleSeedChange = (event) => {
    setSeed(event.target.value);
  };

  // Function to handle instruction tutorial
  const handleSendInstructionTutorial = (event) => {
    if (isInstructionTutorialDone == false) {
      setIsInstructionTutorialDone(true);
      handleContinueToStyle();
    } else {
      handleSendInstruction();
      setIsInstructionButtonClicked(true);
    }
  };

  const handleSendInstruction = async () => {
    try {
      let userID = "1";
      // Get the instruction from the user input field or textarea
      const instructionTextArea = document.getElementById('instructionInput');
      const instruction = instructionTextArea.value;

      const buttonLabelsByTab = {
        Style: getButtonLabelsByTab('Style'),
        Format: getButtonLabelsByTab('Format'),
        Model: getButtonLabelsByTab('Model'),
      };
  
      // Get the titles of buttons in the ON state
      const selectedButtons = Object.keys(buttonStates).filter(
        buttonName => buttonStates[buttonName]
      );
  
      // Get the parameter values from the state variables
      const seedValue = seed.trim() || null; // Set seed as null if it's an empty string
      const guidanceScaleValue = Number(guidanceScale);

      // Send the instruction to the backend
      const response = await fetch('http://localhost:3000/api/image/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID,
          instruction,
          selectedButtons,
          imageWidth: Number(possibleImageDimensions.find(dimensions => dimensions.value === imageDimensions).width),
          imageHeight: Number(possibleImageDimensions.find(dimensions => dimensions.value === imageDimensions).height),
          seed: seedValue,
          generationSteps: Number.isNaN(generationSteps) ? 20 : generationSteps,
          guidanceScale: Number.isNaN(guidanceScaleValue) ? 7.5 : guidanceScaleValue,
        }),
      })

      console.log(response);

      // Clear the instruction input field
      instructionTextArea.value = '';

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // Function to update the image source
    const updateImageSource = () => {
      fetch('http://localhost:3000/api/refresh_image')
        .then(response => response.json())
        .then(data => {
          const GeneratedImages = data.images;
  
          // Update the state for the image data
          setImageData(GeneratedImages.map((image, index) => ({
            id: 'image' + (index + 1),
            src: image.imageUrl,
            prompt: image.prompt,
            width: image.width,
            height: image.height,
            generationStep: image.generationStep,
            seed: image.seed,
            guidanceScale: image.guidanceScale
          })));
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };
  
    // Refresh the image source every five seconds
    const intervalId = setInterval(updateImageSource, 500000);
  
    // Cleanup function to clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array ensures the effect runs only once after initial render
  

  useEffect(() => {
    // Function to update the gallery
    const fetchImages = async () => {
      try {
        // Fetch the images with user = true from the backend API
        const response = await fetch('http://localhost:3000/api/user');
        const data = await response.json();

        // Update the images state with the fetched images
        setGalleryImages(data.images);
      } catch (error) {
        console.error(error);
      }
    };

    // Refresh the image source every five seconds
    const intervalUser = setInterval(fetchImages, 500000);

    // Cleanup function to clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalUser);
    };
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  // Function to chunk an array into smaller arrays of a specified size
  function chunkArray(array, size) {
    const chunked = [];
    let index = 0;
    while (index < array.length) {
      chunked.push(array.slice(index, size + index));
      index += size;
    }
    return chunked;
  }

  // Chunk the gallery images into groups of four
  const chunkedGalleryImages = chunkArray(galleryImages, 4);

  return (
    <div className="body-container">
      <div className="fullscreen-logo">
        <img src="Drop.jpg" alt="Logo" />
      </div>
      <div className="homepage-container">
        <div className="user-container">
          <NavLink to="/user" className="user-profile-link">
            <div className="user-profile-container">
              <img src="https://img.freepik.com/vecteurs-premium/conception-mascotte-poulet-fort-dessin-anime_194935-13.jpg" alt="User Profile" className="user-profile-image" />
              <div className="user-name">SuperChicken</div>
            </div>
          </NavLink>
        </div>
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
            <li className='activeLink'>
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="separator">|</li>
            <li>
              <NavLink to="/community">Community</NavLink>
            </li>
          </ul>
        </div>
        <div className="intro">Saisissez votre imaginaire</div>
        <div className="instruction-area">
          <input 
            type="text" 
            id="instructionInput"
            className="instruction-input" 
            placeholder="Enter instruction here..." 
            value={instruction}
            onChange={handleInstructionChange}
            onKeyPress={handleInstructionChange}   
          />
          <button onClick={() => { handleSendInstructionTutorial()}} className="send-instruction-button">
            <i className="arrow right"></i>
          </button>
        </div>
  
        {isInstructionButtonClicked && 
          <div className="generatedImage-wrapper">
            {imageData.map(({ id, src, prompt, width, height, generationStep, seed, guidanceScale }) => (
              <div className="generatedImage" onClick={(event) => handleImageClick(event, id)} key={id}>
                <img
                  id={id}
                  src={src}
                  alt={id}
                  className="imageStyle"
                />
                {clickedImageId === id && 
                  <div className="modal" onClick={(event) => handleImageClick(event, id)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                      <div className="modal-text">
                        <div className="modal-prompt">
                          <p>{prompt}</p>
                        </div>
                        <div className="modal-parameters">
                          <p>Width<br/><span>{width}</span></p>
                          <p>Height<br/><span>{height}</span></p>
                          <p>Generation Step<br/><span>{generationStep}</span></p>
                          <p>Seed<br/><span>{seed}</span></p>
                          <p>Guidance Scale<br/><span>{guidanceScale}</span></p>
                        </div>
                        <button 
                          onClick={() => handleSuggestToCommunity(id)} 
                          className={`submit-button ${isSubmitButtonClicked ? 'clicked' : ''}`}
                        >
                          {isSubmitButtonClicked ? <FaLock /> : <FaLockOpen />}
                          <span>Keep Private</span>
                        </button>
                      </div>
                      <div className="modal-image">
                        <img
                          id={id}
                          src={src}
                          alt={id}
                          className="imageStyle"
                        />
                        <button onClick={() => handleDownload(src)} className="download-button">
                          <FaDownload />
                        </button>
                      </div>
                    </div>
                  </div>
                }
              </div>
            ))}
          </div>
        }

        <ul className="tablist">
          <li
            className={activeTabs === 'Style' ? 'active' : ''}
            onClick={() => handleTabSelect('Style', true)}
          >
            {activeTabs.Style ? <FaChevronDown className="chevron-icon" /> : <FaChevronRight className="chevron-icon" />} Style
          </li>
        </ul>       

        <div className="tab-content" id="styleTab" style={{ display: activeTabs.Style ? 'block' : 'none' }}>
          <div className="style-tab">
              <div className="style-section">
                <h2 className="section-title">Basic Styles</h2>
                <div className="style-buttons"> {/* Add this wrapper */}
                  <div 
                    className={`style-button ${buttonStates.complex ? 'button-on' : 'button-off'}`}
                    onClick={() => handleButtonToggle('complex', 'style')}
                  >
                    <div className="button-image">
                      <img src="detailed.jpg" alt="Detailed" />
                    </div>
                    <h3>Detailed</h3>
                  </div>            
                  <div 
                    className={`style-button ${buttonStates.colorful ? 'button-on' : 'button-off'}`}
                    onClick={() => handleButtonToggle('colorful', 'style')}
                  >
                    <div className="button-image">
                      <img src="colorful.jpg" alt="Colorful" />
                    </div>
                    <h3>Colorful</h3>
                  </div>
                  <div 
                    className={`style-button ${buttonStates.bw ? 'button-on' : 'button-off'}`}
                    onClick={() => handleButtonToggle('bw', 'style')}
                  >
                    <div className="button-image">
                      <img src="bw.jpg" alt="B&W" />
                    </div>
                    <h3>B&W</h3>
                  </div>
                  <div 
                    className={`style-button ${buttonStates.highcontrast ? 'button-on' : 'button-off'}`}
                    onClick={() => handleButtonToggle('highcontrast', 'style')}
                  >
                    <div className="button-image">
                      <img src="highcontrast.jpg" alt="High Contrast" />
                    </div>
                    <h3>High Contrast</h3>
                  </div>
                  <div 
                    className={`style-button ${buttonStates.patchdesign ? 'button-on' : 'button-off'}`}
                    onClick={() => handleButtonToggle('patchdesign', 'style')}
                  >
                    <div className="button-image">
                      <img src="realistic.jpg" alt="Realistic" />
                    </div>
                    <h3>Realistic</h3>
                  </div>
                </div>      
              </div>

              <div className="style-section">
                <h2 className="section-title">Advanced Styles</h2>
                <div className="style-buttons"> {/* wrapper */}
                  <div 
                    className={`style-button ${buttonStates.myasaki ? 'button-on' : 'button-off'}`}
                    onClick={() => handleButtonToggle('myasaki', 'style')}
                  >
                    <div className="button-image">
                      <img src="myasaki.jpg" alt="Myasaki" />
                    </div>
                    <h3>Myasaki</h3>
                  </div>
                  <div 
                    className={`style-button ${buttonStates.steampunk ? 'button-on' : 'button-off'}`}
                    onClick={() => handleButtonToggle('steampunk', 'style')}
                    >
                    <div className="button-image">
                      <img src="steampunk.jpg" alt="Steampunk" />
                    </div>
                    <h3>Steampunk</h3>
                  </div>
                  <div 
                    className={`style-button ${buttonStates.japanesestyle ? 'button-on' : 'button-off'}`}
                    onClick={() => handleButtonToggle('japanesestyle', 'oriental style')}
                    >
                    <div className="button-image">
                      <img src="japanesestyle.jpg" alt="Japanese Style" />
                    </div>
                    <h3>Japanese Style</h3>
                  </div>
                  <div 
                    className={`style-button ${buttonStates.japanesestyle ? 'button-on' : 'button-off'}`}
                    onClick={() => handleButtonToggle('japanesestyle', 'oriental style')}
                    >
                    <div className="button-image">
                      <img src="japanesestyle.jpg" alt="Japanese Style" />
                    </div>
                    <h3>Comics</h3>
                  </div>
                </div>
              </div>
          </div>
          {showContinueButtonStyle && (
            <button 
              className="continue-button"
              onClick={handleContinueToFormat}
            >
              Continue
            </button>
          )}
        </div>
        
        <ul className="tablist">
          <li
            className={activeTabs === 'Format' ? 'active' : ''}
            onClick={() => handleTabSelect('Format', true)}
          >
            {activeTabs.Format ? <FaChevronDown className="chevron-icon" /> : <FaChevronRight className="chevron-icon" />} Format
          </li>
        </ul>

        <div className="tab-content" id="formatTab" style={{ display: activeTabs.Format ? 'block' : 'none' }}>
          <div className="format-buttons"> {/* Add this wrapper */}
            <div 
              className={`format-button ${buttonStates.closeup ? 'button-on' : 'button-off'}`}
              onClick={() => handleButtonToggle('closeup', 'style')}
              >
              <div className="button-image">
                <img src="closeup.jpg" alt="Close Up" />
              </div>
              <h3>Close Up</h3>
            </div>
            <div 
              className={`format-button ${buttonStates.longshot ? 'button-on' : 'button-off'}`}
              onClick={() => handleButtonToggle('longshot', 'style')}
              >
              <div className="button-image">
                <img src="longshot.jpg" alt="Long Shot" />
              </div>
              <h3>Long Shot</h3>
            </div>
            <div 
              className={`format-button ${buttonStates.landscape ? 'button-on' : 'button-off'}`}
              onClick={() => handleButtonToggle('landscape', 'style')}
              >
              <div className="button-image">
                <img src="landscape.jpg" alt="Landscape" />
              </div>
              <h3>Landscape</h3>
            </div>
            <div 
              className={`format-button ${buttonStates.background ? 'button-on' : 'button-off'}`}
              onClick={() => handleButtonToggle('background', 'style')}
              >
              <div className="button-image">
                <img src="background.jpg" alt="Background" />
              </div>
              <h3>Background</h3>
            </div>
            <div 
              className={`format-button ${buttonStates.portrait ? 'button-on' : 'button-off'}`}
              onClick={() => handleButtonToggle('portrait', 'style')}
              >
              <div className="button-image">
                <img src="portrait.jpg" alt="Portrait" />
              </div>
              <h3>Portrait</h3>
            </div>
          </div>
          {showContinueButtonFormat && (
            <button 
              className="continue-button"
              onClick={handleContinueToParameters}
            >
              Continue
            </button>
          )}
        </div>

        <ul className="tablist">
          <li
            className={activeTabs === 'Parameters' ? 'active' : ''}
            onClick={() => handleTabSelect('Parameters', true)}
          >
            {activeTabs.Parameters ? <FaChevronDown className="chevron-icon" /> : <FaChevronRight className="chevron-icon"/>} Paramètres
          </li>
        </ul>

        <div className="tab-content" id="parametresTab" style={{ display: activeTabs.Parameters ? 'block' : 'none' }}>
          <div className="parametres">
            <div className="dimension-parametre">
              <label htmlFor="dimension">
                <FaRulerCombined size={20} style={{ marginRight: '10px' }} />
                Dimensions
              </label>
              <div className="dimension-icons">
                <FaImage size={20} />
                <input
                  key={imageDimensions}
                  type="range"
                  id="dimension"
                  min="0"
                  max="4"
                  step="1"
                  value={possibleImageDimensions.findIndex(({ value }) => value === imageDimensions)}
                  onChange={handleImageDimensionsChange}
                />
                <FaFileImage size={20} />
              </div>
              <p>{imageDimensions}</p>
              <div className="dimension-image">
                <img src={`/${imageDimensionsSources[possibleImageDimensions.findIndex(dimensions => dimensions.value === imageDimensions)]}`} alt="Dimension Preview" />
              </div>
            </div>
            <div className="other-parametres">
                <div className="parametre">
                  <div className="parametre-title">
                    <label htmlFor="generationSteps">
                      <FaSortAmountDownAlt  size={20} style={{ marginRight: '10px' }} />
                      Generation Steps
                    </label>
                    <input
                      type="number"
                      id="generationStepsValue"
                      value={generationSteps}
                      onChange={handleGenerationStepsChange}
                      className="parametre-input"
                    />
                  </div>
                  <input
                    type="range"
                    id="generationSteps"
                    min="1"
                    max="50"
                    step="1"
                    value={generationSteps}
                    onChange={handleGenerationStepsChange}
                  />
                </div>
                <div className="parametre">
                  <div className="parametre-title">
                    <label htmlFor="guidanceScale">
                      <FaRandom  size={20} style={{ marginRight: '10px' }} />
                      Guidance Scale
                    </label>
                    <input
                      type="number"
                      id="guidanceScaleValue"
                      step="0.5"
                      value={guidanceScale}
                      onChange={handleGuidanceScaleChange}
                      className="parametre-input"
                    />
                  </div>
                  <input
                    type="range"
                    id="guidanceScale"
                    min="0"
                    max="10"
                    step="0.5"
                    value={guidanceScale}
                    onChange={handleGuidanceScaleChange}
                  />
                </div>
                <div className="parametre">
                  <div className="parametre-title">
                    <label htmlFor="seed">
                      <FaSeedling  size={20} style={{ marginRight: '10px' }} />
                      Seed
                    </label>
                    <input
                      type="text"
                      id="seed"
                      value={seed}
                      onChange={handleSeedChange}
                      placeholder="1aB2cD3eF4gH5iJ6kL7mN8oP9qR"
                      className="parametre-seed-input"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => { handleScrollToTop(); handleSendInstruction(); setIsInstructionButtonClicked(true); }} className="continue-button">
              Generate
            </button>
          </div> 
          
          <div className="gallery">
            {chunkedGalleryImages.map((imageChunk, chunkIndex) => (
              <div key={chunkIndex}>
                <div className="imageRow">
                  {imageChunk.map((image) => (
                    <div className="galleryImages" onClick={(event) => handleImageClick(event, image._id)} key={image._id}>
                      <img
                        key={image._id}
                        src={image.imageUrl}
                        alt={image.prompt}
                        className={"galleryImage"}
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
                              <button 
                                onClick={() => handleSuggestToCommunity(image._id)} 
                                className={`submit-button ${isSubmitButtonClicked ? 'clicked' : ''}`}
                              >
                                {isSubmitButtonClicked ? <FaLock /> : <FaLockOpen />}
                                <span>Keep Private</span>
                              </button>
                            </div>
                            <div className="modal-image">
                              <img
                                id={image._id}
                                src={image.imageUrl}
                                alt={image._id}
                                className="galleryImage"
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
                <div className="imagePrompt">{imageChunk[0].prompt}</div>
              </div>
            ))}
          </div>  
      </div>
    </div>
  );
};

export default HomePage;