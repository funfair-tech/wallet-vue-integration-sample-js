<template>
  <div className="logged-out">
    <button @click="login">Login</button>
  </div>
</template>

<script>
import { login } from '../services/wallet-service';

export default {
  name: 'LoggedOutActions',
  methods: {
    login() {
      login();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
