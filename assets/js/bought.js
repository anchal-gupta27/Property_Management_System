function boughtdata() {
    const request = new XMLHttpRequest();
    let user_id = localStorage.getItem("userId")
    request.open('GET', 'http://localhost:3000/bought/' + user_id, true);
    request.onload = function () {
        // Begin accessing JSON data here

        const data = JSON.parse(this.response);
        console.log(data);
        if (request.status >= 200 && request.status < 400) {
            const container = document.getElementById('bought-props');

           data.forEach((result, idx) => {
                // Create card element
                const card = document.createElement('div');
                card.classList = 'card-body';

                // Construct card content
                const content = `
    <div class="card">
   

    <div id="collapse-bought-${idx}" class="collapse show" aria-labelledby="heading-bought-${idx}" data-parent="#bought-props">
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

function sold_data() {
    const request = new XMLHttpRequest();
    let user_id = localStorage.getItem("userId")
    request.open('GET', 'http://localhost:3000/sold/' + user_id, true);
    request.onload = function () {
        // Begin accessing JSON data here

        const data = JSON.parse(this.response);
        console.log(data);
        if (request.status >= 200 && request.status < 400) {
            const container = document.getElementById('sold-props');

           data.forEach((result, idx) => {
                // Create card element
                const card = document.createElement('div');
                card.classList = 'card-body';

                // Construct card content
                const content = `
    <div class="card">
   

    <div id="collapse-sold-${idx}" class="collapse show" aria-labelledby="heading-sold-${idx}" data-parent="#sold-props">
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