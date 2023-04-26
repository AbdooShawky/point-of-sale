let counter = 0;
let totalPrice = 0;
let totalAfterDiscount = 0
let totalAfterTax = 0
let total = 0
let discount = parseFloat($("#discount").val());
let tax = parseFloat($("#tax").val());
let sections = [{ id: 2, name: "BBQ" }, { id: 3, name: "electronics" }];
let products = [
    {
        id: 1,
        name: "Costa Coffee",
        price: 7.99,
        image: "./images/homemade-white-chocolate-mocha-image-square.jpg"
    },
    {
        id: 2,
        name: "mocca Coffee",
        price: 7.99,
        image: "./images/homemade-white-chocolate-mocha-image-square.jpg"
    },
    {
        id: 3,
        name: "nescaffee ",
        price: 7.99,
        image: "./images/homemade-white-chocolate-mocha-image-square.jpg"
    },
    {
        id: 4,
        name: "carrot cake",
        price: 7.99,
        image: "./images/homemade-white-chocolate-mocha-image-square.jpg"
    },
    {
        id: 5,
        name: "black Coffee",
        price: 7.99,
        image: "./images/homemade-white-chocolate-mocha-image-square.jpg"
    },
];
let customerMobileNumbers = ['01119957591', '01102070759', '01100272482', '01200568666'];

let items = [];

function addItem(productId) {
    let product = products.filter((product) => product.id === productId)[0];

    let itemAlreadyAdded = items.filter((item) => item.product.id === product.id);
    if (itemAlreadyAdded.length > 0) {
        itemAlreadyAdded[0].count += 1
        itemAlreadyAdded[0].totalPrice = itemAlreadyAdded[0].product.price * itemAlreadyAdded[0].count
    }
    else {
        let item = {
            id: uniqueId(),
            product: product,
            count: 1,
            totalPrice: product.price * 1
        }
        items.push(item);
    }
    calculateReceipt()
    displayItems(items)
    // console.log(items);
}

function increaseCount(itemId) {

    let item = items.filter((item) => item.id === itemId)[0]
    item.count += 1
    item.totalPrice = item.count * item.product.price
    displayItems(items)
    calculateReceipt()
    //$(`#${item.product.name.toString().replace(/\s+/g, '')}Count`).text(item.count);
}

function decreaseCount(itemId) {
    let item = items.filter((item) => item.id === itemId)[0]
    if (item.count === 1) {
        items.splice(items.findIndex((item) => item.id === itemId), 1);
        displayItems(items);
    }
    else {

        item.count -= 1
        item.totalPrice = item.count * item.product.price
        // $(`#${item.product.name.toString().replace(/\s+/g, '')}Count`).text(item.count);
        displayItems(items)
    }
    calculateReceipt()
}

function removeItem(itemId) {
    items.splice(items.findIndex((item) => item.id === itemId), 1);
    displayItems(items);
    calculateReceipt();
}

function calculateReceipt() {
    let subTotal = 0;
    for (const item of items) {
        subTotal += item.totalPrice;
    }
    let discountedPrice = subTotal * (1 - (discount / 100));
    totalPrice = discountedPrice + parseFloat(tax);
    displayPrices(totalPrice, discountedPrice, totalPrice, subTotal)
}

function displayPrices(totalPrice, totalAfterDiscont, totalAfterTax, total) {
    $("#displayTax").text("$" + tax);
    $("#total").text("$" + total.toFixed(2));
    $("#totalAfterDiscount").text("$" + totalAfterDiscont.toFixed(2));
    $("#totalAfterTax").text("$" + parseFloat(totalAfterTax).toFixed(2));
    $("#totalPrice").text("$" + parseFloat(totalPrice).toFixed(2));
    $("#pay").text("Pay ($" + parseFloat(totalPrice).toFixed(2) + ")");

}


function displayItems(items) {
    let checkoutContainer = ``;

    for (const item of items) {
        checkoutContainer += `
        <div class="pt-4 pb-2 d-flex">
        
            <div class="col-md-6 d-flex justify-content-around">
                <p class="text-center" id="itemTrashIcon" onClick="removeItem(${item.id})">
                    <i class="fa fa-trash-alt primary-color"></i>
                </p>
                <p>${item.product.name}</p>
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-6 d-flex justify-content-around">
                        <p id="itemPlusIcon" onClick="increaseCount(${item.id})"><i class="primary-color fa fa-plus-circle"></i></p>
                        <p id="${item.product.name.toString().replace(/\s+/g, '')}Count">${item.count}</p>
                        <p id="itemMinusIcon" onClick="decreaseCount(${item.id})"><i class="primary-color fa fa-minus-circle"></i></p>
                
                    </div>
                    <div class="col-md-6">
                        <p>$${(item.count * item.product.price).toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="break-line"></div>
        
        `
    }
    $("#checkout").empty();
    $("#checkout").append(checkoutContainer);
}

function changeTax(taxValue) {
    console.log("text ", taxValue)
    tax = parseFloat(taxValue)
    calculateReceipt();
}
function changeDiscount(discountValue) {
    discount = parseFloat(discountValue)
    calculateReceipt();
}
function filterProducts(word) {
    let productContainer = ``;
    for (const product of products) {
        if (product.name.toLocaleLowerCase().includes(word.toLocaleLowerCase())) {
            productContainer += `
            <div class=" col-md-2 ">
                <div class="product-item" onClick="addItem(${product.id})">
                    <div class="product-img p-2">
                        <img class="img-fluid"
                        src="${product.image}"
                        alt="homemade-white-chocolate-mocha-image-square">
                    </div>
                    <p class="mt-2 text-center">${product.name} <br> <span class="primary-color">$${product.price.toFixed(2)}</span>
                    </p>
                </div>
            </div>
        `
        }
    }
    $("#productsContainer").empty();
    $("#productsContainer").append(productContainer);

}

function displayProduct() {
    let productContainer = ``;
    for (const product of products) {
        productContainer += `
        <div class=" col-md-2 ">
            <div class="product-item" onClick="addItem(${product.id})">
                <div class="product-img p-2">
                <img class="img-fluid"
                src="${product.image}"
                alt="homemade-white-chocolate-mocha-image-square">
                </div>
                <p class="mt-2 text-center">${product.name} <br> <span class="primary-color">$${product.price.toFixed(2)}</span>
                </p>
            </div>
        </div>
        
        `
    }
    $("#productsContainer").append(productContainer);
    // $.ajax({
    //     type: "method",
    //     url: "url",
    //     data: "data",
    //     dataType: "dataType",
    //     success: function (response) {

    //     }
    // });
}

function uniqueId() {
    return ++counter;
}

$(function () {
    $("#customers").select2();
    $("#customers").change(function () {
        getCustomerByMobileNumber($(this).val())

    });
})

function getCustomerByMobileNumber(mobileNumber) {

    $("#customerInfo").html(`
        <h6>Name: ${"Eng.kahlid"}</h6>
        <h6>Address: ${"Cairo, Egypt"}</h6>
        `
    );
    // $.ajax({
    //     type: "GET",
    //     url: "url", //url...?mobile=mobileNumber
    //     data: { mobile: mobileNumber },
    //     dataType: "json",
    //     success: function (response) {
    //         $("#customerInfo").text(response.customer.name);
    //     }
    // });
}
function GetAllCustomers() {
    $("#customers").append(`<option value=""></option>`);
    for (const mobileNumber of customerMobileNumbers) {
        $("#customers").append(`<option value="${mobileNumber}">${mobileNumber}</option>`);
    }
    $.ajax({
        type: "GET",
        url: "url",
        data: {},
        dataType: "json",
        success: function (response) {
            $("#customers").append(`<option value=""></option>`);
            for (const mobileNumber of customerMobileNumbers) {
                $("#customers").append(`<option value="${mobileNumber}">${mobileNumber}</option>`);
            }
        }
    });
}
function getProductsBySectionId( sectionId, element ){
    $(element).addClass("active-category").siblings().removeClass("active-category");
}
function getSections() {
    for (const section of sections) {
        $("#sections").append(`
        <div onClick="getProductsBySectionId(${section.id} , this)"  class="col-md-2  shadow bg-white mx-1 d-flex justify-content-center align-items-center">
        <div class="text-center my-3 ">
        <p class="m-0">${section.name}</p>
        </div>
        </div>
        `)
    }
    $("#sections").children(':first').addClass("active-category");
    
    $.ajax({
        type: "GET",
        url: "/getSections/{store_id}",
        data: {},
        dataType: "json",
        success: function (response) {
            for (const section of response) {
                $("#sections").append(`
                <div onClick="getProductsBySectionId(${section.id})" class="col-md-2  shadow bg-white mx-1 d-flex justify-content-center align-items-center">
                <div class="text-center my-3 ">
                <p class="m-0">${section.name}</p>
                </div>
                </div>
                `)
            }
            $("#sections").children(':first').addClass("active-category");
        }
    });
}
displayProduct();
GetAllCustomers();
getSections();
calculateReceipt();
