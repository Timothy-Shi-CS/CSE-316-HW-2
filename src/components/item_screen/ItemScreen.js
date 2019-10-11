import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ListItemCard from '../list_screen/ListItemCard';

export class ItemScreen extends Component {
    state ={
        description: this.props.item.description,
        assignedTo: this.props.item.assigned_to,
        dueDate: this.props.item.due_date,
        completed: this.props.item.completed
    }
    changeDescription = (e) =>{
        //this.props.item.description = e.target.value;
        this.setState({description: e.target.value});
    }

    changeAssignedTo = (e) =>{
        //this.props.item.assigned_to = e.target.value;
        this.setState({assignedTo: e.target.value});
    }

    changeDueDate = (e) =>{
        //this.props.item.due_date = e.target.value;
        this.setState({dueDate: e.target.value});
    }

    changeCompleted = (e) =>{
        //this.props.item.completed = e.target.value;
        this.setState({completed: e.target.checked});
    }
/*
    changeItem = (i) =>{
        i = {
            description: this.state.description,
            assignedTo: this.state.assignedTo,
            dueDate: this.state.dueDate,
            completed: this.state.completed
        }
    }*/

    render() {
        return (
            <div>
                <h2>Item</h2>
                    <form>
                        <div>
                            <span>Description:</span>
                            <input type="text" name="description" defaultValue={this.state.description} onChange={this.changeDescription} style={{width: "50%"}}/>
                        </div>
                        <div>
                            <span>Assigned To:</span>
                            <input type="text" name="assignedTo" defaultValue={this.state.assignedTo} onChange={this.changeAssignedTo} style={{width: "50%"}}/>
                        </div>
                        <div>
                            <span>Due Date:</span>
                            <input type="date" name="dueDate" defaultValue={this.state.dueDate} onChange={this.changeDueDate}/>
                        </div>
                        <div>
                            <span>Completed:</span>
                            <input type="checkbox" name="completed" defaultChecked={this.state.completed} onChange={this.changeCompleted}/>
                        </div>
                    </form>
                <button onClick = {this.props.edit == false ? this.props.newItem.bind(this, this.state.description, this.state.assignedTo, this.state.dueDate, this.state.completed): this.props.changeItem.bind(this, this.state.description, this.state.assignedTo, this.state.dueDate, this.state.completed, this.props.item)}>Submit</button>
                <button onClick = {this.props.cancelItem}>Cancel</button>
            </div>
        )
    }
}

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen
