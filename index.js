document.addEventListener("DOMContentLoaded", () => {

    const eventUrl = "http://localhost:3000/api/v1/events"
    const cont_events = document.getElementById("events-sub")
    const tag_sort = document.getElementById("tag-display")

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


    // Get the modal
    const modal = document.getElementById("myModal");

    // Get the button that opens the modal
    const btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 
    btn.onclick = function() {
    modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    //Submit button on Create a New Event Form
    const createEventForm = document.querySelector('#createEventForm')
    createEventForm.addEventListener('submit', (e) => {
        e.preventDefault()

        fetch('http://localhost:3000/api/v1/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
            })
        })
    })
    

})