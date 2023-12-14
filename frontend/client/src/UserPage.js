import React, { useEffect, useState } from 'react';

import './UserPage.css';

const UserPage = () => {
    const collectionCount = 10;
    const generatedImagesCount = 50;
    const username = "SuperChicken"; // Username
    const profileImageUrl = "https://img.freepik.com/vecteurs-premium/conception-mascotte-poulet-fort-dessin-anime_194935-13.jpg"; // Profile Image URL
    const [activeTab, setActiveTab] = useState('collections'); // State to track active tab

    const [clickedImageId, setClickedImageId] = useState(null);
    const [CommuneImages, setCommuneImages] = useState([]);

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
                let userID = "1";
                // Fetch the images with community = true from the backend API
                const response = await fetch('http://localhost:3000/api/image/getUserImages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userID,
                    }),
                })
                const data = await response.json();

                // Update the images state with the fetched images
                setCommuneImages(data.images);
            } catch (error) {
                console.error(error);
            }
        };

        fetchImages();
    }, []);


    return (
        <div className="user-page">
            <div className="profile">
                <img src={profileImageUrl}
                    alt={username}
                    className="profile-pic" />
                <h1 className="username">{username}</h1>
                <p className="description">This is the user's profile description.</p>
                <div className="counts">
                    <div className="count-item">
                        <span className="count-number">{collectionCount}</span>
                        <span className="count-label">Collections</span>
                    </div>
                    <div className="count-item">
                        <span className="count-number">{generatedImagesCount}</span>
                        <span className="count-label">Generated Images</span>
                    </div>
                </div>
            </div>
            <div className="tabs">
                <button
                    className={`tab-button ${activeTab === 'collections' ? 'activeLink' : ''}`}
                    id="collections-tab"
                    onClick={() => setActiveTab('collections')}
                >
                    Collections
                </button>
                <button
                    className={`tab-button ${activeTab === 'generated' ? 'activeLink' : ''}`}
                    id="generated-tab"
                    onClick={() => setActiveTab('generated')}
                >
                    Generated Images
                </button>
            </div>
            <div className="content">

                {activeTab === 'generated' && (
                    <div className="gallery-container">
                        {CommuneImages.length === 0 ? (
                            <p>No matching images found.</p>
                        ) : (
                            <div className="masonry-gallery">
                                {CommuneImages.map((image) => (
                                    <div className="communityGalleryImages" onClick={(event) => handleImageClick(event, image._id)} key={image._id}>
                                        <img
                                            src={image.imageUrl}
                                            alt={image.prompt}
                                            className="communityGalleryImage"
                                            loading="lazy"
                                        />
                                        {clickedImageId === image._id && (
                                            <div className="modal" onClick={(event) => handleImageClick(event, image._id)}>
                                                <div className="modal-content" onClick={e => e.stopPropagation()}>
                                                    {/* Modal details */}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserPage;