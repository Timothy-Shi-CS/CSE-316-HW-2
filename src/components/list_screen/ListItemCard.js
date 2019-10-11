import React, { Component } from 'react'
import delItem from './Close.png'
import moveUp from './MoveUp.png'
import moveDown from './MoveDown.png'

export class ListItemCard extends Component {
    render() {
        return (
            <div onClick = {this.props.editItem.bind(this, this.props.listItem)} className='list_item_card'>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                <div className= {this.props.listItem.completed ? 'list_item_card_completed' : 'list_item_card_not_completed'}>
                    <b> {this.props.listItem.completed ? "Completed" : "Pending"}</b>
                </div>
                <div className='list_item_card_toolbar'>
                    <img onClick={this.props.moveItemUp.bind(this, this.props.listItem.key)} src={moveUp} alt="UpItem" style={{backgroundColor: this.props.listItem.key==0 ? 'gray' : "green"}}/>
                    <img onClick={this.props.moveItemDown.bind(this, this.props.listItem.key)} src={moveDown} alt="DownItem" style={{backgroundColor: this.props.listItem.key == this.props.todoList.items.length-1 ? 'gray': 'green'}}/>
                    <img onClick={this.props.deleteItem.bind(this, this.props.listItem.key)} src={delItem} alt="DeleteItem" style={{backgroundColor: 'green'}}/>
                </div>          
            </div>
        )
    }
}

export default ListItemCard
