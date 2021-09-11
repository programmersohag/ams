<template>
  <vue-dock-menu :items="items">
  </vue-dock-menu>
</template>

<script>
import  DockMenu from "vue-dock-menu";
import "vue-dock-menu/dist/vue-dock-menu.css";

export default {
  name: "example",
  components: {
    DockMenu
  },
  data() {
    return {
      items:[
        {
          name: "File",
          menu: [{ name: "Open"}, {name: "New Window"}, {name: "Exit"}]
        },
        {
          name: "Edit",
          menu: [{ name: "Cut"}, {name: "Copy"}, {name: "Paste"}]
        }
      ]
    }
  }
}
</script>