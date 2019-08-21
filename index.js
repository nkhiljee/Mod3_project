document.addEventListener("DOMContentLoaded", () => {


    var userUrl = "http://localhost:3000/api/v1/users"
    var eventUrl = "http://localhost:3000/api/v1/events"
    var cont_events = document.getElementById("events-sub")
    var myevents = document.getElementById("myevents")
    var array = []
    var search = document.getElementById("container-search")
    var allEventsBtn = document.getElementById("allEvents")

    fetch(userUrl)
    .then(res => res.json())
    .then(users => users.forEach(user => {
        renderMyEvents(user)
    }))
    

    fetch(eventUrl)
    .then(res => res.json())
    .then(events => {
        let dates = []
        let allEvents
        cont_events.innerHTML = ""
        events.forEach(event => {
            renderEvent(event)
            if (event.user_id == 1){
                let obj = {
                    lat: event.lat,
                    lng: event.long
                }
                return array.push(obj)
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
    plotMarkers(array)
    })


    function renderEvent(event, filterDate = null){
        if (filterDate == null || filterDate == event.date) {
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
            allEvents = cont_events.innerHTML
        }
        return allEvents
    }

    function renderMyEvents(user) {
        if (user.id == 1) {
            user.events.forEach(event => {
                const holdingdiv = document.createElement("div")
                    holdingdiv.className = holdingdiv
                const title = document.createElement("h4")
                    title.innerText = event.name
                const loc = document.createElement("h6")
                    loc.innerText = event.address
                const time = document.createElement("h6")
                    time.innerText = `${event.start_time} - ${event.end_time}`
                
                holdingdiv.append(title, loc, time)
                myevents.append(holdingdiv)
            })
        } 
    }

    allEventsBtn.addEventListener("click", () => {
        cont_events.innerHTML = allEvents
        debugger

    })
    

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
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
      }
    }
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