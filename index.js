document.addEventListener("DOMContentLoaded", () => {

    var eventUrl = "http://localhost:3000/api/v1/events"
    var cont_events = document.getElementById("events-sub")
    var tag_sort = document.getElementById("tag-display")

    fetch(eventUrl)
    .then(res => res.json())
    .then(events => events.forEach(event => {
        renderEvent(event)
    }))

    function renderEvent(event){
        const mainDiv = document.createElement("div")
            mainDiv.className = "card shadow-lg"
        const image = document.createElement("img")
            image.src = event.img_url
        const subDiv = document.createElement("div")
            subDiv.className="subDiv"
        const h2 = document.createElement("h2")
            h2.innerText = event.name
        const h4 = document.createElement("h4")
            h4.innerText = event.address
        const h4_1 = document.createElement("h4")
            h4_1.innerText = event.date
        // const h6 = document.createElement("h6")
            // h6.innerText = event.description
        subDiv.append(h2, h4, h4_1)
        mainDiv.append(image, subDiv)
        cont_events.append(mainDiv)
    }

    function renderSmallCard(event) {
        const littleDiv = document.createElement("div")
        littleDiv.className = "littlecard shadow-lg"
        const h4 = document.createElement("h4")
            h4_1.innerText = event.name
        const h6 = document.createElement("h6")
            h6.innerText = event.address
        littleDiv.append(h4, h6)
        tag_sort.append(littleDiv)
    }
})