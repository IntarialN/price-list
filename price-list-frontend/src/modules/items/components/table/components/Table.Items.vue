<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    items: [{ id: Number, name: String, price: Number }],
  }
})

export default class TableItems extends Vue {
}
</script>

<template>

  <div
      v-if="this.$props.items.length"
      class="pl-page-home--table-container_list-content"
  >
    <div
        v-for="item in this.$props.items"
        :key="item.id"
        class="pl-page-home--table-container_list-content-source"
    >
      <p
          class="pl-page-home--table-container_list-content-source_slot"
          :key="key"
          v-for="key in Object.keys(item)">
        {{
          item[key as 'name'] === 'number' ? item[key as 'price'].toLocaleString('ru') : item[key as 'name']
        }}
      </p>
      <div
          class="pl-page-home--table-container_list-content-source_slot"
      >
        <div
            class="pl-page-home--table-container_list-content-source_slot-action"
            @click="() => this.$emit('edit', item.id)"
        >
          <mdicon name="pencil" />
        </div>
        <div
            class="pl-page-home--table-container_list-content-source_slot-action"
            @click="() => this.$emit('remove', item.id)"
        >
          <mdicon name="delete" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.pl-page-home--table-container_list-content {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  &-source {
    display: flex;
    align-items: center;
    width: 100%;

    &_slot {
      width: calc(100% / 4);
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;

      &-action {
        cursor: pointer;
        transition: .3s;

        &:hover {
          opacity: .7;
        }
      }
    }
  }
}
</style>