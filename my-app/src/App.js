import React, { useState } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

import './App.css';

function App() {
  const [searchQuery, setsSearchQuery] = useState('');

  return (
    <div>
      <Searchbar onSubmit={setsSearchQuery} />
      <ImageGallery searchQuery={searchQuery} />
    </div>
  );
}

export default App;
