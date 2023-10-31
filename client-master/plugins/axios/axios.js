import https from 'https';

export default function ({
  $axios,
  redirect,
  store
}) {

  $axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false
  });

  $axios.onError(error => {

  })

  $axios.setBaseURL(process.env.BASE_URL_SERVER)




  $axios.onResponse((response) => {
    if (response.data.date) {
      store.dispatch("date/setDate", response.data.date);
    }
  })
}
