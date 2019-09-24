import React, { Component } from 'react';
import './App.css';
import data from './result.json';

class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log(data);
    const results = data.map((link, status)=> {
    return (<div><span> {link} </span> <span> {status}</span></div>); })

    return (
      <div className="App">
        {data.map(({link, status, titleDifferent, bodyDiffernet})=> 
          <div className="container">
            <span className='url'>{link}</span>
            <span> - </span>
            <span className='status'>{status}</span>
            <div className='diff-title'><span style= {{fontSize: 15}}>Title: </span>{titleDifferent}</div>
            <div><span style= {{fontSize: 15}}>Body: </span><span className='diff-body' dangerouslySetInnerHTML={{ __html: bodyDiffernet.replace(/[\r\n]+/gm, ``)}}></span></div>
          </div>
        )}
      </div>
    );
  }
}



export default App;
