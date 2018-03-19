import React, { Component } from 'react';
import Icon from 'material-ui/Icon';

import ToDoList from './ToDoList';
import ToDoInput from './ToDoInput';

class ToDoApp extends Component {
    constructor (props) {
        super(props)
        this.state = {
            items: ['掃除', '洗濯', '買い物']
        }
    }

    // ToDoリストにアイテムを追加
    addItem = item => {
        this.setState({ 
            items: [...this.state.items, item]
        })
    }

    // ToDoリストからアイテムを削除
    deleteItem = item => {
        const index = this.state.items.indexOf(item)
        if (index !== -1) {
            this.state.items.splice(index, 1)
            this.setState({ items: this.state.items })
        }
    }

    // アイテムがすでに存在するかチェック(存在する場合はtrue、そうでない場合はfalse)
    hasItem = item => {
        return (this.state.items.indexOf(item) !== -1)
    }

    render () {
        return (
            <div className={"ToDoApp"}>
                <Icon color="primary" style={{ fontSize: 30 }}>
                    ToDoリスト
                </Icon>
                <ToDoInput addItem={this.addItem} hasItem={this.hasItem} />
                <ToDoList items={this.state.items} deleteItem={this.deleteItem} />
            </div>
        )
    }
}
export default ToDoApp