import Vue from 'vue'
import { Bar } from 'vue-chartjs'
import { Pie } from 'vue-chartjs'
import { Doughnut } from 'vue-chartjs'

Vue.component('BarChart', {
  extends: Bar,
  props: {
    data: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: false,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
      }),
    },
  },
  watch: {
    data() {
      this.renderChart(this.data, this.options)
    },
  },
  mounted() {
    this.renderChart(this.data, this.options)
  },
})
Vue.component('PieChart',{
  extends: Pie,
  props:{
    data:{
      type: Object,
      required: true,
    },
    options: {
      legend: {
        display: true
      },
      responsive: true,
      maintainAspectRatio: false
    }
  },
  watch: {
    data() {
      this.renderChart(this.data, this.options)
    },
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
})
Vue.component('DoughnutChart',{
  extends: Doughnut,
  props:{
    data:{
      type: Object,
      required: true,
    },
    options: {
      legend: {
        display: true
      },
      responsive: true,
      maintainAspectRatio: false
    }
  },
  watch: {
    data() {
      this.renderChart(this.data, this.options)
    },
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
})