// Load the menu items from the JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const menuContainer = document.getElementById('menu-container');
    const categoryButtons = document.querySelectorAll('button');
    const modal = document.querySelector('.modal-content')

    // function displayMenuItems(items){

    //   menuContainer.innerHTML = ``

    //   items.forEach(item => {

    //     const emre = `
    //     <div class="menu-item" category="${item.category}">
    //       <div class="menu-info">
    //         <h2 class="item-name">
    //           ${item.name}
    //         </h2>
    //         <p class="item-description">
    //           ${item.description}
    //         </p>
    //         <span class="item-price">
    //           ${item.price} TL
    //         </span>
    //       </div>
    //       <img class="item-image" src="${item.image}"></img>
    //     </div>
        
    //     `
    //     menuContainer.insertAdjacentHTML("afterbegin",emre)
    //   })
    // };

    // Display all menu items
    function displayMenuItems(items) {
      menuContainer.innerHTML = '';

      items.forEach(item => {

        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');

        const menuInfo = document.createElement('div');
        menuInfo.classList.add('menu-info');

        const name = document.createElement('h2');
        name.classList.add('item-name');
        name.innerText = item.name;
        menuInfo.appendChild(name);

        const description = document.createElement('p');
        description.classList.add('item-description');
        description.innerText = item.description;
        menuInfo.appendChild(description);

        const price = document.createElement('span');
        price.classList.add('item-price');
        price.innerText = `${item.price} TL`;
        menuInfo.appendChild(price);

        menuItem.appendChild(menuInfo);

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

    const filterBtns = document.querySelectorAll('.filter-btn');
    const logo = document.querySelector('.logo');

    function setLogoBackground(category) {
      switch (category) {
        case 'Tümü':
          logo.style.backgroundImage = 'url(https://s3.eu-central-1.amazonaws.com/dijital.menu.assets/photos/5O8l3MmkR9Jsjcxb/hero/menu/c7ccd5d8d24e4a3224b2fe37add69e9d.jpg)';
          break;
        case 'Aperatifler':
          logo.style.backgroundImage = 'url(https://s3.eu-central-1.amazonaws.com/dijital.menu.assets/photos/5O8l3MmkR9Jsjcxb/covers/8919412078a10a84fdcdd716fd1f0f78.jpg';
          break;
        case 'Ana Yemekler':
          logo.style.backgroundImage = 'url(https://example.com/anayemekler.jpg)';
          break;
        case 'Sokak Lezzetleri':
          logo.style.backgroundImage = 'url(https://example.com/sokaklezzetleri.jpg)';
          break;
        case 'Tatlılar':
          logo.style.backgroundImage = 'url(https://example.com/tatlilar.jpg)';
          break;
        case 'İçecekler':
          logo.style.backgroundImage = 'url(https://example.com/icecekler.jpg)';
          break;
        case 'Çaylar':
          logo.style.backgroundImage = 'url(https://example.com/caylar.jpg)';
          break;
        case 'Kahveler':
          logo.style.backgroundImage = 'url(https://example.com/kahveler.jpg)';
          break;
      }
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const category = this.dataset.category;
        setLogoBackground(category);
      });
    });


  })
  .catch(error => console.error(error));
