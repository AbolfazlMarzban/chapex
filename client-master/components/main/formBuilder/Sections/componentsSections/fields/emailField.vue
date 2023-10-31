<template>
    <div class="components-input">
      <label>{{element.TFF_FLable}}</label>
    <reqcyrcel :element="element"></reqcyrcel>
    <ui-input class="form_control_textInput" type="Email" @change="isEmailValid"
    :placeholder="element.TFF_FPlaceHolder"
    :readonly="element.TFF_FActive == 0"
    :required="element.TFF_FRequired"
    v-model="element.TFF_FDefault" 
    :append-icon="element.TFF_FIcon" 
    :hint="element.TFF_FToolTip" 
    :deleteForm="deleteForm"
      />
      <span v-show="wrongEmail" style="color:red">ایمیل وارد شده نادرست است.</span>
    </div>
    

</template>

<script>
const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
    props: ["element", "readonly", "deleteForm"],
    data() {
    return {
      wrongEmail: false,
    }
  },
    methods: {
        isEmailValid() {
      if (emailRe.test(this.email)) {
        this.wrongEmail = false;
      } else {
        this.wrongEmail = true;
      }
    }
    }
}
</script>