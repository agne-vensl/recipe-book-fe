<template>
  <div class="container">
    <Notification v-if="notification" :message="message" />

    <section id="about">
      <div class="about">
        <h1>It's all about good food & taste</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, quos hic expedita,
          architecto harum ut molestiae voluptatum, dignissimos officia laudantium explicabo?
          Incidunt, in sed libero repellat placeat voluptatum illum dolorum?
        </p>
      </div>

      <section id="pictures">
        <div class="picture first"></div>
        <div class="picture second"></div>
        <div class="picture third"></div>
      </section>
    </section>

    <Loading v-if="loading" />

    <section id="recipes" v-else>
      <Content :data="data" title="Our Recipes" />

      <div class="align-right">
        <Button classes="button primary" @click="routeChange">See all recipes </Button>
      </div>
    </section>
  </div>
</template>

<script>
import { Content, Notification, Loading, Button } from '../components';

export default {
  name: 'Home',
  components: { Content, Notification, Loading, Button },
  data() {
    return {
      data: [],
      notification: false,
      message: null,
      loading: false,
    };
  },
  methods: {
    routeChange() {
      this.$router.push('/recipes');
    },
  },
  beforeMount() {
    this.loading = true;

    fetch(`${process.env.VUE_APP_BASE_URL}/recipes`)
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

<style scoped>
#about {
  margin-bottom: 6rem;
  margin-top: 4rem;
}

p {
  line-height: 1.7rem;
}
@media only screen and (min-width: 768px) {
  #about {
    display: flex;
    height: 40vh;
    margin-bottom: 9rem;
  }

  #pictures {
    position: relative;
  }

  .picture {
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
    height: 15rem;
    width: 15rem;
    position: absolute;
  }

  .picture.first {
    background-image: url('../assets/picture-1.jpg');
    border-radius: 50%;
    top: 0;
    left: 20rem;
  }

  .picture.second {
    background-image: url('../assets/picture-2.jpg');
    border-radius: 50%;
    height: 15rem;
    width: 20rem;
    top: 10rem;
    left: 8rem;
  }

  .picture.third {
    background-image: url('../assets/picture-3.jpg');
    background-position: center;
    border-radius: 10%;
    height: 12rem;
    width: 17rem;
    top: 1rem;
    left: 2rem;
    z-index: -1;
  }

  .about {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 50%;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 500;
  }

  #recipes {
    padding-bottom: 3rem;
  }
}
</style>
