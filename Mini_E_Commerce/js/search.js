const input_search = document.querySelector("#searchProd");
const all_name_produtos = document.querySelectorAll(".name-produto");

input_search.addEventListener("input", (e)=>{
    all_produtos.forEach((item, ind) => {
        item.style.display = 'none';
    });

    all_name_produtos.forEach((item)=>{
        if(item.textContent.toLowerCase().includes(e.target.value.toLowerCase())){
            item.parentNode.style.display = "block";
        }
    });
});