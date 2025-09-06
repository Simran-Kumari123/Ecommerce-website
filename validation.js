function validate(){
       // Get form fields
       const username = document.getElementById("username").value;
       const email = document.getElementById("email").value;
       const password = document.getElementById("password").value;
       const confirmPassword = document.getElementById("confirmPassword").value;
   
      
   
       // Username validation (letters only)
       if(username == ""){
        document.getElementById("usernameError").textContent = "Username enter.";
          return false;
       }
       const usernameRegex = /^[A-Za-z]+$/;
       if (!usernameRegex.test(username)) {
           document.getElementById("usernameError").textContent = "Username must contain only letters.";
          return false;
       }
   
       // Email validation
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!emailRegex.test(email)) {
           document.getElementById("emailError").textContent = "Please enter a valid email address.";
           return false;
       }
   
       // Password validation
       if (password.length < 6) {
           document.getElementById("passwordError").textContent = "Password must be at least 6 characters long.";
           return false;
       }
   
       // Confirm Password validation
       if (password !== confirmPassword) {
           document.getElementById("confirmPasswordError").textContent = "Passwords do not match.";
           return false;
       }
   
     
    
   
}

 