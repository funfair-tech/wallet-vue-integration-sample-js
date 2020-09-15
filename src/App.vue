<template>
  <div id="app">
    <WalletLeader
      :registerWalletEventsCallback="this.registerWalletEventsCallback"
    />
    <div class="App">
      <div class="App-container">
        <img class="App-logo" src="./assets/logo.svg" />
        <p v-if="loading">Loading please wait</p>
        <div class="action-buttons">
          <div v-if="!loading && !isLoggedIn">
            <LoggedOutActions />
          </div>
          <div v-if="!loading && isLoggedIn">
            <LoggedInActions />
          </div>
        </div>
        <div class="wallet-follower" v-if="!loading && isLoggedIn">
          <WalletFollower />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { WalletLeader, WalletFollower } from '@funfair-tech/wallet-vue';
import { login, logout } from './services/wallet-service';
import { registerEventListeners } from './services/wallet-service';
import LoggedInActions from './components/Logged-In-Actions.vue';
import LoggedOutActions from './components/Logged-Out-Actions.vue';
import {
  isAuthenticated$,
  restoreAuthenticationTaskCompleted$,
} from './services/store';

export default {
  name: 'App',
  components: {
    WalletLeader,
    LoggedInActions,
    LoggedOutActions,
    WalletFollower,
  },
  data: () => {
    return { isLoggedIn: false, loading: true };
  },
  methods: {
    registerWalletEventsCallback: function() {
      registerEventListeners();
    },
    login: function() {
      login();
    },
    logout: function() {
      logout();
    },
  },
  created: function() {
    const _this = this;
    isAuthenticated$.subscribe((value) => {
      _this.$data.isLoggedIn = value;
    });

    restoreAuthenticationTaskCompleted$.subscribe((value) => {
      if (value) {
        _this.$data.loading = false;
      }
    });
  },
};
</script>

<style>
body {
  margin: 0px;
}
.App {
  text-align: center;
  padding-bottom: 75px;
  background-color: #242424;
}

.App-logo {
  pointer-events: none;
  width: 200px;
  height: 100px;
}

.App-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.wallet-follower {
  margin-top: 10px;
  width: 100%;
}

.action-buttons button {
  margin-left: 10px;
}

.action-buttons {
  margin-bottom: 20px;
}

@media only screen and (max-width: 510px) {
  .action-buttons .logged-in {
    display: grid;
  }

  .action-buttons button {
    margin-bottom: 10px;
  }
}

button {
  background: linear-gradient(to bottom, #f7a2c6 0%, #ea166f 2px, #bc1159 100%);
  color: #fff;
  box-sizing: border-box;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  outline: none;
  border: none;
  -webkit-tap-highlight-color: transparent;
  display: inline-block;
  white-space: nowrap;
  text-decoration: none;
  vertical-align: baseline;
  text-align: center;
  margin: 0;
  min-width: 64px;
  line-height: 36px;
  padding: 0 16px;
  border-radius: 4px;
  overflow: visible;
  transform: translate3d(0, 0, 0);
  transition: background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),
    box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
