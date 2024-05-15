<template>
  <PriceList msg="Welcome to Your Vue.js + TypeScript App"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import PriceList from './components/PriceList.vue';

@Options({
  components: {
    PriceList,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &::-webkit-scrollbar {
    width: 0;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
