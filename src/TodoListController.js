'use strict'
/**
 * TodoListController.js
 * 
 * This file provides responses for all user interface interactions.
 * 
 * @author McKilla Gorilla
 * @author Timothy Shi
 */
class TodoListController {
    /**
     * The constructor sets up all event handlers for all user interface
     * controls known at load time, meaning the controls that are declared 
     * inside index.html.
     */
    constructor() {
        // SETUP ALL THE EVENT HANDLERS FOR EXISTING CONTROLS,
        // MEANING THE ONES THAT ARE DECLARED IN index.html

        // FIRST THE NEW LIST BUTTON ON THE HOME SCREEN
        this.registerEventHandler(TodoGUIId.HOME_NEW_LIST_BUTTON, TodoHTML.CLICK, this[TodoCallback.PROCESS_CREATE_NEW_LIST]);

        // THEN THE CONTROLS ON THE LIST SCREEN
        this.registerEventHandler(TodoGUIId.LIST_HEADING, TodoHTML.CLICK, this[TodoCallback.PROCESS_GO_HOME]);
        this.registerEventHandler(TodoGUIId.LIST_NAME_TEXTFIELD, TodoHTML.KEYUP, this[TodoCallback.PROCESS_CHANGE_NAME]);
        this.registerEventHandler(TodoGUIId.LIST_OWNER_TEXTFIELD, TodoHTML.KEYUP, this[TodoCallback.PROCESS_CHANGE_OWNER]);
        this.registerEventHandler(TodoGUIId.LIST_TRASH, TodoHTML.CLICK, this[TodoCallback.PROCESS_DELETE_LIST]);
        this.registerEventHandler(TodoGUIId.YES_DELETE, TodoHTML.CLICK, this[TodoCallback.PROCESS_CONFIRM_DELETE_LIST]);
        this.registerEventHandler(TodoGUIId.NO_DELETE, TodoHTML.CLICK, this[TodoCallback.PROCESS_CANCEL_DELETE_LIST]);
        this.registerEventHandler(TodoGUIId.LIST_ADD_ITEM, TodoHTML.CLICK, this[TodoCallback.PROCESS_SUBMIT_ADD_ITEM]);
        this.registerEventHandler(TodoGUIId.CANCEL_NEW_ITEM, TodoHTML.CLICK, this[TodoCallback.PROCESS_CANCEL_ITEM_CHANGES]);
    }

    /**
     * This function helps the constructor setup the event handlers for all controls.
     * 
     * @param {TodoGUIId} id Unique identifier for the HTML control on which to
     * listen for events.
     * @param {TodoHTML} eventName The type of control for which to respond.
     * @param {TodoCallback} callback The callback function to be executed when
     * the event occurs.
     */
    registerEventHandler(id, eventName, callback) {
        // GET THE CONTROL IN THE GUI WITH THE CORRESPONDING id
        let control = document.getElementById(id);

        // AND SETUP THE CALLBACK FOR THE SPECIFIED EVENT TYPE
        control.addEventListener(eventName, callback);
    }

    /**
     * This function responds to when the user changes the
     * name of the list via the textfield.
     */
    processChangeName() {
        let nameTextField = document.getElementById(TodoGUIId.LIST_NAME_TEXTFIELD);
        let newName = nameTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListName(listBeingEdited, newName);
    }

    /**
     * This function is called when the user requests to create
     * a new list.
     */
    processCreateNewList() {
        // MAKE A BRAND NEW LIST
        window.todo.model.loadNewList();

        // CHANGE THE SCREEN
        window.todo.model.goList();
    }

    /**
     * This function responds to when the user clicks on a link
     * for a list on the home screen.
     * 
     * @param {String} listName The name of the list to load into
     * the controls on the list screen.
     */
    processEditList(listName) {
        // LOAD THE SELECTED LIST
        window.todo.model.loadList(listName);

        // CHANGE THE SCREEN
        window.todo.model.goList();
    }

    /**
     * This function responds to when the user clicks on the
     * todo logo to go back to the home screen.
     */
    processGoHome() {
        window.todo.model.goHome();
    }

    /**
     * This function is called in response to when the user clicks
     * on the Task header in the items table.
     */
    processSortItemsByTask() {
        // IF WE ARE CURRENTLY INCREASING BY TASK SWITCH TO DECREASING
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_TASK_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_TASK_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCREASING
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_TASK_INCREASING);
        }
    }

    /**
     * This function is called in response to when the user clicks
     * on the Status header in the items table.
     */
    processSortItemsByStatus() {
        // IF WE ARE CURRENTLY INCREASING BY STATUS SWITCH TO DECREASING
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_STATUS_INCREASING)) {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_STATUS_DECREASING);
        }
        // ALL OTHER CASES SORT BY INCRASING
        else {
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_STATUS_INCREASING);
        }
    }

    processChangeOwner(){
        let ownerTextField = document.getElementById(TodoGUIId.LIST_OWNER_TEXTFIELD);
        let newOwner = ownerTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListOwner(listBeingEdited, newOwner);
    }

    /**
     * This function sorts items by due date.
     */
    processSortItemsByDueDate() {
        if (window.todo.model.isCurrentItemSortCriteria(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING)){
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_DECREASING);
        }
        else{
            window.todo.model.sortTasks(ItemSortCriteria.SORT_BY_DUE_DATE_INCREASING);
        }
    }

    processDeleteList(){
        window.todo.view.showDialog();
    }

    processConfirmDeleteList(){
        window.todo.model.removeList(window.todo.model.listToEdit);
        window.todo.view.hideDialog();
        window.todo.model.goHome();
    }

    processCancelDeleteList(){
        window.todo.view.hideDialog();
    }

    processMoveItemUp(listItemIndex){
        event.stopPropagation();
        let x = window.todo.model.listToEdit.getItemAtIndex(listItemIndex);
        let y = window.todo.model.listToEdit.getItemAtIndex(listItemIndex-1);
        window.todo.model.listToEdit.items[listItemIndex] = y;
        window.todo.model.listToEdit.items[listItemIndex-1] = x;
        window.todo.model.loadList(window.todo.model.listToEdit.getName());
        window.todo.model.goList();
        
    }

    processMoveItemDown(listItemIndex){
        event.stopPropagation();
        let x = window.todo.model.listToEdit.getItemAtIndex(listItemIndex);
        let y = window.todo.model.listToEdit.getItemAtIndex(Number(listItemIndex)+ 1);
        window.todo.model.listToEdit.items[listItemIndex] = y;
        window.todo.model.listToEdit.items[Number(listItemIndex)+1] = x;
        window.todo.model.loadList(window.todo.model.listToEdit.getName());
        window.todo.model.goList();
    }

    processDeleteItem(listItemIndex){
        event.stopPropagation();
        window.todo.model.listToEdit.removeItem(window.todo.model.listToEdit.getItemAtIndex(listItemIndex));
        window.todo.model.loadList(window.todo.model.listToEdit.getName());
        window.todo.model.goList();
    }

    processItemScreen(){
        window.todo.view.showElementWithId(TodoGUIId.TODO_NEW_ITEM, true);   
        window.todo.view.showElementWithId(TodoGUIId.TODO_LIST, false);
    }

    processCancelItemChanges(){
        window.todo.view.showElementWithId(TodoGUIId.TODO_NEW_ITEM, false);   
        window.todo.view.showElementWithId(TodoGUIId.TODO_LIST, true);
    }

    processSubmitAddItem(){
        window.todo.view.showElementWithId(TodoGUIId.TODO_NEW_ITEM, true);   
        window.todo.view.showElementWithId(TodoGUIId.TODO_LIST, false);
        document.getElementById(TodoGUIId.SUBMIT_ITEM).onclick = function(){
            var description = document.getElementById(TodoGUIId.ITEM_DESCRIPTION).value;
            var assignment = document.getElementById(TodoGUIId.ITEM_ASSIGNMENT).value;
            var dueDate = document.getElementById(TodoGUIId.ITEM_DUE_DATE).value;
            var completed = document.getElementById(TodoGUIId.ITEM_COMPLETION).checked;
            var item = new TodoListItem();
            item.setDescription(description);
            item.setAssignedTo(assignment);
            item.setDueDate(dueDate);
            item.setCompleted(completed);
            window.todo.model.listToEdit.addItem(item);
            window.todo.model.loadList(window.todo.model.listToEdit.getName());
            window.todo.view.showElementWithId(TodoGUIId.TODO_NEW_ITEM, false);   
            window.todo.view.showElementWithId(TodoGUIId.TODO_LIST, true);
            document.getElementById(TodoGUIId.ITEM_DESCRIPTION).value = "Unknown";
            document.getElementById(TodoGUIId.ITEM_ASSIGNMENT).value = "Unknown";
            document.getElementById(TodoGUIId.ITEM_DUE_DATE).value = "YYYY-MM-DD";
            document.getElementById(TodoGUIId.ITEM_COMPLETION).value = false;
        };
    }
    
    processEditItem(listItemIndex){
        window.todo.view.showElementWithId(TodoGUIId.TODO_NEW_ITEM, true);   
        window.todo.view.showElementWithId(TodoGUIId.TODO_LIST, false);
        var edit_item = window.todo.model.listToEdit.getItemAtIndex(listItemIndex);
        var description = edit_item.getDescription();
        var assignment = edit_item.getAssignedTo();
        var dueDate = edit_item.getDueDate();
        var completed = edit_item.isCompleted();
        document.getElementById(TodoGUIId.ITEM_DESCRIPTION).value = description;
        document.getElementById(TodoGUIId.ITEM_ASSIGNMENT).value = assignment;
        document.getElementById(TodoGUIId.ITEM_DUE_DATE).value = dueDate;
        document.getElementById(TodoGUIId.ITEM_COMPLETION).checked = completed;
        document.getElementById(TodoGUIId.SUBMIT_ITEM).onclick = function(){
            var newDescription = document.getElementById(TodoGUIId.ITEM_DESCRIPTION).value;
            var newAssignment = document.getElementById(TodoGUIId.ITEM_ASSIGNMENT).value;
            var newDueDate = document.getElementById(TodoGUIId.ITEM_DUE_DATE).value;
            var newCompleted = document.getElementById(TodoGUIId.ITEM_COMPLETION).checked;
            edit_item.setDescription(newDescription);
            edit_item.setAssignedTo(newAssignment);
            edit_item.setDueDate(newDueDate);
            edit_item.setCompleted(newCompleted);
            window.todo.model.loadList(window.todo.model.listToEdit.getName());
            window.todo.view.showElementWithId(TodoGUIId.TODO_NEW_ITEM, false);   
            window.todo.view.showElementWithId(TodoGUIId.TODO_LIST, true);
            document.getElementById(TodoGUIId.ITEM_DESCRIPTION).value = "Unknown";
            document.getElementById(TodoGUIId.ITEM_ASSIGNMENT).value = "Unknown";
            document.getElementById(TodoGUIId.ITEM_DUE_DATE).value = "YYYY-MM-DD";
            document.getElementById(TodoGUIId.ITEM_COMPLETION).value = false;
        }; 
    }

    processDoNothing(){
        event.stopPropagation();
    }
}