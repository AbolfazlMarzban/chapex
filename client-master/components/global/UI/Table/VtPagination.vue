<template>
  <!-- پیجینیشن بالای هدر  -->
  <div>
    <v-pagination
      v-if="props.totalPages > 1"
      :length="props.totalPages"
      v-model="props.page"
      circle
      class="pagination_table VT_pagination"
      total-visible="8"
      color="#eaeaea"
      @input="(page) => props.setPage(page)"
    />
  </div>
</template>

<script>
import Pagination from "vue-pagination-2";

export default {
  name: "VtPagination",
  components: {
    Pagination,
  },
  props: ["props"],
  data() {
    return {
      paginate: {
        pages: [],
        currentPage: 0,
      },
    };
  },
  computed: {
    paginateGoOutside() {
      return this.$store.getters["table/changePaginateGoOutside"];
    },
    paginateGoInside() {
      return this.$store.getters["table/changePaginateGoInside"];
    },
  },
  watch: {
    "props.page"(currentPage, oldPage) {
      this.paginate.currentPage = currentPage;
    },
    paginateGoOutside(val) {
      const newPage = this.paginate.pages.pop();
      this.props.setPage(newPage);
    },
    paginateGoInside(val) {
      this.paginate.currentPage =
        this.paginate.currentPage == 0 ? 1 : this.paginate.currentPage;
      this.paginate.pages.push(this.paginate.currentPage);
      this.props.setPage(1);
    },
  },
};
</script>

<style lang="scss">
.VT_pagination {
  direction: ltr;
  ul {
    li {
      &:last-child {
        margin-right: auto;
        button {
          padding-top: 0px;
        }
      }
      button {
        box-shadow: unset !important;
        min-width: 27px;
        width: 27px;
        height: 27px;
        font-size: 0.8rem;
        padding-top: 4px;
        i {
          font-size: 18px !important;
        }
        &:focus {
          outline: none;
        }
      }
    }
  }
  .theme--light.v-pagination .v-pagination__item--active {
    color: #016670 !important;
    font-weight: 700;
  }
}
</style>