<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from "@/modules/items/components/Header.vue";
import Table from "@/modules/items/components/table/Table.vue";


@Options({
  components: {Table, Header}

})
export default class Home extends Vue {

}
</script>

<template>
  <div class="pl-page-home">
    <Header />
    <Table />
  </div>
</template>

<style lang="scss">
.pl-page-home {
  width: 100%;
  height: 100%;
}
</style>