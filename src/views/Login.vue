<template>
  <div class="container">
    <div class="form-container">
      <h1>Login</h1>

      <Notification v-if="notification" :message="message" />

      <Form @submit.prevent="login">
        <div class="input-field">
          <label for="email">Email</label>
          <input
            class="input"
            type="email"
            name="email"
            id="email"
            minlength="4"
            placeholder="example@example.com"
            required
            v-model="email"
          />
        </div>

        <div class="input-field">
          <label for="password">Password</label>
          <input
            class="input"
            type="password"
            name="password"
            id="password"
            minlength="8"
            placeholder="password"
            required
            v-model="password"
          />
        </div>

        <div class="align-right">
          <Button :loading="buttonLoading" type="submit" classes="button primary">
            Login
          </Button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Button, Notification } from '../components';

export default {
  name: 'Login',
  components: { Form, Button, Notification },
  data() {
    return {
      email: '',
      password: '',
      notification: false,
      message: null,
      clickedIndex: undefined,
      buttonLoading: false,
    };
  },
  methods: {
    login() {
      this.buttonLoading = true;

      fetch(`${process.env.VUE_APP_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.email, password: this.password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            this.notification = true;
            this.message = data.error;
            this.password = '';
            return;
          }
          localStorage.setItem('token', data.token);
          this.$root.updateLoggedIn();
          this.$router.push('/');
        })
        .catch(() => {
          this.notification = true;
          this.message = 'Cannot connect to server. Please try again later';
          this.password = '';
        })
        .finally(() => {
          this.buttonLoading = false;
        });
    },
  },
};
</script>
