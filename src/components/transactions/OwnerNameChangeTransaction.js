export class OwnerNameChangeTransaction{
    oldOwner;
    newOwner;
    list;
 
 
     constructor(initList,initOldOwner,initNewOwner){
         this.list = initList;
         this.oldOwner = initOldOwner;
         this.newOwner = initNewOwner;
     }
 
     doTransaction=()=>{
         this.list.owner = this.newOwner;
     }
 
     undoTransaction=()=>{
         this.list.owner = this.oldOwner;
     }
 }
 export default OwnerNameChangeTransaction;