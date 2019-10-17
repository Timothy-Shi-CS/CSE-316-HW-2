export class ListItemRemovalTransaction{
    item;
    list;
    key;
 
 
     constructor(initList,initItem){
         this.list = initList;
         this.item = initItem;
         this.key = this.list.items.indexOf(this.item);
     }
 
     doTransaction=()=>{
         this.list.items = this.list.items.filter(i => i !== this.item);
         var i = 0;
         this.list.items.map(item=>{
           item.key = i;
           i++;
         });
     }
 
     undoTransaction=()=>{
         this.list.items.splice(this.key, 0, this.item);
         var i = 0;
         this.list.items.map(item=>{
           item.key = i;
           i++;
         });
     }
 }
 export default ListItemRemovalTransaction;