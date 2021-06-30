<template>
  <div class="container">
    <Notification v-if="notification" :message="message" />

    <Search @do-search="displaySearchResults" />

    <Loading v-if="loading" />

    <div v-else>
      <Content :data="data" title="Our Recipes" />
    </div>
  </div>
</template>

<script>
import { Content, Notification, Loading, Search } from '../components';

export default {
  name: 'Recipes',
  components: { Content, Notification, Loading, Search },
  data() {
    return {
      data: [],
      lastRecipeIndex: null,
      loadBtnVisible: false,
      notification: false,
      message: null,
      loading: false,
    };
  },
  methods: {
    displaySearchResults(data) {
      this.data = data;
    },
  },
  beforeMount() {
    this.loading = true;

    fetch(`${process.env.VUE_APP_BASE_URL}/recipes/all`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          this.notification = true;
          this.message = data.error;
          return;
        }

        if (data.length) {
          this.data = data;
          this.lastRecipeIndex = this.data[this.data.length - 1].id;
        }

        if (this.data.length && this.lastRecipeIndex !== 1) {
          this.loadBtnVisible = true;
        }
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
