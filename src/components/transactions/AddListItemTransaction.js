export class AddListItemTransaction{
    description;
    assignedTo;
    dueDate;
    completed;
    list;

    constructor(initDescription, initAssignedTo, initDueDate, initCompleted, initList){
        this.description = initDescription;
        this.assignedTo = initAssignedTo;
        this.dueDate = initDueDate;
        this.completed = initCompleted;
        this.list = initList; 
    }

    doTransaction=()=>{
        let newItemKey = this.list.items.length;
        let newItem = {
          key: newItemKey,
          description: this.description,
          due_date: this.dueDate,
          assigned_to: this.assignedTo,
          completed: this.completed
        }
        this.list.items.push(newItem);
    }
    
    undoTransaction=()=>{
        this.list.items.pop();
    }

}
export default AddListItemTransaction;