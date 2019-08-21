document.addEventListener("DOMContentLoaded", () => {


    var userUrl = "http://localhost:3000/api/v1/users/1"
    var eventUrl = "http://localhost:3000/api/v1/events"
    var cont_events = document.getElementById("events-sub")
    var myevents = document.getElementById("myevents")
    var array = []
    var search = document.getElementById("container-search")
    let allEventsBtn = document.getElementById("allEvents")
    let allEvents
    let activeUser
    let footer = document.getElementById("container-footer")
    let deleteEvent = document.getElementById("deleteEvent")

    fetch(userUrl)
        .then(res => res.json())
        .then(user => {
            activeUser = user
            renderMyEvents(user)

            }
        )
    

    fetch(eventUrl)
    .then(res => res.json())
    .then(events => {
        let dates = []
        cont_events.innerHTML = ""
        events.forEach(event => {
            renderEvent(event)
            if (event.user_id == 1){
                let obj = {
                    lat: event.lat,
                    lng: event.long
                }
                array.push(obj)
            }

            if (!dates.includes(event.date)){
                let dateBtn = document.createElement("button")
                dateBtn.innerText = event.date
                dateBtn.className="btn btn-warning btn-lg"
                dateBtn.addEventListener('click', ()=>{
                    
                    cont_events.innerHTML = ""
                    events.forEach((filteredEvent)=>{
                        renderEvent(filteredEvent, event.date)
                    })
                })
                dates.push(event.date)
                search.append(dateBtn)
            }
        })

        allEventsBtn.addEventListener("click", () => {
            cont_events.innerHTML = allEvents
        })

        plotMarkers(array)
    })


    function renderEvent(event, filterDate = null){
        if (filterDate == null || filterDate == event.date) {
            const mainDiv = document.createElement("div")
                mainDiv.className = "card shadow-lg"
                mainDiv.setAttribute("data-target", `#exampleModalCenter${event.id}`)
                mainDiv.setAttribute("data-toggle", "modal")
            const image = document.createElement("img")
                image.src = event.img_url
            const subDiv = document.createElement("div")
                subDiv.className="subDiv"
            const h2 = document.createElement("h2")
                h2.innerText = event.name
            const h4 = document.createElement("h4")
                h4.innerText = event.address
            const address2 = document.createElement("h4")
                address2.innerText = `${event.city}, ${event.state} ${event.zipcode}`
            const price = document.createElement("h4")
                price.innerText = `Price: ${event.price}`
            const h4_1 = document.createElement("h4")
                h4_1.innerText = event.date
            const time = document.createElement("h4")
                time.innerText = `${event.start_time} - ${event.end_time}`
            const h6 = document.createElement("h6")
                h6.innerText = event.description

            subDiv.append(h2, h4, h4_1)
            mainDiv.append(image, subDiv)
            cont_events.append(mainDiv)

            const firstDiv = document.createElement("div")
                firstDiv.className = "modal fade"
                firstDiv.id = `exampleModalCenter${event.id}`
                firstDiv.setAttribute("tabindex", "-1")
                firstDiv.setAttribute("role", "dialog")
                firstDiv.setAttribute("aria-labelledby", "exampleModalCenterTitle")
                firstDiv.setAttribute("aria-hidden", "true")
            const secondDiv = document.createElement("div")
                secondDiv.className = "modal-dialog modal-dialog-centered"
                secondDiv.setAttribute("role", "document")
            const thirdDiv = document.createElement("div")
                thirdDiv.className = "modal-content"
            const fourthDiv = document.createElement("div")
                fourthDiv.className = "modal-header"
            const modaltitle = document.createElement("div")
                modaltitle.className = "modal-title"
                modaltitle.id = "exampleModalLongTitle"
                modaltitle.innerText = event.name   
            const modalbutton = document.createElement("button")
                modalbutton.className = "close"
                modalbutton.setAttribute("type", "button")
                modalbutton.setAttribute("data-dismiss", "modal")
                modalbutton.setAttribute("aria-label", "Close")
            const modalspan = document.createElement("span")
                modalspan.setAttribute("aria-hidden", "true")
                modalspan.innerText = "x"  
            const modalbody = document.createElement("div")
                modalbody.className = "modal-body"
                modalbody.id = "modal-body"

            const address = document.createElement("h4")
                address.innerText = event.address
            const modaldate = document.createElement("h4")
                modaldate.innerText = event.date
            const modalimage = document.createElement("img")
                modalimage.src = event.img_url
            const updatebtn = document.createElement("button")
                updatebtn.className = "btn btn-warning"
                updatebtn.innerText = "Update"
            const deletebtn = document.createElement("button")
                deletebtn.className = "btn btn-danger"
                deletebtn.innerText = "Delete"
                deletebtn.id = "deleteEvent"


            modalbutton.append(modalspan)
            fourthDiv.append(modaltitle, modalbutton)
            modalbody.append(modalimage, modaldate, time, address, address2, price, h6, updatebtn, deletebtn)
            thirdDiv.append(fourthDiv, modalbody)
            secondDiv.append(thirdDiv)
            firstDiv.append(secondDiv)    
            footer.append(firstDiv)  

            // const holdingdiv = document.getElementById("holdingDiv")
             
            // deletebtn.addEventListener('click', (e)=>{
            //     fetch(`http://localhost:3000/api/v1/events/${event.id}`, {
            //         method: 'DELETE'
            //     })
            //     .then(() =>{
            //         mainDiv.remove() 
            //         holdingdiv.remove()
            //     })
            // })
        }
        if (filterDate == null) {
            allEvents = cont_events.innerHTML
        }
    }

    function renderMyEvents(user) {
        if (user.id == 1) {
            user.events.forEach(event => {
                const holdingdiv = document.createElement("div")
                    holdingdiv.className = "holdingDiv shadow-sm"
                const title = document.createElement("h4")
                    title.innerText = event.name
                const loc = document.createElement("h6")
                    loc.innerText = event.address

                const time = document.createElement("h6")
                time.innerText = `${event.start_time} - ${event.end_time}`
                
                

                ///////////////Delete Button/////////////////

                const dltBtn = document.createElement('button')
                dltBtn.type = 'button'
                dltBtn.className = 'btn btn-warning btn-sm'
                dltBtn.innerText = 'DELETE'
                dltBtn.id = 'delete-event'

                holdingdiv.append(dltBtn)
                dltBtn.addEventListener('click', (e)=>{
                    const card = document.querySelector('.card')
                    const subDiv = document.querySelector('.subDiv')
                    fetch(`http://localhost:3000/api/v1/events/${event.id}`, {
                        method: 'DELETE'
                    })
                    .then(() =>{
                        holdingdiv.remove() 
                    })
                })

                time.append (dltBtn)
                holdingdiv.append(title, loc, time)
                myevents.append(holdingdiv)

            })
        } 
    }



    ///////////////Create a New Event Form/////////////////
    const createEventForm = document.querySelector('#createEventForm')
    createEventForm.addEventListener('submit', (e) => {
        e.preventDefault()
        newHoldingDiv = document.querySelector('#myevents')


        // debugger
        fetch('http://localhost:3000/api/v1/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': event.target[0].value,
                'description': event.target[1].value,
                'date': event.target[2].value,
                'start_time': event.target[3].value,
                'end_time': event.target[4].value,
                'address': event.target[5].value,
                'city': event.target[6].value,
                'state': event.target[7].value,
                'zipcode': event.target[8].value,
                'price': event.target[9].value,
                'tag': event.target[10].value,
                'img_url': event.target[11].value,
                'user_id': 1,
                'lat': 40.756167,   
                'long': -73.924149,

            })
            

        })
        .then(res => res.json())
        .then(newEvent => {
            let array1 = []
            let obj = {
                lat: newEvent.lat,
                lng: newEvent.long
            }
            renderEvent(newEvent)
            activeUser.events.push(newEvent)
            newHoldingDiv.innerHTML = ""
            renderMyEvents(activeUser)
            modal.style.display = "none"

            array1.push(obj)
            plotMarkers(array1)
            // console.log(array)
        })

        
        
        

    })

    ///////////////Create a New Event Form END/////////////////


    ////////////Create Events Modal////////////////////
  
  
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
    window.addEventListener('click', (e) => {
        const modal1 = document.querySelector('#myModal')
        if (e.target == modal1) {
            modal.style.display = "none";
        }
    })
    ////////////Create Events Modal END////////////////////


    ////////////My Events Modal ////////////////////

    // Get the modal
    var eventmodal = document.getElementById("eventsModal");

    // Get the button that opens the modal
    var myeventlink = document.getElementById("myeventlink");

    // Get the <span> element that closes the modal
    var spanevent = document.getElementsByClassName("eventclose")[0];

    // When the user clicks on the button, open the modal 
    myeventlink.onclick = function() {
        eventmodal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    spanevent.onclick = function() {
        eventmodal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(eventr) {
    if (eventr.target == eventmodal) {
        eventmodal.style.display = "none";
        }
    }

    ////////////My Events Modal  END////////////////////


    ////////////GOOGLE MAPS////////////////////


    var map;
    
    window.initMap = function(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.737109, lng: -73.996799},
        zoom: 11
    });
    }
    var markers;
    var bounds;

    function plotMarkers(array)
    {
    markers = [];
    bounds = new google.maps.LatLngBounds();

    array.forEach(function (marker) {
        var position = new google.maps.LatLng(marker.lat, marker.lng);

        markers.push(
        new google.maps.Marker({
            position: position,
            map: map,
            animation: google.maps.Animation.DROP
        })
        );

        bounds.extend(position);
    });
    map.fitBounds();
    }
    ////////////GOOGLE MAPS END////////////////////


})

