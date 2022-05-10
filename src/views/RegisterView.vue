<template>
  <div class="d-flex flex-col">
    <div>Register</div>
    <div class="d-flex mt-4">
      <base-input v-model="userName" type="text" class="mie-4"></base-input>
      <base-button @click="createUser">Create User</base-button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { SIGN_UP } from "@/store/modules/auth/consts";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const userName = ref("");

    const createUser = async () => {
      try {
        await store.dispatch(SIGN_UP, { name: userName.value });
        router.push({ name: "home" });
      } catch (error) {
        console.error(error);
      }
    };
    return {
      createUser,
      userName,
    };
  },
};
</script>

<style lang="scss" scoped></style>
