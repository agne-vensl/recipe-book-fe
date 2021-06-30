<template>
  <form>
    <slot />
  </form>
</template>

<script>
export default {
  name: 'Form',
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

form:deep(label) {
  display: block;
  margin-bottom: 0.5rem;
}

form:deep(.input-field) {
  margin-bottom: 2rem;
}

form:deep(.input) {
  border: 1px solid #ececec;
  border-radius: 5px;
  outline-color: rgb(95, 95, 95);
  padding: 0.8rem 1rem;
  width: 100%;
}

form:deep(textarea) {
  min-height: 10rem;
  resize: vertical;
}

@media only screen and (min-width: 768px) {
  form {
    margin: 3rem auto;
  }
}
</style>
