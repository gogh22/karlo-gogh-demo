import './App.css';
import Load from './loading.js'
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setimageSrc] = useState(null);
  const [userInput, setUserInput] = useState('');


  const text = `A picture of ${userInput} in style of Vincent Van Gogh`;
  const batch_size = 1;
  const REST_API_KEY = process.env.REACT_APP_API_KEY;
  const REST_API_URL = process.env.REACT_APP_API_BASE_URL;

  function chkCharCode(e) {
    const regExp = /[^0-9a-zA-Z || ' ']/g;
    const ele = e.target;
    if (regExp.test(ele.value)) {
      alert('영어로만 입력해주세요.');
      ele.value = ele.value.replace(regExp, '');
    }
  };


  async function fetchData() {
    try {
      const response = await fetch(`${REST_API_URL}/api/v1/inference/karlo/t2i`, {
        method: 'POST',
        headers: {
          'Authorization': `KakaoAK ${REST_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: {
            text: text,
            batch_size: batch_size,
          },
        }),
      });
      const jsonData = await response.json();
      setimageSrc(jsonData);
      setimageSrc(`data:image/png;base64,${jsonData.images[0].image}`);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="App">
      <header>
        <div className='bg-img'></div>
        <h1 className='repre-text'>
          <a href="https://kakaobrain.com/techplayground/karlo/demo" target="_blank" rel="noreferrer" className='karlo'>Karlo</a>
          <span className='collabo'>X</span>
          <span className='vincent'>Vincent</span>
        </h1>
        <div className='text'>
          <div className='big-text1'>
            <h1>Create</h1>
          </div>
          <div className='big-text2'><h1 >Your Own Masterpiece</h1></div>
          <p className='explanation'>An AI artist in the style of Vincent Van Gogh, vividly capturing your imanination</p>
        </div>
      </header>

      <main>
        <div className='main-bg'>
          <input className="circle-input" type="text" placeholder= "Ex) sea with mountain background"  onKeyUp={ (e) => chkCharCode(e)} onChange={(e) => setUserInput(e.target.value)}/>
          <button className='submit-btn' onClick={ ()=> {
            setIsLoading(true);
            fetchData();
          }}>Draw</button>
        </div>
      </main>

      <div className='show-img'>
        { isLoading === true ? <Load></Load> : null }
        {imageSrc && <img src = {imageSrc} alt = "Generated" width="500" height="600" />}
      </div>

      <footer>
          <p>produced with Kakao developer REST API and React</p>
          <a href="https://github.com/gogh22/karlo-gogh-demo">Hae Yeon's github</a>
      </footer>

    </div>

  );
}

export default App;
