<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapState } from 'vuex';
import {UserState} from "@/types/user";

@Options({
  components: {},
  computed: {
    ...mapState<UserState>({
      username: (state: UserState) => state.user.username,
      isAuthenticated: (state: UserState) => state.user.isAuthenticated
    })
  }
})

export default class Header extends Vue {
  public searchValue: string = '';

  public search() {
  }

  changeSearch(event: Event) {
    this.searchValue = (event.target as HTMLInputElement).value;
  }
}
</script>

<template>
  <div class="pl-page-home--table">
    <div class="pl-page-home--table-container">
      <div class="pl-page-home--table-container_search">
        <v-text-field
            variant="solo-filled"
            label="Search"
            @change="changeSearch"
        />
        <v-btn
            class="pl-page-home--table-container_search--btn"
            @click="search()"
            color="primary"
        >
          Search
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.pl-page-home--table {
  padding: 10%;
  flex-grow: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &-container {
    width: 50%;
    height: 40%;

    &_search {
      position: relative;
      display: flex;
      align-items: center;

      .v-input__details {
        display: none;
      }

      &--btn {
        position: absolute;
        right: 10px;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
}
</style>