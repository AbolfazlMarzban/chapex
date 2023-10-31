<template>
  <div>
    <video :src="getVideo(element)" controls style="width: 100%;" :style="`border-radius: ${element.TFF_FPlaceHolder}px`">
      {{  }}
    </video>
  </div>
</template>

<script>
export default {
props:[ "element", "readonly" ],
methods:{
  getVideo(element){
    if(element.items.length > 0){
      console.log(element.items[0])
      return element.items[0].img.TPIC_FAddress
    } else {
      return ''
    }
  }
}
}   
</script>

<style>

</style>