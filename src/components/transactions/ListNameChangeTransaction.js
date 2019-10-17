export class ListNameChangeTransaction{
   oldName;
   newName;
   list;


    constructor(initList,initOldName,initNewName){
        this.list = initList;
        this.oldName = initOldName;
        this.newName = initNewName;
    }

    doTransaction=()=>{
        this.list.name = this.newName;
    }

    undoTransaction=()=>{
        this.list.name = this.oldName;
    }
}
export default ListNameChangeTransaction;