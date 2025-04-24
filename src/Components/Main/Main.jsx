import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="users" />
      </div>

      <div className="main-container">
        {!showResult ?
        <>
        
        <div className="greeet">
          <p><span>Hello,dev.</span></p>
          <p>how can I help you</p>
        </div>
        
        <div className="cards">
          <div className="card">
            <p>Lorem ipsum dolor sit amet.</p>
            <img src={assets.compass_icon} alt="compass" />
          </div>
          
          <div className="card">
            <p>life nalla irukanum</p>
            <img src={assets.bulb_icon} alt="bulb" />
          </div>
          
          <div className="card">
            <p>aprom papom</p>
            <img src={assets.message_icon} alt="message" />
          </div>
          
          <div className="card">
            <p>nee yarru</p>
            <img src={assets.code_icon} alt="code" />
          </div>
        </div>
        
        
        </>
        :<div className='result'>
            <div className="result-title">
                <img src={assets.user_icon}></img>
                <p>{recentPrompt}</p>
            </div>
            <div className='result-data'>
                <img src={assets.gemini_icon}></img>
                {loading?
                <div className='loader'>
                    <hr></hr>
                    <hr></hr>
                    <hr></hr>
                </div>   
                : <p dangerouslySetInnerHTML={{__html:resultData}}></p>
            }
                

            </div>

            </div>}
       

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder='Enter the prompt here'
              onChange={(e) => {
                setInput(e.target.value); // Update the input state
              }}
              value={input}
            />
            <div>
              <img src={assets.gallery_icon} alt="gallery" />
              <img src={assets.mic_icon} alt="mic" />
              <img onClick={() => onSent(input)} src={assets.send_icon} alt="send" />
            </div>
          </div>
          <p className="bottom-info">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero consequuntur voluptatum, repellendus tenetur quisquam odit?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
