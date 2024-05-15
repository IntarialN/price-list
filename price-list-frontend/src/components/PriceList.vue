<template>
  <div class="pl-page">
    <Home />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Home from "@/modules/items/views/Home.vue";

  @Options({
    components: {Home},
    props: {
      msg: String
    }
  })

  export default class PriceList extends Vue {
    msg!: string
  }
</script>

<style lang="scss">
.pl-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
