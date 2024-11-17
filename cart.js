let cart = [];

// Функция для отображения уведомления с анимацией
function showToast(message) {
    const toastContainer = document.getElementById('toast-container');

    // Создаём элемент уведомления
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <span class="toast-icon">✔️</span> ${message}
    `;

    // Добавляем уведомление в контейнер
    toastContainer.appendChild(toast);

    // Показываем уведомление с анимацией
    setTimeout(() => {
        toast.classList.add('show');
    }, 100); // Небольшая задержка для срабатывания анимации

    // Убираем уведомление через 5 секунд
    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
    }, 5000);

    // Удаляем уведомление из DOM после завершения анимации ухода
    toast.addEventListener('transitionend', () => {
        if (toast.classList.contains('hide')) {
            toast.remove();
        }
    });
}

// Функция для добавления товаров в корзину
document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.parentElement.querySelector('h2').innerText;
        const priceText = button.parentElement.querySelector('p').innerText;
        const price = parseFloat(priceText.replace(/[^0-9]/g, ''));
        const image = button.parentElement.querySelector('img').src;

        cart.push({ product, price, image });
        showToast(`Добавлено в корзину: ${product}`);
    });
});

// Функция для отображения корзины с изображениями, подсчётом стоимости и удалением товаров
function showCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Корзина пуста</p>";
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.product}" class="cart-item-image">
                <p style="font-size: 1.4rem;">${item.product} - ${item.price} рублей</p>
                <button class="remove-button" onclick="removeItem(${index})">X</button>
            `;
            cartItems.appendChild(cartItem);

            totalPrice += item.price;
        });

        // Отображаем общую стоимость товаров с кнопкой "инфо"
        const totalPriceElement = document.createElement('div');
        totalPriceElement.classList.add('total-price');
        totalPriceElement.innerHTML = `
            Общая стоимость: ${totalPrice} рублей
            <button class="info-button" onclick="showToast('Сайт полностью шуточный и никакой товар вам не доставят! Потраченные деньги уйдут на улучшение комьюнити майнкрафта')">ℹ️</button>
        `;
        cartItems.appendChild(totalPriceElement);
    }

    document.getElementById('cart-modal').style.display = 'block';
}

// Функция для удаления товара из корзины
function removeItem(index) {
    cart.splice(index, 1); // Удаляем товар из корзины по индексу
    showToast('Товар удалён из корзины.'); // Уведомление о удалении
    showCart(); // Обновляем корзину после удаления
}

// Функция для закрытия корзины
function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Функция для оформления заказа
function checkout() {
    let totalPrice = 0;
    cart.forEach(item => totalPrice += item.price);

    if (totalPrice > 0) {
        const Link = `https://yoomoney.ru/quickpay/confirm.xml?receiver=410018323996437&sum=${totalPrice}&formcomment=Оплата%20заказа&label=123456&quickpay-form=shop&targets=Оплата%20заказа&sum=${totalPrice}&button-text=12`;
        window.open(Link, '_blank');
    } else {
        showToast('Корзина пуста. Добавьте товары перед оформлением заказа.');
    }
}
