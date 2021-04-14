function profiledata() {
    const request = new XMLHttpRequest();
    let user_id = localStorage.getItem("userId")
    request.open('GET', 'http://localhost:3000/users/' + user_id, true);
    request.onload = function () {
        // Begin accessing JSON data here

        const data = JSON.parse(this.response);
        console.log(data);
        if (request.status >= 200 && request.status < 400) {
        
         console.table(data);
          dob = data.dob.split("T")[0]
         document.getElementById('profile-modal-content').innerHTML =   `
         <table>
             <tr><td>User ID </td><td> ${data.user_id} </td></tr>
             <tr><td>Name </td><td> ${data.fname} ${data.lname} </td></tr>
             <tr><td>Date of Birth </td><td> ${dob} </td></tr>
             <tr><td>E-mail </td><td> ${data.email} </td></tr>
             <tr><td>Phone Number </td><td> ${data.phone} </td></tr>
             <tr><td>Address </td><td> ${data.address} </td></tr>              

         </table>
         `;
         
          
           
        } else {
            console.log('error');
        }

    };

    request.send();
}

let profilemodal = document.getElementById("userprofile")

profilemodal.onclick = function () {
    console.log("Ptofil e clicked");
    let modal = document.getElementById("profile-modal")
    modal.style.display = "block"
    profiledata();
}

window.onclick = function (e) {
    let modal = document.getElementById("profile-modal")
    if (e.target == modal) {
       
        modal.style.display = "none"
    }
}
