function submitform(data) {
    console.log("UserId in prop.html : ", localStorage.getItem("userId"));
    let user_id = localStorage.getItem("userId")
    var xhr = new XMLHttpRequest();
    propertydata = {
        property_type: document.property.property_type.value,
        property_name: document.property.property_name.value,
        property_desc: document.property.property_desc.value,
        cost: document.property.cost.value,
        user_id: localStorage.getItem("userId")
    }
    xhr.onreadystatechange = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            console.log(response);
            location.href="myprop.html"

        }
    };
    xhr.open('POST', 'http://localhost:3000/property/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(propertydata));


}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));

}
function modulus(n) {
    return (n%6)+1;
}
function getdata() {
    const request = new XMLHttpRequest();
    let user_id = localStorage.getItem("userId")
    request.open('GET', 'http://localhost:3000/property/' + user_id, true);
    request.onload = function () {
        // Begin accessing JSON data here

        const data = JSON.parse(this.response);
        console.log(data);
        if (request.status >= 200 && request.status < 400) {
            const container = document.getElementById('accordion');

           data.forEach((result, idx) => {
                // Create card element
                const card = document.createElement('div');
                card.classList = 'card-body';

                // Construct card content
                const content = `
    <div class="card">
   

    <div id="collapse-${idx}" class="collapse show" aria-labelledby="heading-${idx}" data-parent="#accordion">
      <div class="card-body">
        <img src="/assets/img/property${modulus(idx)}.jpg" class = "a"" >
        <h5><strong>Name: </strong>${result.property_name}</h5>
        <p><strong>Type: </strong>${result.property_type} </br>
        <strong>Description: </strong>${result.property_desc} </br>
        <strong>Amount: </strong>Rs.${result.cost}</p>
      </div>
    </div>
  </div>
  `;

                // Append newyly created card element to the container
                container.innerHTML += content;
            })


        } else {
            console.log('error');
        }

    };

    request.send();
}
console.log("UserID is : ", localStorage.getItem("userId"))
let modalBtn = document.getElementById("modal-btn")
let modal = document.getElementById("addmodal")
let closeBtn = document.querySelector(".close-btn")

modalBtn.onclick = function () {
   
    modal.style.display = "block"
}
closeBtn.onclick = function () {
    modal.style.display = "none"
}
window.onclick = function (e) {
    if (e.target == modal) {
        modal.style.display = "none"
    }
}


