<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapState } from 'vuex';
import TableHeaders from './components/Table.Headers.vue';
import TableItems from './components/Table.Items.vue';
import {ModelItem} from "@/modules/items/models";

@Options({
  components: {TableHeaders, TableItems},
  computed: {
    ...mapState<ModelItem>({
      items: (state: { items: { items: ModelItem } }) => state.items.items,
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

  remove(id: number) {
    this.$emit('edit', id);
  }

  edit(id: number) {
    this.$emit('edit', id);
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
      <div class="pl-page-home--table-container_list">
        <TableHeaders
            :items="this.items"
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