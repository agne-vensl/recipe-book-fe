<template>
  <form name="search" @submit.prevent="doSearch">
    <input
      type="text"
      minlength="3"
      placeholder="Search..."
      class="input"
      required
      v-model="search"
    />

    <Button classes="button primary" :loading="loading" type="submit">
      <i class="fas fa-search"></i>
    </Button>
  </form>
</template>

<script>
import { Button } from '.';

export default {
  name: 'Search',
  components: { Button },
  data() {
    return {
      search: '',
      loading: false,
    };
  },
  methods: {
    doSearch() {
      const newSearch = this.search
        .trim()
        .toLowerCase()
        .replace(/ /g, '-');

      this.loading = true;

      fetch(`${process.env.VUE_APP_BASE_URL}/search/${newSearch}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            this.$parent.notification = true;
            this.$parent.message = data.error;
            return;
          }

          this.$parent.data = data;
        })
        .catch(() => {
          this.$parent.notification = true;
          this.$parent.message = 'Cannot connect to server. Please try again later';
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
form {
  margin-bottom: 2.5rem;
  text-align: right;
}

form input {
  border: 1px solid #ececec;
  border-radius: 25px;
  /* margin: 1rem 0; */
  display: block;
  margin-top: auto;
  margin-left: auto;

  margin-bottom: 1rem;
  /* border-radius: 5px; */
  /* outline-color: rgb(95, 95, 95); */
  padding: 0.55rem 1rem;
  outline: 0;
}

form input:focus {
  box-shadow: 0 0 0 1px rgb(95, 95, 95);
}

@media only screen and (min-width: 768px) {
  form {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  form input {
    margin-bottom: 0;
    margin-right: 1rem;
  }
}
</style>
