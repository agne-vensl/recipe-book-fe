<template>
  <div class="container">
    <Notification v-if="notification" :message="message" />

    <Loading v-if="loading" />

    <div v-else>
      <Content :data="data" title="Your Favourite Recipes" />
    </div>
  </div>
</template>

<script>
import { Content, Notification, Loading } from '../components';

export default {
  name: 'Favourites',
  components: { Content, Notification, Loading },
  data() {
    return {
      data: [],
      notification: false,
      message: null,
      loading: false,
    };
  },
  beforeMount() {
    this.loading = true;

    const token = `Bearer ${localStorage.getItem('token')}`;

    fetch(`${process.env.VUE_APP_BASE_URL}/favourites/getall`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          this.notification = true;
          this.message = data.error;
          return;
        }

        this.data = data;
      })
      .catch(() => {
        this.notification = true;
        this.message = 'Cannot connect to server. Please try again later';
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>
