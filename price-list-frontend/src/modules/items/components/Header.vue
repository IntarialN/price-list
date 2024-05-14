<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({

})
export default class Header extends Vue {

}
</script>

<template>
  <div class="pl-page-home--header">

  </div>
</template>

<style lang="scss">
.pl-page-home--header {
  width: 100%;
  padding: 50px 30px;
  display: flex;
  align-items: flex-end;
  background: black;
}
</style>