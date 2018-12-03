import React, { Component } from 'react';
// import Test from './Test/index'
import TimerView from './Test/step'
import {observable} from 'mobx'
//1.定义状态并使其可观察
var appstate = observable({
      timer :0 
})
setInterval(function tick(){
    appstate.timer+=1;
},1000)
appstate.resetTimer = function reset(){
    appstate.timer = 0;
}
// function inject(target){
//   target.prototype.a=()=>{
//     console.log('111')
//   }
// }
// @inject
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Test /> */}
        <TimerView appstate={appstate} />
      </div>
    );
  }
}

export default App;
