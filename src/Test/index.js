import React,{Component,Fragment} from 'react'
import {observable,autorun,computed,when,reaction} from 'mobx'

//将数据变为可观察的
const Todos = observable({
    todos:[
        { id: 1, title: '我是未完成的', isFinished: false },
        { id: 2, title: '我是已完成的', isFinished: true },
    ],
    get finishedTodosLength (){
        return this.todos.filter(todo=>todo.isFinished).length
    }
})

class Test extends Component {
    constructor(Props){
        super(Props)
        this.state = {
            todos:Todos.todos,
            finishedTodosLength: Todos.finishedTodosLength
        }
    }
    componentDidMount(){
        // autorun(()=>{ //第一次执行一次，每次更改还要执行一次，注意，用什么，改什么
        //     this.setState({
        //         todos:Todos.todos,
        //         finishedTodosLength: Todos.finishedTodosLength
        //     })
        //     return Todos.todos[0].title
        // })
        reaction(()=>(  //监听的数据
            Todos.todos[0].title
        ),()=>{
            this.setState({  //发生改变后执行（第一次不会执行）
                todos:Todos.todos,
                finishedTodosLength: Todos.finishedTodosLength
            })
        })
        when(() => {
            return Todos.todos.length > 2  //观察满足条件是执行
        }, () => {
            console.log(Todos.todos)
        })
        setTimeout(()=>{
            Todos.todos[0].title='aaaa'
        },2000)
        setTimeout(()=>{
            Todos.todos.push({ id: 3, title: '我是未完成的', isFinished: false },)
        },2000)
    }
    render(){
        console.log('1111')
        return(
            <Fragment>
                <h1>hello world</h1>
                {
                    this.state.todos.map(item=>(
                        <h1 key = {item.id}>{item.title} - {item.isFinished ? '完成' : '未完成'}</h1>
                    ))
                }
                <p>完成的有{this.state.finishedTodosLength}条</p>
            </Fragment>
        )
    }
}
export default Test