import Vue from 'vue'
import VueCharts from 'vue-chartjs';

Vue.component('line-chart', {
  extends: VueCharts.Line,
  props : [ "chartOption"] , 
  mixins: [VueCharts.mixins.reactiveProp],

  mounted () {
    this.renderChart(this.chartData , this.chartOption
    //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //   datasets: [
    //     {
    //       label: 'Data One',
    //       backgroundColor: '#f87979',
    //       data: [40, 39, 10, 40, 39, 80, 40]
    //     }
    //   ]
    )
  }
})


