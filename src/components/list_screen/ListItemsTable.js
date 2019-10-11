import React, { Component } from 'react'
import ListItemCard from './ListItemCard'
import addItem from './AddItem.png'

export class ListItemsTable extends Component {
    render() {
        return (
            <div id="list_items_container">
                <div className="list_item_header_card">
                    <div /*onClick = {this.props.sortTask}*/ className="list_item_task_header">Task</div>
                    <div /*onClick = {this.props.sortDueDate}*/ className="list_item_due_date_header">Due Date</div>
                    <div /*onClick = {this.props.sortStatus}*/ className="list_item_status_header">Status</div>
                </div>
                {
                    this.props.todoList.items.map((todoItem)=>(
                        <ListItemCard 
                            key={todoItem.key}
                            listItem={todoItem} 
                            todoList={this.props.todoList} 
                            deleteItem={this.props.deleteItem}
                            moveItemDown={this.props.moveItemDown}
                            moveItemUp={this.props.moveItemUp}
                            editItem = {this.props.editItem}
                            />
                    ))
                }
                <div className="list_item_add_card">
                    <img onClick={this.props.goItemList} src={addItem} alt="addItem"/>
                </div>
            </div>
        )
    }
}

export default ListItemsTable
