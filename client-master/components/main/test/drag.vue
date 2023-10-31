<template>
  <v-container>
    <!-- <div class="row">
      <div class="col-2">
        <div class="form-group">
          <div class="btn-group-vertical buttons" role="group" aria-label="Basic example">
            <button class="btn btn-secondary" @click="add">Add</button>
            <button class="btn btn-secondary" @click="replace">Replace</button>
          </div>

          <div class="form-check">
            <input id="disabled" type="checkbox" v-model="enabled" class="form-check-input" />
            <label class="form-check-label" for="disabled">DnD enabled</label>
          </div>
        </div>
      </div>

      <div class="col-6">
        <h3>Draggable {{ draggingInfo }}</h3>

        <draggable
          :list="list"
          :disabled="!enabled"
          class="list-group"
          ghost-class="ghost"
          :move="checkMove"
          @start="dragging = true"
          @end="dragging = false"
        >
          <div
            class="list-group-item"
            v-for="element in list"
            :key="element.name"
          >{{ element.name }}</div>
        </draggable>
      </div>

      <rawDisplayer class="col-3" :value="list" title="List" />
    </div> -->
   
    <v-row>
      <v-col cols="12" md="6">
        <!-- <button class="btn btn-secondary" @click="add">Add</button>
        <button class="btn btn-secondary" @click="replace">Replace</button> -->
         <pre>
      {{list1}}
    </pre>
        <pre>
      {{list2}}
    </pre>
      </v-col>
      <v-col cdols="3">
        <p>input </p>
   <draggable
        class="dragArea list-group"
        :list="list1"
        :group="{ name: 'people', pull: 'clone', put: false }"
        @change="log"
      >
        <div
          class="list-group-item"
          v-for="element in list1"
          :key="element.name"
        >
          {{ element.name }}
        </div>
      </draggable>
      </v-col>
      <v-col cols="12" md="3">
        <p>result</p>
        <draggable
        class="dragArea list-group"
        :list="list2"
        group="people"
        @change="log"
      >
        <div
          class="list-group-item"
          v-for="element in list2"
          :key="element.name"
        >
          <Input type="text" class="test" :placeholder="element.name"/>
        </div>
      </draggable>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "clone",
  display: "Clone",
  order: 3,
  components: {
    draggable
  },
  data() {
    return {
      list1: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 }
      ],
      list2: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
      ]
    };
  },
  async mounted () {
    const result = await this.$authAxios.$get("/formBuilder/get/0?mode=getFields")
    console.log(result)
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);
    }
  }
};
</script>
<style scoped>
.buttons {
  margin-top: 35px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.test { 
  background-color: white !important;
  margin-top: 12px ;
}
</style>