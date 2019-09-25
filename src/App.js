import React, { Component } from 'react';
import './App.css';
import data from './result.json';

class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log(data);

    return (
      <div className="App">
        {data.map(({link, status,prodLink,stageLink, titleDifferent, bodyDiffernet})=> 
          <div className="container">
            <div>
              <span className='url'>{link}</span>
              <span> - </span>
              <span className='status'>{status}</span> 
              <span className='prod'><a href = {prodLink}>Prod</a></span>
              <span className='stage'><a href = {stageLink}>Stage</a></span>
            </div>
            <div className='diff-title'><span style= {{fontSize: 15}}>Title: </span>{titleDifferent}</div>
            <div><span style= {{fontSize: 15}}>Body: </span><span className='diff-body' dangerouslySetInnerHTML={{ __html: bodyDiffernet.replace(/[\r\n]+/gm, ``)}}></span></div>
          </div>
        )}
      </div>
    );
  }
}



export default App;
