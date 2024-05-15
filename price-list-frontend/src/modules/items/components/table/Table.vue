<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TableHeaders from './components/Table.Headers.vue';
import TableItems from './components/Table.Items.vue';
import TablePagination from './components/Table.Pagination.vue';
import {ModelItem} from "@/modules/items/models";
import {Action, State,} from "vuex-class";
import {apiService} from "@/services";
import {ItemSortType} from "@/types/item";

@Options({
  props: {
    sort: {} as ItemSortType,
    searchValue: String
  },
  components: {TablePagination, TableHeaders, TableItems}
})

export default class Table extends Vue {
  @State((state) => state.items.items) items!: number;
  @State((state) => state.items.pages) pages!: number;
  @State((state) => state.items.itemsPerPage) itemsPerPage!: number;
  @State((state) => state.items.activePage) activePage!: number;

  @Action load!: (data: { items: ModelItem[], pages: number }) => void; // eslint-disable-line no-unused-vars
  @Action deleteItem!: (id: number) => void; // eslint-disable-line no-unused-vars

  async remove(id: number) {
    const isRemoved: boolean | { message: string } = await apiService('delete', `items/${ id !== undefined ? id : '' }`)

    if (typeof isRemoved === 'boolean' && isRemoved) {
      this.deleteItem(id);
    }
  }

  edit(id: number) {
    this.$emit('edit', id);
  }

  createItem() {
    this.$emit('create');
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
            @change="(event: Event) => this.$emit('changeSearch', event)"
        />
        <v-btn
            class="pl-page-home--table-container_search--btn"
            @click="this.$emit('search')"
            color="primary"
        >
          Search
        </v-btn>
      </div>
      <div class="pl-page-home--table-container_list">
        <TableHeaders
            :items="this.items"
            :sort="this.$props.sort"
            @changeSort="(key: ItemSortKeys) => this.$emit('changeSort', key)"
        />
        <TableItems
          :items="this.items"
          @remove="remove"
          @edit="edit"
        />
        <div
            v-if="!this.items.length"
            class="pl-page-home--table-container_list-headers"
            data-empty="true">
          <p>
            Items is empty
          </p>
        </div>
      </div>
    </div>
    <TablePagination
        :show="this.items.length"
        :pages="this.pages"
        :items-per-page="this.itemsPerPage"
        :sort="this.$props.sort"
        :searchValue="this.$props.searchValue"
    />
    <v-btn
        @click="createItem"
        color="primary">
      Create New Item
    </v-btn>
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
  gap: 50px;

  &-container {
    width: 50%;
    height: 40%;
    display: flex;
    flex-direction: column;
    gap: 3vh;

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

    &_list {
      display: flex;
      flex-direction: column;
      gap: 25px;
    }
  }
}
</style>