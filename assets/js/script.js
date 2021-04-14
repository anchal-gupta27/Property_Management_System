
function validateform(scope){ 
    console.log("Entered here : ", scope)
    var fname=document.myform.fname.value;  
    var lname=document.myform.lname.value; 
    var password=document.myform.password.value; 
    var email = document.myform.email.value;
    var phone = document.myform.phone.value;
    
    var xhr = new XMLHttpRequest();  

    userData = {
      fname: document.myform.fname.value,
      lname: document.myform.lname.value,
      email: document.myform.email.value,
      dob: document.myform.dob.value,
      phone: document.myform.phone.value,
      password: document.myform.password.value,
      address: document.myform.address.value,
      user_id: document.myform.user_id.value
    }
    if (fname==null && lname == null || fname=="" && lname == ""){  
      alert("Name can't be blank");  
      return false;  
    }else if(password.length<6){  
      alert("Password must be at least 6 characters long.");  
      return false;  
      } 
    else if(phone.length<10) {
      alert("Phone number should have 10 digits");
    }
    else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) 
    {
        console.log("This is validated")
         xhr.onreadystatechange = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
              const response = JSON.parse(xhr.responseText);
              console.log(response);
              console.log("Setting Id : ", userData.user_id)
              localStorage.setItem("userId", userData.user_id)
              location.href = "myprop.html"
          }
          else if(xhr.readyState === 4 && xhr.status === 500) {
            alert("The user ID already exists!!!")
          }
        }
        xhr.open('POST', 'http://localhost:3000/users',true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(userData));
    } else {
      alert("You have entered an invalid email address!")
      return (false) 
    }   
}  



function matchdata() {
  var xhr = new XMLHttpRequest();
  logindata = {
      user_id: document.getElementById("user-user_id").value,
      password: document.getElementById("user-password").value
  }
  console.log("Login Data : ", logindata)
  xhr.onreadystatechange = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
          const response = JSON.parse(xhr.responseText);
          console.log(response);
          if(response.password==logindata.password) {
            localStorage.setItem("userId", logindata.user_id);
            location.href = "myprop.html";
          }
          else {
            alert("Incorrect password or user_id")
          }
          

      }
  };
  xhr.open('POST', 'http://localhost:3000/us/', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(logindata));

}
