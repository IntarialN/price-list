<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Login from "@/modules/user/components/Login.vue";
import UserLocalStorage from "@/modules/user/services/user.localStorage";
import {Action, State} from "vuex-class";

@Options({
  components: {Login}
})

export default class Header extends Vue {

  @State((state) => state.user.isAuthenticated) isAuthenticated!: number;
  @Action quit!: () => void;

  public isOpenedLogin: boolean = false;

  public toggleLoginMenu(open: boolean) {
    this.isOpenedLogin = open;
  }

  public exit() {
    UserLocalStorage.clearAuthLocalStorage();
    this.quit();
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
      Авторизован
    </v-btn>
    <v-btn
        v-if="this.isAuthenticated"
        @click="exit"
        color="primary">
      Выйти
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
  padding: 15px 30px;
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: #013470;
}
</style>