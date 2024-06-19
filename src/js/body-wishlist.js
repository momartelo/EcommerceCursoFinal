// import { ProductModel } from "../models/Product.js";

document.addEventListener("DOMContentLoaded", async () => {
    console.log("CHAAAAA");
    try {
        const response = await fetch("/api/products/wishlist");
        console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const productsWishlist = await response.json();
        console.log(productsWishlist);

        let productsWishlistJSON = productsWishlist || [];
        let total = 0;

        var wishCad = `
<div class="wishlist-title-container flex">
    <div class="wishlist-title flex">
    <h4>Lista de Deseos</h4>
    </div>
    <div class="wishlist-emptylist flex">
        <img
        src="./img/contenedor-de-basura-rojo3D.png"
        alt=""
        width="48px"
        />    
        <button id="vaciarLista">
        Vaciar
        </button>
    </div>
</div>
<div class="wishlist-wrapper flex">
`;
        if (productsWishlistJSON.length > 0) {
            wishCad += `
<div class="wishlist-products flex">
`;
            for (let i = 0; i < productsWishlistJSON.length; i++) {
                wishCad += `
    <div class="wishlist-container flex">
      <article class="article-product flex">
        <a href="#" onclick="event.preventDefault();">
          <picture>
            <img
            src="${productsWishlistJSON[i].image[0]}"
            alt=""
            />
          </picture>
          <button class="wishlist-button-add flex">
          <img
            src="./img/corazonRojo3D.png"
            alt=""
            width="16px"
          />
        </button>
        </a>
        <div class="product-description">
          <span class="description">${productsWishlistJSON[i].name}</span>
        </div>
        <div class="product-price">
          <span class="price">${productsWishlistJSON[i].finalPrice}</span>
        </div>
      </article>
    </div>
`;

                total += parseFloat(
                    productsWishlistJSON[i].finalPrice.replace(
                        "$",
                        "",
                    ),
                );
            }
        } else {
            wishCad += `
    <div class="whishlist-empty flex">
        <p>&#129300; ¡Lista de deseos vacia! &#128221;</p>
    </div>
    `;
        }

        if (total == 0) {
            wishCad += `
</div>
    <div class="wishlist-container2 flex zero">
`;
        } else {
            wishCad += `
</div>
    <div class="wishlist-container2 flex">
`;
        }
        wishCad += `
      <div class="wishlist-container3">
        <div class="cart-hidden-container-popular flex">
            <a href="#"
            ><img
            class="icono-cart-popular"
            src="./img/carrito-de-compras(1).png"
            alt=""
            width="64px"
            /></a>
        </div>
`;

        wishCad += `
        <div class="product-price">
            <span class="price">Total $${total.toFixed(2)}</span>
        </div>
        
    </div>


`;

        document.getElementById("wishlist").innerHTML = wishCad;

        // const updateProducts = async () => {
        //     try {
        //         await ProductModel.updateMany({}, { inWishlist: false });
        //         console.log("La lista de deseos ha sido vaciada.");
        //     } catch (error) {
        //         console.error("Error updating products:", error);
        //     }
        // };

        document
            .getElementById("vaciarLista")
            .addEventListener("click", async () => {
                try {
                    await fetch("/api/products/wishlist/clear", {
                        method: "POST",
                    });
                    window.location.reload();
                } catch (error) {
                    console.log("Error clearing wishlist", error);
                }
            });

        const wishlistButtons = document.querySelectorAll(
            ".wishlist-button-add",
        );
        wishlistButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                toggleWishlistButton(button, productsWishlistJSON);
                window.location.reload();
            });
        });
    } catch (error) {
        console.error("Error loading wishlist", error);
    }
});

function toggleWishlistButton(button, productsWishlistJSON) {
    const imageElement = button.querySelector("img");
    const contenedorProducto = button.closest(".wishlist-container");
    const nombreProducto = contenedorProducto
        .querySelector("div span")
        .textContent.trim();

    let productoID = null;
    for (let i = 0; i < productsWishlistJSON.length; i++) {
        if (nombreProducto === productsWishlistJSON[i].name) {
            productoID = productsWishlistJSON[i]._id; // Asegúrate de que estás usando _id
            break;
        }
    }

    if (!productoID) {
        console.error("Producto no encontrado en la lista de datos.");
        return;
    }

    let wishlistItems = productsWishlistJSON;
    wishlistItems = wishlistItems.filter(
        (item) => item._id !== productoID,
    );
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    contenedorProducto.remove();
    console.log("Producto eliminado de la lista de deseos");
}
