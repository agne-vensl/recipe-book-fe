<template>
  <button :type="type || 'button'" :class="classes" :disabled="loading">
    <div>
      <Loading v-if="loading" small="small" />

      <slot v-else />
    </div>
  </button>
</template>

<script>
import Loading from './Loading.vue';

export default {
  name: 'Button',
  props: ['loading', 'type', 'classes'],
  components: { Loading },
};
</script>

<style scoped>
button {
  min-width: 4.8rem;
}

button div {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
