// ایجاد FormData و افز.دن عکس به آن
// refsName -> this.$refs.refsName in form component
export default {
    methods: {

        appendImageProfileFormData(fd, refsName) {
            const file = this.$refs[refsName].files[0];

            if (file) {
                if (this.user.TU_FUserName) {
                    fd.append(refsName, file, file.name);
                }
            }
        },

        generateFormData(obj) {
            let formData = new FormData();
            for (const key in obj) {
                formData.append([key], obj[key]);
            }
            return formData;
        },
        
        appendImageFormData(fd, refsName, basicData) {
            const ref = this.$refs[refsName].$refs["image"]
            console.log(ref);
            if (ref) {
                const file = ref.files.length == 0
                    ? null : ref.files[0];
                if (file) {
                    fd.append(refsName, file, file.name);
                }
            }
        },
        
        appendImageFormDataRealTime(fd, fieldName, file) {
            if (fieldName) {
                if (file) {
                    fd.append(fieldName, file, file.name);
                    return fd
                }
            }
        },
    }
}