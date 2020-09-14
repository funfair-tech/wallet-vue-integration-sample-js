<template>
  <iframe
    id="fun-wallet-follower"
    :src="url"
    :onload="followerLoadedEvent()"
    is-fun-wallet="true"
    is-follower="true"
  ></iframe>
</template>

<script>
export default {
  name: 'WalletFollower',
  props: {
    page: {
      type: String,
    },
  },
  data: () => {
    return { url: undefined };
  },
  created: function() {
    let url = window.funwallet.getWalletFollowerURL();
    if (this.props && this.props.page) {
      url = this.updateRouteToValue(url, this.props.page);
    }

    this.$data.url = url;
  },
  methods: {
    followerLoadedEvent() {
      window.funwallet.sdk.registerFollowerInstance();
    },
    updateRouteToValue(url, page) {
      const walletUri = new URL(url);
      const searchParams = new URLSearchParams(walletUri.search);
      searchParams.set('routeTo', window.funwallet.formatRouterToValue(page));
      return (
        walletUri.origin + walletUri.pathname + '?' + searchParams.toString()
      );
    },
    async followerLoaded() {
      await window.funwallet.sdk.registerFollowerInstance();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
iframe#fun-wallet-follower {
  width: inherit;
}
</style>
