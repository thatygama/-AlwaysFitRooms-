<template>
    <div class="container">
    <h1>Always Fit</h1>
      
      <div class="signup-container">
      <h2>Sign Up</h2>
        <form>
          <div class="div_input">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="user.name" placeholder="Enter your name">
          </div>
  
          <div class="div_input">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="user.email" placeholder="Enter your email">
          </div>
  
          <div class="div_input">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="user.password" placeholder="Enter your password">
          </div>
  
          <button type="button" @click="registerUser">Sign Up</button>

          <div class="div_info">
          <p class="login-return-message">
        Already registered? <router-link to="/">Return to Login page</router-link>
        </p>
          </div>
        </form>
      </div>

      <div v-if="dialogInfoVisible">
      <DialogInfo
        :infoMessage="infoText" 
        @close="dialogInfoVisible = false"
      />
    </div>
    </div>
  </template>
  
  <script>
  import UserPresenter from '@Presenters/user-presenter';
  import DialogInfo from '@Components/dialog-info';

  export default {
    name: 'SignUpPage',
    components: {
      DialogInfo
    },
    data() {
      return {
        user: {
          name: null,
          email: null,
          password: null
        },
        dialogInfoVisible: false,
        infoText: null
      };
    },
    methods: {
        async registerUser() {
          console.log(this.user)
          if (this.user.name && this.user.email && this.user.password) {
          await UserPresenter.store({ ...this.user })
          .then(response => {
            console.log(response)
            this.$router.push({ name: 'home' });
          })
          .catch(error => {
            console.log(error)
            this.infoText = error.error;
            this.dialogInfoVisible = true;
            console.log(this.dialogInfoVisible)
          });
        } else {
            console.log('INFORME!')
        }

        console.log('rodou')
      }
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