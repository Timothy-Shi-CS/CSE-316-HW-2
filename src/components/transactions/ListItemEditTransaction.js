export class ListItemEditTransaction{
    description;
    oldDescription;
    assignedTo;
    oldAssignedTo;
    dueDate;
    oldDueDate;
    completed;
    oldCompleted;
    item;

    constructor(initDescription, initAssignedTo, initDueDate, initCompleted, initItem, oldDescription, oldAssignedTo, oldDueDate, oldCompleted){
        this.description = initDescription;
        this.assignedTo = initAssignedTo;
        this.dueDate = initDueDate;
        this.completed = initCompleted;
        this.item = initItem; 
        this.oldDescription = oldDescription;
        this.oldAssignedTo = oldAssignedTo;
        this.oldDueDate = oldDueDate;
        this.oldCompleted = oldCompleted;
    }

    doTransaction=()=>{
        this.item.description = this.description;
        this.item.assigned_to = this.assignedTo;
        this.item.due_date = this.dueDate;
        this.item.completed = this.completed;
    }
    
    undoTransaction=()=>{
        this.item.description = this.oldDescription;
        this.item.assigned_to = this.oldAssignedTo;
        this.item.due_date = this.oldDueDate;
        this.item.completed = this.oldCompleted;
    }

}
export default ListItemEditTransaction;