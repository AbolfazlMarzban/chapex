export default {
    data() {
      return {
        table: {
          checkboxEnabled: true,
          selectedItems: [],
          unSelect: false,
          show: true,
          data: [],
          // schema: {},
          schemaShort: {
          
          },
          schemaMain: {
           
          },
          tableBtn: [
            {
              title: "eye",
              event: "show",
              className: "show_icon",
              value: "1"
            }
          ]
        },
        headerManager: {
          show: true,
          status: "start",
          title: {
            fa: "استاندارد طراحی ",
            en: "Design standard",
            icon: "mdi-close"
          },
          buttons: {
            cancel: {
              show: false,
              enable: false
            },
            submit: {
              show: false,
              enable: false
            },
            insert: {
              show: true,
              enable: true
            },
            delete: {
              show: true,
              enable: false
            },
            
          }
        },
  
        form: {
          show: true,
          data: {},
          readonly: false
        },
        defaults: {}
      };
    }
  };
  