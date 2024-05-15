<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapState } from 'vuex';
import {UserState} from "@/types/user";
import Login from "@/modules/user/components/Login.vue";

@Options({
  components: {Login},
  computed: {
    ...mapState<UserState>({
      username: (state: UserState) => state.user.username,
      isAuthenticated: (state: UserState) => state.user.isAuthenticated
    })
  }
})

export default class Header extends Vue {
  public isOpenedLogin: boolean = false;

  public toggleLoginMenu(open: boolean) {
    this.isOpenedLogin = open;
  }
}
</script>

<template>
  <div class="pl-page-home--header">
    <v-btn
        v-if="!this.isAuthenticated"
        @click="toggleLoginMenu(!isOpenedLogin)"
        color="primary">
      Login
    </v-btn>
    <v-btn
        v-if="this.isAuthenticated"
        color="primary">
      {{ this.username }}
    </v-btn>
  </div>
  <Login
      :is-opened="isOpenedLogin"
      @close="() => toggleLoginMenu(false)"
  />
</template>

<style lang="scss">
.pl-page-home--header {
  width: 100%;
  padding: 50px 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: black;
}
</style>