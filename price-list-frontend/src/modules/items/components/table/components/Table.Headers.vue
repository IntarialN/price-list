<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapState } from 'vuex';
import {UserState} from "@/types/user";

@Options({
  props: {
    items: [{ id: Number, name: String, price: Number }],
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
}
</script>

<template>
  <div
      v-if="this.$props.items.length"
      class="pl-page-home--table-container_list-headers">
    <p
        :key="key"
        v-for="key in Object.keys(this.$props.items[0])">
      <b>{{ key }}</b>
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