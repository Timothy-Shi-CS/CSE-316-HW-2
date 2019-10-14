import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    state ={
        description: this.props.item.description,
        assignedTo: this.props.item.assigned_to,
        dueDate: this.props.item.due_date,
        completed: this.props.item.completed
    }
    changeDescription = (e) =>{
        this.setState({description: e.target.value});
    }

    changeAssignedTo = (e) =>{
        this.setState({assignedTo: e.target.value});
    }

    changeDueDate = (e) =>{
        this.setState({dueDate: e.target.value});
    }

    changeCompleted = (e) =>{
        this.setState({completed: e.target.checked});
    }

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
