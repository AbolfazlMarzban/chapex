<template>
    <v-container>
        <v-row>
            <v-col cols="12" style="cursor: pointer;" @click="$emit('editDialog', option)">
                <span v-if="option.TD_FType == 21703" color="#016670" class="selectiveOption ml-2">{{
                    option.TD_FName
                }}
                </span>

                <span v-else-if="option.TD_FType == 21704" color="pink" class="designOption ml-2">{{
                    option.TD_FName
                }}
                </span>

                <span v-else-if="option.TD_FType == 21705" color="orange" class="reviewOption ml-2">{{
                    option.TD_FName
                }}
                </span>

                <Transition name="bounce">
                    <v-chip v-if="option.TD_FRequired == 1" x-small color="red" class="white--text mx-1">اجباری</v-chip>
                </Transition>

                <Transition name="bounce">
                    <v-chip v-if="option.TD_FUserViewType == 21101 || option.TD_FUserViewType == 21102" x-small
                        color="#016670" class="white--text mx-1">مدرن</v-chip>
                </Transition>

                <Transition name="bounce">
                    <v-chip v-if="option.TD_FUserViewType == 21103" x-small color="teal lighten-4"
                        class="teal darken-4--text mx-1">کلاسیک</v-chip>
                </Transition>

                <Transition name="bounce">
                    <v-chip v-if="option.TD_FActionToDeps == 23102" x-small color="brown" class="white--text mx-1">نمایش
                        همیشگی</v-chip>
                </Transition>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

export default {

    props: ["option"],

}
</script>

<style scoped>
.selectiveOption {
    color: #016670;
    font-weight: bold !important;
    font-family: boldbakhtiari !important;
    font-size: 30px;
}

.designOption {
    color: pink;
    font-weight: bold !important;
    font-family: boldbakhtiari !important;
    font-size: 30px;
}

.reviewOption {
    color: orange;
    font-weight: bold !important;
    font-family: boldbakhtiari !important;
    font-size: 30px;
}

.bounce-enter-active {
    animation: bounce-in 0.3s;
}

.bounce-leave-active {
    animation: bounce-in 0.3s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1);
    }
}
</style>