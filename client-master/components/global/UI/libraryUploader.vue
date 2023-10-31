<template>
  <div :id="id">
    <div class="d-flex flex-column align-center justify-center flex-grow-1 uploader" >                 

    <library-dialog  @export="value => setImage(value)"/>
    <img v-if="img" :src="img.thumbnail" alt="">
    </div>
  </div>
</template>

<script>
export default {
props: ["id"],
data(){
    return{
        img: null
    }
},
methods:{
    setImage(value){
        this.img = value
        this.$emit("input", value)
    }
}
}
</script>

<style scoped>
.upload-block {
  border: 2px dashed #adadad;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 20px;
}

.uploader {
  border: 2px dashed #adadad;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 20px;

  /* cursor: pointer !important; */
  text-align: center;
  width: 100%;
}

.uploaderText {
  cursor: pointer !important;
  color: grey;
}

.uploaderText:hover {
  color: rgb(0, 68, 255);
}
</style>