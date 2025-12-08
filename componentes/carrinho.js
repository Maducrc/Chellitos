let cart = [];

const cartCountBadge = document.getElementById('cart-count-badge');
const modalProdutos = document.querySelector('.modal-adicionados');
const modalTotal = document.querySelector ('.vtt');

function loadCart() {
    const storedCart = localStorage.getItem('chellitosCart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }

    updateCartUI();
}

function saveCart() {
    localStorage.setItem('chellitosCart', JSON.stringify(cart));
}

function addToCart(product) {
    const existeItem = cart.find(item => item.name === product.name);

    if (existeItem) {
        existeItem.quantity += 1;
    }
    else {
        cart.push ({...product, quantity: 1});
    }

    saveCart();
    updateCartUI();
}

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartUI() {
    const totalItems = cart.reduce((count, item) => count + item.quantity, 0);
    cartCountBadge.textContent = totalItems;
    cartCountBadge.style.display = totalItems > 0 ? 'inline-block' : 'none';

    if (cart.length === 0) {
        modalProdutos.innerHTML = '<div class="modal-adicionados">Ainda não há nenhum produto</div>';
    }
    else {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item', 'd-flex', 'justify-content-between', 'align-items-center', 'py-2', 'border-bottom');
            itemElement.innerHTML = 
            `
            <span>${item.name} (${item.quantity}x)</span>
            <span class="fw-bold">R$${(item.price * item.quantity) .toFixed(2).replace('.', ',')}</span>
            `;

            modalProdutos.appendChild(itemElement);
        });
    }

    const total = calculateTotal();
    modalTotal.textContent = `R$${total.toFixed(2).replace('.', ',')}`;
}

  document.addEventListener('DOMContentLoaded', () => {
        loadCart(); 

       
        const noveltyButton = document.querySelector('.adicionar-novidade');
        if (noveltyButton) {
            noveltyButton.addEventListener('click', () => {
                const noveltyProduct = {
                    name: 'Chellitos by Proative',
                    price: 29.90,
                };
                addToCart(noveltyProduct);
            });
        }

        const favoriteButtons = document.querySelectorAll('.cardapio .adicionar');
        favoriteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productCard = event.target.closest('.sabores');
                
                const nameElement = productCard.querySelector('.titulo');
                const priceElement = productCard.querySelector('.vlr'); 

                if (nameElement && priceElement) {
                    const name = nameElement.textContent.trim();
             
                    const priceText = priceElement.textContent.trim().split(' ')[0].replace('R$', '').replace(',', '.');
                    const price = parseFloat(priceText);

                    if (!isNaN(price)) {
                        const product = {
                            name: name,
                            price: price,
                        };
                        addToCart(product);
                    } else {
                        console.error('Erro ao extrair o preço do produto:', priceText);
                    }
                } else {
                    console.error('Elementos de nome ou preço do produto não encontrados.');
                }
            });
        });
    });

/* Função para limpar o carrinho inteiro.*/
function clearCart() {
    cart = [];

    saveCart();
    
    updateCartUI();
    
    console.log("Carrinho limpo com sucesso.");
}