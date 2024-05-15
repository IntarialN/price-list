<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {Action, State} from "vuex-class";
import {ItemFindResponse, ModelItem} from "@/modules/items/models";
import {apiService} from "@/services";
import {ItemSortType} from "@/types/item";

@Options({
  props: {
    show: Number,
    pages: Number,
    sort: {} as ItemSortType,
    searchValue: String
  }
})
export default class TablePagination extends Vue {
  @State((state) => state.items.itemsPerPage) itemsPerPage!: number;
  @State((state) => state.items.activePage) activePage!: number;

  @Action update!: (data: { items: ModelItem[], pages: number }) => void; // eslint-disable-line no-unused-vars
  @Action updatePage!: (page: number) => void; // eslint-disable-line no-unused-vars

  async updateActivePage(page: number, sort: ItemSortType, searchValue: string) {
    const isLoaded: ItemFindResponse = await apiService('get', 'items', { page: page, itemsPerPage: this.itemsPerPage, sort: JSON.stringify(sort), searchValue: searchValue });

    if (isLoaded.items.length) {
      this.update({items: isLoaded.items, pages: isLoaded.pages});
      this.updatePage(page);
    } else {
      alert('Эта страница пуста')
    }
  }
}
</script>

<template>
  <div
      v-if="this.$props.show"
      class="pl-page-home--table-container_pagination">
    <div
      class="pl-page-home--table-container_pagination--content"
    >
      <div
          :key="index"
          v-for="index in this.pages"
          :class="{ 'active': this.activePage === index }"
          @click="() => updateActivePage(index, this.$props.sort, this.$props.searchValue)"
      >
        {{ index }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">


.pl-page-home--table-container_pagination {
  display: flex;
  align-items: center;

  &--content {
    display: flex;
    align-items: center;
    border: 1px solid black;
    border-radius: 10px;
    overflow: hidden;

    div {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid black;
      cursor: pointer;
      transition: .3s;


      &:hover {
        color: rgba(0, 0, 0, 0.5);
      }

      &:nth-last-child(1) {
        border-right: none;
      }
    }

    .active {
      background: #013470;
      color: white;
      pointer-events: none;
    }
  }
}
</style>