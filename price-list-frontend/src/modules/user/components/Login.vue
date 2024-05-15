<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {apiService} from "@/services";
import UserLocalStorage from "@/modules/user/services/user.localStorage";

@Options({
  props: {
    isOpened: Boolean,
    close: () => Boolean
  },
  methods: {
    async login() {
      const isLoggined = await apiService('post', 'users/login', { username: this.username, password: this.password })

      if (!isLoggined.accessToken) alert(isLoggined.message);
      else {
        this.$store.dispatch('login', this.username);
        this.$emit('close');

        UserLocalStorage.setAuthLocalStorage(isLoggined.accessToken);
      }
    }
  }
})

export default class Login extends Vue {
  public loginKeys: ('username' | 'password')[] = ['username', 'password'];

  public username: string = '';
  public password: string = '';

  changeForm(event: Event, key: 'username' | 'password') {
    this[key] = (event.target as HTMLInputElement).value;
  }
}

</script>

<template>
  <div :style="{ opacity: this.$props.isOpened ? 1 : 0, pointerEvents: this.$props.isOpened ? 'auto' : 'none' }" class="pl-page-home--modal-login">
    <div class="pl-page-home--modal-login--filter" @click="$emit('close')" />
    <div class="pl-page-home--modal-login-box">
      <div class="pl-page-home--modal-login-box--input">
        <v-text-field
            :key="key"
            v-for="key in loginKeys"
            variant="solo-filled"
            @change="(event: Event) => changeForm(event, key)"
            :label="key"
        />
        <v-btn @click="this.login" color="primary">
          Login
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.pl-page-home--modal-login {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .3s;

  &--filter {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  &-box {
    z-index: 2;
    width: 35%;
    height: 30%;
    background: white;
    box-shadow: 0 0 40px 10px rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 50px;

    &--input {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }
  }
}
</style>