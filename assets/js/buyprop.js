function modulus(n) {
    return (n%6)+1;
}
let user_id = localStorage.getItem("userId")

function getbuydata() {
    const request = new XMLHttpRequest();
    let user_id = localStorage.getItem("userId")
    request.open('GET', 'http://localhost:3000/buyproperty/' + user_id, true);
    request.onload = function () {
        // Begin accessing JSON data here

        const data = JSON.parse(this.response);
        console.log(data);
        if (request.status >= 200 && request.status < 400) {
            const container = document.getElementById('cd');

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
        
        <div>
		<button id="modal-btn-${idx}" class="bton" onclick="modalOpen(${idx},  ${result.cost});">Buy Property</button>
		<div class="modal modal-${idx}" style="display:none">
			<div class="modal-content modal-content-${idx}">
				<span class="close-btn close-btn-${idx}" onclick="closeModal(${idx})">&times;</span>
                <h1>Property Details</h1>
                <table>
                <tr><td>Property Owner</td><td>${result.fname} ${result.lname}</td></tr>
                <tr><td>Phone number of Property Owner</td><td>${result.phone}</td></tr>
                <tr><td>Property Name</td><td>${result.property_name}</td></tr>
                <tr><td>Amount</td><td>Rs.${result.cost}</td></tr>
                </table>
                <form>
                <input type="radio" id="full" name = "payment" value="full">
                <label for="full" onclick="makeFullPayment(${result.property_id});">Full Payment</label> <br>
                <input type="radio" id="installment" name = "payment" value="installment">
                <label for="installment" onclick="payIn(${result.cost},${result.property_id}); paymentDetails(${result.property_id});">Pay in Installments</label> <br>
                <div id="paydetails-${result.property_id}">
                </div>
                </form>

                <button onclick = "mkpay(${result.property_id})">Pay</button>
                
			</div>
		</div>
	</div>
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

function mkpay(property_id) {
    var xhr = new XMLHttpRequest();
    let user_id = localStorage.getItem("userId")
    console.log(property_id)
    xhr.open('DELETE','http://localhost:3000/property/'+property_id, true);
    xhr.onload = function() {
        var users = JSON.parse(xhr.responseText);
        if(xhr.readyState == 4 && xhr.status == "200") {
            console.table(users);
            data = {}
            xhr.open('PUT','http://localhost:3000/boughtUpdate/'+property_id+'/'+user_id, true);
            xhr.onload = function() {
                var response = JSON.parse(xhr.responseText);
                if(xhr.readyState == 4 && xhr.status == "200") {
                    console.table(response);
                    
                }
                else {
                    console.error(response);
                }
            }
           
            xhr.setRequestHeader('Content-type','application/json');
           xhr.send(JSON.stringify(data));
            
        }
        else {
            console.error(users);
        }
    };
    xhr.send(null);
}



function modalOpen(id, cost){
    console.log("Modal open : ", id, cost)
    let modal = document.querySelector(".modal-"+id)
    modal.style.display = "block";
}
function closeModal(id){
    let modal = document.querySelector(".modal-"+id)
    modal.style.display = "none";
}

function signout() {
    localStorage.removeItem("userId");
    location.href = "index.html";
}

function makeFullPayment(propertyId){
    let ele = document.getElementById("paydetails-"+propertyId);
    ele.style.display = "none";
}

