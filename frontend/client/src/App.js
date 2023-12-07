import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import CommunityPage from './CommunityPage';
import StyleCollectionPage from './StyleCollectionPage';
import UserPage from './UserPage.js'
import SupportPage from './SupportPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/styleCollection" element={<StyleCollectionPage />} />
        {/* Add the route for the StyleCollectionPage with the different styles */}
        <Route path="/geometric-style-collection" element={<StyleCollectionPage selectedStyle="geometric" />} />
        <Route path="/anime-style-collection" element={<StyleCollectionPage selectedStyle="anime" />} />
        <Route path="/cartoon-style-collection" element={<StyleCollectionPage selectedStyle="cartoon" />} />
        <Route path="/simple-style-collection" element={<StyleCollectionPage selectedStyle="simple" />} />
        <Route path="/complex-style-collection" element={<StyleCollectionPage selectedStyle="complex" />} />
        <Route path="/detailed-style-collection" element={<StyleCollectionPage selectedStyle="detailed" />} />
        <Route path="/colorful-style-collection" element={<StyleCollectionPage selectedStyle="colorful" />} />
        <Route path="/bw-style-collection" element={<StyleCollectionPage selectedStyle="bw" />} />
        <Route path="/logo-style-collection" element={<StyleCollectionPage selectedStyle="logo" />} />
        <Route path="/minimalist-style-collection" element={<StyleCollectionPage selectedStyle="minimalist" />} />
        <Route path="/intricatedetails-style-collection" element={<StyleCollectionPage selectedStyle="intricatedetails" />} />
        <Route path="/highcontrast-style-collection" element={<StyleCollectionPage selectedStyle="highcontrast" />} />
        <Route path="/patchdesign-style-collection" element={<StyleCollectionPage selectedStyle="patchdesign" />} />
        <Route path="/vectorlineart-style-collection" element={<StyleCollectionPage selectedStyle="vectorlineart" />} />
        <Route path="/realistic-style-collection" element={<StyleCollectionPage selectedStyle="realistic" />} />
        <Route path="/myasaki-style-collection" element={<StyleCollectionPage selectedStyle="myasaki" />} />
        <Route path="/steampunk-style-collection" element={<StyleCollectionPage selectedStyle="steampunk" />} />
        <Route path="/disney-style-collection" element={<StyleCollectionPage selectedStyle="disney" />} />
        <Route path="/watercolor-style-collection" element={<StyleCollectionPage selectedStyle="watercolor" />} />
        <Route path="/oilpainting-style-collection" element={<StyleCollectionPage selectedStyle="oilpainting" />} />
        <Route path="/sculpture-style-collection" element={<StyleCollectionPage selectedStyle="sculpture" />} />
        <Route path="/vaporwave-style-collection" element={<StyleCollectionPage selectedStyle="vaporwave" />} />
        <Route path="/digitalart-style-collection" element={<StyleCollectionPage selectedStyle="digitalart" />} />
        <Route path="/conceptart-style-collection" element={<StyleCollectionPage selectedStyle="conceptart" />} />
        <Route path="/pixar-style-collection" element={<StyleCollectionPage selectedStyle="pixar" />} />
        <Route path="/japanese-style-collection" element={<StyleCollectionPage selectedStyle="japanesestyle" />} />
        <Route path="/handpoked-style-collection" element={<StyleCollectionPage selectedStyle="handpoked" />} />
        <Route path="/americanoldschool-style-collection" element={<StyleCollectionPage selectedStyle="americanoldschool" />} />
        <Route path="/vintage-style-collection" element={<StyleCollectionPage selectedStyle="vintage" />} />
        <Route path="/closeup-style-collection" element={<StyleCollectionPage selectedStyle="closeup" />} />
        <Route path="/longshot-style-collection" element={<StyleCollectionPage selectedStyle="longshot" />} />
        <Route path="/landscape-style-collection" element={<StyleCollectionPage selectedStyle="landscape" />} />
        <Route path="/background-style-collection" element={<StyleCollectionPage selectedStyle="background" />} />
        <Route path="/portrait-style-collection" element={<StyleCollectionPage selectedStyle="portrait" />} />

        <Route path="/support" element={<SupportPage />} />
      </Routes>
    </Router>
  );
};

export default App;
