<template>
    <div>
        <LazyNewFormDefault :FID="$route.params.slug" state="insert" />
    </div>
</template>
  
<script>

export default {
    middleware: ["init-auth", "is-auth", "is-user"],
    layout: "manage",
};
</script>  