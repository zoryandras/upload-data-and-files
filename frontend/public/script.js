const formComponent = `
    <form id="form">
        <input type="text" name="title">
        <input type="file" name="picture">
        <button> SEND! </button>
    </form>
`

function loadEvent(){
    const rootElement = document.getElementById("root")
    rootElement.insertAdjacentHTML("beforeend", formComponent)

    const formElement = document.getElementById("form")
    formElement.addEventListener("submit", event => {
        event.preventDefault()
        
        const formData = new FormData()
        formData.append("title", event.target.querySelector(`input[name="title"]`).value)
        formData.append("picture", event.target.querySelector(`input[name="picture"]`).files[0])

        const fetchSettings = {
            method: "POST",
            body: formData,
        }

        fetch("/", fetchSettings)
            .then(async data => {
                if (data.status === 200) {
                    const response = await data.json()
                    event.target.outerHTML = `<img src="upload/${response.pictureName}">`
                    console.dir(data)
                }
            })
            .catch(error => {
                event.target.outerHTML = "The shit hits the fan"
                console.dir(error)
            })             
    })

}

window.addEventListener("load", loadEvent)