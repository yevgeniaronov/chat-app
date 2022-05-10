<template>
  <div class="flex flex-col">
    <b>Users List:</b>
    <div v-for="user in users" :key="user.id">
      {{ user.name }}
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { useApi } from "@/api/useApi";

export default {
  props: {
    userIds: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const { data: users, exec: getUsers } = useApi(
      "usersData",
      () => api.get(`users`),
      {
        globalLoader: true,
        responseAdapter: (res) =>
          res.filter((item) => props.userIds.includes(item.id)),
      }
    );

    getUsers();
    return {
      users,
    };
  },
};
</script>

<style lang="scss" scoped></style>
