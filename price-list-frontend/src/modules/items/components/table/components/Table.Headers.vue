<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapState } from 'vuex';
import {UserState} from "@/types/user";
import {ItemSortType} from "@/types/item";

@Options({
  props: {
    items: [{ id: Number, name: String, price: Number }],
    sort: {} as ItemSortType
  },
  components: {},
  computed: {
    ...mapState<UserState>({
      username: (state: UserState) => state.user.username,
      isAuthenticated: (state: UserState) => state.user.isAuthenticated
    })
  }
})

export default class TableHeaders extends Vue {

  public sorting(key: string) {
    this.$emit('changeSort', key)
  }
}
</script>

<template>
  <div
      v-if="this.$props.items.length"
      class="pl-page-home--table-container_list-headers">
    <p
        @click="() => sorting(key)"
        :key="key"
        v-for="key in Object.keys(this.$props.items[0])">
      <b>{{ key }}</b>
      {{ this.$props.sort[key] ?? '' }}
    </p>
    <p>
      <b> actions </b>
    </p>
  </div>
</template>

<style lang="scss">


.pl-page-home--table-container_list-headers {
  display: flex;
  align-items: center;

  p {
    width: calc(100% / 4);
    text-align: center;
  }

  &[data-empty="true"] {
    border: 1px solid rgba(0, 0, 0, 0.4);
    p {
      width: 100%;
      text-align: center;
    }
  }
}
</style>