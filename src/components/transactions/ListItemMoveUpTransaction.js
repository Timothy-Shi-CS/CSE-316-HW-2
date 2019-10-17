export class ListItemMoveUpTransaction{
    item;
    list;
    key;
 
 
     constructor(initList, initItem){
         this.list = initList;
         this.item = initItem;
         this.key = this.list.items.indexOf(this.item);
     }
 
     doTransaction=()=>{
         var copy = this.list.items[this.key];
         this.list.items[this.key] = this.list.items[this.key-1];
         this.list.items[this.key-1] = copy;
         var i = 0;
         this.list.items.map(item=>{
           item.key = i;
           i++;
         });
     }
 
     undoTransaction=()=>{
         var copy = this.list.items[this.key];
         this.list.items[this.key] = this.list.items[this.key-1];
         this.list.items[this.key-1] = copy;
         var i = 0;
         this.list.items.map(item=>{
           item.key = i;
           i++;
         });
     }
 }
 export default ListItemMoveUpTransaction;