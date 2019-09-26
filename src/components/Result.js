import React, {Component} from 'react';
import './Result.css';

class Result extends Component{
    render(){
        const {link, status,prodLink,stageLink, titleDifferent, bodyDiffernet} = this.props;

        return(
            <div className="container">
            <div>
              <span className='url'>{link}</span>
              <span> - </span>
              <span className='status'>{status}</span> 
              <span className='prod'><a href = {prodLink}>Prod</a></span>
              <span className='stage'><a href = {stageLink}>Stage</a></span>
            </div>
            <div className='diff-title'><span style= {{fontSize: 15}}>Title: </span>{titleDifferent}</div>
            <div>
                <span style= {{fontSize: 15}}>Body: </span>
                <span className='diff-body' dangerouslySetInnerHTML={{ __html: bodyDiffernet}}></span>
                </div>
          </div>
        )
    }
}

export default Result;