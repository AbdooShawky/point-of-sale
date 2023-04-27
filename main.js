let counter = 0;
let totalPrice = 0;
let totalAfterDiscount = 0;
let totalAfterTax = 0;
let total = 0;
let isDiscountPercentage = true;
let isTaxPercentage = true;
let discount = parseFloat($("#discount").val());
let tax = parseFloat($("#tax").val());
let sections = [{ id: 2, name: "BBQ" }, { id: 3, name: "electronics" }];
let products = [
    {
        id: 1,
        name: "كوستا كافيه",
        price: 7.99,
        image: "./images/homemade-white-chocolate-mocha-image-square.jpg"
    },
    {
        id: 2,
        name: "قهوة موكا",
        price: 7.99,
        image: "./images/homemade-white-chocolate-mocha-image-square.jpg"
    },
    {
        id: 3,
        name: "نسكافيه ",
        price: 7.99,
        image: "./images/homemade-white-chocolate-mocha-image-square.jpg"
    },
    {
        id: 4,
        name: "قهوة فرنساوي",
        price: 7.99,
        image: "./images/homemade-white-chocolate-mocha-image-square.jpg"
    },
    {
        id: 5,
        name: "قهوة سوداء",
        price: 100,
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
    calculateReceipt(isDiscountPercentage, isTaxPercentage);
    displayItems(items)
    // console.log(items);
}

function increaseCount(itemId) {

    let item = items.filter((item) => item.id === itemId)[0]
    item.count += 1
    item.totalPrice = item.count * item.product.price
    displayItems(items)
    calculateReceipt(isDiscountPercentage, isTaxPercentage);
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
    calculateReceipt(isDiscountPercentage, isTaxPercentage);
}

function removeItem(itemId) {
    items.splice(items.findIndex((item) => item.id === itemId), 1);
    displayItems(items);
    calculateReceipt(isDiscountPercentage, isTaxPercentage);
}

function calculateReceipt(isDiscountPercentage, isTaxPercentage) {
    let subTotal = 0;
    let discountedPrice = 0;
    for (const item of items) {
        subTotal += item.totalPrice;
    }
    if (isDiscountPercentage) {

        discountedPrice = subTotal * (1 - (discount / 100));
    }
    else {
        discountedPrice = subTotal - discount;
    }
    if (isTaxPercentage) {

        totalPrice = discountedPrice + parseFloat(subTotal * (tax / 100));
    }
    else {
        totalPrice = discountedPrice + parseFloat(tax);

    }
    totalAfterDiscount = discountedPrice;
    totalAfterTax = totalPrice;
    displayPrices(totalPrice, discountedPrice, totalPrice, subTotal)
}

function displayPrices(totalPrice, totalAfterDiscont, totalAfterTax, total) {

    $("#displayTax").text(tax + " L.E");
    $("#total").text(total.toFixed(2) + " L.E");
    $("#totalAfterDiscount").text(totalAfterDiscont.toFixed(2) + " L.E");
    $("#totalAfterTax").text(parseFloat(totalAfterTax).toFixed(2) + " L.E");
    $("#totalPrice").text(parseFloat(totalPrice).toFixed(2) + " L.E");
    $("#pay").text("اشتري (" + parseFloat(totalPrice).toFixed(2) + "L.E)");

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
                        <p>${(item.count * item.product.price).toFixed(2)} L.E</p>
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
    calculateReceipt(isDiscountPercentage, isTaxPercentage);
}
function changeDiscount(discountValue) {
    discount = parseFloat(discountValue)
    calculateReceipt(isDiscountPercentage, isTaxPercentage);
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
                    <p class="mt-2 text-center">${product.name} <br> <span class="primary-color">${product.price.toFixed(2)} L.E</span>
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
                <p class="mt-2 text-center">${product.name} <br> <span class="primary-color">${product.price.toFixed(2)} L.E</span>
                </p>
            </div>
        </div>
        
        `
    }
    $("#productsContainer").append(productContainer);
    $.ajax({
        type: "method",
        url: "url",

        dataType: "dataType",
        success: function (response) {

        }
    });
}

function uniqueId() {
    return ++counter;
}



function getCustomerByMobileNumber(mobileNumber) {
    $("#customerInfo").html(`
    <h6>الاسم: ${"test name"}</h6>
    <h6>العنوان: ${"test address"}</h6>
    <h6>الكود: ${"test code"}</h6>
`);
    $("#custName").val("test name");
    $("#custAddress").val("test address");
    $("#custCode").val("test code");
    $.ajax({
        type: "GET",
        url: `/getCustomers/${mobileNumber}`, //url...?mobile=mobileNumber
        data: {},
        dataType: "json",
        success: function (response) {
            $("#customerInfo").html(`
                <h6>الاسم: ${response.name}</h6>
                <h6>العنوان: ${response.address}</h6>
                <h6>الكود: ${response.code}</h6>
            `);
            $("#custName").val(response.name);
            $("#custAddress").val(response.address);
            $("#custCode").val(response.code);
        }
    });
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
            for (const customer of response) {
                $("#customers").append(`<option value="${mobileNumber}">${mobileNumber}</option>`);
            }
        }
    });
}
function getProductsBySectionId(sectionId, element) {
    $(element).addClass("active-category").siblings().removeClass("active-category");

    $.ajax({
        type: "GET",
        url: `getProducts/{store_id}/${sectionId}`,
        data: {},
        dataType: "json",
        success: function (response) {
            products = response;
            displayProduct();
        }
    });
}
function initialDisplayProducts(sectionId) {
    $.ajax({
        type: "GET",
        url: 'getProducts/{store_id}/' + 'sectionId',
        data: {},
        dataType: "json",
        success: function (response) {
            products = response;
            displayProduct();
        }
    });
}

function getSections() {
    displaySections();
    $("#sections").children(':first').addClass("active-category");

    $.ajax({
        type: "GET",
        url: "/getSections/{store_id}",
        data: {},
        dataType: "json",
        success: function (response) {
            sections = response
            displaySections();
            initialDisplayProducts(sections[0].id);
            $("#sections").children(':first').addClass("active-category");
        }
    });
}

function displaySections() {
    for (const section of sections) {
        $("#sections").append(`
        <div onClick="getProductsBySectionId(${section.id} , this)"  class="col-md-2  shadow bg-white mx-1 d-flex justify-content-center align-items-center">
        <div class="text-center my-3 ">
        <p class="m-0">${section.name}</p>
        </div>
        </div>
        `)
    }
}


$(function () {
    $("#customers").select2();
    $("#customers").change(function () {
        getCustomerByMobileNumber($(this).val())

    });
    $("#discountPayMode").change(function (e) {
        if ($(this).val() == "percent") {
            isDiscountPercentage = true;
            calculateReceipt(isDiscountPercentage, isTaxPercentage);
        }
        else {
            isDiscountPercentage = false;
            calculateReceipt(isDiscountPercentage, isTaxPercentage);

        }
    });
    $("#taxPayMode").change(function (e) {
        if ($(this).val() == "percent") {
            isTaxPercentage = true;
            calculateReceipt(isDiscountPercentage, isTaxPercentage);
        }
        else {
            isTaxPercentage = false;
            calculateReceipt(isDiscountPercentage, isTaxPercentage);
        }
    });

   
})


$("#checkoutForm").validate({
    messages:{
       
        customers:{
            required: "من فضلك اختر عميل"
        }
    },
    errorClass: "validationError"
});


function submitForm() {
    let product_id = [];
    let count = [];
    let price = [];
    let discountTotal = [];
    let total = [];
    let taxTotal = [];
    let allTax = [];
    let allDiscount = [];
    let subTotal = [];
    for (const iterator of items) {
        product_id.push(iterator.product.id);
        count.push(iterator.count);
        price.push(iterator.product.price);
        total.push(iterator.totalPrice);
        if (isDiscountPercentage) {
            discountTotal.push(iterator.totalPrice * (1 - (discount / 100)))
        }
        else {
            discountTotal.push(iterator.totalPrice - discount)

        }
        if (isTaxPercentage) {
            taxTotal.push(iterator.totalPrice + (iterator.totalPrice * (tax / 100)))
        }
        else {
            taxTotal.push(iterator.totalPrice - discount)

        }
        subTotal.push(iterator.totalPrice);
        allDiscount.push(discount);
        allTax.push(tax);

    }
    if ($("#checkoutForm").valid()) {


        let checkout = {
            customer_phone: $("#customers").val(),
            customer_name: $("#custName").val(),
            customer_address: $("#custAddress").val(),
            customer_Code: $("#custCode").val(),
            value_discount: $("#discountPayMode").val(),
            value_tax: $("#taxPayMode").val(),
            product_id: product_id,
            count: count,
            price: price,
            discount: allDiscount,
            total: total,
            tax: allTax,
            total_after_tax: taxTotal,
            total_before_discount: subTotal,
            price_total: totalPrice,
            discount_total: discount,
            total_after_discount: totalAfterDiscount,
            total_tax: tax,
            totalAfterTax: totalAfterTax

        }
        console.log(checkout)

        $.ajax({
            type: "POST",
            url: "...",
            datatype: "json",
            data: JSON.stringify(checkout),
            contentType: "application/json",
            success: function (response) {

            }
        });
    }
    
}
displayProduct();
GetAllCustomers();
getSections();
// calculateReceipt();
