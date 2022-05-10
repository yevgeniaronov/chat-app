<template>
  <div v-if="showLoader">
    <slot />
  </div>
</template>

<script>
import { ref, watch } from "vue";
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    delay: {
      type: Number,
      default: 300,
    },
  },
  setup(props) {
    const showLoader = ref(false);
    let timeout = null;

    watch(
      () => props.show,
      (show) => {
        if (show) {
          timeout = setTimeout(() => {
            showLoader.value = true;
          }, props.delay);
        } else {
          clearTimeout(timeout);
          showLoader.value && (showLoader.value = false);
        }
      }
    );

    return {
      showLoader,
    };
  },
};
</script>

<style module></style>
