<template>
    <div class="d-flex justify-center align-center">
        <svg viewBox="0 0 1320 300">
            <text v-if="text" x="50%" y="50%" dy=".35em" text-anchor="middle">
                {{ text }}
            </text>
            <text v-else x="50%" y="50%" dy=".35em" text-anchor="middle">
                Chapex.ir
            </text>
        </svg>
    </div>
</template>

<script>

export default {
    props: ["text"]
}
</script>

<style scoped>
svg {
    font-family: heavybakhtiari;
    letter-spacing: 2px;
    position: relative;
    width: 100%;
    height: 100%;
}

svg text {
    animation: stroke 5s infinite alternate;
    stroke-width: 2;
    stroke: #016670;
    font-size: 30px;
}

@keyframes stroke {
    0% {
        stroke: #016670;
        fill: rgba(72, 138, 20, 0);
        stroke: #016670;
        stroke-dashoffset: 25%;
        stroke-dasharray: 0 50%;
        stroke-width: 1;
    }

    70% {
        fill: rgba(72, 138, 20, 0);
        stroke: #016670;
    }

    80% {
        fill: rgba(72, 138, 20, 0);
        stroke: #016670;
        stroke-width: 1;
    }

    100% {
        fill: #016670;
        stroke: rgba(54, 95, 160, 0);
        stroke-dashoffset: -25%;
        stroke-dasharray: 50% 0;
        stroke-width: 0;
    }
}
</style>