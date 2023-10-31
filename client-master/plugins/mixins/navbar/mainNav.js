export default {
    data(){
        return { 
            mainNav : [
                {title : "خانه" , link : "/" , icon : "mdi-view-headline"},
                {title : "صفحه فروش" , link : "/" , icon : "mdi-cloud-print-outline"},
                {title : "سفارش طراحی" , link : "/" , icon : "mdi-cloud-print-outline"},
                {title : "فرآیند های پس از پرداخت" , link : "/" , icon : "mdi-cloud-print-outline"},
                {title : "خدمات طراحی" , link : "/" , icon : "mdi-cloud-print-outline"},
                {title : "محصولات چاپی" , link : "/" , icon : "mdi-cloud-print-outline"}
            ]
        }
    } , 
    computed : { 
        mainNavWithId(){ 
            for(let[index , object] of this.mainNav.entries()){
                let id  = index
                id += 1
                object.id = id
            }
            return this.mainNav
        }
    }
}  