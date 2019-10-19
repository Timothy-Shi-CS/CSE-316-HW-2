export class SortTaskTransaction{
    newList;
    reverse;
    oldList;

    constructor(reverse, list){
        this.newList = list;
        this.oldList = JSON.parse(JSON.stringify(this.newList.items));
        this.reverse = reverse;
    }

    doTransaction = () =>{
        var ls = JSON.parse(JSON.stringify(this.newList.items));
        if (this.reverse == false){
            ls.sort(function(a, b){
              if (a.description < b.description) {return -1;}
              if (a.description > b.description) {return 1;}
              return 0;
            })
            this.reverse = true;
          }
        else{
            ls.sort(function(a, b){
              if (a.description < b.description) {return 1;}
              if (a.description > b.description) {return -1;}
              return 0;
            })
            this.reverse = false;
        }
          var i = 0;
          ls.map(item=>{
            item.key = i;
            i++;
          })
          this.newList.items = ls;
    }

    undoTransaction = () =>{
        this.newList.items = this.oldList;
        if (this.reverse == true){
            this.reverse = false;
        }
        else{
            this.reverse = true;
        }
    }
}
export default SortTaskTransaction