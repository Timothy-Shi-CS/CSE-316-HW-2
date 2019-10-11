import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'
import { throwStatement } from '@babel/types';

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
    edit: false
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
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
    let newItemKey = this.state.currentList.items.length;
    let newItem = {
      key: newItemKey,
      description: a,
      due_date: c,
      assigned_to: b,
      completed: d
    }
    this.state.currentList.items.push(newItem);
    this.loadList(this.state.currentList);
    this.setState({item: null});
    this.setState({edit: false});
  }

  changeItem = (a, b, c, d ,k) =>{
    this.state.currentList.items[k.key].description = a;
    this.state.currentList.items[k.key].due_date = c;
    this.state.currentList.items[k.key].assigned_to = b;
    this.state.currentList.items[k.key].completed = d;
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

  deleteItem = (key) => {
    //this.setState({ currentList: [...this.state.currentList.items.filter(i => i.key !== key)]});
    this.state.currentList.items = this.state.currentList.items.filter(i => i.key !== key);
    this.loadList(this.state.currentList);
  }

  deleteList = (key) => {
    //this.state.todoLists = this.state.todoLists.filter(i => i.key !== key);
    this.setState({ todoLists: [...this.state.todoLists.filter(i => i.key !== key)]});
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
  }

  setListName = (e) =>{
    this.state.currentList.name = e.target.value;
  }

  setListOwner = (e) =>{
    this.state.currentList.owner = e.target.value;
  }
  moveItemDown = (i, e) =>{
    e.stopPropagation();
    for (var j = 0; j<this.state.currentList.items.length - 1; j++){
      if (this.state.currentList.items[j].key == i){
        let x = this.state.currentList.items[j];
        let y = this.state.currentList.items[Number(j)+1];
        this.state.currentList.items[j] = y;
        this.state.currentList.items[Number(j)+1] = x;
        this.state.currentList.items[j].key = j;
        this.state.currentList.items[Number(j)+1].key = j+1;
        this.loadList(this.state.currentList);
        break;
      }
    }
  }
  moveItemUp = (i, e) =>{
    e.stopPropagation();
    for (var j = 1; j<this.state.currentList.items.length; j++){
      if (this.state.currentList.items[j].key == i){
        let x = this.state.currentList.items[j];
        let y = this.state.currentList.items[Number(j)-1];
        this.state.currentList.items[j] = y;
        this.state.currentList.items[Number(j)-1] = x;
        this.state.currentList.items[j].key = j;
        this.state.currentList.items[Number(j)-1].key = j-1;
        this.loadList(this.state.currentList);
        break;
      }
    }
  }
  sortTasks = () =>{
    for (var i = 0; i<this.state.currentList.items.length; i++){}
  }
  cancelItem = () =>{
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
  }

  render() {
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
          sortTasks={this.sortTasks}
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