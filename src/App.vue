<template>
  <base-loader-delay :show="isLoading">
    <base-loader :loading="true"> </base-loader>
  </base-loader-delay>

  <router-view class="p-4" />
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.getters.isLoading);
    console.log(isLoading.value);
    return { isLoading };
  },
};
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}

#app {
  @apply flex justify-center;
}
</style>
