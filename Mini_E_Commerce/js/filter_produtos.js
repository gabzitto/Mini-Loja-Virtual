let store_checked_prod_type = [];
let store_checked_filter = [];

//produtos filtro type
produto_type.forEach((item, ind) => {
    item.addEventListener("click",function(e){

        store_checked_prod_type = checked_items(item,store_checked_prod_type, false); 

        exibir_produtos_filtrados();
    });
});

price_list.forEach((item, ind) => {
    item.addEventListener("click",function(e){

        store_checked_filter = checked_items(item,store_checked_filter, true);

        exibir_produtos_filtrados();
    });
});

function checked_items(elem, arr, one){
    let arr_copy = arr;
    if(arr_copy.includes(elem)){
        elem.checked = false;
        arr_copy = arr_copy.filter(val => val != elem);
   }
   else{
       if(one) arr_copy = [];
       arr_copy.push(elem);
   } 
   console.log(arr);
   return arr_copy;
}
