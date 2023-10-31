<template>
    <div>
        <LazyManageDefaults :TD_FID="$route.params.slug" />
    </div>
</template>
  
<script>

export default {
    middleware: ["init-auth", "is-auth", "is-user"],
    layout: "manage",
};
</script>  