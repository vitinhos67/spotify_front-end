import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App(props) {
  const [datesArtists, setDatesArtists] = useState({});

  const handleSubmitField = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = Object.fromEntries(formData);

    const q = value.fieldSearchValue;
    console.log(q);

    const query = new URLSearchParams({
      q,
    });

    const url = `http://localhost:3003/search?${query}`;

    const response = await axios(url, {
      method: 'get',
      headers: {
        'Access-Control-Allow-Origin': 'http:localhost:3003',
      },
    });

    const { data } = response;

    setDatesArtists((prevState) => ({ data }));
  };

  const whenShildChange = async (e) => {
    const res = document.querySelector('#res');
    setTimeout(() => {
      let texto = '';

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < datesArtists.data.length; i++) {
        texto += `
        <div class="artists_panel-content">
        <div class="artists">
        <img src="https://diy-magazine.s3.amazonaws.com/d/diy/Artists/P/Palace/_1500x1000_crop_center-center_75_none/Palace-Press-2016.jpg" class="grid-image">
        <h4 class="artists_name_field"> ${datesArtists.data[i].artists[0].name}</h4>
        <h6 class="name_track_field">${datesArtists.data[i].name_track}</h6>
        </div>
        
        <a href="${datesArtists.data[i].artists[0].external_urls.spotify}" 
        class="link-artist" 
        target="_blank">
        <button type ="submit">Artista no spotify</button>
        </a>
        
        </div>
        `;
      }

      res.innerHTML = texto;
    }, 1000);
  };

  return (

    <div>

      <header className="nav-bar">
        <form onSubmit={handleSubmitField} className="form-search">
          <label htmlFor="name">
            <input
              type="name"
              name="fieldSearchValue"
              placeholder="Find Track"
              className="form-create-user"
            />
            <button type="submit" onClick={whenShildChange}>Search</button>
          </label>

        </form>
      </header>

      <div id="res" />
    </div>
  );
}

export default App;
