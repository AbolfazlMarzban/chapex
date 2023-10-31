<template>
<line-chart v-if="loadedd" :chartData="chartDataa" :chartOption="options" :styles="myStyles">
</line-chart>
</template>

<script>
import customChart from "../../../plugins/customChart";

export default {
    props: ['chartData'],
    data() {
        return {
            chartDataa: {
                labels: [],
                datasets: [{
                    backgroundColor: 'white',
                    borderColor: 'black',
                    borderWidth: 2,
                    label: 'Data',
                    data: []
                }]
            },
            // chartData: 
            // {
            //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            //     datasets: [{
            //         label: 'Data One',
            //         backgroundColor: 'green',
            //         borderWidth: 2,
            //         borderColor: 'black',
            //         // inflateAmount: 100,

            //         data: [40, 39, 10, 40, 39, 80, 40]
            //     }]
            // },
            options: {
                responsive: true,
                maintainAspectRatio: false,

            },
            loadedd: false
        }

    },
    computed: {
        myStyles() {
            return {
                height: '400px',
                // width: '800px',
                position: 'relative',
                backgroundColor: 'white',

            }
        },
        //         async objToArray() {
        // this.chartData.labels        }
    },
    mounted() {
        this.pushes();
    },
 
    methods: {
        pushes() {
            this.loadedd = false

            for (const item of this.chartData) {
                this.chartDataa.labels.push(item.TGPC_FDateReg)

                for (const items of this.chartDataa.datasets) {
                    items.data.push(item.TGPC_FPriceNew)

                }

            }

            this.loadedd = true

            console.log(this.chartDataa.labels);
            console.log(this.chartDataa.datasets[0].data);

        }
    }

    //     objToArray (){

    //     // const fid  =  this.props.chartDataa.map(chartdate =>{
    //     //         return this.chartdate.TGPC_FDateReg
    //     //     }) 
    //     //     console.log(fid);
    //     // }
    // }
}
</script>

<style lang="">

</style>
