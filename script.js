class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

class UI {
  addProduct(product) {
    const productList = document.getElementById("product-list");
    const element = document.createElement("div");
    element.innerHTML = `
    <div class="card text-center mb-4">
    <div class="card-body">
    <strong>Product Name</strong>:${product.name}
    <strong>Product Price</strong>: u$s ${product.price}
    <strong>Product Year</strong>:${product.year}
    <a href="#" class="btn btn-danger" name="delete">Delete</a> 

    </div>
    </div>
    `;

    //    <a href="#" class="btn btn-danger" name="delete">Delete</a>  agrega un falso link con el fin de estilizarlo como boton via bootstrap para luego capturarlo como evento

    productList.appendChild(element);
  }
  resetForm() {
    document.getElementById("product-form").reset();
  }

  deleteProduct(element) {
    if (element.name === "delete") {
      element.parentElement.parentElement.parentElement.remove();
      //el remove afecta al elemento padre, del elemnto padre, del elemto padre, es decir sube tres niveles hasta llegar al div que creamos al crear el producto en "addProduct"
      this.showMessage(`Product Deleted Successfully`, "warning");
    }
  }
  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass}`;
    div.appendChild(document.createTextNode(message));
    // mostrando en el DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#App");
    container.insertBefore(div, app);
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 2500); //setTimeout elimina el mensane a los 2,5 segundos
  }
}

//DOM events
document
  .getElementById("product-form")
  .addEventListener("submit", function (e) {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const year = document.getElementById("year").value;

    const product = new Product(name, price, year);
    const ui = new UI();

    if (name === "" || price === "" || year === "") {
      return ui.showMessage(`Complete Fields Please`, "danger");
    }
    ui.addProduct(product);
    ui.resetForm();
    ui.showMessage(`Product Added Successfully`, "success");

    e.preventDefault(); //evita que el form, refresque la pantalla cancelando el comportamiento por defecto del fomrulario
  });

document.getElementById("product-list").addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteProduct(e.target);
});
