<template>
  <div class="container">
    <div class="form-container">
      <h1>Add Recipe</h1>

      <Notification v-if="notification" :message="message" />

      <Form @submit.prevent="addRecipe">
        <div class="input-field">
          <label for="image">Image</label>
          <input
            class="input"
            type="url"
            name="image"
            id="image"
            placeholder="http://image.png"
            required
            v-model="image"
          />
        </div>

        <div class="input-field">
          <label for="title">Title</label>
          <input
            class="input"
            type="text"
            name="title"
            id="title"
            placeholder="Pasta"
            required
            v-model="title"
          />
        </div>

        <div class="input-field">
          <label for="description">Description</label>
          <textarea
            id="description"
            class="input"
            cols="30"
            rows="10"
            placeholder="Description..."
            required
            v-model="description"
          ></textarea>
        </div>

        <div class="align-right">
          <Button :loading="buttonLoading" type="submit" classes="button primary">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Notification, Button } from '../components';

export default {
  name: 'AddRecipe',
  components: { Form, Notification, Button },
  data() {
    return {
      image: '',
      title: '',
      description: '',
      notification: false,
      message: null,
      buttonLoading: false,
    };
  },
  methods: {
    addRecipe() {
      this.buttonLoading = true;

      fetch(`${process.env.VUE_APP_BASE_URL}/recipes/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          image: this.image,
          title: this.title,
          description: this.description,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            this.notification = true;
            this.message = data.error;
            return;
          }

          this.$router.push(`/recipe/${data.id}`);
        })
        .catch(() => {
          this.notification = true;
          this.message = 'Cannot connect to server. Please try again later';
        })
        .finally(() => {
          this.buttonLoading = false;
        });
    },
  },
};
</script>
