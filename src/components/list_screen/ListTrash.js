import React, { Component } from 'react'

export class ListTrash extends Component {
    render() {
        return (
            <div onClick = {this.props.deleteList.bind(this, this.props.listKey)} id="list_trash">&#128465;</div>
        )
    }
}

export default ListTrash
