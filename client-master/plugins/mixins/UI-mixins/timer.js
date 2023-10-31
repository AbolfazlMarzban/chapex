export default {
  methods: {
    Timer() {
      setInterval(() => {
        if (this.time >= 0) {
          let minutes = parseInt(this.time / 60, 10);
          let seconds = parseInt(this.time % 60, 10);
          this.showTimer = minutes + ":" + seconds;
          this.time--;
        } else return;
      }, 1000);

      return this.showTimer;
    }
  }
};
