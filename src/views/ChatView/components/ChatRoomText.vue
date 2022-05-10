<template>
  <div :class="$style.chatRoomText">
    <base-card
      v-for="message in messages"
      :key="message"
      :class="[
        $style.chatRoomTextMessage,
        $style[
          `chatRoomTextMessage-${
            authUserId == message.userId ? 'owner' : 'stranger'
          }`
        ],
      ]"
    >
      {{ message.text }}
    </base-card>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const store = useStore();
    const authUserId = computed(() => store.getters.authUserId);
    return { authUserId };
  },
};
</script>

<style lang="scss" module>
.chatRoomText {
  @apply flex flex-col gap-4;

  &Message {
    @apply max-w-max pli-2;
    &-stranger {
      align-self: flex-end;
      @apply bg-green-300;
    }
  }
}
</style>
