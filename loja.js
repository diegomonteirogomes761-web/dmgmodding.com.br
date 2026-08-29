let carrinho = [];


// ========================================
// CARREGAR CARRINHO SALVO
// ========================================

function carregarCarrinho() {

    const carrinhoSalvo =
        localStorage.getItem("carrinhoDMG");


    if (carrinhoSalvo) {

        try {

            carrinho = JSON.parse(carrinhoSalvo);

        } catch (erro) {

            carrinho = [];

        }

    }

}



// ========================================
// SALVAR CARRINHO
// ========================================

function salvarCarrinho() {

    localStorage.setItem(
        "carrinhoDMG",
        JSON.stringify(carrinho)
    );

}



// ========================================
// ADICIONAR PRODUTO
// ========================================

function adicionarCarrinho(nome, preco) {

    const produtoExistente =
        carrinho.find(
            produto => produto.nome === nome
        );


    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({

            nome: nome,

            preco: preco,

            quantidade: 1

        });

    }


    salvarCarrinho();

    atualizarCarrinho();

    abrirCarrinho();

}



// ========================================
// AUMENTAR QUANTIDADE
// ========================================

function aumentarQuantidade(indice) {

    if (!carrinho[indice]) {

        return;

    }


    carrinho[indice].quantidade++;


    salvarCarrinho();

    atualizarCarrinho();

}



// ========================================
// DIMINUIR QUANTIDADE
// ========================================

function diminuirQuantidade(indice) {

    if (!carrinho[indice]) {

        return;

    }


    // Mínimo de 1
    if (carrinho[indice].quantidade > 1) {

        carrinho[indice].quantidade--;

    }


    salvarCarrinho();

    atualizarCarrinho();

}



// ========================================
// REMOVER PRODUTO
// ========================================

function removerProduto(indice) {

    if (!carrinho[indice]) {

        return;

    }


    carrinho.splice(indice, 1);


    salvarCarrinho();

    atualizarCarrinho();

}



// ========================================
// CALCULAR TOTAL
// ========================================

function calcularTotal() {

    let total = 0;


    carrinho.forEach(function(produto) {

        total +=
            produto.preco *
            produto.quantidade;

    });


    return total;

}



// ========================================
// ATUALIZAR CARRINHO
// ========================================

function atualizarCarrinho() {

    const lista =
        document.getElementById(
            "listaCarrinho"
        );


    const totalElemento =
        document.getElementById(
            "total"
        );


    if (!lista || !totalElemento) {

        return;

    }


    lista.innerHTML = "";


    if (carrinho.length === 0) {

        lista.innerHTML = `

            <div class="carrinho-vazio">

                🛒

                <p>
                    Seu carrinho está vazio.
                </p>

            </div>

        `;


        totalElemento.textContent =
            "0,00";


        return;

    }


    carrinho.forEach(function(produto, indice) {


        const subtotal =
            produto.preco *
            produto.quantidade;


        const item =
            document.createElement("div");


        item.className =
            "item-carrinho";


        item.innerHTML = `

            <div class="produto-carrinho">

                <strong class="nome-produto">

                    ${produto.nome}

                </strong>


                <span class="preco-produto">

                    R$
                    ${produto.preco
                        .toFixed(2)
                        .replace(".", ",")}

                </span>


                <div class="controle-quantidade">


                    <button
                        class="quantidade-btn"
                        onclick="diminuirQuantidade(${indice})">

                        −

                    </button>


                    <span class="quantidade">

                        ${produto.quantidade}

                    </span>


                    <button
                        class="quantidade-btn"
                        onclick="aumentarQuantidade(${indice})">

                        +

                    </button>


                </div>


                <span class="subtotal">

                    Subtotal:

                    R$
                    ${subtotal
                        .toFixed(2)
                        .replace(".", ",")}

                </span>

            </div>


            <button
                class="remover"
                onclick="removerProduto(${indice})">

                REMOVER

            </button>

        `;


        lista.appendChild(item);

    });


    const total =
        calcularTotal();


    totalElemento.textContent =
        total
            .toFixed(2)
            .replace(".", ",");

}



// ========================================
// ABRIR CARRINHO
// ========================================

function abrirCarrinho() {

    const carrinhoElemento =
        document.getElementById(
            "carrinho"
        );


    if (!carrinhoElemento) {

        return;

    }


    atualizarCarrinho();


    carrinhoElemento.style.display =
        "flex";

}



// ========================================
// FECHAR CARRINHO
// ========================================

function fecharCarrinho() {

    const carrinhoElemento =
        document.getElementById(
            "carrinho"
        );


    if (!carrinhoElemento) {

        return;

    }


    carrinhoElemento.style.display =
        "none";

}



// ========================================
// FINALIZAR COMPRA
// ========================================

function finalizarCompra() {

    // Atualiza o carrinho antes de continuar
    salvarCarrinho();


    // Verifica se existem produtos
    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio!"
        );

        return;

    }


    // Calcula o total
    const total =
        calcularTotal();


    // Confirma que o total é válido
    if (total <= 0) {

        alert(
            "Não foi possível calcular o valor da compra."
        );

        return;

    }


    // Abre o checkout
    window.location.href =
        "checkout.html";

}



// ========================================
// INICIAR
// ========================================

carregarCarrinho();

atualizarCarrinho();