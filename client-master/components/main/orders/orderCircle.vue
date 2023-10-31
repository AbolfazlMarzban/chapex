<template>
  <div>
    <v-row class="justify-center pb-5">
        <v-col cols="12" class="mb-0 pb-0">
            <v-row class="mb-0">
            <v-col cols="3" class="d-flex flex-row align-center pt-0">
                <v-btn
                  @click="treeView = !treeView"
                  falt
                  depressed
                  class="mx-2"
                >
                  <v-icon>mdi-magnify</v-icon>
                  <span v-if="this.steps">{{ parentstatus }}</span>
                </v-btn>
                <v-edit-dialog v-if="treeView && steps.length > 0" width="250px" >
                  <v-treeview
                    activatable
                    :items="steps"
                    item-key="id"
                    @update:active="changePStatus"
                    selection-type="independent"
                    class="status-dialog"
                  >
                  </v-treeview>
                </v-edit-dialog>
                <v-btn
                    @click="childTreeView = !childTreeView"
                    text
                    depressed
                    class="mx-2"
                >
                        <v-icon>mdi-magnify</v-icon>
                        <span v-if="this.childSteps">{{ childStatus }}</span>
                </v-btn>
                <v-edit-dialog v-if="childTreeView && childSteps.length > 0">
                    <v-treeview
                        activatable
                        :items="childSteps"
                        item-key="id"
                        @update:active="changeStatus"
                        selection-type="independent"
                        class="child-status-dialog"
                    ></v-treeview>
                </v-edit-dialog>
            </v-col>
            <v-col cols="8" class="d-flex flex-column pb-0">
            <v-textarea label="توضیحات وضعیت" v-model="caption" class="mt-0 pt-0 status-desc" rows="1" auto-grow row-height="15"></v-textarea>
        </v-col>
        <v-col cols="1" class="pb-0">
            <v-btn depressed @click="emitChange" class="changeEmitBtn" color="#016670" dark>تغییر وضعیت</v-btn>
        </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" style="border: 1px solid grey; border-radius: 20px;" v-if="data.length > 0">
            <div v-for="item in data" :key="item.TD_FID">
                <span>{{ item.TOS_TimeReg }} --</span>
                <span>{{ item.TOS_FDateReg }} -- </span>
                <span style="color: #016670; font-weight: bold;">{{ item.TOS_FStatusName2 }}</span>
                <span v-if="item.TOS_FStatusDetailName2.length > 0"> --- {{ item.TOS_FStatusDetailName2 }}</span>
                <span style="color: black;" v-if="item.TOS_FComment.length > 0"> -- {{ item.TOS_FComment }}</span>
            </div>
        </v-col>
        

    </v-row>
  </div>
</template>

<script>
import Input from '../../global/UI/Input.vue'
export default {
  components: { Input },
props: [ "data", "last", "lastChild" ],
data(){
    return{
        steps: [],
        treeView: false,
        childTreeView: false,
        selected: null,
        caption: '',
        showError: false,
        parentStat: null,
        stp: []
    }
},
computed:{
    parentstatus(){
        if(this.parentStat){
            this.treeView = false
            var name = this.steps.find(item => item.id == this.parentStat)
            if(name){
                // this.statType = 'parent'
                return name.name
            } 
        } else {
            return this.last
        }
    },
    childSteps(){
        if(this.parentStat){
            var parent = this.stp.find(p => p.TD_FID == this.parentStat)
            if(parent.children){
                return parent.children.map(c => {
                            return{
                            id: c.TD_FID,
                            name: c.TD_FName
                            }
                        }
                        )
            } else {
                return ['انتخاب شما زیر مجموعه ای ندارد']
            }
        } else {
           return this.lastChild
        }
    },
    childStatus(){
       if(this.selected){
        this.childTreeView = false
        var childname = this.childSteps.find(item => item.id == this.selected)
        if(childname){
            return childname.name
        }
       }
    }
},
mounted(){
    this.getSteps();
},
methods:{
    emitChange(){
        this.$emit('changeStat', this.selected, this.parentStat, this.caption)
    },
    async getSteps(){
        try{
            const result = await this.$authAxios.$get(`/defaults/getsteps/`)
            if(result){
                console.log('Steps', result)
                 this.stp = result
                this.steps = this.stp.map(s => {
                    return{
                        id: s.TD_FID,
                        name: s.TD_FName,
                        // children: s.children.map(c => {
                        //     return{
                        //     id: c.TD_FID,
                        //     name: c.TD_FName
                        //     }
                        // }
                        // )
                    }
                })
            }
        } catch(error){
            console.log(error)
        }
    },
 changePStatus(value){
        this.parentStat = value[0]
    },
    changeStatus(value){
        this.selected = value[0]
    }
}
}
</script>

<style lang="scss">
.order-timeline{
    font-family: bakhtiari !important;
}
.order-timeline:nth-child(even){
.v-timeline-item__body{
    text-align: left;
}
}
.changeEmitBtn{
    span{
        letter-spacing: normal;
    }
}
.status-desc{
    input{
        border: none !important;
    }
    label{
        right: 20px !important;
        left: auto !important;
    }
    ::before{
        display: none;
    }
}
.status-dialog{
    background: white;
    box-shadow: 1px 1px 3px #e0e0e0;
    border-radius: 20px;
    z-index: 1;
    position: absolute;
    right: 50px;
}
.child-status-dialog{
    background: white;
    box-shadow: 1px 1px 3px #e0e0e0;
    border-radius: 20px;
    z-index: 1;
    position: absolute;
    right: 150px;
}
</style>