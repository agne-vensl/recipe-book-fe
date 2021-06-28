<template>
  <Header :loggedIn="loggedIn" />
  <router-view />
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: { Header },
  data() {
    return {
      loggedIn: Boolean(localStorage.getItem('token')),
    };
  },
  methods: {
    updateLoggedIn() {
      this.loggedIn = Boolean(localStorage.getItem('token'));
    },
  },
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  background: rgb(252, 246, 234);
  color: #222;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.button {
  border: 1px solid #222;
  border-radius: 2rem;
  cursor: pointer;
  display: inline-block;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;
}

.button:hover {
  transform: scale(1.05);
}

.button:active {
  background: rgb(165, 165, 165);
  border-color: rgb(131, 131, 131);
  color: #fff;
}

.button.primary {
  background: rgb(255, 185, 2);
  border-color: rgb(255, 185, 2);
  color: #fff;
}

.button.primary:active {
  background: transparent;
  color: #222;
}

.button.secondary {
  border-color: rgb(255, 185, 2);
}

.button.secondary:active {
  background: rgb(255, 185, 2);
  color: #fff;
}
</style>
