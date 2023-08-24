<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>
export default {
  name: 'App',
  data: () => ({
    loading: true,
    loading_allow_html: true
  }),
  computed: {
    snackbar() {
      return this.$store.getters.snackbar;
    },
    snackbarVisible: {
      get() {
        return this.$store.getters.snackbar.visible;
      },
      set() {
        this.setSnackbarVisible();
      }
    },
    notification() {
      return this.$store.getters.notification;
    },
    notificationVisible: {
      get() {
        return this.$store.getters.notification.visible;
      },
      set() {
        this.setNotificationVisible();
      }
    }
  },
  mounted() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.loading = false;
      }, 500);

      setTimeout(() => {
        this.loading_allow_html = false;
      }, 5000);
    });
  },
  methods: {
    setSnackbarVisible() {
      this.$store.dispatch('HIDE_SNACKBAR');
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
