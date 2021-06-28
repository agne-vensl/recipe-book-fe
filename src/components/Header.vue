<template>
  <div class="container">
    <header>
      <router-link to="/">
        <img id="logo" src="../assets/logo.png" alt="top chef logo" />
      </router-link>

      <nav>
        <router-link class="link after" to="/">Home</router-link>
        <router-link class="link after" to="/recipes">Recipes</router-link>
        <router-link v-if="loggedIn" class="link after" to="/add-recipe">Add Recipe</router-link>
        <router-link v-if="loggedIn" class="link after" to="/favourites">Favourites</router-link>

        <div id="login-register">
          <router-link v-if="!loggedIn" class="button secondary" to="/login">Login</router-link>
          <router-link v-if="!loggedIn" class="button primary" to="/register">Register</router-link>
          <router-link v-if="loggedIn" @click="logout" class="button primary" to=""
            >Logout</router-link
          >
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['loggedIn'],
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$root.updateLoggedIn();
      this.$router.push('/');
    },
  },
};
</script>

<style>
#logo {
  height: 8rem;
  margin-top: -1rem;
}

header {
  text-align: center;
  padding: 0.5rem 1rem;
}

a {
  color: #222;
  margin-bottom: 0.5rem;
  text-decoration: none;
  text-transform: uppercase;
}

.link:hover {
  text-decoration: underline;
}

@media only screen and (min-width: 768px) {
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 2rem;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #logo {
    height: 6rem;
  }

  a {
    display: inline-block;
    font-size: 0.9rem;
    margin-bottom: 0;
  }

  .link {
    position: relative;
    margin-right: 2rem;
  }

  .link.after:not(:last-of-type)::after {
    background: #222;
    content: '';
    display: inline-block;
    height: 2rem;
    width: 0.01rem;
    position: absolute;
    top: -0.45rem;
    right: -1rem;
  }

  #login-register {
    margin-left: 2rem;
  }

  #login-register :not(:last-child) {
    margin-right: 1rem;
  }
}
</style>
