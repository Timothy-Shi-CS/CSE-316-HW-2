import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';

export class ListScreen extends Component {
    state = {
        show: false
    }
    getListName() {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            return this.props.todoList.name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            return this.props.todoList.owner;
        }
    }
    showTrashScreen = () => {
        this.setState({show: true});
    }
    hideTrashScreen = () => {
        this.setState({show: false});
    }
    render() {
        const visibleModal = this.state.show ? 'modal is_visible' : 'modal';
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash 
                listKey={this.props.todoList.key} 
                showTrashScreen = {this.showTrashScreen}
                />
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            onChange={this.props.setListName}
                            defaultValue={this.getListName()} 
                            type="text" 
                            id="list_name_textfield" 
                        />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            onChange={this.props.setListOwner}
                            defaultValue={this.getListOwner()}
                            type="text" 
                            id="list_owner_textfield" 
                        />
                    </div>
                    
                </div>
                <ListItemsTable 
                moveItemUp={this.props.moveItemUp}
                moveItemDown={this.props.moveItemDown} 
                goItemList={this.props.goItemList} 
                todoList={this.props.todoList} 
                deleteItem ={this.props.deleteItem}
                sortTask = {this.props.sortTask}
                sortDueDate = {this.props.sortDueDate}
                sortStatus = {this.props.sortStatus}
                editItem = {this.props.editItem}
                />
                    <div id = "deleteList" className = {visibleModal}>
                        <h3>Delete list?</h3>
                        <p> Are you sure you want to delete this list?</p>
                        <button onClick = {this.props.deleteList.bind(this, this.props.todoList.key)}>Yes</button>
                        <button onClick = {this.hideTrashScreen}>No</button>
                        <p>The list will not be retrievable</p>
                    </div>
            </div>
            
        )
    }
}

export default ListScreen
