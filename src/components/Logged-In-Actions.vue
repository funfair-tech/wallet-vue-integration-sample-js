<template>
  <div className="logged-in">
    <button @click="signAMessage">Sign message</button>
    <button @click="sendSignedTransaction">
      Send signed transaction
    </button>
    <button @click="openKycProcess">Start KYC</button>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import {
  logout,
  openKycProcess,
  sendTransaction,
  signAMessage,
} from '../services/wallet-service';

export default {
  name: 'LoggedInActions',
  methods: {
    async signAMessage() {
      const signature = await signAMessage('TESTME');
      console.log('Sign message complete. sig -', signature);
    },
    async sendSignedTransaction() {
      const signature = await sendTransaction({
        to: '0x45Cd08334aeedd8a06265B2Ae302E3597d8fAA28',
        value: '0x00', // 0x38d7ea4c68000 if you want to add some value 0.002 ETH
      });

      console.log('Send signed transaction complete. sig -', signature);
    },
    async openKycProcess() {
      await openKycProcess();
    },
    logout() {
      logout();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
