<template>
  <div class="d-grid gap-2">
    <label>Tarefas</label> 
    <form @submit.prevent.stop="addItem">
      <div class="input-group mb-3">
        <input
          id='todoItem'
          type="text"
          class="form-control"
          placeholder="Tarefa"
          v-model="text"
          aria-label="Tarefa"
          aria-describedby="button-addon2"
        />
        <button
          class="btn btn-outline-primary"
          :disabled="!text"
          type="button"
          id="button-addon2"
        >
          Adicionar
        </button>
      </div>
    </form>
    <div class="list-group">
      <template v-for="(item, index) in mutateValue">
        <div
          class="
            list-group-item
            d-flex
            justify-content-between
            align-items-center
          "
          :key="`item-${index}`"
          v-if="!item.remove || !item.done"
        >
          <label
            class="noselect"
            :class="{
              'list-group-item-light text-decoration-line-through': item.done,
            }"
          >
            <input
              class="form-check-input me-1"
              type="checkbox"
              v-model="item.done"
            />
            {{ item.value }}
          </label>
          <button
            v-if="item.done"
            type="submit"
            class="btn btn-sm btn-danger"
            @click="item.remove = true"
          >
            <strong>X</strong>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      mutateValue: [],
      text: null,
    };
  },
  watch: {
    modelValue() {
      this.mutateValue = this.modelValue;
    },
  },
  methods: {
    change() {
      this.$emit("update:modelValue", this.mutateValue);
    },
    addItem() {
      if (!this.text) {
        return;
      }

      const item = { value: this.text, done: false, remove: false };

      this.mutateValue.push(item);
      this.text = null;
      this.change();
    },
  },
  mounted() {
    this.mutateValue = this.modelValue;
  },
};
</script>
<style scoped>
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>