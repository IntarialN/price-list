<script lang="ts">
/* eslint-disable */

import { Options, Vue } from 'vue-class-component';
import Header from "@/modules/items/components/Header.vue";
import Table from "@/modules/items/components/table/Table.vue";
import {apiService} from "@/services";
import {mapState} from "vuex";
import {ItemFindResponse, ModelItem} from "@/modules/items/models";
import { State, Action } from 'vuex-class';
import Login from "@/modules/user/components/Login.vue";
import Create from "@/modules/items/components/create/Create.vue";
import UserLocalStorage from "@/modules/user/services/user.localStorage";
import {User} from "@/types/user";


@Options({
  components: {Create, Login, Table, Header},
  computed: {
    ...mapState<ModelItem>({
      itemsPerPage: (state: { items: { itemsPerPage: number } }) => state.items.itemsPerPage,
    }),
    ...mapState<User>({
      isAuthenticated: (state: User) => state.isAuthenticated,
    })
  },
})

export default class Home extends Vue {
  @State((state) => state.items.itemsPerPage) itemsPerPage!: number;

  @Action load!: (items: any, pages: number) => void;
  @Action login!: (username: string) => void;

  public isOpenedCreate: boolean = false;
  public isEdit: number | null = null;

  public toggleCreateMenu(open: boolean) {
    this.isOpenedCreate = open;
  }

  public editItem(id: number | null) {
    this.isEdit = id;
    this.toggleCreateMenu(true)
  }

  async mounted() {
    await this.loadItems();
    await this.authUser();
  }

  async loadItems() {
    const isLoaded: ItemFindResponse = await apiService('get', 'items', { page: 1, itemsPerPage: this.itemsPerPage })
    this.load(isLoaded.items, isLoaded.pages);
  }

  async authUser() {
    const token = UserLocalStorage.checkAuthLocalStorage();
    if (token) {
      this.login('localStorage');
    }
  }
}
</script>

<template>
  <div class="pl-page-home">
    <Header />
    <Table
      @edit="editItem"
    />
    <Create
        :is-opened="isOpenedCreate"
        :is-edit="isEdit"
        :id="isEdit"
        @close="() => toggleCreateMenu(false)"
    />
  </div>
</template>

<style lang="scss">
.pl-page-home {
  width: 100%;
  height: 100%;
}
</style>