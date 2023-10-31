export default {
  methods: {
    selectedRowChanged(selectedItem) {
      this.table.selectedItems = selectedItem;
      if (selectedItem.length == 0) {
        this.headerManager.status = "not-selected";
      } else if (selectedItem.length == 1) {
        this.headerManager.status = "selecting";
      } else if (selectedItem.length > 1) {
        this.headerManager.status = "multi-selecting";
      }
    }
  }
};
