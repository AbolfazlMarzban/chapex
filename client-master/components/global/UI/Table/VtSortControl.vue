<template>
    <span class="VueTables__sort">
     <v-icon v-if="props.sortable">
         {{icon}}
     </v-icon>
    </span>
</template>
 
<script>
    export default {
        name: "VtSortControl",
        props: ['props'],
        computed:{
            icon() {
                 // if not sorted return base icon
                if (!this.props.sortStatus.sorted) return ' ';

                // return sort direction icon
                return this.props.sortStatus.asc ? 'mdi-menu-down' : 'mdi-menu-up';
            }
        }
    }
</script>