import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js/stable';
import React from 'react';
import ReactDOM from 'react-dom';

import "./test.css";
const im = require("./aa.png");




interface IProps {};	

class App extends React.Component {
   render() {
      alert(222);
      const a: string = "dfdf";
      const b = 8989;

      console.log(a, b);

      return (
          <div className="tcellAVQC"> 
            <img src={im}> </img>
          </div>
      );
   }
}


ReactDOM.render(<App />, document.getElementById('root'));
