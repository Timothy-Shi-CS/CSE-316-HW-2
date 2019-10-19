import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'
import jsTPS from './components/transactions/jsTPS'
import { throwStatement } from '@babel/types';
import ListItemRemovalTransaction from './components/transactions/ListItemRemovalTransaction.js';
import ListNameChangeTransaction from './components/transactions/ListNameChangeTransaction.js';
import OwnerNameChangeTransaction from './components/transactions/OwnerNameChangeTransaction.js';
import ListItemMoveUpTransaction from './components/transactions/ListItemMoveUpTransaction.js';
import ListItemMoveDownTransaction from './components/transactions/ListItemMoveDownTransaction.js';
import ListItemEditTransaction from './components/transactions/ListItemEditTransaction.js';
import SortTaskTransaction from './components/transactions/SortTaskTransaction.js';
import SortDueDateTransaction from './components/transactions/SortDueDateTransaction.js';
import SortStatusTransaction from './components/transactions/SortStatusTransaction.js';
import AddListItemTransaction from './components/transactions/AddListItemTransaction.js';

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN",
}

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    item: null,
    edit: false,
    sortTaskReverse: false,
    sortDueDateReverse: false,
    sortStatusReverse: false,
    tps: new jsTPS()
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.state.tps.clearAllTransactions();
    this.setState({currentList: null});
  }
  goList = () => {
    let newListKey = this.state.todoLists.length;
    let newList = {
      key: newListKey,
      name: "unknown",
      owner: "unknown",
      items: []
    }
    this.state.todoLists.push(newList);
    this.loadList(newList);
  }
  goItemList = () => {
    let tempItem = {
      description: "unknown",
      due_date: "YYYY-MM-DD",
      assigned_to: "unknown",
      completed: false
    };
    this.setState({item: tempItem});
    this.setState({edit: false});
    this.setState({currentScreen: AppScreen.ITEM_SCREEN});
  }
  editItem = (i) =>{
    this.setState({item: i});
    this.setState({edit: true});
    this.setState({currentScreen: AppScreen.ITEM_SCREEN});
  }
  newItem = (a, b, c, d) => {
    var y = new AddListItemTransaction(a, b, c, d, this.state.currentList);
    this.state.tps.addTransaction(y);
    this.loadList(this.state.currentList);
    this.setState({item: null});
    this.setState({edit: false});
  }

  changeItem = (a, b, c, d ,k) =>{
    var y = new ListItemEditTransaction(a, b, c, d, k, this.state.currentList.items[k.key].description, this.state.currentList.items[k.key].assigned_to,this.state.currentList.items[k.key].due_date,this.state.currentList.items[k.key].completed);
    this.state.tps.addTransaction(y);
    this.loadList(this.state.currentList);
    this.setState({item: null});
    this.setState({edit: false});
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }

  deleteItem = (key, e) => {
    e.stopPropagation();
    var b = new ListItemRemovalTransaction(this.state.currentList, this.state.currentList.items[key]);
    this.state.tps.addTransaction(b);
    this.loadList(this.state.currentList);
  }

  deleteList = (key) => {
    this.state.todoLists = this.state.todoLists.filter(i => i.key !== key);
    var i = 0;
    this.state.todoLists.map(item=>{
      item.key = i;
      i++;
    })
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
  }

  setListName = (e) =>{
    var b = new ListNameChangeTransaction(this.state.currentList, this.state.currentList.name, e.target.value);
    this.state.tps.addTransaction(b);
    this.loadList(this.state.currentList);
  }

  setListOwner = (e) =>{
    var b = new OwnerNameChangeTransaction(this.state.currentList, this.state.currentList.owner, e.target.value);
    this.state.tps.addTransaction(b);
    this.loadList(this.state.currentList);
  }
  moveItemDown = (i, e) =>{
    e.stopPropagation();
    if (i < this.state.currentList.items.length-1){
      var b = new ListItemMoveDownTransaction(this.state.currentList, this.state.currentList.items[i]);
      console.log(b);
      this.state.tps.addTransaction(b);
      this.loadList(this.state.currentList);
    }
  }
  moveItemUp = (i, e) =>{
    e.stopPropagation();
    if (i > 0){
      var b = new ListItemMoveUpTransaction(this.state.currentList, this.state.currentList.items[i]);
      console.log(b);
      this.state.tps.addTransaction(b);
      this.loadList(this.state.currentList);
    }
  }
  sortTask = () =>{
    var b = new SortTaskTransaction(this.state.sortTaskReverse, this.state.currentList);
    this.state.tps.addTransaction(b);
    this.setState({sortTaskReverse: b.reverse});
    this.loadList(this.state.currentList);
  }

  sortDueDate = () =>{
    var b = new SortDueDateTransaction(this.state.sortDueDateReverse, this.state.currentList);
    this.state.tps.addTransaction(b);
    this.setState({sortDueDateReverse: b.reverse});
    this.loadList(this.state.currentList);
  }

  sortStatus = () =>{
    var b = new SortStatusTransaction(this.state.sortStatusReverse, this.state.currentList);
    this.state.tps.addTransaction(b);
    this.setState({sortStatusReverse: b.reverse});
    this.loadList(this.state.currentList);
  }
  
  cancelItem = () =>{
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
  }

  handleUndoRedo=(e)=>{
    if (this.state.currentScreen == AppScreen.LIST_SCREEN){
      if(e.ctrlKey&&String.fromCharCode(e.which).toLowerCase()==='z'&&this.state.tps.peekUndo!==null){
        this.state.tps.undoTransaction();
        console.log(this.state.currentList);
        this.loadList(this.state.currentList);
      }
      else if (e.ctrlKey&&String.fromCharCode(e.which).toLowerCase()==='y'&&this.state.tps.peekDo!==null){
        this.state.tps.doTransaction();
        console.log(this.state.currentList);
        this.loadList(this.state.currentList);
      }
    }
  }

  render() {
    document.addEventListener('keydown', this.handleUndoRedo);
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists} 
        goList = {this.goList}/>;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList} 
          setListName={this.setListName}
          setListOwner={this.setListOwner}
          deleteItem={this.deleteItem}
          deleteList={this.deleteList}
          moveItemDown={this.moveItemDown} 
          moveItemUp={this.moveItemUp}
          sortTask={this.sortTask}
          sortDueDate = {this.sortDueDate}
          sortStatus = {this.sortStatus}
          goItemList = {this.goItemList}
          editItem = {this.editItem}
          />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen 
        newItem = {this.newItem}
        cancelItem = {this.cancelItem}
        item = {this.state.item}
        changeItem = {this.changeItem}
        edit = {this.state.edit}
        />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;