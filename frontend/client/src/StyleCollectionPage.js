import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi'

import './HomePage.css';
import './CommunityPage.css';
import './StyleCollectionPage.css';

const StyleCollectionPage = ({ selectedStyle }) => {
  const [clickedImageId, setClickedImageId] = useState(null);
  const [CommuneImages, setCommuneImages] = useState([]);
  // Define the description for each style
  const styleTitle = {
    myasaki: "Miyazaki Style",
    steampunk: "SteamPunk Universe",
    disney: "Disney Magic",
    watercolor: "Watercolor Wonders",
    oilpainting: "The Art of Oils",
    sculpture: "Sculpted Creations",
    vaporwave: "Vaporwave Visions",
    digitalart: "Digital Dreams",
    conceptart: "Conceptual Canvas",
    pixar: "Pixar Perfection",
    japanesestyle: "Japanese Elegance",
    handpoked: "Handpoked Mastery",
    americanoldschool: "American Old School Revival",
    vintage: "Vintage Artistry",
  };
  // Get the description for the selected style
  const selectedStyleTitle = styleTitle[selectedStyle];
  // Define the description for each style
  const styleDescriptions = {
    myasaki: "Immerse yourself in Miyazaki style - where reality waltzes with fantasy, and every detail pulses with life! This captivating style, perfected by legendary Japanese artist Hayao Miyazaki, weaves the mundane with the magical, opening doors to realms only limited by imagination. Fancy soaring skies, lush nature-scapes, and characters radiating raw emotions? Get ready to infuse your art with an irresistible blend of Eastern aesthetics and dreamlike surrealism. Embrace the Miyazaki style and watch your creativity take flight!",
    steampunk: "Dive headfirst into the world of Steampunk, where the past collides with the future, marrying vintage charm with futuristic innovation. This artistic style, a masterclass in contrasts, brims with gritty realism, intricate machinery, and a touch of the fantastical. Picture brass gears meshing with lavish Victorian aesthetics, steam-powered marvels juxtaposed with elegant Gothic details - all on your canvas! Embrace the Steampunk style to fuel your art with an intoxicating blend of history, fantasy, and unrivaled imagination. Get ready to ignite your creativity in this riveting era of steam, gears, and untamed innovation!",
    disney: "Step into the enchanting realm of Disney style, where timeless charm meets vibrant colors and dynamic characters! This iconic style, known for its captivating simplicity and emotional depth, turns every brush stroke into a magical story. Envision plucky princesses, whimsical creatures, and fairytale castles brought to life with bold hues and fluid lines. With Disney style, your canvas becomes a portal to worlds where dreams come true and imagination knows no bounds. Embrace the Disney style and infuse your art with heartwarming narratives and unforgettable characters. Unleash your inner storyteller and let your creativity shine!",
    watercolor: "Dive into the mesmerizing world of Watercolor style, where subtlety marries intensity, and fluidity captures frozen moments in time. This technique, a symphony of delicate washes and vibrant splashes, transforms your canvas into a dreamscape. Imagine landscapes unfolding in soft gradients, portraits whispering their tales through gentle strokes, and still life scenes echoing with nuanced shades. With Watercolor style, your palette becomes an alchemist's crucible, blending colors into raw emotion and fleeting impressions. Embrace the Watercolor style and breathe life into your art with light, color, and soulful spontaneity. Get ready to unveil the poetry hidden in the everyday and unleash your creative spirit!",
    sculpture: "Immerse yourself in the Sculpture style - an art form that invites you to turn two-dimensional imagination into three-dimensional reality. Sculpture style in the realm of pictorial art involves the illusion of form, depth, and texture, making your canvas seem to break the confines of its frame. Picture Romanesque robustness, Renaissance elegance, or even the sleek, futuristic vibes of modern sculpture transformed onto a flat surface. You'll create shadows that hint at hidden dimensions, lines that suggest form, and colors that imply the play of light on metal, stone, or clay. Embrace the Sculpture style to give your 2D art a dramatic 3D twist. Get ready to challenge perceptions and redefine reality with your creations!",
    vaporwave: "Step into the Vaporwave style, a retro-futuristic realm where neon pastels meet dreamy surrealism. This style merges 80s aesthetics with pixelated tropics and classical motifs - think glowing skylines, glitchy sunsets, and Roman busts shrouded in hazy filters. With Vaporwave, your canvas becomes a paradox, looking back to a nostalgic past while reaching for an imagined future. Embrace this digital Renaissance and watch your creativity ignite. Get ready to ride the Vaporwave!",
    digitalart: "Step into the limitless world of Digital Art style, where the traditional canvas meets the vibrant pulse of the modern era. This style breaks boundaries, offering endless possibilities - think hyper-realistic portraits, ethereal landscapes, or abstract masterpieces, all created with a flick of a stylus. With Digital Art, your canvas becomes a playground of pixels, bringing your wildest imaginations to life with precision and ease. Embrace the Digital Art style to infuse your work with innovative techniques and unparalleled versatility. Ready to reimagine art in the digital age? Take the leap and let your creativity soar!",
    conceptart: "Welcome to the world of Concept Art style, where imagination takes the front seat, shaping visions into tangible creations. This style is the seed of creative thought - depicting fantastical worlds, unique characters, or groundbreaking objects yet to be realized. Picture a bustling alien metropolis, a mysterious enchanted forest, or a pioneering piece of tech - all born on your canvas. With Concept Art, your ideas transform into visual blueprints, birthing new universes with every stroke. Embrace the Concept Art style to unleash your innovative potential. Are you ready to conceive the inconceivable? Dive in and make your mark!",
    pixar: "Welcome to the Pixar style - a magical blend of heartwarming narratives and sophisticated animation! This style is your ticket to creating universes brimming with vibrant colors, engaging characters, and visual storytelling. Imagine translating the playful charm of Toy Story or the deep-sea beauty of Finding Nemo onto your canvas. With Pixar style, your artwork transforms into immersive narratives that pull heartstrings and spark imagination. Embrace the Pixar style to infuse your creations with an irresistible blend of emotion, whimsy, and cinematic magic. Ready to paint stories that resonate with every heart? The Pixar canvas awaits your touch!",
    japanesestyle: "Immerse yourself in the Japanese style, where centuries-old traditions meet the vibrancy of modern aesthetics. This style captures the simplicity and depth of Japanese art - think Ukiyo-e prints with their flat planes and bold outlines, or the ethereal beauty of cherry blossoms against a setting sun. With the Japanese style, your canvas becomes a stage for the elegant interplay of form, color, and space. Embrace the Japanese style to infuse your art with a unique blend of tranquility, elegance, and emotional resonance. Are you ready to transport your audience to the Land of the Rising Sun? Unleash your brush and let the journey begin!",
    handpoked: "Step into the world of Hand Poked style, where the primal meets the intricate, breathing life into each dot on your canvas. This style, often associated with tattoo art, celebrates the organic, meditative process of creating images dot by painstaking dot. Picture the stark beauty of monochrome stippling or the gentle gradients of pointillism, each mark a testament to your artistic patience and precision. With the Hand Poked style, your canvas becomes a landscape of dots, each contributing to a larger, captivating image. Embrace the Hand Poked style to infuse your art with a distinct texture and depth. Are you ready to explore the power of the point? Get set to poke your way to artistic mastery!",
    americanoldschool: "Welcome to the world of American Old School Tattoo style, a realm where bold lines meet vibrant colors to tell timeless stories. This style boasts iconic symbols - think swallows, roses, and anchors, each rendered with a bold outline and limited color palette. With the American Old School Tattoo style, your canvas becomes a testament to an era of rebellion and self-expression. Embrace this style to imbue your art with a sense of nostalgia, vivid simplicity, and a visual punch that resonates across generations. Ready to make a bold statement with your artwork? Let the American Old School Tattoo style lead the way!",
    vintage: "Step into the timeless allure of Vintage style, where echoes of the past meet the charm of the present. This style weaves nostalgia with artistic flair - imagine sepia-tinted portraits, rustic landscapes, or quaint still life scenes rendered with soft hues and rich textures. With the Vintage style, your canvas becomes a portal to yesteryears, breathing life into forgotten moments. Embrace this style to infuse your art with an irresistible blend of old-world charm and contemporary sensitivity. Ready to paint a love letter to the past? The vintage canvas is waiting for your touch!",
  };
  // Get the description for the selected style
  const selectedStyleDescription = styleDescriptions[selectedStyle];

  // Define the description for each reasearch
  const styleLabel = {
    myasaki: 'Myasaki',
    steampunk: 'steampunk',
    disney: 'Disney',
    watercolor: 'watercolor',
    oilpainting: 'oilpainting',
    sculpture: 'sculpture',
    vaporwave: 'vaporwave',
    digitalart: 'digital art',
    conceptart: 'concept art',
    pixar: 'Pixar',
    japanesestyle: 'japanese style, oriental style',
    handpoked: 'handpoked, stick and poke',
    americanoldschool: 'american old school tattoo',
    vintage: 'vintage',
  };
  // Get the description for the selected style
  const selectedStyleLabel = styleLabel[selectedStyle];

   // Scroll to the gallery section when the "Explore this style" link is clicked
   const scrollToGallery = () => {
    const galleryContainer = document.getElementById('gallery-container');
    galleryContainer.scrollIntoView({ behavior: 'smooth' });
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
   
        const response = await fetch('http://localhost:4000/api/styleCollection', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selectedStyleLabel }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to get search results');
        }
  
        // Parse the response data
        const searchData = await response.json();
  
        // Update the state with the matching images
        setCommuneImages(searchData);
  
      } catch (error) {
        console.error(error);
        // Handle the error if necessary
      }
    };  

    fetchImages();
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
      
      <div className="description-container">
        {selectedStyle && (
          <div className="description-wrapper">
            <div className="image-section">
              <img src={`/${selectedStyle}.jpg`} alt={selectedStyle} className="selected-style-image" />
            </div>
            <div className="info-section">
              <h2>{selectedStyleTitle}</h2>
              <p>{selectedStyleDescription}</p>
            </div>
          </div>
        )}
      </div>

      <div className="explore-style-container">
        <div className="explore-style-arrow" onClick={scrollToGallery}>
          <FiChevronDown />
          <span>Explore this style</span>
          <FiChevronDown />
        </div>
      </div>

      <div className="gallery-container" id="gallery-container">
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
      </div>
   </div>
  );
};

export default StyleCollectionPage;