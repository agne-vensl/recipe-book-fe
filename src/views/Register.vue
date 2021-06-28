<template>
  <div class="container">
    <div class="form-container">
      <h1>Register</h1>

      <Form @submit.prevent="register">
        <Notification v-if="notification" :message="message" />

        <div class="input-field">
          <label for="name">Name</label>
          <input
            class="input"
            type="text"
            name="name"
            id="name"
            placeholder="John"
            required
            v-model="name"
          />
        </div>

        <div class="input-field">
          <label for="name">Surname</label>
          <input
            class="input"
            type="text"
            name="surname"
            id="surname"
            placeholder="Smith"
            required
            v-model="surname"
          />
        </div>

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
            Register
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
      name: '',
      surname: '',
      email: '',
      password: '',
      notification: false,
      message: null,
      clickedIndex: undefined,
      buttonLoading: false,
    };
  },
  methods: {
    register() {
      this.buttonLoading = true;

      fetch(`${process.env.VUE_APP_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.name.trim(),
          surname: this.surname.trim(),
          email: this.email.trim().toLowerCase(),
          password: this.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            this.notification = true;
            this.message = data.error;
            this.password = '';
            this.email = '';
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
          this.loading = false;
        });
    },
  },
};
</script>
