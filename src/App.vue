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
  background: rgb(254 252 247);
  color: #222;
  font-family: 'Poppins', sans-serif;
}

a {
  color: #222;
  text-decoration: none;
}

h1,
h2 {
  font-family: 'Mali', cursive;
  font-weight: 500;
  margin-bottom: 5rem;
  position: relative;
  text-align: center;
  text-transform: uppercase;
}

h1::after,
h2::after {
  content: '';
  background-image: url('./assets/aftertitle.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  height: 1.5rem;
  width: 10rem;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  position: absolute;
  bottom: -1em;
}

h2::after {
  bottom: -1.3em;
  height: 1.2rem;
  width: 8rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.shadow {
  box-shadow: 0px 0px 15px -8px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 0px 15px -8px rgba(0, 0, 0, 0.3);
}

.form-container {
  background: #fffffe;
  box-shadow: 0px 0px 15px -8px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 0px 15px -8px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  margin: 1rem auto;
  padding: 2rem 1rem;
}

.button {
  border: 1px solid #222;
  border-radius: 2rem;
  cursor: pointer;
  display: inline-block;
  max-width: max-content;
  white-space: nowrap;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  transition: all 0.2s ease;
}

.button:hover {
  transform: scale(1.05);
}

.button:active {
  background: rgb(165, 165, 165);
  border: 1px solid rgb(131, 131, 131);
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

.align-right {
  text-align: right;
}

@media only screen and (min-width: 768px) {
  .form-container {
    padding: 2rem;
  }
}
</style>
