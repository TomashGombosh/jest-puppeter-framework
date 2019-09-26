import React, {Component} from 'react';
import Result from './Result';
class Results extends Component{
  constructor(){
    super();
    this.state = {
      file : this.props
    }
  }
  chose = (txt) => {
    switch(txt){
      case `1`: return require('../json/result1.json'); 
      case `2`: return require('../json/result2.json'); 
      case `3`: return require('../json/result3.json'); 
      case `4`: return require('../json/result4.json'); 
      case `5`: return require('../json/result5.json'); 
      case `6`: return require('../json/result6.json'); 
      case `7`: return require('../json/result7.json'); 
      case `8`: return require('../json/result8.json'); 
      case `9`: return require('../json/result9.json'); 
      case `10`: return require('../json/result10.json'); 
      case `11`: return require('../json/result11.json'); 
      case `12`: return require('../json/result12.json'); 
      case `13`: return require('../json/result13.json'); 
      case `14`: return require('../json/result14.json'); 
      case `15`: return require('../json/result15.json'); 
      case `16`: return require('../json/result16.json'); 
      case `17`: return require('../json/result17.json'); 
      case `18`: return require('../json/result18.json'); 
      case `19`: return require('../json/result19.json'); 
      case `20`: return require('../json/result20.json'); 
      case `21`: return require('../json/result21.json'); 
      case `22`: return require('../json/result22.json'); 
      case `23`: return require('../json/result23.json'); 
      case `24`: return require('../json/result24.json'); 
      case `25`: return require('../json/result25.json'); 
      case `26`: return require('../json/result26.json'); 
      case `27`: return require('../json/result27.json'); 
      case `28`: return require('../json/result28.json'); 
      default : return undefined;
    }
  }
    render(){
  
        return(
          <div>
          { 
            this.chose(this.state.file).map(({link, status,prodLink,stageLink, titleDifferent, bodyDiffernet})=> <Result 
              link = {link} 
              status = {status}
              prodLink = {prodLink}
              stageLink = {stageLink}
              titleDifferent = {titleDifferent}
              bodyDiffernet = {bodyDiffernet}
          />)}
          </div>
        )
    }
}

export default Results;