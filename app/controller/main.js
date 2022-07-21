var listProduct = [];
var listShopping = [];
function getEle(ele) {
  return document.getElementById(ele);
}
function getListProduct() {
  return axios({
    url: "https://62c813c70f32635590d0d352.mockapi.io/product",
    method: "GET",
  })
    .then(function (result) {
      console.log(result.data);
      listProduct = result.data;
      
     
       renderProduct(listProduct);
    })
    .catch(function (erro) {
      console.log(erro);
    });
}
getListProduct();
function renderProduct(data) {
  var html = "";
  for (var i = 0; i < data.length; i++) {
    html += `
        <div class="col-lg-3 col-md-6">
          <div class="col-md-4 col-lg-3 p-0 wrapper">
            <div class="cover">
              <div class="top">
                <img src="${data[i].img}" style="width: 100%;"  alt="" />
              </div>
              <div class="bottom">
                <div class="left">
                  <div class="details">
                    <h5>${data[i].name}</h5>
                    <p>${data[i].price}</p>
                  </div>
                  <div onclick="getId(${data[i].id})" class="buy" id="buy" style="cursor: pointer;">
                    <i class="material-icons">add_shopping_cart</i>
                  </div>
                </div>
                
              </div>
            </div>
            <div class="inside">
              <div class="icon"><i class="material-icons">info_outline</i></div>
              <div class="contents">
                <table>
                  <tr>
                    <th>Screen</th>
                    <th>${data[i].screen}</th>
                  </tr>
                  <tr>
                    <td>BackCamera</td>
                    <td>${data[i].backCamera}</td>
                  </tr>
                  <tr>
                    <th>FrontCamera</th>
                    <th>${data[i].frontCamera}</th>
                  </tr>
                  <tr>
                    <td>Type</td>
                    <td>${data[i].type}</td>
                  </tr>
                  <tr>
                    <th>Desc</th>
                    <th>${data[i].desc}</th>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        `;
  }
  document.getElementById("card__product").innerHTML = html;
}
//show shopping__card
document.getElementById("btnShopping").addEventListener("click", function () {
  var btnShopping = document.getElementById("card__shopping");
  if (!listShopping.length) {
      btnShopping.classList.remove("active");
     return alert("Vui lòng bỏ hàng vào giỏ")
  }else{
  btnShopping.classList.toggle("active");
  }
});
//Add product => shopping card
// function  saveLocalStorage() {
//     var listShoppingJson = JSON.stringify(listShopping);
//     localStorage.setItem("listShopping",listShoppingJson);
// };
// function getLocalStorage(){
//     var listShoppingJson=localStorage.getItem("listShopping");
//     if(listShoppingJson=== null)return;
//    listShopping=JSON.parse(listShoppingJson);

// }
function getId(id) {
  axios({
    url: "https://62c813c70f32635590d0d352.mockapi.io/product/" + id,
    method: "GET",
  })
    .then(function (res) {
      let data = { ...res.data, qty: 1 };

      for (let i in listShopping) {
        if (listShopping[i].id === data.id) {
          listShopping[i].qty++;
          rederListShopping(listShopping);
          return;
        }
      }
      listShopping.push(data);
      
      rederListShopping(listShopping);
    })
    .catch(function (erro) {
      console.log(erro);
    });
}

function rederListShopping(data) {
  var htmlContent = ``;

  data = data || listShopping;

  for (var i = 0; i < data.length; i++) {
    var currentData = data[i];
   
    htmlContent += `
        <div class="product">
        <div class="product-image">
          <img src="${currentData.img}" />
        </div>
        <div class="product-details">
          <div class="product-title">${currentData.name}</div>
        
        </div>
        <div class="product-price">${currentData.price}</div>
        <div class="product-quantity">
          <input class="number" id="number" type="number" value="${currentData.qty}" min="1" />
        </div>
        <div class="product-removal">
          <button class="remove-product" onclick="btnDelete(${currentData.id})" id="btnDelete">Remove</button>
        </div>
        <div class="product-line-price" id="product-line-price" 
        }">${currentData.price * currentData.qty} </div>
      </div>   
        `;
  }

  htmlContent += `
    <div class="totals">
    <div class="totals-item">
      <label>Subtotal</label>
      <div class="totals-value" id="cart-subtotal">
        ${subTotal(data)}
      </div>
    </div>
    <div class="totals-item">
      <label>Tax (5%)</label>
      <div class="totals-value" id="cart-tax">${subTotal(data) * 0.05}</div>
    </div>
    <div class="totals-item">
      <label>Services (5%)</label>
      <div class="totals-value" id="cart-shipping">${
        subTotal(data) * 0.05
      }</div>
    </div>
    <div class="totals-item totals-item-total">
      <label>Grand Total</label>
      <div class="totals-value" id="cart-total"> ${Math.floor(
        subTotal(data) * 1.1
      )}</div>
    </div>
  </div> 

   <button class="checkout">Checkout</button>
    `;

  document.getElementById("shopping-cart").innerHTML = htmlContent;
}

const subTotal = (data) => {
  let sum = 0;
  let show=0 ;
  for (let item in data) {
    show += data[item].qty;
    sum += data[item].price * data[item].qty;
  }
  if(!listShopping.length){
    document.getElementById("qty").innerHTML = '';
  }else{
    document.getElementById("qty").innerHTML = show;
  }
 
  return sum;
};

const findId = (id)=>{
  for(let i in listShopping){
    if(listShopping[i]===id){
      return i;
    }
  }
  return -1;
}
const btnDelete = (id)=>{
  let index=findId(id);
    listShopping.splice(index,1);
    if(!listShopping.length){
      document.getElementById("btnShopping").click();
    }
    rederListShopping(listShopping);
}
const filterProduct = () => {
  document.getElementById("seclectPro").addEventListener("change", (e) => {
    if (e.target.value === "0") return renderProduct(listProduct);

    let filterProductList = listProduct.filter((item) => {
      if (item.type === e.target.selectedOptions[0].innerHTML) return item;
    });
    renderProduct(filterProductList);
  });
};
filterProduct ();