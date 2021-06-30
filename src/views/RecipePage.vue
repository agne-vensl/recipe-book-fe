<template>
  <Loading v-if="pageLoading" />

  <div v-else class="container">
    <Notification v-if="notification && !commentNotification" :message="message" />

    <div v-if="data">
      <h1>{{ data.title }}</h1>

      <section class="recipe-container">
        <div class="image" :style="{ backgroundImage: `url(${data.image})` }"></div>

        <div class="recipe-details">
          <div class="author">
            <span class="bold">Author:</span> {{ data.name + ' ' + data.surname }}
          </div>
          <span>{{ formatTimestamp(data.timestamp) }}</span>

          <h3>Description:</h3>
          <p class="description">{{ data.description }}</p>

          <Button
            v-if="loggedIn"
            :loading="favouriteButtonLoading"
            classes="button primary"
            @click="updateFavourite"
          >
            {{ data.favourite ? 'Remove from favourites' : 'Add to favourites' }}
          </Button>

          <div class="not-logged-in" v-else to="/login">
            Login to add this recipe to your favourites...
          </div>
        </div>
      </section>

      <section class="comments">
        <h3>Comments:</h3>

        <div v-for="[index, comment] in comments.entries()" :key="comment.id" class="comment">
          <div class="comment-header">
            <div>
              <span>#{{ index + 1 }}</span>
              <span class="comment-author">{{ comment.name + ' ' + comment.surname }}</span>
            </div>

            <span>{{ formatTimestamp(comment.timestamp) }}</span>
          </div>

          <div class="comment-body">
            {{ comment.comment }}
          </div>
        </div>

        <div v-show="!comments.length">There are no comments yet.</div>
      </section>

      <section v-if="loggedIn" class="comment-box">
        <div class="form-container">
          <Notification v-if="notification && commentNotification" :message="message" />

          <Form @submit.prevent="postComment">
            <h2>Write a comment:</h2>

            <div class="input-field">
              <textarea
                id="comment"
                class="input"
                cols="30"
                rows="10"
                placeholder="Your comment here..."
                required
                v-model="userComment"
              ></textarea>
            </div>

            <div class="align-right">
              <Button :loading="commentButtonLoading" type="submit" classes="button primary">
                Post comment
              </Button>
            </div>
          </Form>
        </div>
      </section>

      <div v-else class="not-logged-in">
        Login to write a comment...
      </div>
    </div>
  </div>
</template>

<script>
import { Loading, Button, Form, Notification } from '../components';

export default {
  name: 'RecipePage',
  components: { Loading, Button, Form, Notification },
  data() {
    return {
      data: null,
      comments: [],
      userComment: '',
      loggedIn: localStorage.getItem('token'),
      commentNotification: false,
      notification: false,
      message: null,
      pageLoading: false,
      commentButtonLoading: false,
      favouriteButtonLoading: false,
    };
  },
  methods: {
    formatTimestamp(date) {
      const timestamp = date.substring(0, date.lastIndexOf(':')).replace('T', ' ');
      return timestamp;
    },
    updateFavourite() {
      const token = `Bearer ${localStorage.getItem('token')}`;

      let link;
      let method;

      if (!this.data.favourite) {
        link = 'add';
        method = 'POST';
      } else {
        link = 'remove';
        method = 'DELETE';
      }

      fetch(`${process.env.VUE_APP_BASE_URL}/favourites/${link}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ recipeId: this.data.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            this.notification = true;
            this.message = data.error;
            return;
          }

          this.data.favourite = !this.data.favourite;
        })
        .catch(() => {
          this.notification = true;
          this.message = 'Cannot connect to server. Please try again later';
        });
    },
    postComment() {
      const token = `Bearer ${localStorage.getItem('token')}`;

      this.commentButtonLoading = true;

      fetch(`${process.env.VUE_APP_BASE_URL}/comments/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          comment: this.userComment,
          recipeId: this.data.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            this.commentNotification = true;
            this.notification = true;
            this.message = data.error;
            return;
          }

          this.comments.push(data.comment);
          this.userComment = '';
        })
        .catch(() => {
          this.commentNotification = true;
          this.notification = true;
          this.message = 'Cannot connect to server. Please try again later';
        })
        .finally(() => {
          this.commentButtonLoading = false;
        });
    },
  },
  beforeMount() {
    const token = `Bearer ${localStorage.getItem('token')}`;

    this.pageLoading = true;

    fetch(`${process.env.VUE_APP_BASE_URL}/recipes/recipe/${this.$route.params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

        this.data = data.data;
        this.comments = data.comments;
        this.heartClass = this.data.favourite ? 'fas' : 'far';
      })
      .catch(() => {
        this.notification = true;
        this.message = 'Cannot connect to server. Please try again later';
      })
      .finally(() => {
        this.pageLoading = false;
      });
  },
};
</script>

<style scoped>
section {
  margin-bottom: 4rem;
}

.recipe-details {
  font-weight: 400;
}

.image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.5);
  border-radius: 25% 60% 40% 40%;
  height: 50vh;
  margin-bottom: 3rem;
}

.author {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.bold,
h3 {
  font-weight: 600;
}

h3 {
  font-size: 1.5rem;
}

.description {
  color: #565656;
  font-size: 1.1rem;
  font-weight: 400;
  white-space: pre-line;
}

.not-logged-in {
  color: #565656;
  font-size: 0.85rem;
  margin: 2rem 0;
}

.comment {
  background: #fff;
  /* border-radius: 2rem 25% 2rem 2rem; */
  /* border-top-right-radius: 25%; */
  -webkit-box-shadow: 0px 0px 15px -8px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 0px 15px -8px rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
  padding: 1.2rem 0.5rem 0.5rem 0.5rem;
  position: relative;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
}

.comment-header :first-child * {
  font-size: 1.1rem;
  font-weight: 500;
}

.comment-header div :not(:last-child) {
  margin-right: 0.5rem;
}

.comment-body {
  color: #565656;
  padding: 1.5rem 0.5rem;
}

@media only screen and (min-width: 768px) {
  .recipe-container {
    display: flex;
    padding: 4rem 0;
  }

  .recipe-container > * {
    flex: 1;
  }

  .image {
    height: 60vh;
    margin-bottom: 0;
  }

  .recipe-details {
    padding-left: 5rem;
  }

  .comments {
    width: 60%;
  }

  .form-container {
    margin-left: 0;
    margin-right: auto;
    max-width: 60%;
    width: 60%;
  }
}
</style>
