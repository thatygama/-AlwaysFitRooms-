<template>
    <div class="container">
    <h1>Always Fit</h1>
      
      <div class="signup-container">
      <h2>Sign Up</h2>
        <form>
          <div class="div_input">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name" placeholder="Enter your name">
          </div>
  
          <div class="div_input">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" placeholder="Enter your email">
          </div>
  
          <div class="div_input">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" placeholder="Enter your password">
          </div>
  
          <button type="submit">Sign Up</button>

          <div class="div_info">
          <p class="login-return-message">
        Already registered? <router-link to="/">Return to Login page</router-link>
        </p>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SignUpPage',
    data() {
      return {
        name: '',
        email: '',
        password: ''
      };
    }
  }
  </script>
  
  <style scoped>
.container {
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.signup-container {
  width: 300px;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 40px;
}

.div_input {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
}

input {
  width: 80%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.login-return-message {
  text-align: center;
  margin-top: 10px;
}
</style>