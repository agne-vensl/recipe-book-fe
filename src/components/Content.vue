<template>
  <h2>{{ title }}</h2>

  <div v-if="data.length" class="content">
    <div v-for="elem in data" :key="elem.id" class="card">
      <img :src="elem.image" :alt="elem.title.toLowerCase().replace(' ', '-')" />

      <div class="details shadow">
        <div class="header">
          <span class="timestamp">{{ formatTimestamp(elem.timestamp) }}</span>
          <span class="author">{{ elem.name + ' ' + elem.surname }}</span>
        </div>

        <div class="body">
          <router-link :to="{ path: `/recipe/${elem.id}` }" class="title"
            >{{ elem.title }}
          </router-link>
          <Button classes="button primary" @click="routeChange(elem.id)">Read More</Button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="content">
    <div class="no-results">
      No results
    </div>
  </div>
</template>

<script>
import { Button } from '.';

export default {
  name: 'Content',
  props: ['data', 'title'],
  components: { Button },
  methods: {
    formatTimestamp(date) {
      const timestamp = date.substring(0, date.lastIndexOf(':')).replace('T', ' ');
      return timestamp;
    },
    routeChange(id) {
      this.$router.push(`/recipe/${id}`);
    },
  },
};
</script>

<style scoped>
.content {
  min-height: 30vh;
  margin-bottom: 2rem;
}

.no-results {
  color: #ac9885;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.card {
  border: 1px solid #ececec;
  border-radius: 1rem;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
}

img {
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
  display: block;
  object-position: center;
  object-fit: cover;
  height: 250px;
  width: 100%;
}

.details {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.header {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
}

.title {
  color: #565656;
  display: inline-block;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  text-align: center;
}

.title:hover {
  color: rgb(255, 185, 2);
}

.body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
}

button {
  display: block;
  margin-top: auto;
}

@media screen and (min-width: 500px) {
  .content {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  .card {
    margin-bottom: 1rem;
    width: calc(50% - 0.5rem);
  }

  .card:not(:nth-child(2n)) {
    margin-right: 1rem;
  }
}

@media screen and (min-width: 860px) {
  .card {
    width: calc(25% - 0.75rem);
  }

  .card:not(:nth-child(4n)) {
    margin-right: 1rem;
  }
}
</style>
