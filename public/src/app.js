import { createApp, ref, reactive, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = createApp({
  setup() {
    const baseURL = 'http://143.198.232.51:4000/pessoas'

    const name = ref('')
    const age = ref('')
    const postId = ref('')

    const selectedMethod = ref('post')

    const person = reactive({
      name: 'Geraldo',
      children: true,
    })

    const handleForm = () => {
      if (selectedMethod.value == 'post') return handlePost()
      if (selectedMethod.value == 'delete') return handleDelete()
      if (selectedMethod.value == 'put') return handlePut()
    }

    function handlePut(){

       // datajson
       const json = JSON.stringify({
        id: +postId.value,
        nome: name.value,
        idade: age.value,
      })

        //ajax
        const ajaxn = new XMLHttpRequest()
        ajaxn.open('PUT', baseURL)
        ajaxn.setRequestHeader('Content-Type', 'application/json')
        ajaxn.send(json)

        ajaxn.onload = function (e) {
          // Check if the request was a success
          if (this.readyState === XMLHttpRequest.DONE) {

            // Get and convert the responseText into JSON
            console.log(`Alterado com sucesso! ✅`)

            cleanInputs()
          }
        }

    }

    function handleDelete() {
      const id = +postId.value
      console.log(id)

      //ajax
      const ajaxn = new XMLHttpRequest()
      ajaxn.open('DELETE', baseURL)
      ajaxn.setRequestHeader('Content-Type', 'application/json')

      const ajaxdata = JSON.stringify({
        id: id,
      })

      ajaxn.send(ajaxdata)
      ajaxn.onload = () => {
        if (ajaxn.readyState === XMLHttpRequest.DONE) {
          // Get and convert the responseText into JSON
          console.log(`Item DELETADO`)

          cleanInputs()
        }
      }
    }

    function handlePost() {
      // datajson
      const json = JSON.stringify({
        nome: name.value,
        idade: age.value,
      })

      // ajax
      const ajaxn = new XMLHttpRequest()
      ajaxn.open('POST', baseURL)
      ajaxn.setRequestHeader('content-Type', 'application/json')
      ajaxn.send(json)

      // if susscess
      ajaxn.onload = function (e) {
        
        // Check if the request was a success
        if (this.readyState === XMLHttpRequest.DONE) {

          // Get and convert the responseText into JSON
          console.log(`Cadastrado com sucesso! ✅`)

          // reset form?
          cleanInputs()
        }
      }
    }

    async function fetchAPI() {
      const req = await fetch('http://143.198.232.51:4000/pessoas')
      const data = await req.json()
      console.dir(data)
    }

    const cleanInputs = () => {
      name.value = ''
      age.value = ''
      postId.value = ''
      window.location.reload()
    }
   

    onMounted(() => {
      fetchAPI()
    })

    return {
      selectedMethod,
      name,
      age,
      handlePost,
      handleDelete,
      handleForm,
      postId,
    }
  },
})

app.mount('#app')
