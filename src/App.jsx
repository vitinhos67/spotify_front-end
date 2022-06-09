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
  // datesArtists.data.data[0]
  const whenShildChange = async (e) => {
    // e.preventDefault();

    setTimeout(() => {
      const res = document.querySelector('#res');
      let texto = '';

      console.log(datesArtists.data);
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < datesArtists.data.length; i++) {
        texto += `<br>
        <label> Artist: ${datesArtists.data[i][0].name} </label>
        <a href="${datesArtists.data[i][0].external_urls.spotify}" target="_blank">Open profile in Spotify</a>
        <br>
        `;
      }

      res.innerHTML = texto;
    }, 1000);
  };

  return (
    <div>
      <form onSubmit={handleSubmitField}>

        <label htmlFor="name">
          <input
            type="name"
            name="fieldSearchValue"
            placeholder="Find Artists/Album"
            className="form-create-user"
          />
        </label>

        <button type="submit" onClick={whenShildChange}>Cadastrar</button>

      </form>
      <div id="res">
        Test
      </div>
    </div>
  );
}

export default App;
