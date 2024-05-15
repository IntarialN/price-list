<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {apiService} from "@/services";
import {ItemErrorResponse, ModelItem} from "@/modules/items/models";

@Options({
  watch: {
    '$props': {
      handler() {
        this.mount();
      },
      deep: true
    }
  },
  props: {
    isOpened: Boolean,
    isEdit: Number,
    id: Number,
    items: [] as ModelItem[]
  },
  methods: {
    async toggle() {
      const isSuccess: (ModelItem & ItemErrorResponse) = await apiService(this.isEdit !== null ? 'patch' : 'post', `items/${ this.isEdit !== null ? this.$props.id : '' }`, { name: this.name, price: this.price })

      if (!isSuccess) return alert('Прозошла ошибка на сервере');
      if (isSuccess.message) return alert(isSuccess.message);
      else {
        if (this.isEdit !== null) {
          this.$store.dispatch('edit', {
            id: this.$props.id,
            name: this.name,
            price: this.price
          });
        } else {
          this.$store.dispatch('create', { id: isSuccess.id, name: isSuccess.name, price: isSuccess.price })
        }

        this.close()
      }
    },
    async mount() {
      if (!this.$props.isEdit) return;

      const item: ModelItem | undefined = this.$props.items.find((item: ModelItem) => item.id === this.$props.id)
      if (!item) return this.close();

      this.name = item.name;
      this.price = item.price;
    }
  }
})

export default class Create extends Vue {
  public loginKeys: ('name' | 'price')[] = ['name', 'price'];

  public name: string = '';
  public price: string = '';

  changeForm(event: Event, key: 'name' | 'price') {
    this[key] = (event.target as HTMLInputElement).value;
  }

  close() {
    this.name = '';
    this.price = '';

    this.$emit('close')
  }
}

</script>

<template>
  <div :style="{ opacity: this.$props.isOpened ? 1 : 0, pointerEvents: this.$props.isOpened ? 'auto' : 'none' }" class="pl-page-home--modal-login">
    <div class="pl-page-home--modal-login--filter" @click="close" />
    <div class="pl-page-home--modal-login-box">
      <div class="pl-page-home--modal-login-box--input">
        <v-text-field
            :key="key"
            :label="key"
            v-for="key in loginKeys"
            variant="solo-filled"
            @change="(event: Event) => changeForm(event, key)"
            v-model="this[key]"
            :type="key === 'price' ? 'number' : 'text'"
        />
        <v-btn @click="this.toggle" color="primary">
          {{ this.$props.isEdit !== null ? 'Edit' : 'Create' }}
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