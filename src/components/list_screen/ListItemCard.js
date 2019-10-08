import React, { Component } from 'react'
import delItem from './Close.png'
import moveUp from './MoveUp.png'
import moveDown from './MoveDown.png'

export class ListItemCard extends Component {
    render() {
        return (
            <div className='list_item_card'>
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
                    <img src={moveUp} alt="UpItem" style={{backgroundColor: 'green'}}/>
                    <img src={moveDown} alt="DownItem" style={{backgroundColor: 'green'}}/>
                    <img onClick={this.props.deleteItem.bind(this, this.props.listItem.key)} src={delItem} alt="DeleteItem" style={{backgroundColor: 'green'}}/>
                </div>
            </div>
        )
    }
}

export default ListItemCard
