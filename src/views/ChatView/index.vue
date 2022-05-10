<template>
  <div class="flex" v-if="mergedRoomData">
    <chat-room-users-list
      :user-ids="mergedRoomData.users"
      class="mie-4"
    ></chat-room-users-list>
    <div class="flex flex-col justify-between shadow-xl p-4 rounded-md">
      <chat-room-text :messages="mergedRoomData.text"></chat-room-text>
      <div class="flex justify-between">
        <base-input
          v-model="newMessage"
          type="text"
          class="mie-4"
          @keydown.enter="sendMessage"
        ></base-input>
        <base-button @click="onExit">Exit</base-button>
        <!-- bad UX, but that's the design -->
      </div>
    </div>
  </div>
</template>

<script>
import { useApi } from "@/api/useApi";
import api from "@/api";
import { useRoute, useRouter } from "vue-router";
import { defineAsyncComponent, ref, computed } from "vue";
import { useStore } from "vuex";

const ChatRoomText = defineAsyncComponent(() =>
  import("./components/ChatRoomText.vue")
);
const ChatRoomUsersList = defineAsyncComponent(() =>
  import("./components/ChatRoomUsersList.vue")
);

export default {
  name: "ChatView",
  components: {
    ChatRoomText,
    ChatRoomUsersList,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const store = useStore();

    const authUserId = computed(() => store.getters.authUserId);

    const newMessage = ref("");

    const roomId = route.params.id;

    // methods
    const onExit = () => {
      try {
        api.delete(`rooms/${roomId}/users/${authUserId.value}`);
        router.push({ name: "home" });
      } catch (error) {
        console.error(error);
      }
    };

    const { data: roomData, exec: getRoomData } = useApi(
      "roomData",
      () =>
        Promise.all([
          api.get(`rooms/${roomId}`),
          api.get(`rooms/${roomId}/users`),
        ]),
      {
        responseAdapter: (res) => {
          return res.reduce((a, v) => ({ ...a, ...v }), {});
        },
      }
    );

    const { data: messagesData, exec: getMessagesData } = useApi(
      "messagesData",
      () => api.get(`rooms/${roomId}/text`)
    );

    const mergedRoomData = computed(() => {
      return { text: messagesData.value?.text, ...roomData.value };
    });

    const resetMessage = () => {
      newMessage.value = "";
    };

    const sendMessage = async () => {
      try {
        await api.post(`rooms/${roomId}/text`, {
          text: newMessage.value,
          userId: authUserId.value,
        });
        getMessagesData();
        resetMessage();
      } catch (error) {
        console.error(error);
      }
    };

    getRoomData();
    getMessagesData();
    return { newMessage, sendMessage, mergedRoomData, onExit };
  },
};
</script>

<style lang="scss" scoped></style>
