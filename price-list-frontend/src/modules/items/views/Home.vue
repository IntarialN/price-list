<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from "@/modules/items/components/Header.vue";
import Table from "@/modules/items/components/table/Table.vue";
import {apiService} from "@/services";
import {ItemFindResponse, ModelItem} from "@/modules/items/models";
import { State, Action } from 'vuex-class';
import Login from "@/modules/user/components/Login.vue";
import Create from "@/modules/items/components/create/Create.vue";
import UserLocalStorage from "@/modules/user/services/user.localStorage";
import {ItemSortKeys, ItemSortType} from "@/types/item";

@Options({
  components: {Create, Login, Table, Header}
})

export default class Home extends Vue {
  @State((state) => state.items.items) items!: ModelItem[];
  @State((state) => state.items.itemsPerPage) itemsPerPage!: number;
  @State((state) => state.items.activePage) activePage!: number;
  @State((state) => state.user.isAuthenticated) isAuthenticated!: number;

  @Action load!: (data: { items: ModelItem[], pages: number }) => void; // eslint-disable-line no-unused-vars
  @Action login!: (username: string) => void; // eslint-disable-line no-unused-vars

  public isOpenedCreate: boolean = false;
  public isEdit: number | null = null;
  public searchValue: string = '';
  public sort: ItemSortType = {} as ItemSortType;

  public toggleCreateMenu(open: boolean) {
    this.isOpenedCreate = open;
    if (!open) {
      this.isEdit = null
      this.isOpenedCreate = false
    }
  }

  public editItem(id: number | null) {
    this.isEdit = id;
    this.toggleCreateMenu(true)
  }

  public createItem() {
    this.isOpenedCreate = true;
  }

  public changeSearch(event: Event) {
    this.searchValue = (event.target as HTMLInputElement).value;
  }

  public changeSort(key: ItemSortKeys) {
    if (key === 'name' || key === 'price') {
      const sortValue = this.sort[key];
      if (sortValue) {
        if (this.sort[key] === 'DESC') {
          delete this.sort[key];
        } else {
          this.sort[key] = sortValue === 'ASC' ? 'DESC' : 'ASC'
        }
      } else {
        this.sort[key] = 'ASC';
      }
    }

    this.loadItems();
  }

  async mounted() {
    await this.loadItems();
    await this.authUser();
  }

  async loadItems() {
    const isLoaded: ItemFindResponse = await apiService('get', 'items', {
      page: this.activePage,
      itemsPerPage: this.itemsPerPage,
      searchName: this.searchValue,
      sort: JSON.stringify(this.sort)
    })
    if (isLoaded.items) {
      this.load({items: isLoaded.items, pages: isLoaded.pages});
    }
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
        v-if="this.isAuthenticated"
        :sort="sort"
        :searchValue="searchValue"
        @search="loadItems"
        @changeSort="changeSort"
        @changeSearch="changeSearch"
        @edit="editItem"
        @create="createItem"
    />
    <Create
        :is-opened="isOpenedCreate"
        :is-edit="isEdit"
        :id="isEdit"
        :items="this.items"
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