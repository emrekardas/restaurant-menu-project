// Load the menu items from the JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const menuContainer = document.getElementById('menu-container');
    const categoryButtons = document.querySelectorAll('button');

    // Display all menu items
    function displayMenuItems(items) {
      menuContainer.innerHTML = '';
      
      items.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');

        const name = document.createElement('h2');
        name.classList.add('item-name');
        name.innerText = item.name;
        menuItem.appendChild(name);

        const description = document.createElement('p');
        description.classList.add('item-description');
        description.innerText = item.description;
        menuItem.appendChild(description);

        const price = document.createElement('span');
        price.classList.add('item-price');
        price.innerText = `${item.price} TL`;
        menuItem.appendChild(price);

        const image = document.createElement('img');
        image.classList.add('item-image');
        image.src = `${item.image}`;
        menuItem.appendChild(image);

        // Add click event listener to display modal with image
        menuItem.addEventListener('click', () => {
          const modal = document.getElementById('modal');
          const modalImage = document.getElementById('modal-image');
          modalImage.src = image.src;
          modal.style.display = 'block';
        });

        // Close modal when "X" is clicked
        const close = document.getElementsByClassName('close')[0];
        close.addEventListener('click', () => {
          const modal = document.getElementById('modal');
          modal.style.display = 'none';
        });

        menuContainer.appendChild(menuItem);
      });
    }

    // Display all menu items initially
    displayMenuItems(data);

    // Filter menu items based on category
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');

        if (category === 'Tümü') {
          displayMenuItems(data);
        } else {
          const filteredItems = data.filter(item => item.category === category);
          displayMenuItems(filteredItems);
        }
      });
    });
  })
  .catch(error => console.error(error));
