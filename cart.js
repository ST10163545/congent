window.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
});

// Function to display cart items
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || { borrow: [], buy: [] };
    const borrowList = document.getElementById('borrow-list');
    const buyList = document.getElementById('buy-list');

    borrowList.innerHTML = '';
    buyList.innerHTML = '';

    // Display Borrowed Books with Remove Button
    cart.borrow.forEach((book, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${book.title}</strong> by ${book.author} <br>
            Reserve Date: ${book.reserveDate} <br>
            <input type="date" value="${book.reserveDate}" id="reserve-date-${index}" required>
            <button onclick="reserveBook('${book.id}', ${index})">Reserve</button>
            <button onclick="removeBook('borrow', ${index})">Remove</button>
        `;
        borrowList.appendChild(li);
    });

    // Display Buy Books with Price and Remove Button
    cart.buy.forEach((book, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${book.title}</strong> by ${book.author} <br>
            Price: R${book.price} <br>
            <button onclick="removeBook('buy', ${index})">Remove</button>
        `;
        buyList.appendChild(li);
    });
}

// Function to remove a book from cart (borrow or buy section)
function removeBook(section, index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || { borrow: [], buy: [] };

    if (section === 'borrow') {
        cart.borrow.splice(index, 1);  // Remove the selected book from the borrow array
    } else if (section === 'buy') {
        cart.buy.splice(index, 1);  // Remove the selected book from the buy array
    }

    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Refresh the cart items in the UI
    displayCartItems();

    // Alert the user that the book was removed
    alert('Book removed from cart.');
}

// Function to reserve a book (borrow section)
function reserveBook(bookId, index) {
    const reserveDate = document.getElementById(`reserve-date-${index}`).value;
    const cart = JSON.parse(localStorage.getItem('cart')) || { borrow: [] };

    // Update the reserve date in the cart
    cart.borrow[index].reserveDate = reserveDate;

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Book reserved for ' + reserveDate);
}
