<template>
  <div class="notification error">
    <div class="delete" @click="$parent.notification = false">&times;</div>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: ['message'],
};
</script>

<style>
.notification {
  border-radius: 10px;
  margin-bottom: 1.5rem;
  padding: 1.5rem 1rem;
  position: relative;
}

.delete {
  background-color: rgba(10, 10, 10, 0.2);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  height: 1.5rem;
  width: 1.5rem;
}

.error {
  background-color: #feecf0;
  color: #cc0f35;
}
</style>
