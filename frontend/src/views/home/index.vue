<template>
  <div class="container">
    <h1>Always Fit</h1>
    
    <div class="login-container">
      <h2>Login</h2>
      <form>
        <div class="div_input">
          <label for="email">Email:</label>
          <input type="text" id="username" v-model="user.email" placeholder="Enter your username">
        </div>

        <div class="div_input">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="user.password" placeholder="Enter your password">
        </div>

        <button type="button" @click="loginUser">Login</button>

        <div class="div_info">
          <p class="signup-message">
          Not registered yet? <router-link to="/signup">Sign up here</router-link>
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
    name: 'HomePage',
  components: {
    DialogInfo
  },
    data() {
      return {
          user: {
            email: '',
            password: ''
          },
          dialogInfoVisible: false,
          infoText: null
      };
    },
    methods: {
      async loginUser() {
          console.log(this.user)
          if (this.user.email && this.user.password) {
          await UserPresenter.loginUser({ ...this.user })
          .then(response => {
            console.log(response)
            this.$router.push({ name: 'dashboard' });
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

.login-container {
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

.signup-message {
  text-align: center;
  margin-top: 10px;
}

router-link {
  color: #007BFF;
  text-decoration: none;
}

router-link:hover {
  text-decoration: underline;
}
</style>