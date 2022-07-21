
var listProduct = [];

function getListProducts() {
  axios({
    url: "https://62c813c70f32635590d0d352.mockapi.io/product",
    method: "GET",
  })
    .then(function (res) {
      listProduct = res.data;
      renderProduct(listProduct);
      
    })
    .catch(function (err) {
      console.log(err);
    });
}
getListProducts();
function renderProduct(data) {
  var html = "";
  for (let i in data) {
    html += `
        <tr>
        <td>
            <span>${+i + 1}</span>
        </td>
        <td>
          <div
            class="img"
            style="background-image: url(${
              data[i].img
            });background-size: contain;background-position: center center;height: 150px;"
          ></div>
        </td>
        <td>
          <div class="email">
            <span><h4>${data[i].name}</h4> </span>
            <span
              >${data[i].desc}</span
            >
            <span
              >${data[i].backCamera}</span
            >
            <span
              >${data[i].frontCamera}</span
            >
            <span
              >${data[i].screen}</span
            >
            <span></span>
          </div>
        </td>
        <td>
            <div>
                <span>${data[i].type}</span>
            </div>
        </td>
        <td>${data[i].price}</td>     
        <td>
          <button
          onclick="getProducts(${data[i].id})"
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true"
              ><i class="fa fa-pencil-alt"></i
            ></span>
          </button>
        </td>
        <td>
          <button
          onclick="deleteProducts(${data[i].id})"
          id="btnDelete"
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">
              <i class="fa fa-close"></i
            ></span>
          </button>
        </td>
      </tr>
        `;
  }
  document.getElementById("alert").innerHTML = html;
}

function creatProducts() {
  var isValid=validate(flag);
  if(!isValid)return alert("don't empty");
  console.log(isValid);
  var proName = document.getElementById("name").value;
  var proType = document.getElementById("type").value;
  var proPrice = document.getElementById("price").value;
  var proScreen = document.getElementById("screen").value;
  var proBackCamera = document.getElementById("back").value;
  var proFrontCamera = document.getElementById("front").value;
  var proDescription = document.getElementById("desc").value;
  var proImage = document.getElementById("image").value;
  var products = new Product(
    proName,
    proPrice,
    proScreen,
    proBackCamera,
    proFrontCamera,
    proImage,
    proDescription,
    proType
  );
  axios({
    url: "https://62c813c70f32635590d0d352.mockapi.io/product",
    method: "POST",
    data: products,
  })
    .then((res) => {
      getListProducts();
      document.getElementById("btnReset").click();
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
document.getElementById("btnAdd").addEventListener("click", creatProducts);
function deleteProducts(id) {
  axios({
    url: "https://62c813c70f32635590d0d352.mockapi.io/product/" + id,
    method: "DELETE",
  })
    .then(function (res) {
      getListProducts();
    })
    .catch(function (err) {
      console.log(err);
    });
}
// document.getElementById('btnDelete').addEventListener("click",deleteProducts);
function getProducts(id) {
  axios({
    url: "https://62c813c70f32635590d0d352.mockapi.io/product/" + id,
    method: "GET",
  })
  .then(function (rest) {
    console.log(rest.data);
    document.getElementById("btnSave").style.display="block";
    document.getElementById("btnAdd").style.display="none";
    document.getElementById("name").value=rest.data.name;
    document.getElementById("type").value=rest.data.type;
    document.getElementById("price").value=rest.data.price;
    document.getElementById("screen").value=rest.data.screen;
    document.getElementById("back").value=rest.data.backCamera;
    document.getElementById("front").value=rest.data.frontCamera;
    document.getElementById("desc").value=rest.data.desc;
    document.getElementById("image").value=rest.data.img;
    document.getElementById("productId").value=rest.data.id;
  })
  .catch(function(err){
    console.log(err);
  })
}
function uploadProducts(id){
  var proName = document.getElementById("name").value;
  var proType = document.getElementById("type").value;
  var proPrice = document.getElementById("price").value;
  var proScreen = document.getElementById("screen").value;
  var proBackCamera = document.getElementById("back").value;
  var proFrontCamera = document.getElementById("front").value;
  var proDescription = document.getElementById("desc").value;
  var proImage = document.getElementById("image").value;
  var proID=document.getElementById("productId").value;
  var products = new Product(
    proName,
    proPrice,
    proScreen,
    proBackCamera,
    proFrontCamera,
    proImage,
    proDescription,
    proType
  );
  axios({
    url: "https://62c813c70f32635590d0d352.mockapi.io/product/" + proID,
    method: "PUT",
    data: products,
  })
  .then(function(res){
    getListProducts();
    document.getElementById("btnReset").click();
    document.getElementById("btnAdd").style.display="block";
    document.getElementById("btnSave").style.display="none";
  })
  .catch(function(err){
    console.log(err);
  })
}
document.getElementById("btnSave").addEventListener("click",uploadProducts);
function validate(val) {
  v1 = document.getElementById("name");
  v2 = document.getElementById("price");
  v3 = document.getElementById("screen");
  v4 = document.getElementById("back");
  v5 = document.getElementById("front");
  v6 = document.getElementById("desc");
  v7= document.getElementById("image");
  v8=document.getElementById("type");
  flag1 = true;
  flag2 = true;
  flag3 = true;
  flag4 = true;
  flag5 = true;
  flag6 = true;
  flag7 = true;
  flag8 = true;
  if(val>=1 || val==0) {
      if(v1.value == "") {
          v1.style.borderColor = "red";
          flag1 = false;
      }
      else {
          v1.style.borderColor = "green";
          flag1 = true;
      }
  }

  if(val>=2 || val==0) {
      if(v2.value == "") {
          v2.style.borderColor = "red";
          flag2 = false;
      }
      else {
          v2.style.borderColor = "green";
          flag2 = true;
      }
  }
  if(val>=3 || val==0) {
      if(v3.value == "") {
          v3.style.borderColor = "red";
          flag3 = false;
      }
      else {
          v3.style.borderColor = "green";
          flag3 = true;
      }
  }
  if(val>=4 || val==0) {
      if(v4.value == "") {
          v4.style.borderColor = "red";
          flag4 = false;
      }
      else {
          v4.style.borderColor = "green";
          flag4 = true;
      }
  }
  if(val>=5 || val==0) {
      if(v5.value == "") {
          v5.style.borderColor = "red";
          flag5 = false;
      }
      else {
          v5.style.borderColor = "green";
          flag5 = true;
      }
  }
  if(val>=6 || val==0) {
      if(v6.value == "") {
          v6.style.borderColor = "red";
          flag6 = false;
      }
      else {
          v6.style.borderColor = "green";
          flag6 = true;
      }
  }

  if(val>=7 || val==0) {
      if(v7.value == "") {
          v7.style.borderColor = "red";
          flag7 = false;
      }
      else {
          v7.style.borderColor = "green";
          flag7 = true;
      }
  }
  if(v8.selectedIndex===0){
    v8.style.borderColor="red";
    flag8 = false;
  }
  else{
    v8.style.borderColor="green";
    flag8=true;
  }
  flag = flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7 && flag8;
  console.log(flag);
  return flag;
}
