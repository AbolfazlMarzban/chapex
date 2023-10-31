

export default{
    methods: {
        toggleSchema(schemaMain,schemaSecond,currentSchema){
            if (currentSchema==schemaMain){
                currentSchema= schemaSecond;
            }else if (currentSchema==schemaSecond) {
                currentSchema= schemaMain;
            }
            return currentSchema;
        }
    },
}