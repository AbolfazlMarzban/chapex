<template>
    <span>
        <v-icon dense class="ml-2">mdi-{{field_icon()}}</v-icon>
        <span>{{field_label()}}</span>
    </span>
</template>

<script> 
export default {
    props: ["type"],
    methods: {
        field_icon() {
            switch (this.type) {
                case 'input':                               
                    return 'form-textbox'

                case 'textarea':
                    return 'text-box-outline'

                case 'editor':
                    return 'text-box-edit-outline'

                case 'checkbox':
                    return 'checkbox-outline'

                case 'radio':
                    return 'radiobox-marked'

                case 'select':
                    return 'form-dropdown'

                case 'selectSystem':
                    return 'form-dropdown'

                case 'multiselect':
                    return 'form-dropdown'

                case 'multiSelectSystem':
                    return 'form-dropdown'

                case 'file':
                    return 'cloud-upload'
                case 'advUploader':
                    return 'file-upload'
                case 'color':
                    return 'eyedropper-variant'

                case 'link':
                    return 'cloud-download'

                case 'email':
                    return 'email-outline'

                case 'date':
                    return 'calendar-range'

                case 'time':
                    return 'clock-time-eight-outline'

                case 'number':
                    return 'numeric'

                case 'money':
                    return 'cash-100'

                case 'phone':
                    return 'cellphone'

                case 'star':
                    return 'star-settings-outline'

                case 'divider':
                    return 'minus'

                case 'spacer':
                    return 'arrow-split-horizontal'

                case 'title':
                    return 'format-title'

                case 'text':
                    return 'text-long'
                case 'sendemail':
                    return 'email-outline'
                case 'sms':
                    return 'text-long'
                case 'showimg':
                    return 'text-box-outline'
                case 'button':
                    return 'text-box-outline'
                case 'slider':
                    return 'play-box-outline'
                case 'accardion':
                    return 'menu-open'
                case 'video':
                    return 'video'
                case 'icon':
                    return 'svg'
                case 'iframe':
                    return 'application'
                case 'salePage':
                    return 'apps'
            }
        },
        field_label() {
            switch (this.type) {
                case 'input':
                    return 'متن ساده'

                case 'textarea':
                    return 'متن چندخطی'

                case 'editor':
                    return 'ادیتور'

                case 'checkbox':
                    return 'چک باکس'

                case 'radio':
                    return 'رادیو'

                case 'select':
                    return 'آبشاری'

                case 'selectSystem':
                    return 'آبشاری سیستمی'

                case 'multiselect':
                    return 'آبشاری چندتایی'

                case 'multiSelectSystem':
                    return 'آبشاری چندتایی سیستمی'

                case 'file':
                    return 'آپلود'
                case 'advUploader':
                    return 'آپلودر پیشرفته'
                case 'color':
                    return 'رنگ'

                case 'link':
                    return 'دانلود'

                case 'email':
                    return 'ایمیل'

                case 'date':
                    return 'تاریخ'

                case 'time':
                    return 'ساعت'

                case 'number':
                    return 'عدد'

                case 'money':
                    return 'پول'

                case 'phone':
                    return 'موبایل'

                case 'star':
                    return 'امتیازدهی'

                case 'divider':
                    return 'جداکننده'

                case 'spacer':
                    return 'فاصله گذار'

                case 'title':
                    return 'عنوان بخش'

                case 'text':
                    return 'متن'
                case 'sendemail':
                    return 'ارسال ایمیل'
                case 'sms':
                    return 'ارسال پیامک'
                case 'showimg':
                    return 'نمایش تصویر'
                case 'button':
                    return 'دکمه'
                case 'slider':
                    return 'اسلایدر'
                case 'accardion':
                    return 'آکاردئون'
                case 'video':
                    return 'ویدئو'
                case 'icon':
                    return 'آیکن'
                case 'iframe':
                    return 'iframe'
                case 'salePage':
                    return 'صفحه فروش'
            }
        }
    }
}
</script>