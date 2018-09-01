// date
function getDate(){
    var date = new Date();
    
    document.getElementById('timedisplay').innerHTML = date.
    	getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
}
getDate();

// array
var order_date = document.getElementById('timedisplay');
var nameInput = document.getElementById('name');
var imeiInput = document.getElementById('imei');
var name_clientInput = document.getElementById('name_client');
var phoneInput = document.getElementById('phone');

var contact = document.getElementById("contact_form");


contact.addEventListener('submit', function (e) {
    e.preventDefault();

    let res = [];

    res.push(order_date.textContent, nameInput.value, imeiInput.value, name_clientInput.value, phoneInput.value, );
    console.log(res);
});
