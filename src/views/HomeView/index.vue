<template>
  <div class="flex flex-col justify-between">
    <div class="flex flex-col gap-4">
      <div>List of groups:</div>
      <base-button
        v-for="group in groups"
        @click="navigateToGroup(group.id)"
        :key="group.id"
      >
        {{ group.name }}
      </base-button>
    </div>
    <div>
      <base-input v-model="groupName" type="text" class="mie-4"></base-input>
      <base-button @click="createGroup"> Create new group</base-button>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { useApi } from "@/api/useApi";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "HomeView",
  setup() {
    const router = useRouter();
    const groupName = ref("");

    const { data: groups, exec: getGroups } = useApi("groupsData", () =>
      api.get(`rooms`)
    );

    const createGroup = async () => {
      try {
        const { roomId } = await api.post(`rooms`, { name: groupName.value });
        router.push(`/chat/${roomId}`);
      } catch (error) {
        console.error(error);
      }
    };

    const navigateToGroup = (id) => {
      router.push(`/chat/${id}`);
    };

    getGroups();
    return { createGroup, groupName, groups, navigateToGroup };
  },
};
</script>
