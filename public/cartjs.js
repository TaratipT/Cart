// Function to load the cart and display items
async function loadCart() {
  const response = await fetch('/menu');
  const data = await response.json();
  const cartItems = data.data;

  let total = 0;
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = ''; // Clear previous content

  cartItems.forEach(item => {
    total += item.menuPrice;

    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');

    cartItemDiv.innerHTML = `
      <div class="item-details">
        <img src="${item.menuPicture || 'images/item_image.png'}" alt="Item image" class="item-image">
        <span>${item.menuName}</span>
      </div>
      <div class="item-controls">
        <span>1</span>
      </div>
      <span>${item.menuPrice} ฿</span>
      <button class="delete-btn" onclick="deleteItem(${item.menuID})">✖</button>
    `;

    cartItemsContainer.appendChild(cartItemDiv);
  });

  document.getElementById('total-price').textContent = total;
}

// Function to open popup
function openPopup(menuID) {
  const popup = document.getElementById('confirm-popup');
  popup.style.display = 'flex'; // Show the popup

  const yesButton = document.getElementById('popup-yes');
  const noButton = document.getElementById('popup-no');

  // Handle "Yes" click
  yesButton.onclick = async function() {
    const response = await fetch(`/menu/${menuID}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      loadCart(); // Reload the cart after deletion
    } else {
      alert('ลบรายการไม่สำเร็จ');
    }
    popup.style.display = 'none'; // Hide the popup
  };

  // Handle "No" click
  noButton.onclick = function() {
    popup.style.display = 'none'; // Hide the popup
  };
}

// Update delete button to open popup
function deleteItem(menuID) {
  openPopup(menuID);
}

loadCart();
