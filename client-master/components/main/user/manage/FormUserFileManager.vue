<template>
    <div v-if="data && defaults" class="manage-user-table">
        file manager
    </div>
</template>

<script>
export default {
    props: ["readonly", "data", "defaults"],
};
</script>

<style lang="scss" scoped></style>