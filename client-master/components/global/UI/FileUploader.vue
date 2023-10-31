<template>
    <div>

        <label>{{ label }}</label>

        <div class="d-flex flex-column align-center justify-center flex-grow-1 uploader">

            <div v-if="upload.loading == 0">
                <label>
                    <div v-if="!file.path" class="uploaderText">
                        <v-icon style="font-size: 60px;">mdi-upload</v-icon>
                        <p v-if="!placeholder">فایل خود را انتخاب کنید</p>
                        <p v-if="placeholder" class="text-center">{{ placeholder }}</p>
                    </div>

                    <div v-else>
                        <v-row class="ma-1">
                            <v-col :cols="readonly ? 12 : 6">
                                <v-btn icon :href="setDownloadUrl(file.path)" target="_blank">
                                    <v-icon style="font-size: 38px;" color="blue">
                                        mdi-file-download
                                    </v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="6" v-if="!readonly">
                                <v-btn icon @click="deleteFile">
                                    <v-icon style="font-size: 38px;" color="pink">mdi-delete-forever</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <p v-if="!placeholder">فایل یافت شد</p>
                                <p v-if="placeholder" class="text-center">{{ placeholder }}</p>
                            </v-col>
                        </v-row>
                    </div>

                    <input v-if="!uploadedFile" type="file" :accept="accept" @change="handleFileUpload($event)" multiple
                        color="#f66f26" buffer-value="0" style="display: none" :disabled="readonly" />
                </label>

                <v-text-field v-if="!file.path && !readonly" label="لینک فایل" v-model="url" prepend-icon="mdi-link-plus"
                    append-icon="mdi-check" @click:append="submitLink"></v-text-field>

            </div>

            <div class="text-center" v-else>
                <v-progress-circular :size="50" color="green" indeterminate></v-progress-circular>
            </div>

        </div>
    </div>
</template>
    
<script>
import axios from "@nuxtjs/axios"
import path from "path";
// import FormData from "form-data"
export default {
    props: ["label", "readonly", "placeholder", "options", "accept", "value", "state"],
    mounted() {
        // console.log("asdasdas", this.uploadedFile);
    },

    data() {
        return {
            url: '',
            uploadedFile: null,
            file: {
                path: null,
            },
            upload: { loading: 0, status: "" },
        };
    },

    mounted() {
        if (this.value) {
            this.file = this.value
        }
    },

    methods: {
        handleFileUpload(event) {
            this.uploadedFile = event.target.files[0]; 

            this.submit()
        },

        async submit() {
            try {
                let form = new FormData();

                const options = {
                    state: this.state 
                };
                for (const key in options) {
                    form.append([key], options[key]);
                }

                form.append('file', this.uploadedFile);

                this.upload.loading = 1;

                const config = { headers: { 'Content-Type': 'multipart/form-data' } };
                const response = await this.$authAxios.$post("/image/file", form, config);

                this.upload.loading = 0;
                this.upload.status = "success";

                if (response) {
                    this.file = response.file
                    this.$emit("input", this.file);

                    setTimeout(() => {
                        this.upload.status = "uploaded";
                    }, 2000);
                }
            }
            catch (error) {
                this.upload.loading = 0;
                this.upload.status = "failed";
                // this.showResponseErrors(error);
                console.log('upload error');
                console.log(error);
            }
        },

        async submitLink() {
            this.file.path = this.url
            this.upload.loading = 0;
            this.upload.status = "uploaded";
            this.$emit("input", this.file);
        },

        async deleteFile() {
            const response = await this.$authAxios.$post("/image/delete", { data: this.file });

            if (response) {
                this.file.path = null
                this.uploadedFile = null
                this.$emit("input", this.file);

            }
        },
    },

    watch: {
        value: {
            handler(val, oldVal) {
                this.file = val
            },
            deep: true
        }
    },
};
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