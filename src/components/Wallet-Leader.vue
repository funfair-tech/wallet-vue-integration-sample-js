<template>
  <div class="wallet-leader">
    <div id="fun-wallet-leader">
      <div class="fun-wallet-container">
        <iframe
          allow="camera"
          id="funwallet-iframe"
          is-fun-wallet="true"
          is-leader="true"
          :onload="leaderLoaded()"
          frameborder="0"
        ></iframe>
      </div>
    </div>
    <div id="fun-wallet-darken"></div>
  </div>
</template>

<script>
export default {
  name: 'WalletLeader',
  props: {
    registerWalletEventsCallback: {
      type: Function,
    },
  },
  methods: {
    leaderLoaded() {
      // fix this race condition
      setTimeout(() => {
        window.funwallet.sdk.init();
        this.registerWalletEventsCallback();
      }, 2000);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wallet-leader {
  height: 0px;
}
</style>
