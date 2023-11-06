"use strict";

const initializePage = () => {
  showAllProductsAndCategories();
  loadCart();
};
let Cart = {
  // product_id: Number => {
  //     quantity: Number,
  //     product: Product,
  // }
};

window.onload = initializePage;

let productos = [
  {
    id: 1,
    nombre: "Iron Man",
    descripcion: "Figura coleccionable de Iron Man en pose heroica, capturando la esencia del icónico traje de Tony Stark con acabados metálicos detallados y base de exhibición.",
    precio: 10,
    imagen: "./img/ironMan1.jpg",
    categoria: "ironMan",
  },
  {
    id: 2,
    nombre: "Vision & Scarlet Witch",
    descripcion: "Set de figuras de Vision & Scarlet Witch que celebra su legado en el MCU, con trajes auténticos de la serie WandaVision y accesorios intercambiables.",
    precio: 5,
    imagen: "./img/visionWanda11.jpg",
    categoria: "wandaVision",
  },
  {
    id: 3,
    nombre: "Guardians of the Galaxy",
    descripcion: "Poster de alta calidad de 'Guardians of the Galaxy', presentando al equipo completo en acción con colores vibrantes, ideal para decorar y mostrar tu amor por la franquicia.",
    precio: 20,
    imagen: "./img/gotg.jpg",
    categoria: "guardianesDeLaGalaxia",
  },
  {
    id: 4,
    nombre: "Marvel Super Heroes",
    descripcion: "Compilado exclusivo de cómics 'Marvel Super Heroes', que incluye historias épicas de tus héroes favoritos, con ilustraciones impresionantes y narrativas emocionantes.",
    precio: 30,
    imagen: "./img/secretWars.jpg",
    categoria: "secretWars",
  },
  {
    id: 5,
    nombre: "The invincible Iron Man",
    descripcion: "Edición de coleccionista del cómic 'The invincible Iron Man #126', una pieza icónica de la historia de Marvel con la portada clásica que todo fan desearía tener.",
    precio: 40,
    imagen: "./img/ironMan126.jpg",
    categoria: "ironMan",
  },
  {
    id: 6,
    nombre: "Vision & Scarlet Witch",
    descripcion: "Réplica en calidad premium del póster de Vision & Scarlet Witch, ideal para seguidores y coleccionistas, destacando el amor y la complejidad de sus personajes.",
    precio: 50,
    imagen: "./img/visionWanda1.jpg",
    categoria: "wandaVision",
  },
];

// Inicializacion

const showAllProductsAndCategories = () => {
  let productsHTML = [];
  let categories = new Set();
  productos.forEach(function (producto) {
    productsHTML.push(presentProduct(producto));
    categories.add(producto.categoria);
  });
  presentProducts(productsHTML);
  presentCategories(categories);
};

// Productos

const presentProducts = (productsHTML) => {
  let products = document.getElementById("productos");
  while (products.firstChild) {
    products.removeChild(products.firstChild);
  }
  for (let i = 0; i < productsHTML.length; i++) {
    products.appendChild(productsHTML[i]);
  }
};

const translateCategory = (category) => {
  let categoryDictionary = {
    "ironMan": "Iron Man",
    "wandaVision": "Vision & Scarlet Witch",
    "guardianesDeLaGalaxia": "Guardians of the Galaxy",
    "secretWars": "Secret Wars"
  }

    return categoryDictionary[category];
}

const presentProduct = (product) => {
  let div = document.createElement("div");
  let image = document.createElement("img");
  image.setAttribute("src", product.imagen);
  image.setAttribute("alt", product.nombre);
  let subDiv = document.createElement("div");
  let h3 = document.createElement("h3");
  h3.innerHTML = product.nombre;
  // let p1 = document.createElement("p");
  // p1.innerHTML = product.descripcion;
  let p2 = document.createElement("p");
  p2.innerHTML = "Precio: $" + product.precio;
  let p3 = document.createElement("p");
  p3.innerHTML = translateCategory(product.categoria);
  let button1 = document.createElement("button");
  button1.setAttribute("onClick", `addToCart(${product.id})`);
  button1.innerHTML = "Agregar al carrito";
  let button2 = document.createElement("button");
  button2.setAttribute("onClick", `showProductModal(${product.id})`);
  button2.innerHTML = "Mas info";

  subDiv.appendChild(h3);
  // subDiv.appendChild(p1);
  subDiv.appendChild(p2);
  subDiv.appendChild(p3);
  subDiv.appendChild(button1);
  subDiv.appendChild(button2);

  div.appendChild(image);
  div.appendChild(subDiv);

  return div;

  // Se utilizan funciones de manipulacion de dom, porque son pedidas por el enunciado
  // pero creo que concatenando etiquetas html queda mas claro

  // return `<div>
  //   <img src="${product.imagen}" alt="${product.nombre}" />
  //   <div>
  //       <h3>${product.nombre}</h3>
  //       <p>${product.descripcion}</h3>
  //       <p>Precio: $<span>${product.precio}</span></p>
  //       <p>${product.categoria}</p>
  //       <button onClick="addToCart(${product.id})">Agregar</button>
  //   </div>
  // </div>`;
};

// Categories

const presentCategories = (categories) => {
  let categoriesHTML = document.getElementById("categories");
  while (categoriesHTML.firstChild) {
    categoriesHTML.removeChild(categoriesHTML.firstChild);
  }
  categories.forEach(function (category) {
    categoriesHTML.appendChild(presentCategory(category));
  });
};

const presentCategory = (category) => {
  let li = document.createElement("li");

  let button = document.createElement("button");
  button.setAttribute("onClick", `filterByCategory('${category}')`);
  button.innerHTML = translateCategory(category);

  li.appendChild(button);

  return li;
};

// Filters

const filterByCategory = (category) => {
  let productsHTML = [];
  productos.forEach(function (producto) {
    if (producto.categoria == category) {
      productsHTML.push(presentProduct(producto));
    }
  });
  presentProducts(productsHTML);

  showSpecialOffer();
};

// Cart

const addToCart = (id) => {
  if (Cart[id] == null) {
    let product = findProduct(id);
    addProductToCart(product);
  } else {
    Cart[id].quantity++;
  }
  updateCart();
  saveCart();
};

const findProduct = (id) => {
  return productos.find((o) => o.id === id);
};

const addProductToCart = (product) => {
  Cart[product.id] = {
    quantity: 1,
    product: product,
  };
};

const updateCart = () => {
  let quantity = 0;
  let totalPrice = 0;
  for (let [key, value] of Object.entries(Cart)) {
    quantity += value.quantity;
    totalPrice += value.quantity * value.product.precio;
  }
  document.getElementById("cartQuantity").innerHTML = quantity;
  document.getElementById("totalPrice").innerHTML = totalPrice;
};

const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(Cart));
};

const loadCart = () => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    Cart = JSON.parse(storedCart);
  }
  updateCart();
};

const removeFromCart = (id) => {
  delete Cart[id];
  saveCart();
  updateCart();
};

const emptyCart = () => {
  for (var member in Cart) delete Cart[member];
  saveCart();
  updateCart();
};

// Product Modal

const showProductModal = (id) => {
  let product = findProduct(id);
  let productModal = buildProductModal(product);
  document.body.appendChild(productModal);
};

const buildProductModal = (product) => {
  let div = document.createElement("div");
  div.setAttribute("class", "modal");
  div.setAttribute("id", "modalProducto");
  let image = document.createElement("img");
  image.setAttribute("src", product.imagen);
  image.setAttribute("alt", product.nombre);
  let h3 = document.createElement("h3");
  h3.innerHTML = product.nombre;
  let p1 = document.createElement("p");
  p1.innerHTML = product.descripcion;
  let p2 = document.createElement("p");
  p2.innerHTML = "Precio: $" + product.precio;
  let p3 = document.createElement("p");
  p3.innerHTML = translateCategory(product.categoria);
  let button1 = document.createElement("button");
  button1.setAttribute("onClick", `addToCart(${product.id})`);
  button1.innerHTML = "Agregar al carrito";
  let button2 = document.createElement("button");
  button2.setAttribute("onClick", `closeProductModal()`);
  button2.innerHTML = "Cerrar";

  div.appendChild(image);
  div.appendChild(h3);
  div.appendChild(p1);
  div.appendChild(p2);
  div.appendChild(p3);
  div.appendChild(button1);
  div.appendChild(button2);

  return div;
};

const closeProductModal = () => {
  document.getElementById("modalProducto").remove();
};

// Cart Modal

const showCartModal = () => {
  let cartModal = buildCartModal();
  document.body.appendChild(cartModal);
  bindKeyboardEvents();
};

const buildCartModal = () => {
  let div = document.createElement("div");
  div.setAttribute("class", "modal");
  div.setAttribute("id", "modalCarrito");
  let itemsAndTotals = createCartListItemsAndGetTotals();
  let p = createCartSummary(itemsAndTotals.quantity, itemsAndTotals.totalPrice);
  let hr = document.createElement("hr");
  let ul = itemsAndTotals.list;
  let button1 = document.createElement("button");
  button1.setAttribute("onClick", `emptyCartModal()`);
  button1.innerHTML = "Vaciar";
  let button2 = document.createElement("button");
  button2.innerHTML = "Ir al checkout";
  button2.setAttribute("onClick", `showCheckoutModal()`);
  let button3 = document.createElement("button");
  button3.setAttribute("onClick", `closeCartModal()`);
  button3.innerHTML = "Cerrar";

  div.appendChild(p);
  div.appendChild(hr);
  div.appendChild(ul);
  div.appendChild(button1);
  if (createCartListItemsAndGetTotals().quantity) div.appendChild(button2);
  div.appendChild(button3);

  return div;
};

const closeCartModal = () => {
  document.getElementById("modalCarrito").remove();
  updateCart();
  unbindKeyboardEvents();
};

const closeCartModalIfOpen = () => {
    if(document.getElementById("modalCarrito")) closeCartModal();
}

const bindKeyboardEvents = () => {
  document.addEventListener('keydown', handleCartKeyboardEvents);
}

const unbindKeyboardEvents = () => {
  document.removeEventListener('keydown', handleCartKeyboardEvents);
}

const handleCartKeyboardEvents = (event) => {
  if (event.key === 'Escape') {
    closeCartModal();
  }
}

const createCartSummary = (quantity, price) => {
  let p = document.createElement("p");
  let t1 = document.createTextNode("Items: ");
  let s1 = document.createElement("span");
  s1.innerHTML = quantity;
  let t2 = document.createTextNode(" - Total: ");
  let s2 = document.createElement("span");
  s2.innerHTML = "$" + price;

  p.appendChild(t1);
  p.appendChild(s1);
  p.appendChild(t2);
  p.appendChild(s2);

  return p;
};

const createCartListItemsAndGetTotals = () => {
  let quantity = 0;
  let totalPrice = 0;
  let ul = document.createElement("ul");
  for (let [key, value] of Object.entries(Cart)) {
    let listItem = createCartListItem(value);
    ul.appendChild(listItem);
    quantity += value.quantity;
    totalPrice += value.quantity * value.product.precio;
  }
  return {
    list: ul,
    quantity: quantity,
    totalPrice: totalPrice,
  };
};

const createCartListItem = (productInfo) => {
  let li = document.createElement("li");
  let t1 = document.createTextNode("Nombre del producto ");
  let s1 = document.createElement("span");
  s1.innerHTML = "$" + productInfo.quantity * productInfo.product.precio;
  let space = document.createTextNode(" ");
  let s2 = document.createElement("span");
  s2.innerHTML = productInfo.quantity + " items";
  let button = document.createElement("button");
  button.setAttribute(
    "onClick",
    `removeFromCartModal(${productInfo.product.id})`
  );
  button.innerHTML = "Quitar";

  li.appendChild(t1);
  li.appendChild(s1);
  li.appendChild(space);
  li.appendChild(s2);
  li.appendChild(space);
  li.appendChild(button);

  return li;
};

const removeFromCartModal = (id) => {
  removeFromCart(id);
  closeCartModal();
  showCartModal();
};

const emptyCartModal = () => {
  emptyCart();
  closeCartModal();
  showCartModal();
};

// Checkout Modal

const showCheckoutModal = () => {
    closeCartModal();
    let checkoutModal = buildCheckoutModal();
    document.body.appendChild(checkoutModal);
    bindCheckoutKeyboardEvents();
}

const buildCheckoutModal = () => {
  let div = document.createElement("div");
  div.setAttribute("class", "modal");
  div.setAttribute("id", "modalCheckout");

  let p = document.createElement("p");
  p.textContent = "Checkout";

  let hr = document.createElement("hr");

  let form = document.createElement("form");
  form.onsubmit = handleFormSubmit;

  let fields = [
    { placeholder: "Nombre", required: true },
    { placeholder: "Teléfono", required: true, type: "number" },
    { placeholder: "Email", required: true, type: "email" },
    { placeholder: "Lugar de entrega", required: true },
    { placeholder: "Fecha de entrega", required: true, type: "date" },
  ];

  fields.forEach(field => {
    let input = document.createElement("input");
    input.setAttribute("type", field.type || "text");
    input.setAttribute("placeholder", field.placeholder);
    if (field.required) input.required = true;
    form.appendChild(input);
  });

  // Select para el método de pago
  let paymentMethodSelect = document.createElement("select");
  paymentMethodSelect.setAttribute("id", "paymentMethod");
  paymentMethodSelect.setAttribute("required", "required");

  let paymentOptions = ["Efectivo", "Tarjeta de débito", "Tarjeta de crédito"];
  paymentOptions.forEach(option => {
    let optionElement = document.createElement("option");
    optionElement.value = option.toLowerCase();
    optionElement.textContent = option;
    paymentMethodSelect.appendChild(optionElement);
  });

  // Select para las cuotas
  let installmentSelect = document.createElement("select");
  installmentSelect.setAttribute("id", "installments");

  let installmentOptions = ["1", "3", "6", "12"];
  installmentOptions.forEach(option => {
    let optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = `${option} cuota${option === "1" ? "" : "s"}`;
    installmentSelect.appendChild(optionElement);
  });

  // Añadir los select al formulario
  form.appendChild(paymentMethodSelect);
  form.appendChild(installmentSelect);

  // Botón para cerrar el modal que no envía el formulario
  let closeButton = document.createElement("button");
  closeButton.setAttribute("type", "button");
  closeButton.textContent = "Cerrar";
  closeButton.onclick = closeCheckoutModal;

  // Botón para realizar la compra que sí enviará el formulario
  let submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.textContent = "Comprar";

  form.appendChild(closeButton);
  form.appendChild(submitButton);

  div.appendChild(p);
  div.appendChild(hr);
  div.appendChild(form);

  return div;
};


const handleFormSubmit = (event) => {
  event.preventDefault();
  buyCart();
}

const closeCheckoutModal = () => {
    unbindCheckoutKeyboardEvents();
    document.getElementById("modalCheckout").remove();
}

const buyCart = () => {
  emptyCart();
  closeCheckoutModal();
  updateCart();
}

const bindCheckoutKeyboardEvents = () => {
  document.addEventListener('keydown', handleCheckoutKeyboardEvents);
}

const unbindCheckoutKeyboardEvents = () => {
  document.removeEventListener('keydown', handleCheckoutKeyboardEvents);
}

const handleCheckoutKeyboardEvents = (event) => {
  if (event.key === 'Escape') {
    closeCheckoutModal();
  }
}


// Banner especial

const showSpecialOffer = () => {
  // Verifica si ya existe una oferta especial y la elimina antes de crear una nueva
  if(document.getElementById("specialOffer")) {
    destroySpecialOffer();
  }

  const offerDiv = document.createElement("div");
  offerDiv.setAttribute("id", "specialOffer");
  offerDiv.textContent = "¡Solo por hoy, envíos gratis!";

  // Agrega la oferta al cuerpo de la página
  document.body.appendChild(offerDiv);

  // Establece un temporizador para eliminar la oferta después de 10 segundos
  setTimeout(destroySpecialOffer, 10000);
};

const destroySpecialOffer = () => {
  const offerDiv = document.getElementById("specialOffer");
  if(offerDiv) {
    offerDiv.remove();
  }
};