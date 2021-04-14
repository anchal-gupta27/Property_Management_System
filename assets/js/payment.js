function payIn(cost,property_id) {
    var xhr = new XMLHttpRequest();
    data = {}
    console.log("cost: "+cost)
    console.log(property_id);
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == "200") {
            console.log("Text: ", xhr.responseText)
            var users = JSON.parse(xhr.responseText);
            console.table(users); 
           
           
            
        }
    };
    xhr.open('PUT','http://localhost:3000/payment/'+cost+'/12/'+property_id, true);
    xhr.setRequestHeader('Content-type','application/json');
    xhr.send(JSON.stringify(data));
}

function paymentDetails(property_id) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET','http://localhost:3000/payment/'+property_id,true);
    xhr.onload = function() {
        const data = JSON.parse(this.response);
        console.log(data);
        if(xhr.status>=200 && xhr.status<400) {
            let ele = document.getElementById("paydetails-"+property_id);
            ele.style.display = "block";
            ele.innerHTML= `
            <p><strong>Tenure</strong>: 12 months <br> 
            <strong>Rate of Interest</strong>: 10% <br>
             <strong>EMI</strong>: Rs.${data.total}</p>
            `;
        }
        else {
            console.log('error')
        }
    }
    xhr.send();
}