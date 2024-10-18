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
  
  // Function to delete a menu item from the cart and database
  async function deleteItem(menuID) {
    const confirmDelete = confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?');
    
    if (confirmDelete) {
      console.log('Deleting item with ID:', menuID); // Log the ID being deleted
      const response = await fetch(`/menu/${menuID}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        loadCart(); // Reload the cart after deletion
      } else {
        alert('ลบรายการไม่สำเร็จ');
        console.error('Error deleting item:', response.statusText);
      }
    }
  }
  
  loadCart();
  