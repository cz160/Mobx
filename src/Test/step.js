//mobx要点
import React,{Component} from 'react'
// import {observable} from 'mobx'
import {observer} from 'mobx-react'
// var appstate = observable({
//     timer :0 
// })
//2.创建视图以响应状态的变化
@observer
class TimerView extends Component {
    render(){
        return (
            <button onClick={this.onReset.bind(this)}>
                Seconds passed : {this.props.appstate.timer}
            </button>
        )
    }
    onReset(){
        this.props.appstate.resetTimer()
    }
}


export default TimerView

