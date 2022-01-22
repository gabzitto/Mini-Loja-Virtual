updateCarrinho();

//produtos eventos
submitProduct.forEach((item, ind) => {
    item.addEventListener("click",function(e){
        
        const quantidadeItem = item.previousElementSibling;
        const price = quantidadeItem.previousElementSibling;
        const nameItem = price.previousElementSibling;
        const imgProduto = nameItem.previousElementSibling;
        const idProduto = imgProduto.previousElementSibling;
        
        if(quantidadeItem.value == 0){
            alert("adicione pelo menos um item ao carrinho");
            return;
        }
        //console.log(price.textContent,quantidadeItem.size, nameItem.textContent,imgProduto.getAttribute("src"));
    
        addLocalStorage(price.textContent, quantidadeItem.value,nameItem.textContent,imgProduto.getAttribute("src"),idProduto.textContent);

        quantidadeItem.value = 0;

        window.location.reload();
    });
});
//remover item do carrinho
const removerItemCarrinho = document.querySelectorAll(".remover-produto-carrinho");
removerItemCarrinho.forEach((item, ind) => {
    item.addEventListener("click",function(e){
        //remover primeiro do localStorage
        const idName = item.parentNode.previousElementSibling.previousElementSibling;
        //alert(idName.textContent);

        const obter_compras =  Array.from(JSON.parse(localStorage.getItem("carrinho")));

        const carrinhoValues = [];
        
        if(obter_compras!=null) {
            obter_compras.forEach(e => {
                if(e.idProd != idName.textContent)carrinhoValues.push(e);
            });
        }

        localStorage.setItem("carrinho", JSON.stringify(carrinhoValues));
     
        //remover produto
        item.parentNode.parentNode.remove();
    });
});
//carrinho de compras eventos
iconCarrinho.addEventListener("click",function(e){
    iconCarrinho.classList.toggle("active");
    carrinhoContent.classList.toggle("active");
    //carrinhoContent.style.display = 'block';

    //updateCarrinho();
    

});
carrinhoClose.addEventListener("click",function(e){
    iconCarrinho.classList.toggle("active");
    carrinhoContent.classList.toggle("active");
    //carrinhoContent.style.display = 'none';
});
//functions
function updateCarrinho(){
    carrinho_produtos.innerHTML = "";
    
    const obter_compras = JSON.parse(localStorage.getItem("carrinho"));
    
    if(obter_compras == null) return;
    
    Array.from(obter_compras).forEach(element => {
        const dados_compra = document.createElement("div");
        dados_compra.classList.add("produtos-in-carrinho");

        //const priceDouble = parseFloat(element.preco.slice(element.preco.search(" ")+1).replace(",","."));

        dados_compra.innerHTML = `
            <div class="ID-produto">${element.idProd}</div>
            <img src="${element.imgSrc}" alt="cel1" />
            <div class="info-produtos-carrinho">
                <p class="name-produto">${element.nomeProduto}</p>
                <p class="price-produto">${element.preco}</p>
                <p>Quantidade: <span>${element.itensTotal}</span></p>
                <button type="button" class="remover-produto-carrinho">Remover</button>
            </div>
        `;

        carrinho_produtos.appendChild(dados_compra);
    });
    
    return;
}


function addLocalStorage(preco,itensTotal,nomeProduto,imgSrc, identificadorProduto) {
    
    const obter_compras = JSON.parse(localStorage.getItem("carrinho"));
    
    const carrinhoValues = [];
    
    if(obter_compras!=null) {
        Array.from(obter_compras).forEach(e => {
            carrinhoValues.push(e);
        });
    }
    carrinhoValues.push({
        preco: preco,
        itensTotal: itensTotal,
        nomeProduto: nomeProduto,
        imgSrc: imgSrc,
        idProd: identificadorProduto
    });

    localStorage.setItem("carrinho", JSON.stringify(carrinhoValues));

    return;
}


function exibir_produtos_filtrados(){
    const type_prod_filtrados = prod_filter();//tv,cel,rel
    const prices_filtrados = filter_price();//div dos produtos

    all_produtos.forEach((item, ind) => {
        item.style.display = 'none';
    });

    prices_filtrados.forEach((item, ind) => {
        //item.style.display = 'block';

        if(type_prod_filtrados.length > 0){
            for(i = 0;i<type_prod_filtrados.length;i++){
                if(item.classList.contains(type_prod_filtrados[i])){
                    item.style.display = 'block';
                }
            }
        }else{
            item.style.display = 'block';
        }
    });
    
}

function prod_filter(){

    let checked_products = [];

    produto_type.forEach((item, ind) => {
        if(item.checked == true) {
            checked_products.push(item.name);
            
        }

    });

    return checked_products;

}

function filter_price(){
    let first_value=-1;
    let second_value=-1;

    let array_values_filter = [];

    let has_checked_filter = false;
    
    price_list.forEach((item, ind)=>{
        if(item.checked == true){
            const conteudo = price_list_label[ind].textContent;
            
            first_value = parseFloat(conteudo.slice(0,conteudo.search("-")));
            second_value = parseFloat(conteudo.slice(conteudo.search("-")+1,conteudo.length));

            has_checked_filter = true;
        }
    });
    if(has_checked_filter){
        price_produtos_list.forEach((item, ind)=>{
            
            const value_item = parseFloat(item.textContent.slice(item.textContent.search(" ")+1).replace(",","."));
            
            if(value_item >= first_value && value_item <= second_value){
                array_values_filter.push(item.parentNode);
            }
        });
    } else{
        array_values_filter = all_produtos;
    }

    return array_values_filter;
}
