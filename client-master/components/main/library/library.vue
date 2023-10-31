<template>
  <div class="library">
    <v-row class="ma-3">
      <v-col col="12" class="d-flex justify-end d-xl-none d-lg-none pb-0 " v-if="!isAdmin">
        <v-icon @click="$router.push('/profile')">mdi-close-circle</v-icon>
      </v-col>
      <v-col cols="12" class="filemanger-action-bar">
        <v-row>
          <v-col cols="6" xl="3" lg="6" md="6" sm="6" class="d-flex">
            <button
              @click="showBtns = !showBtns"
              style="border-radius:12px;"
              class="pa-2 elevation-4 d-flex align-center mx-1"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.3333 11.6667L16.3333 28L11.6666 28L11.6666 16.3333L16.3333 11.6667Z"
                  fill="#8E0041"
                />
                <path
                  d="M16.3333 16.3333L0 16.3333L-2.03987e-07 11.6666L11.6667 11.6666L16.3333 16.3333Z"
                  fill="#016670"
                />
                <path
                  d="M11.6667 16.3333V0H16.3334V11.6667L11.6667 16.3333Z"
                  fill="#8E0041"
                />
                <path
                  d="M11.6667 16.3333L28 16.3333L28 11.6666L16.3333 11.6666L11.6667 16.3333Z"
                  fill="#016670"
                />
              </svg>
            </button>
            <template v-if="isAdmin"> 
              <button
                v-if="showBtns && FID"
                @click="showUploadDialog"
                style="background: #016670; border-radius:12px;"
                class="pa-2 elevation-4 d-flex align-center mx-1"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_19_3238"
                    style="mask-type:alpha"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  >
                    <rect width="24" height="24" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_19_3238)">
                    <path
                      d="M6.5 20C4.98333 20 3.6875 19.475 2.6125 18.425C1.5375 17.375 1 16.0917 1 14.575C1 13.275 1.39167 12.1167 2.175 11.1C2.95833 10.0833 3.98333 9.43333 5.25 9.15C5.66667 7.61667 6.5 6.375 7.75 5.425C9 4.475 10.4167 4 12 4C13.95 4 15.6042 4.67917 16.9625 6.0375C18.3208 7.39583 19 9.05 19 11C20.15 11.1333 21.1042 11.6292 21.8625 12.4875C22.6208 13.3458 23 14.35 23 15.5C23 16.75 22.5625 17.8125 21.6875 18.6875C20.8125 19.5625 19.75 20 18.5 20H13C12.45 20 11.9792 19.8042 11.5875 19.4125C11.1958 19.0208 11 18.55 11 18V12.85L9.4 14.4L8 13L12 9L16 13L14.6 14.4L13 12.85V18H18.5C19.2 18 19.7917 17.7583 20.275 17.275C20.7583 16.7917 21 16.2 21 15.5C21 14.8 20.7583 14.2083 20.275 13.725C19.7917 13.2417 19.2 13 18.5 13H17V11C17 9.61667 16.5125 8.4375 15.5375 7.4625C14.5625 6.4875 13.3833 6 12 6C10.6167 6 9.4375 6.4875 8.4625 7.4625C7.4875 8.4375 7 9.61667 7 11H6.5C5.53333 11 4.70833 11.3417 4.025 12.025C3.34167 12.7083 3 13.5333 3 14.5C3 15.4667 3.34167 16.2917 4.025 16.975C4.70833 17.6583 5.53333 18 6.5 18H9V20H6.5Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </button>
            </template>
            <template v-else>
              <button
                v-if="showBtns"
                @click="showUploadDialog"
                style="background: #016670; border-radius:12px;"
                class="pa-2 elevation-4 d-flex align-center mx-1"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_19_3238"
                    style="mask-type:alpha"
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  >
                    <rect width="24" height="24" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_19_3238)">
                    <path
                      d="M6.5 20C4.98333 20 3.6875 19.475 2.6125 18.425C1.5375 17.375 1 16.0917 1 14.575C1 13.275 1.39167 12.1167 2.175 11.1C2.95833 10.0833 3.98333 9.43333 5.25 9.15C5.66667 7.61667 6.5 6.375 7.75 5.425C9 4.475 10.4167 4 12 4C13.95 4 15.6042 4.67917 16.9625 6.0375C18.3208 7.39583 19 9.05 19 11C20.15 11.1333 21.1042 11.6292 21.8625 12.4875C22.6208 13.3458 23 14.35 23 15.5C23 16.75 22.5625 17.8125 21.6875 18.6875C20.8125 19.5625 19.75 20 18.5 20H13C12.45 20 11.9792 19.8042 11.5875 19.4125C11.1958 19.0208 11 18.55 11 18V12.85L9.4 14.4L8 13L12 9L16 13L14.6 14.4L13 12.85V18H18.5C19.2 18 19.7917 17.7583 20.275 17.275C20.7583 16.7917 21 16.2 21 15.5C21 14.8 20.7583 14.2083 20.275 13.725C19.7917 13.2417 19.2 13 18.5 13H17V11C17 9.61667 16.5125 8.4375 15.5375 7.4625C14.5625 6.4875 13.3833 6 12 6C10.6167 6 9.4375 6.4875 8.4625 7.4625C7.4875 8.4375 7 9.61667 7 11H6.5C5.53333 11 4.70833 11.3417 4.025 12.025C3.34167 12.7083 3 13.5333 3 14.5C3 15.4667 3.34167 16.2917 4.025 16.975C4.70833 17.6583 5.53333 18 6.5 18H9V20H6.5Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </button>
            </template>
            <button
              v-if="showBtns"
              @click="folderDialog = true"
              style="background: #8E0041; border-radius:12px;"
              class="pa-2 elevation-4 d-flex align-center mx-1"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_19_3241"
                  style="mask-type:alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_19_3241)">
                  <path
                    d="M14 16H16V14H18V12H16V10H14V12H12V14H14V16ZM4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H10L12 6H20C20.55 6 21.0208 6.19583 21.4125 6.5875C21.8042 6.97917 22 7.45 22 8V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM4 18H20V8H11.175L9.175 6H4V18Z"
                    fill="white"
                  />
                </g>
              </svg>
            </button>
            <button
              v-if="showBtns && isAdmin"
              @click="showExternal = true"
              style="background: #F0F3F4; border-radius:12px;"
              class="pa-2 elevation-4 d-flex align-center mx-1"
            >
              <v-icon>mdi-link</v-icon>
            </button>
          </v-col>
          <v-col
            cols="8"
            xl="6"
            class="d-xl-flex justify-center d-lg-none d-md-none d-sm-none d-none gallery-searchbox"
          >
            <div
              style="background: #F0F3F4; width: 50%"
              class="rounded-lg d-flex align-center"
            >
              <button
                class="d-flex align-center"
                @click="showFilters = !showFilters"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_63_368)">
                    <path
                      d="M12.4998 25C12.4998 25.4583 12.8748 25.8333 13.3331 25.8333H17.4998V24.1667H13.3331C12.8748 24.1667 12.4998 24.5417 12.4998 25ZM12.4998 15C12.4998 15.4583 12.8748 15.8333 13.3331 15.8333H20.8331V14.1667H13.3331C12.8748 14.1667 12.4998 14.5417 12.4998 15ZM20.8331 26.6667V25.8333H26.6664C27.1248 25.8333 27.4998 25.4583 27.4998 25C27.4998 24.5417 27.1248 24.1667 26.6664 24.1667H20.8331V23.3333C20.8331 22.875 20.4581 22.5 19.9998 22.5C19.5414 22.5 19.1664 22.875 19.1664 23.3333V26.6667C19.1664 27.125 19.5414 27.5 19.9998 27.5C20.4581 27.5 20.8331 27.125 20.8331 26.6667ZM15.8331 18.3333V19.1667H13.3331C12.8748 19.1667 12.4998 19.5417 12.4998 20C12.4998 20.4583 12.8748 20.8333 13.3331 20.8333H15.8331V21.6667C15.8331 22.125 16.2081 22.5 16.6664 22.5C17.1248 22.5 17.4998 22.125 17.4998 21.6667V18.3333C17.4998 17.875 17.1248 17.5 16.6664 17.5C16.2081 17.5 15.8331 17.875 15.8331 18.3333ZM27.4998 20C27.4998 19.5417 27.1248 19.1667 26.6664 19.1667H19.1664V20.8333H26.6664C27.1248 20.8333 27.4998 20.4583 27.4998 20ZM23.3331 17.5C23.7914 17.5 24.1664 17.125 24.1664 16.6667V15.8333H26.6664C27.1248 15.8333 27.4998 15.4583 27.4998 15C27.4998 14.5417 27.1248 14.1667 26.6664 14.1667H24.1664V13.3333C24.1664 12.875 23.7914 12.5 23.3331 12.5C22.8748 12.5 22.4998 12.875 22.4998 13.3333V16.6667C22.4998 17.125 22.8748 17.5 23.3331 17.5Z"
                      fill="#5F6367"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_63_368">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(9.99976 10)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <input
                type="text"
                placeholder="جستجو..."
                style="text-align:left; border: none !important;"
                v-model="nameSearch"
                @change="search"
              />
              <v-icon class="pa-2">
                mdi-magnify
              </v-icon>
            </div>
            <div class="d-flex align-stretch" v-if="showFilters">
              <div
                style="background: #F0F3F4;"
                class="rounded-lg d-flex align-center mx-1"
              >
                <v-icon>
                  mdi-brush-variant
                </v-icon>
                <label for="">نوع فایل</label>
                <v-select
                  multiple
                  v-model="fileType"
                  dense
                  style="width: 43%;"
                  class="pt-0 mt-0 typeFilesBox"
                  :items="fileFormats"
                  @change="search"
                ></v-select>
                <v-icon>mdi-chevron-down</v-icon>
              </div>
              <div
                style="background: #F0F3F4; width: 50%"
                class="rounded-lg d-flex justify-space-between align-center mx-1 pa-1"
              >

                <label for="">از حجم(KB)</label>
                <input
                  type="number"
                  style="width: 50%;"
                  v-model="minSize"
                  @change="search"
                />
              </div>
              <div
                style="background: #F0F3F4; width: 50%"
                class="rounded-lg d-flex justify-space-between align-center mx-1 pa-1"
              >
                <label for="">تا حجم(KB)</label>
                <input
                  type="number"
                  style="width: 50%;"
                  v-model="maxSize"
                  @change="search"
                />
              </div>
            </div>
          </v-col>
          <v-col
            cols="6"
            xl="3"
            lg="6"
            md="6"
            sm="6"
            class="d-xl-flex d-lg-flex d-md-flex d-none  align-center justify-end"
          >
            <button
              class="pa-2 rounded-lg"
              style="background: red;"
              v-if="selected.length > 0"
              @click="showDelete = true"
            >
              <v-icon color="white">
                mdi-trash-can-outline
              </v-icon>
            </button>
            <button
              class="pa-2 rounded-lg mr-2"
              @click="moveFileDialog = true"
              style="background: #F0F3F4;"
              v-if="selectedImages.length > 0"
            >
              <v-icon>
                mdi-content-cut
              </v-icon>
            </button>
            <button
              class="pa-2 mr-2 rounded-lg"
              style="background: #F0F3F4; font-size: 0px;"
              @click="sort = !sort"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_23_1602"
                  style="mask-type:alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_23_1602)">
                  <path
                    d="M2 17L5.75 7H7.9L11.65 17H9.6L8.75 14.6H4.9L4.1 17H2ZM5.5 12.9H8.1L6.9 9.15H6.75L5.5 12.9ZM13.7 17V15.1L18.75 8.8H13.9V7H20.95V8.9L15.95 15.2H21V17H13.7ZM9 5L12 2L15 5H9ZM12 22L9 19H15L12 22Z"
                    fill="#5F6367"
                  />
                </g>
              </svg>
            </button>

            <div
              class="mx-2 pa-2 rounded-lg d-flex align-center"
              style="background: #F0F3F4; min-width: fit-content; height: 40px;"
            >
              <label for="">انتخاب همه</label>
              <input
                type="checkbox"
                @change="selectAll($event)"
                style="width: inherit; height: 15px;"
                class="mr-1"
              />
            </div>
            <div
              class="ml-2 pa-2 rounded-lg d-flex align-center"
              style="background: #F0F3F4; width: 40px; height: 40px;"
            >
              <input
                type="checkbox"
                @change="multipleSelect($event)"
                style="width: inherit; height: 15px;"
              />
            </div>
            <button
              class="pa-2 rounded-lg"
              style="background: #F0F3F4;"
              @click="libformat = !libformat"
            >
              <v-icon v-if="!libformat">
                mdi-list-box
              </v-icon>
              <v-icon v-else>
                mdi-grid
              </v-icon>
            </button>
          </v-col>
          <v-col
            cols="6"
            xl="2"
            lg="6"
            md="6"
            sm="6"
            class="d-xl-none d-lg-none d-md-none d-flex  align-center justify-end"
          >
            <button
              class="pa-2 rounded-lg"
              style="background: red;"
              v-if="selected.length > 0"
              @click="showDelete = true"
            >
              <v-icon color="white">
                mdi-trash-can-outline
              </v-icon>
            </button>
            <button
              class="pa-2 rounded-lg mr-2"
              style="background: #F0F3F4;"
              @click="showMobileSidebar"
              v-if="selected.length == 1"
            >
              <v-icon>
                mdi-information
              </v-icon>
            </button>
            <button
              class="pa-2 rounded-lg mr-2"
              @click="moveFileDialog = true"
              style="background: #F0F3F4;"
              v-if="selectedImages.length > 0"
            >
              <v-icon>
                mdi-content-cut
              </v-icon>
            </button>
            <button
              class="pa-2 rounded-lg mr-2"
              style="background: #01667066;"
              @click="showToolbox = !showToolbox"
            >
              <v-icon>
                mdi-widgets-outline
              </v-icon>
            </button>
          </v-col>
          <v-col
            cols="12"
            v-if="showToolbox"
            class="d-flex  align-center justify-end"
          >
            <button
              class="pa-2 rounded-lg"
              style="background: #F0F3F4;"
              @click="showSearchBox = !showSearchBox"
            >
              <v-icon>
                mdi-magnify
              </v-icon>
            </button>
            <button
              class="pa-2 rounded-lg mr-2"
              style="background: #F0F3F4;"
              @click="showCapBox = !showCapBox"
            >
              <v-icon>
                mdi-circle-slice-2
              </v-icon>
            </button>
            <button
              class="pa-2 mr-2 rounded-lg"
              style="background: #F0F3F4; font-size: 0px;"
              @click="sort = !sort"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_23_1602"
                  style="mask-type:alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_23_1602)">
                  <path
                    d="M2 17L5.75 7H7.9L11.65 17H9.6L8.75 14.6H4.9L4.1 17H2ZM5.5 12.9H8.1L6.9 9.15H6.75L5.5 12.9ZM13.7 17V15.1L18.75 8.8H13.9V7H20.95V8.9L15.95 15.2H21V17H13.7ZM9 5L12 2L15 5H9ZM12 22L9 19H15L12 22Z"
                    fill="#5F6367"
                  />
                </g>
              </svg>
            </button>

            <div
              class="mx-2 pa-2 rounded-lg d-flex align-center"
              style="background: #F0F3F4; min-width: fit-content; height: 40px;"
            >
              <label for="">انتخاب همه</label>
              <input
                type="checkbox"
                @change="selectAll($event)"
                style="width: inherit; height: 15px;"
                class="mr-1"
              />
            </div>

            <div
              class="ml-2 pa-2 rounded-lg d-flex align-center"
              style="background: #F0F3F4; width: 40px; height: 40px;"
            >
              <input
                type="checkbox"
                @change="multipleSelect($event)"
                style="width: inherit; height: 15px;"
              />
            </div>

            <button
              class="pa-2 rounded-lg"
              style="background: #F0F3F4;"
              @click="libformat = !libformat"
            >
              <v-icon v-if="!libformat">
                mdi-list-box
              </v-icon>
              <v-icon v-else>
                mdi-grid
              </v-icon>
            </button>
          </v-col>
          <v-col
            cols="12"
            class="d-none d-lg-flex d-md-flex justify-center d-xl-none gallery-searchbox"
          >
            <div
              style="background: #F0F3F4;"
              class="rounded-lg d-flex align-center name-search"
            >
              <button
                class="d-flex align-center"
                @click="showFilters = !showFilters"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_63_368)">
                    <path
                      d="M12.4998 25C12.4998 25.4583 12.8748 25.8333 13.3331 25.8333H17.4998V24.1667H13.3331C12.8748 24.1667 12.4998 24.5417 12.4998 25ZM12.4998 15C12.4998 15.4583 12.8748 15.8333 13.3331 15.8333H20.8331V14.1667H13.3331C12.8748 14.1667 12.4998 14.5417 12.4998 15ZM20.8331 26.6667V25.8333H26.6664C27.1248 25.8333 27.4998 25.4583 27.4998 25C27.4998 24.5417 27.1248 24.1667 26.6664 24.1667H20.8331V23.3333C20.8331 22.875 20.4581 22.5 19.9998 22.5C19.5414 22.5 19.1664 22.875 19.1664 23.3333V26.6667C19.1664 27.125 19.5414 27.5 19.9998 27.5C20.4581 27.5 20.8331 27.125 20.8331 26.6667ZM15.8331 18.3333V19.1667H13.3331C12.8748 19.1667 12.4998 19.5417 12.4998 20C12.4998 20.4583 12.8748 20.8333 13.3331 20.8333H15.8331V21.6667C15.8331 22.125 16.2081 22.5 16.6664 22.5C17.1248 22.5 17.4998 22.125 17.4998 21.6667V18.3333C17.4998 17.875 17.1248 17.5 16.6664 17.5C16.2081 17.5 15.8331 17.875 15.8331 18.3333ZM27.4998 20C27.4998 19.5417 27.1248 19.1667 26.6664 19.1667H19.1664V20.8333H26.6664C27.1248 20.8333 27.4998 20.4583 27.4998 20ZM23.3331 17.5C23.7914 17.5 24.1664 17.125 24.1664 16.6667V15.8333H26.6664C27.1248 15.8333 27.4998 15.4583 27.4998 15C27.4998 14.5417 27.1248 14.1667 26.6664 14.1667H24.1664V13.3333C24.1664 12.875 23.7914 12.5 23.3331 12.5C22.8748 12.5 22.4998 12.875 22.4998 13.3333V16.6667C22.4998 17.125 22.8748 17.5 23.3331 17.5Z"
                      fill="#5F6367"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_63_368">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(9.99976 10)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <input
                type="text"
                placeholder="جستجو..."
                style="text-align:left; border: none !important;"
                v-model="nameSearch"
                @change="search"
              />
              <v-icon class="pa-2">
                mdi-magnify
              </v-icon>
            </div>
            <div
              class="d-xl-flex d-lg-flex d-md-flex d-sm-flex d-none align-stretch "
              v-if="showFilters"
            >
              <div
                style="background: #F0F3F4;"
                class="rounded-lg d-flex align-center mx-1"
              >
                <v-icon>
                  mdi-brush-variant
                </v-icon>
                <label for="">نوع فایل</label>
                <v-select
                  multiple
                  v-model="fileType"
                  dense
                  style="width: 43%;"
                  class="pt-0 mt-0 typeFilesBox"
                  :items="fileFormats"
                  @change="search"
                ></v-select>
                <v-icon>mdi-chevron-down</v-icon>
              </div>
              <div
                style="background: #F0F3F4; width: 50%"
                class="rounded-lg d-flex justify-space-between align-center mx-1 pa-1"
              >
                <label for="">از حجم(KB)</label>
                <input
                  type="number"
                  style="width: 50%;"
                  v-model="minSize"
                  @change="search"
                />
              </div>
              <div
                style="background: #F0F3F4; width: 50%"
                class="rounded-lg d-flex justify-space-between align-center mx-1 pa-1"
              >
                <label for="">تا حجم(KB)</label>
                <input
                  type="number"
                  style="width: 50%;"
                  v-model="maxSize"
                  @change="search"
                />
              </div>
            </div>
            <div
              class="d-flex d-xl-none d-lg-none d-md-none d-sm-none flex-column flex-col align-stretch "
              v-if="showFilters"
            >
              <div
                style="background: #F0F3F4;"
                class="rounded-lg d-flex align-center mx-1"
              >
                <v-icon>
                  mdi-brush-variant
                </v-icon>
                <label for="">نوع فایل</label>
                <v-select
                  multiple
                  v-model="fileType"
                  dense
                  style="width: 43%;"
                  class="pt-0 mt-0 typeFilesBox"
                  :items="fileFormats"
                  @change="search"
                ></v-select>
                <v-icon>mdi-chevron-down</v-icon>
              </div>
              <div class="d-flex mt-2">
                <div
                  style="background: #F0F3F4; width: 50%"
                  class="rounded-lg d-flex justify-space-between align-center mx-1 pa-1"
                >

                  <label for="">از حجم(KB)</label>
                  <input
                    type="number"
                    style="width: 50%;"
                    v-model="minSize"
                    @change="search"
                  />
                </div>
                <div
                  style="background: #F0F3F4; width: 50%"
                  class="rounded-lg d-flex justify-space-between align-center mx-1 pa-1"
                >
                  <label for="">تا حجم(KB)</label>
                  <input
                    type="number"
                    style="width: 50%;"
                    v-model="maxSize"
                    @change="search"
                  />
                </div>
              </div>
            </div>
          </v-col>
          <v-col
            v-if="showSearchBox"
            cols="12"
            class="d-flex d-lg-none d-md-none justify-center d-xl-none gallery-searchbox"
          >
            <div
              style="background: #F0F3F4;"
              class="rounded-lg d-flex align-center name-search"
            >
              <button
                class="d-flex align-center"
                @click="showFilters = !showFilters"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_63_368)">
                    <path
                      d="M12.4998 25C12.4998 25.4583 12.8748 25.8333 13.3331 25.8333H17.4998V24.1667H13.3331C12.8748 24.1667 12.4998 24.5417 12.4998 25ZM12.4998 15C12.4998 15.4583 12.8748 15.8333 13.3331 15.8333H20.8331V14.1667H13.3331C12.8748 14.1667 12.4998 14.5417 12.4998 15ZM20.8331 26.6667V25.8333H26.6664C27.1248 25.8333 27.4998 25.4583 27.4998 25C27.4998 24.5417 27.1248 24.1667 26.6664 24.1667H20.8331V23.3333C20.8331 22.875 20.4581 22.5 19.9998 22.5C19.5414 22.5 19.1664 22.875 19.1664 23.3333V26.6667C19.1664 27.125 19.5414 27.5 19.9998 27.5C20.4581 27.5 20.8331 27.125 20.8331 26.6667ZM15.8331 18.3333V19.1667H13.3331C12.8748 19.1667 12.4998 19.5417 12.4998 20C12.4998 20.4583 12.8748 20.8333 13.3331 20.8333H15.8331V21.6667C15.8331 22.125 16.2081 22.5 16.6664 22.5C17.1248 22.5 17.4998 22.125 17.4998 21.6667V18.3333C17.4998 17.875 17.1248 17.5 16.6664 17.5C16.2081 17.5 15.8331 17.875 15.8331 18.3333ZM27.4998 20C27.4998 19.5417 27.1248 19.1667 26.6664 19.1667H19.1664V20.8333H26.6664C27.1248 20.8333 27.4998 20.4583 27.4998 20ZM23.3331 17.5C23.7914 17.5 24.1664 17.125 24.1664 16.6667V15.8333H26.6664C27.1248 15.8333 27.4998 15.4583 27.4998 15C27.4998 14.5417 27.1248 14.1667 26.6664 14.1667H24.1664V13.3333C24.1664 12.875 23.7914 12.5 23.3331 12.5C22.8748 12.5 22.4998 12.875 22.4998 13.3333V16.6667C22.4998 17.125 22.8748 17.5 23.3331 17.5Z"
                      fill="#5F6367"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_63_368">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(9.99976 10)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <input
                type="text"
                placeholder="جستجو..."
                style="text-align:left; border: none !important;"
                v-model="nameSearch"
                @change="search"
              />
              <v-icon class="pa-2">
                mdi-magnify
              </v-icon>
            </div>
            <div
              class="d-xl-flex d-lg-flex d-md-flex d-sm-flex d-none align-stretch "
              v-if="showFilters"
            >
              <div
                style="background: #F0F3F4;"
                class="rounded-lg d-flex align-center mx-1"
              >
                <v-icon>
                  mdi-brush-variant
                </v-icon>
                <label for="">نوع فایل</label>
                <v-select
                  multiple
                  v-model="fileType"
                  dense
                  style="width: 43%;"
                  class="pt-0 mt-0 typeFilesBox"
                  :items="fileFormats"
                  @change="search"
                ></v-select>
                <v-icon>mdi-chevron-down</v-icon>
              </div>
              <div
                style="background: #F0F3F4; width: 50%"
                class="rounded-lg d-flex justify-space-between align-center mx-1 pa-1"
              >

                <label for="">از حجم(KB)</label>
                <input
                  type="number"
                  style="width: 50%;"
                  v-model="minSize"
                  @change="search"
                />
              </div>
              <div
                style="background: #F0F3F4; width: 50%"
                class="rounded-lg d-flex justify-space-between align-center mx-1 pa-1"
              >

                <label for="">تا حجم(KB)</label>
                <input
                  type="number"
                  style="width: 50%;"
                  v-model="maxSize"
                  @change="search"
                />
              </div>
            </div>
            <div
              class="d-flex d-xl-none d-lg-none d-md-none d-sm-none flex-column flex-col align-stretch "
              v-if="showFilters"
            >
              <div
                style="background: #F0F3F4;"
                class="rounded-lg d-flex align-center mx-1"
              >
                <v-icon>
                  mdi-brush-variant
                </v-icon>
                <label for="">نوع فایل</label>
                <v-select
                  multiple
                  v-model="fileType"
                  dense
                  style="width: 43%;"
                  class="pt-0 mt-0 typeFilesBox"
                  :items="fileFormats"
                  @change="search"
                ></v-select>
                <v-icon>mdi-chevron-down</v-icon>
              </div>
              <div class="d-flex mt-2">
                <div
                  style="background: #F0F3F4; width: 50%"
                  class="rounded-lg d-flex justify-space-between align-center mx-1 pa-1"
                >
                  <label for="">از حجم(KB)</label>
                  <input
                    type="number"
                    style="width: 50%;"
                    v-model="minSize"
                    @change="search"
                  />
                </div>
                <div
                  style="background: #F0F3F4; width: 50%"
                  class="rounded-lg d-flex justify-space-between align-center mx-1 pa-1"
                >
                 
                  <label for="">تا حجم(KB)</label>
                  <input
                    type="number"
                    style="width: 50%;"
                    v-model="maxSize"
                    @change="search"
                  />
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row
          v-if="showCapBox"
          style="border: 1px solid #F0F3F4; background: #F2F2F2;"
          class="rounded-lg my-2 align-center"
        >
          <v-col
            cols="12"
            class="d-xl-none d-lg-none d-md-none d-block"
            v-if="isAdmin && FID"
          >
            <span
              style="color: red;"
              class="mr-3"
              v-if="getUsedCapacity() > 100"
              >حجم فولدر پر شده است!</span
            >
            <span
              style="color: red;"
              class="mr-3"
              v-if="getUsedCapacity() > 80 && getUsedCapacity() < 100"
            >
              بیش از 80 درصد ظرفیت در دسترس شما پر شده است
            </span>
            <v-progress-linear
              :value="getUsedCapacity()"
              color="#016670"
            ></v-progress-linear>
            <span
              style="direction: ltr; text-align: left; display: block; width: 100%;
            font-family: Roboto !important; color : #6C7074; font-size: 12px;
            "
              class="mt-2"
              >{{ Math.round(sumCap / 1000000) }} MB out of
              {{ maxCap }} MB</span
            >
          </v-col>
          <v-col
            cols="12"
            class="d-xl-none d-lg-none d-md-none d-block"
            v-if="!isAdmin"
          >
            <span
              style="color: red;"
              class="mr-3"
              v-if="getUsedCapacity() > 100"
              >حجم فولدر پر شده است!</span
            >
            <span
              style="color: red;"
              class="mr-3"
              v-if="getUsedCapacity() > 80 && getUsedCapacity() < 100"
            >
              بیش از 80 درصد ظرفیت در دسترس شما پر شده است
            </span>
            <v-progress-linear
              :value="getUsedCapacity()"
              color="#016670"
            ></v-progress-linear>
            <span
              style="direction: ltr; text-align: left; display: block; width: 100%;
            font-family: Roboto !important; color : #6C7074; font-size: 12px;
            "
              class="mt-2"
              >{{ Math.round(sumCap / 1000000) }} MB out of
              {{ maxCap }} MB</span
            >
          </v-col>
        </v-row>
        <v-row
          style="border: 1px solid #F0F3F4"
          class="rounded-lg my-2 align-center"
        >
          <v-col cols="12" xl="6" lg="6" md="6" v-if="route">
            <p class="library-breadcrumb mb-0">
              شما اینجا هستید:
              <span
                @click="isAdmin ? $router.push('/admin/library') : $router.push('/profile/filemanager')"
                style="cursor: pointer;"
                >فولدر اصلی</span
              >
              <span
                v-for="(route, i) in route.pathMatch.split('/')"
                :key="i"
                @click="goToRoute(route)"
                style="cursor: pointer;"
              >
                /{{ route }}
              </span>
            </p>
          </v-col>
          <v-col cols="12" xl="6" lg="6" md="6" v-else>
            <p class="library-breadcrumb mb-0">
              شما اینجا هستید:
              <span
                v-for="(folder, i) in clickedFolders"
                :key="i"
                @click="goToFolderBread(folder)"
                style="cursor: pointer;"
              >
                {{ folder.TPF_FName }} /</span
              >
              <span @click="goToRoot" style="cursor: pointer;">فولدر اصلی</span>
            </p>
          </v-col>
          <v-col
            cols="6"
            class="d-xl-block d-lg-block d-md-block d-none"
            v-if="isAdmin && FID"
          >
            <span
              style="color: red;"
              class="mr-3"
              v-if="getUsedCapacity() > 100"
              >حجم فولدر پر شده است!</span
            >
            <span
              style="color: red;"
              class="mr-3"
              v-if="getUsedCapacity() > 80 && getUsedCapacity() < 100"
            >
              بیش از 80 درصد ظرفیت در دسترس شما پر شده است
            </span>
            <v-progress-linear
              :value="getUsedCapacity()"
              color="#016670"
            ></v-progress-linear>
            <span
              style="direction: ltr; text-align: left; display: block; width: 100%;
            font-family: Roboto !important; color : #6C7074; font-size: 12px;
            "
              class="mt-2"
              >{{ Math.round(sumCap / 1000000) }} MB out of
              {{ maxCap }} MB</span
            >
          </v-col>
          <v-col
            cols="6"
            class="d-xl-block d-lg-block d-md-block d-none"
            v-if="!isAdmin"
          >
            <span
              style="color: red;"
              class="mr-3"
              v-if="getUsedCapacity() > 100"
              >حجم فولدر پر شده است!</span
            >
            <span
              style="color: red;"
              class="mr-3"
              v-if="getUsedCapacity() > 80 && getUsedCapacity() < 100"
            >
              بیش از 80 درصد ظرفیت در دسترس شما پر شده است
            </span>
            <v-progress-linear
              :value="getUsedCapacity()"
              color="#016670"
            ></v-progress-linear>
            <span
              style="direction: ltr; text-align: left; display: block; width: 100%;
            font-family: Roboto !important; color : #6C7074; font-size: 12px;
            "
              class="mt-2"
              >{{ Math.round(sumCap / 1000000) }} MB out of
              {{ maxCap }} MB</span
            >
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        xl="9"
        lg="9"
        md="9"
        class="lib-body mb-5"
      >
        <v-row
          class="pa-1 align-stretch"
          v-if="
            (setFolders && setFolders.length > 0) ||
              (setFiles && setFiles.length > 0)
          "
        >
          <v-col
            @dragenter.prevent
            @dragover.prevent
            @drop="getDragged(folder)"
            cols="12"
            :xl="`${libformat ? 12 : 3}`"
            :lg="`${libformat ? 12 : 4}`"
            :md="`${libformat ? 12 : 6}`"
            :sm="`${libformat ? 12 : 6}`"
            :class="
              `d-flex pa-1 ${
                libformat
                  ? `flex-row align-center`
                  : `flex-row align-center justify-start`
              }`
            "
            v-for="folder in setFolders"
            :key="folder.TPF_FID"
            @dblclick="goToFolder($event, folder)"
            style="position: relative;"
          >
            <div
              :class="
                `folderbox d-flex align-center pa-2 ${getStyle(folder)} ${
                  libformat ? 'mb-0' : ''
                }`
              "
              style="width: 100%; height: 100%;"
            >
              <input
                type="checkbox"
                @change="selectFolder($event, folder)"
                class="folder-checkbox"
              />
              <v-icon class="folder">mdi-folder</v-icon>
              <label for="" v-if="libformat">{{ folder.TPF_FName }}</label>
              <p v-if="libformat" class="mx-4 mb-0" style="font-size: 14px;">
                حداکثر ظرفیت:
                {{
                  folder.TPF_Qouta
                    ? `${folder.TPF_FQouta}(MB)`
                    : `بدون محدودیت حجم`
                }}
              </p>
              <p v-if="libformat" class="mx-4 mb-0" style="font-size: 14px;">
                فضای ذخیره سازی:
                {{
                  folder.TPF_FID_Host
                    ? `${showRoot(folder.TPF_FID_Host)}`
                    : `data.chapex.ir`
                }}
              </p>
              <div
                class="d-flex flex-column text-center align-center"
                v-if="!libformat"
              >
                <label>{{ folder.TPF_FName }}</label>
              </div>
            </div>
          </v-col>
          <v-col
            @dragstart="setDragged(img)"
            draggable
            cols="12"
            :xl="`${libformat ? 12 : 3}`"
            :lg="`${libformat ? 12 : 4}`"
            :md="`${libformat ? 12 : 6}`"
            :sm="`${libformat ? 12 : 6}`"
            :class="
              `d-flex ${
                libformat ? `flex-row align-center` : `flex-column align-center`
              } pa-1`
            "
            v-for="img in setFiles"
            :key="img.TPIC_FID"
            style="position: relative;"
            @dblclick="showImage(img)"
          >
            <div
              :class="
                `folderbox d-flex ${
                  libformat ? 'flex-row' : 'flex-column justify-space-between'
                }  align-center  pa-2 ${getStyle(img)}`
              "
              style="width: 100%; height:100%;"
            >
              <input
                type="checkbox"
                @change="selectImage($event, img)"
                class="folder-checkbox"
              />

              <div
                class="d-flex flex-row text-center align-center justify-end my-2"
                style="width: 100%"
                v-if="!libformat"
              >
                <label class="ml-2">{{ showName(img.TPIC_FShowName) }}</label>
                <img :src="img.icon" alt="" style="width: 5%;" />
              </div>
              <img
                :src="img.thumbnail"
                alt=""
                :style="libformat ? `width: 8%` : `width: 40%`"
              />
              <label for="" v-if="libformat" class="mx-4">{{
                img.TPIC_FShowName
              }}</label>
              <p v-if="libformat" class="mx-4 mb-0" style="font-size: 14px;">
                نوع فایل: {{ img.TPIC_FType }}
              </p>
              <p v-if="libformat" class="mx-4 mb-0" style="font-size: 14px;">
                حجم فایل: {{ Math.round(img.TPIC_FFileSize / 100) }} KB
              </p>
              <p
                v-if="libformat && img.TPIC_FHeight && img.TPIC_FWidth"
                class="mx-4 mb-0"
                style="font-size: 14px;"
              >
                ابعاد فایل: mm {{ img.TPIC_FWidth }} X mm {{ img.TPIC_FHeight }}
              </p>
              <p
                v-if="libformat && img.TPIC_FResolution"
                class="mx-4 mb-0"
                style="font-size: 14px;"
              >
                رزولوشن فایل : {{ img.TPIC_FResolution }} DPI
              </p>
            </div>
          </v-col>
        </v-row>
        <v-row
          v-if="(nameSearch.length > 0 || fileType.length > 0 || minSize.length > 0 || maxSize.length > 0) && setFiles && setFolders && setFiles.length ==0 && setFolders.length == 0"
        >
          <v-col cols="12" class="pa-10">
            <span>نتیجه ای یافت نشد</span>
          </v-col>
        </v-row>
        <v-row
          v-if="
            setFiles &&
              setFiles.length == 0 &&
              setFolders &&
              setFolders.length == 0
              && (nameSearch.length == 0 && fileType.length == 0 && minSize.length == 0 && maxSize.length == 0)
          "
        >
          <v-col cols="12" class="pa-10">
            <span>این پوشه خالی است</span>
          </v-col>
        </v-row>

        <v-row v-if="!setFiles || !setFolders" class="justify-center pa-5">
          <v-progress-circular
            indeterminate
            color="#016670"
          ></v-progress-circular>
        </v-row>
      </v-col>
      <v-col  cols="3" class="d-xl-block d-lg-block d-md-block d-none">
        <sidebar-preview
        v-if="sidebar"
          :folders="allFolders"
          :image="image"
          :isAdmin="isAdmin"
          @closeSidebar="sidebar = false"
          @editSubmit="value => editSubmit(value)"
          @moveFile="moveFileDialog = true"
          @deleteFile="showDelete = true"
        />
        <folder-sidebar-preview
        v-if="showFolderSidebar"
          :folder="folder"
          @closeSidebar="showFolderSidebar = false"
          :roots="roots"
          :isAdmin="isAdmin"
          :maxCap="maxCap"
          @editFolderSubmit="value => editFolderSubmit(value)"
        />
      </v-col>
      <!-- <v-col  class="d-xl-block d-lg-block d-md-block d-none" :cols="showFolderSidebar ? 3 : 0">
  
      </v-col> -->
      <v-footer bottom fixed color="white">
        <v-row>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn
            v-if="isDialog && !multiple && selectedImages.length == 1"
              rounded
              class="mr-3"
              color="#016670"
              dark
              @click="exportFile"
            >
              انتخاب
            </v-btn>
            <v-btn
            v-if="isDialog && multiple && selectedImages.length > 0"
              rounded
              class="mr-3"
              color="#016670"
              dark
              @click="$emit('exportSelected', selectedImages)"
            >
              انتخاب
            </v-btn>
          </v-col>
        </v-row>
      </v-footer>
    </v-row>
    <library-capacity :show="showCap" @close="showCap = false" />
    <image-preview
      :imagePrev="imagePrev"
      :image="image"
      @closePrev="closePrev"
      class="d-xl-none d-lg-none d-md-none d-block"
      @editSubmit="value => editSubmit(value)"
    />

    <library-folder-dialog
      :show="folderDialog"
      :roots="roots"
      :maxCap="maxCap"
      :FID="FID"
      :isAdmin="isAdmin"
      :serverError="serverError"
      @close="folderDialog = false"
      @insertFolder="
        (name, capacity, host) => insertFolder(name, capacity, host)
      "
      @hideServerError="serverError = false"
    />
    <library-delete-dialog
      :show="showDelete"
      @close="showDelete = false"
      :selected="selected"
      :allImages="allImages"
      :allFolders="allFolders"
      @deleteSelected="items => deleteSelected(items)"
    />
    <library-upload-dialog
      :show="uploadDialog"
      :roots="roots"
      :folders="allFolders"
      :FID="FID"
      @close="uploadDialog = false"
      @sendFile="value => setFile(value)"
      :loading="loading"
      :fileFormats="fileFormats"
      :isAdmin="isAdmin"
    />
    <library-move-file
      :show="moveFileDialog"
      @close="moveFileDialog = false"
      :allFolders="allFolders"
      :FID="FID"
      :selected="selected"
      @moveFiles="value => moveFiles(value)"
    ></library-move-file>
    <external-link
      :show="showExternal"
      @close="showExternal = false"
      @externalSave="(link, alt, name) => externalSave(link, alt, name)"
    />
    <mobile-folder-sidebar-preview
      v-if="mobileFolderSidebar"
      :show="mobileFolderSidebar"
      :folder="folder"
          @closeSidebar="mobileFolderSidebar = false"
          :roots="roots"
          :isAdmin="isAdmin"
          :maxCap="maxCap"
          @editFolderSubmit="value => editFolderSubmit(value)"
    ></mobile-folder-sidebar-preview>

         <mobile-sidebar-preview
         v-if="mobileSidebar"
          :show="mobileSidebar"
          :folders="allFolders"
          :image="image"
          :isAdmin="isAdmin"
          @closeSidebar="mobileSidebar = false"
          @editSubmit="value => editSubmit(value)"
          @moveFile="moveFileDialog = true"
          @deleteFile="showDelete = true"
        />
  </div>
</template>

<script>
export default {
  props: ["route", "isDialog", "multiple", "selectedFiles", "isAdmin"],
  async mounted() {
    if(this.isAdmin){
      await this.getFolders(null);
      await this.getAllImages();
      this.getUploadRoots();
      if (!this.route) {
        this.getGallery();
      } else {
        var arr = this.route.pathMatch.split("/");
        var index = arr.length;
        this.name = arr[index - 1];
        this.getID(this.name, arr, index);
        this.getGalleryById(null ,this.FID);
      }
    } else {
      const user = this.$store.getters["login/getUserData"]();
      this.userID = user.TU_FID
      await this.getFolders(this.userID);
      await this.getAllImages(this.userID);
      this.getUploadRoots();
      if (!this.route) {
        this.getGallery(this.userID);
      } else {
        var arr = this.route.pathMatch.split("/");
        var index = arr.length;
        this.name = arr[index - 1];
        this.getID(this.name, arr, index);
        this.getGalleryById(this.userID, this.FID);
      }
    }
  },
  computed: {
    setFolders() {
      if (this.searchedFolders) {
        return this.searchedFolders;
      } else {
        return this.folders;
      }
    },
    setFiles() {
      if (this.searchedFiles) {
        return this.searchedFiles;
      } else {
        return this.images;
      }
    }
  },
  data() {
    return {
      userID: null,
      mobileSidebar: false,
      mobileFolderSidebar: false,
      multiSelect: false,
      showCapBox: false,
      showSearchBox: false,
      showToolbox: false,
      showFilters: false,
      showBtns: false,
      showFolderSidebar: false,
      showExternal: false,
      libformat: false,
      folderType: "بر اساس سفارش",
      imagePrev: false,
      selected: [],
      item: "",
      data: [],
      folders: null,
      images: null,
      image: {},
      sidebar: false,
      showDelete: false,
      folderDialog: false,
      dragged: {},
      FID: "",
      name: "",
      allFolders: [],
      allImages: [],
      uploadDialog: false,
      selectedImages: [],
      clickedFolders: [],
      nameSearch: "",
      fileType: [],
      minSize: "",
      maxSize: "",
      searchedFolders: null,
      searchedFiles: null,
      roots: [],
      loading: false,
      folder: {},
      showCap: false,
      sumCap: "",
      maxCap: "",
      sort: false,
      fileFormats: [
        "png",
        "jpeg",
        "jpg",
        "gif",
        "psd",
        "ai",
        "cdr",
        "webp",
        "svg",
        "tiff",
        "bmp",
        "avi",
        "mp4",
        "mov",
        "mp3",
        "pdf",
        "doc",
        "docx",
        "xlsx",
        "csv",
        "zip"
      ],
      serverError: false,
      moveFileDialog: false,
    };
  },
  methods: {
    showMobileSidebar(){
      if(this.selected[0].TPF_FID){
        this.folder = this.selected[0]
        this.mobileFolderSidebar = true 
      } else if(this.selected[0].TPIC_FID) {
        this.image = this.selected[0]
        this.mobileSidebar = true
      }
    },
    async moveFiles(value){
      try{
        const result = await this.$authAxios.$post("/gallery/moveFiles", {
          data: this.selectedImages,
          dest: value.TPF_FID
        })
        if(result){
          this.successToast(result.output.RetMsg)
          this.moveFileDialog = false
          this.sidebar = false
          this.selected=[]
          this.selectedImages= []
          if(this.FID){
            this.getGalleryById(null, this.FID)
          } else {
            this.getGallery()
          }
        }
      } catch(error){
        console.log(error)
      }
    },
    sortGallery(){
      this.setFolders.sort((a,b)=>a.TPF_FName.localeCompare(b.TPF_FName))
      this.setFiles.sort((a,b)=>{
        if(a.TPIC_FShowName && b.TPIC_FShowName){
          return a.TPIC_FShowName.localeCompare(b.TPIC_FShowName)
        }
        })
    },
    async getAllImages(userID) {
      try {
        if(userID){
          this.allImages = await this.$authAxios.$get(`/gallery/getAllUserImages/${userID}`);
        } else {
          this.allImages = await this.$authAxios.$get("/gallery/getAllImages");
        }
      } catch (err) {
        console.log(err);
      }
    },
    multipleSelect(ev) {
      if (ev.target.checked) {
        this.multiSelect = true;
      } else {
        this.multiSelect = false;
        this.selected = [];
        this.selectedImages = [];
      }
    },
    getStyle(itemm) {
      if (itemm.TPF_FID) {
        var index = this.selected.findIndex(item => {
          if (item.TPF_FID == itemm.TPF_FID) {
            return true;
          }
        });
        if (index >= 0) {
          return "selected-item";
        } else {
          return;
        }
      } else if (itemm.TPIC_FID) {
        var index = this.selectedImages.findIndex(item => {
          if (item.TPIC_FID == itemm.TPIC_FID) {
            return true;
          }
        });
        if (index >= 0) {
          return "selected-item";
        } else {
          return;
        }
      }
    },
    showUploadDialog() {
      const cap = this.getUsedCapacity();
      if (cap > 100) {
        this.showCap = true;
      } else {
        this.uploadDialog = true;
      }
    },
    getUsedCapacity() {
      if(this.isAdmin){
        // let folder;
        // if (this.FID) {
        //   folder = this.allFolders.find(item => item.TPF_FID == this.FID);
        //   var subFolders = this.allFolders.filter(item => item.TPF_FID_Parent == this.FID)
        // } else {
        //   folder = this.folder;
        // }
        // if (folder) {
        //   const max = folder.TPF_Quota * 1000000;
        //   let sum = 0;
        //   if (this.images) {
        //     for (var i = 0; i < this.images.length; i++) {
        //       const image = this.images[i];
        //       if (image.TPIC_FFileSize) {
        //         sum += Number(image.TPIC_FFileSize);
        //       }
        //     }
        //     this.sumCap = sum;
        //     this.maxCap = max;
        //     let percentage = sum / max;
        //     if (max && max != 0) {
        //       if (percentage) {
        //         return percentage * 100;
        //       }
        //     } else {
        //       return;
        //     }
        //   }
        // }
        let percentage = this.sumCap / (this.maxCap*1000000)
        if (this.maxCap && this.maxCap !== 0) {
          if (percentage) {
            return percentage*100
          }
        }
      } else {
        let percentage = this.sumCap / (this.maxCap*1000000)
        if (this.maxCap && this.maxCap !== 0) {
          if (percentage) {
            return percentage*100
          }
        }
      }
    },
    exportFile() {
      this.$emit("exportSelected", this.selectedImages[0]);
      this.selectedImages = [];
    }, 
    async externalSave(link, alt, name) {
      try {
        const data = {
          link: link,
          alt: alt,
          name: name,
          folderID: this.FID ? this.FID : null
        };
        const result = await this.$authAxios.$post("/gallery/external", data);
        if (result) {
          this.showResponseSuccessMessages(result);
          this.showExternal = false;
          if (this.FID) {
            this.getGalleryById(null, this.FID);
          } else {
            this.getGallery();
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    preventShit(e) {
      if (!e) {
        e = window.event;
      }
      e.cancelBubble = true;
      if (e.stopPropagation) {
        e.stopPropagation();
      }
    },
    showRoot(rootID) {
      if (this.roots.length) {
        const root = this.roots.find(x => x.TD_FID == rootID);
        if (root) {
          return root.TD_FName;
        }
      }
    },
    showName(name) {
      if (name && name.length > 30) {
        const newName = name.slice(0, 29) + "...";
        return newName;
      } else {
        return name;
      }
    },
    async editFolderSubmit(folder) {
      // console.log('folder', folder)
      try {
        const result = await this.$authAxios.$post(
          "/gallery/updateFolder",
          folder
        );
        if (result) {
          this.showResponseSuccessMessages(result);
        }
      } catch (error) {
        console.log(error);
      }
    },
    showFolder(folder) {
      this.folder = folder;
      this.sidebar = false;
      this.showFolderSidebar = true;
    },
    async getUploadRoots() {
      try {
        const res = await this.$authAxios.$get(
          "/defaults/get/430?mode=tablechildren"
        );
        if (res) {
          this.roots = res.data.table[0].children.filter(
            item => item.TD_FActive == 1
          );
          // console.log('roots', this.roots)
        }
      } catch (error) {
        console.log(error);
      }
    },
    search() {
      let sFolders = null;
      let sFiles = null;
      if (this.nameSearch.length > 0) {
        sFolders = this.folders.filter(x =>
          x.TPF_FName.includes(this.nameSearch)
        );
        sFiles = this.images.filter(x =>
          x.TPIC_FShowName ? x.TPIC_FShowName.includes(this.nameSearch) : false
        );
      }
      if (this.nameSearch.length == 0) {
        this.searchedFiles = null;
        this.searchedFolders = null;
      }
      if (this.fileType.length > 0) {
        for (var i = 0; i < this.fileType.length; i++) {
          sFiles = this.images.filter(x => {
            var z = false;
            if (x.TPIC_FType == this.fileType[i]) {
              z = true;
            }
            return z;
          });
        }
        sFolders = [];
      }
      if (this.minSize.length > 0 && this.maxSize.length > 0) {
        sFiles = this.images.filter(x => {
          var a = false;
          if (x.TPIC_FFileSize) {
            if (
              Math.round(x.TPIC_FFileSize / 1000) >= this.minSize &&
              Math.round(x.TPIC_FFileSize / 1000) <= this.maxSize
            ) {
              a = true;
            }
          }
          return a;
        });
        sFolders = this.folders.filter(x => {
          var b = false;
          if (x.TPF_Quota) {
            if (
              x.TPF_Quota * 1000 >= this.minSize &&
              x.TPF_Quota * 1000 <= this.maxSize
            ) {
              b = true;
            }
          }
          return b;
        });
      }
      if (sFolders) {
        // console.log('sFolders', sFolders)
        this.searchedFolders = sFolders;
      }
      if (sFiles) {
        // console.log('sFiles', sFiles)
        this.searchedFiles = sFiles;
      }
    },
    goToFolderBread(folder) {
      this.FID = folder.TPF_FID;
      this.getGalleryById(null, this.FID);
      const index = this.clickedFolders.findIndex(
        i => i.TPF_FID == folder.TPF_FID
      );
      // console.log("clickedId", index);
      for (var i = 0; i < this.clickedFolders.length; i++) {
        if (i > index) {
          this.clickedFolders.splice(i, i - index + 1);
        }
      }
    },
    goToRoot() {
      if(this.isAdmin){
        this.clickedFolders = [];
        this.getGallery();
      } else {
        this.clickedFolders = []
        this.getGallery(this.userID);
      }
    },
    goToRoute(route) {
      const pathArr = this.route.pathMatch.split("/");
      const index = pathArr.findIndex(item => item == route);
      let x = [];
      for (var i = 0; i <= index; i++) {
        x.push(pathArr[i]);
      }
      const path = x.join("/");
      this.isAdmin ? this.$router.push("/admin/library/" + path) :  this.$router.push("/profile/filemanager/" + path) ;
    },
    async setFile(value) {
      try {
        this.loading = true;
        const files = new FormData();
        for (var i = 0; i < value.files.length; i++) {
          files.append("files", value.files[i]);
        }
        // console.log("value", value);
        const data = {
          destination: value.destination,
          user: value.user,
          password: value.password
        };

        let result = await this.$authAxios.$post(`/gallery/upload/${this.FID ? this.FID : null}`, files);

        let saveResult;
        if (result) {
          for (var i = 0; i < value.files.length; i++) {
            var file = result.find(
              item => item.originalName == value.files[i].name
            );
            if (file) {
              if (value.files[i].resolution) {
                file.resolution = value.files[i].resolution;
              }
              if (value.files[i].height) {
                file.height = Math.round(value.files[i].height);
              }
              if (value.files[i].width) {
                file.width = Math.round(value.files[i].width);
              }
              if (value.files[i].colorMode) {
                file.colorMode = value.files[i].colorMode;
              }
              (file.destination = value.destination),
                (file.user = value.user),
                (file.password = value.password),
                (file.folderID = this.FID ? this.FID : null);
            }
          }
          saveResult = await this.$authAxios.$post(`/gallery/save?userID=${this.userID}`, result);
        }
        if (saveResult) {
          this.loading = false;
          this.showResponseSuccessMessages(saveResult);
          this.uploadDialog = false;
          if (this.FID) {
            this.getGalleryById(this.userID ? this.userID : null ,this.FID);
          } else {
            this.getGallery(this.userID ? this.userID : null);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    getID(name, arr, index) {
      if (arr.length > 1) {
        const parent = this.allFolders.find(
          item => item.TPF_FName == arr[index - 2]
        );
        var parentID = parent.TPF_FID;
        var folderr = this.allFolders.find(
          item => item.TPF_FName == name && item.TPF_FID_Parent == parentID
        );
        // console.log('allFolders', this.allFolders)
        this.FID = folderr.TPF_FID;
      } else {
        // console.log('allFolders', this.allFolders)
        const folder = this.allFolders.find(item => item.TPF_FName == name);
        this.FID = folder.TPF_FID;
      }
    },
    async getFolders(userID) {
      try {
        if(userID){
          this.allFolders = await this.$authAxios.$get(`/gallery/getUserFolders/${userID}`);
        } else {
          this.allFolders = await this.$authAxios.$get("/gallery/getFolders");
        }
        // console.log("allfolders", this.allFolders);
      } catch (error) {
        console.log(error);
      }
    },
    async getDragged(folder) {
      if (
        folder.TPF_Quota &&
        Number(folder.TPF_FolderSize) >= folder.TPF_Quota * 1000000
      ) {
        if (Number(folder.TPF_FolderSize) >= folder.TPF_Quota * 1000000) {
          this.showCap = true;
        }
      } else {
        let data = {
          img: this.dragged,
          folderID: folder.TPF_FID
        };
        try {
          const result = await this.$authAxios.$post(
            "/gallery/moveToFolder",
            data
          );
          if (result) {
            this.showResponseSuccessMessages(result);
            if(this.isAdmin){
              if (this.FID) {
                this.getGalleryById(null, this.FID);
              } else {
                this.getGallery(null);
              }
            } else {
              if (this.FID) {
                this.getGalleryById(this.userID, this.FID);
              } else {
                this.getGallery(this.userID);
              }
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    setDragged(img) {
      // console.log("img", img);
      if (this.selectedImages.length > 1) {
        this.dragged = this.selectedImages;
      } else {
        this.dragged = img;
      }
    },
    async getGalleryById(userID, id) {
      try {
        if(userID){
          const result = await this.$authAxios.$get(`/gallery/getByUserAndID/${userID}/${id}`);
          if (result) {
            this.images = result.images;
            this.maxCap = result.capacity
            this.sumCap = result.folderSize
            this.folders = result.folders.filter(i => {
              var x = false;
              if (i.TPF_FID_Parent == id) {
                x = true;
              }
              return x;
            });
            if (this.selectedFiles && this.selectedFiles.length > 0) {
              for (var i = 0; this.images.length; i++) {
                if (
                  this.selectedFiles.some(
                    item => item.img.TPIC_FID == this.images[i].TPIC_FID
                  )
                ) {
                  this.selectedImages.push(this.images[i]);
                }
              }
            }
          }        
        } else {
          const result = await this.$authAxios.$get(`/gallery/getByID/${id}`);
          if (result) {
            console.log('resbuid', result)
            if(this.maxCap.length == 0 && this.sumCap.length == 0){
              this.maxCap = result.parent.TPF_Quota
              this.sumCap = Number(result.parent.TPF_FolderSize) + Number(result.parent.TPF_FolderTotalSize)
            }
            this.images = result.images;
            this.folders = result.folders.filter(i => {
              var x = false;
              if (i.TPF_FID_Parent == id) {
                x = true;
              }
              return x;
            });
            if (this.selectedFiles && this.selectedFiles.length > 0) {
              for (var i = 0; this.images.length; i++) {
                if (
                  this.selectedFiles.some(
                    item => item.img.TPIC_FID == this.images[i].TPIC_FID
                  )
                ) {
                  this.selectedImages.push(this.images[i]);
                }
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async insertFolder(name, capacity, host) {
      try {
          let data;
          if (this.FID) {
            data = {
              name: name,
              parentId: this.FID,
              capacity: capacity,
              host: host
            };
          } else {
            data = { name: name, parentId: null, capacity: capacity, host: host };
          }
          const res = await this.$authAxios.$post(`/gallery/insertFolder?mode=${this.userID}`, data);
          if (res) {
            this.showResponseSuccessMessages(res);
            this.folderDialog = false;
            if (this.FID) {
              this.getGalleryById(this.userID ? this.userID : null ,this.FID);
            } else {
              this.getGallery(this.userID ? this.userID : null);
            }
          }
      } catch (error) {
        this.serverError = true
        console.log(error);
      }
    },
    refresh() {
      this.getGallery();
    },
    isSelected(img) {
      if (
        this.selected.includes(img.TPIC_FName) ||
        this.selectedImages.some(item => item.TPIC_FID == img.TPIC_FID)
        // ||
        // (this.selectedFiles && this.selectedFiles.length > 0 &&  this.selectedFiles.some(item => item.img.TPIC_FID == img.TPIC_FID))
      ) {
        return true;
      } else {
        return false;
      }
    },
    selectAll(ev) {
      if (ev.target.checked) {
        this.images.forEach(item => {
          if (item.TPIC_FID) {
            this.selectedImages.push(item);
          }
        });
        this.folders.forEach(item => {
          if (item.TPF_FID) {
            this.selected.push(item);
          }
        });
      } else {
        this.selected = [];
        this.selectedImages = [];
      }
    },
    async deleteSelected(items) {
      try {
        let data = items;
        this.showDelete = false;
        const result = await this.$authAxios.$post("gallery/delete", {
          data
        });
        if (result) {
          this.showResponseSuccessMessages(result);
          this.selected = [];
          location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async editSubmit(image) {
      // console.log("edit Image", image);
      try {
        const result = await this.$authAxios.$post("/gallery/edit", image);
        if (result) {
          // console.log("image edit", result);
          this.showResponseSuccessMessages(result);
          // this.sidebar = false;
          // this.imagePrev = false;
          if (this.FID) {
            this.getGalleryById(null, this.FID);
          } else {
            this.getGallery();
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    closePrev() {
      this.image = {};
      this.imagePrev = false;
    },
    goToFolder(ev, folder) {
      this.folder = folder;
      if (!ev) {
        ev = window.event;
      }
      ev.cancelBubble = true;
      if (ev.stopPropagation) {
        ev.stopPropagation();
      }

      if (this.isDialog) {
        this.FID = folder.TPF_FID;
        this.getGalleryById(null, this.FID);
        this.clickedFolders.push(folder);
      } else {
          this.$router.push($nuxt.$route.path + "/" + folder.TPF_FName);
      }
    },
    async getGallery(userID) {
      try {
        if(userID){
          const result = await this.$authAxios.$get(`/gallery/user/${userID}`);
          if (result) {
            this.folders = result.folders;
            this.images = result.images;
            this.maxCap = result.capacity
            this.sumCap = result.folderSize
            if (this.selectedFiles && this.selectedFiles.length > 0) {
              for (var i = 0; this.images.length; i++) {
                if (
                  this.selectedFiles.some(
                    item => item.img.TPIC_FID == this.images[i].TPIC_FID
                  )
                ) {
                  this.selectedImages.push(this.images[i]);
                }
              }
            }
          }
        } else {
          const result = await this.$authAxios.$get("/gallery/admin");
          if (result) {
            this.folders = result.folders;
            this.images = result.images;
            if (this.selectedFiles && this.selectedFiles.length > 0) {
              for (var i = 0; this.images.length; i++) {
                if (
                  this.selectedFiles.some(
                    item => item.img.TPIC_FID == this.images[i].TPIC_FID
                  )
                ) {
                  this.selectedImages.push(this.images[i]);
                }
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    showImage(img) {
      this.image = img;
      this.imagePrev = true;
    },
    selectFolder(e, item) {
      if (this.multiSelect) {
        if (e.target.checked) {
          if (!this.selected.includes(item)) {
            this.selected.push(item);
            this.folder = item
            this.showFolderSidebar = true
            this.sidebar = false
            this.image = {}
          }
        } else {
          var index = this.selected.findIndex(i => i === item);
          this.selected.splice(index, 1);
          this.folder = {}
          this.sidebar = false
          this.image = null
          this.showFolderSidebar = false
        }
      } else {
        if (!this.selected.includes(item)) {
          this.selected = [];
          this.selectedImages = [];
          this.selected.push(item);
          this.folder = item
            this.showFolderSidebar = true
            this.sidebar = false
            this.image = {}
        } else {
          this.selected = [];
          this.selectedImages = [];
          this.folder = {}
            this.showFolderSidebar = false
            this.sidebar = false
            this.image = null
        }
      }
    },
    selectImage(e, item) {
      if (this.multiSelect) {
        if (e.target.checked) {
          if (!this.selected.includes(item.name)) {
            this.selected.push(item);
            this.selectedImages.push(item);
            this.image = item
            this.sidebar = true
            this.folder = {}
            this.showFolderSidebar = false
          }
        } else {
          var index = this.selected.findIndex(i => i === item.TPIC_FName);
          this.selected.splice(index, 1);
          var ImgIndex = this.selectedImages.findIndex(
            i => i.TPIC_FID == item.TPIC_FID
          );
          this.selectedImages.splice(ImgIndex, 1);
          this.image = {}
            this.sidebar = false
                      this.folder = {}
            this.showFolderSidebar = false
        }
      } else {
        if (!this.selected.includes(item)) {
          this.selected = [];
          this.selectedImages = [];
          this.selected.push(item);
          this.selectedImages.push(item);
          this.image = item
            this.sidebar = true
            this.folder = {}
            this.showFolderSidebar = false
        } else {
          this.selected = [];
          this.selectedImages = [];
          this.image = {}
            this.sidebar = false
            this.folder = {}
            this.showFolderSidebar = false
        }
      }
    }
  },
  watch: {
    libformat(newValue) {
      if (newValue) {
        document.getElementsByClassName(
          "lib-body"
        )[0].firstChild.style.display = "list-item";
      } else {
        document.getElementsByClassName(
          "lib-body"
        )[0].firstChild.style.display = "flex";
      }
    },
    route(newValue) {
      var arr = newValue.pathMatch.split("/");
      var index = arr.length;
      this.name = arr[index - 1];
      this.getID(this.name, arr, index);
      this.getGalleryById(null, this.FID);
    },
    sort(newValue){
      if(newValue){
        this.setFolders.sort((a,b)=>a.TPF_FName.localeCompare(b.TPF_FName))
      this.setFiles.sort((a,b)=>{
        if(a.TPIC_FShowName && b.TPIC_FShowName){
          return a.TPIC_FShowName.localeCompare(b.TPIC_FShowName)
        }
        })
      } else {
        this.setFolders.reverse((a,b)=>a.TPF_FName.localeCompare(b.TPF_FName))
      this.setFiles.reverse((a,b)=>{
        if(a.TPIC_FShowName && b.TPIC_FShowName){
          return a.TPIC_FShowName.localeCompare(b.TPIC_FShowName)
        }
        })
      }
    }
  }
};
</script>

<style lang="scss">
.gallery-searchbox {
  label {
    font-size: 14px;
  }
}
.library {
  background: white;
  border-radius: 20px;
  button {
    letter-spacing: normal;
  }
  .formatPicker {
    .v-select__selection {
      font-family: bakhtiari !important;
    }
    label {
      left: auto !important;
      font-family: bakhtiari !important;
    }
    input {
      background: none !important;
      border: none !important;
      text-align: right;
    }
  }
  .lib-body {
    border: 1px solid #f0f3f4;
    border-radius: 20px;
    .row {
      list-style: none;
    }
    .folderbox {
      position: relative;
      background: #0166700d;
      cursor: pointer;
      border-radius: 20px;
      .select {
        margin-top: 0px;
        .v-messages {
          display: none;
        }
        .v-input__slot {
          margin-bottom: 0px;
        }
      }
      .folder {
        font-size: 35px;
        margin-left: 5px;
      }
      label {
        font-size: 14px;
      }
      .folder-checkbox {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
    .folderbox:hover {
      background: lightcyan;
    }
  }
  .library-breadcrumb {
    span:hover {
      color: #016670 !important;
      font-weight: bold !important;
    }
  }
  .typeFilesBox {
    input {
      border: none;
      outline: none;
    }
    ::before {
      display: none !important;
    }
    .v-text-field__details {
      display: none;
    }
  }
  .selected-item {
    background: cyan !important;
  }
}
@media (max-width: 601px) {
  .gallery-searchbox {
    flex-wrap: inherit;
    padding-right: 0px;
    padding-left: 0px;
    .name-search {
      width: 100%;
      margin-bottom: 10px;
    }
    label {
      font-size: 12px !important;
    }
  }
  .filemanger-action-bar{
    position: sticky;
    top: 0;
    z-index: 10;
    background: white;
  }
}
</style>
