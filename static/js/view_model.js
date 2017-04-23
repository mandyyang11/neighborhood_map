

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// These marker functions (except some part of addMarker()) came directly from google map totural
// please refer to https://developers.google.com/maps/documentation/javascript/examples/marker-remove
//
//
var map;
var markers = [];
var masterInfoWindow;

// Adds a marker to the map and push to the array.
function addMarker(location, idx) {
    
    // mark the map with given location
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    
    // setting up infowindow on the click
    marker.addListener('click', function() {
        
        // checking if the yelp data is being loaded
        if (yelp.length > idx){
            
            // if yelp data is loaded, display the information in the infowindow
            masterInfoWindow.setContent(yelp[idx]);
        }else{
            
            // if the data is not there, display the name and ask user to try again
            masterInfoWindow.setContent('<div><b>' + initRestaurants[idx].name +
                        '</b></div>' +
                        '<div>The infomation still loading...</div>' +
                        '<div>Please try again.</div>');
        }
        
        // infowindow.open(map, marker);
        masterInfoWindow.open(map, marker);

        // set up bounce animation on the click as one of the project requirements
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            marker.setAnimation(null);
        }, 700);
    });
    
    markers.push(marker);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////

// hide all markers instead of destory them
function hideAllMarkers() {
    for (var i in markers){
        markers[i].setVisible(false);
    }
}



// statically define the list of restaurants
var initRestaurants = [
    {name: 'Eureka!', lat: 37.8700698, long: -122.269054, yelpId: 'eureka-berkeley-3'},
    {name: 'Mymy', lat: 37.7909304, long: -122.4214777, yelpId: 'mymy-san-francisco-3'},
    {name: 'Toss Noodle Bar', lat: 37.8680402, long: -122.2703039, yelpId: 'toss-noodle-bar-berkeley'},
    {name: 'Sliver Pizzeria', lat: 37.870264, long: -122.2690657, yelpId: 'sliver-pizzeria-berkeley-2'},
    {name: 'La Note', lat: 37.866206, long: -122.2694377, yelpId: 'la-note-berkeley-4'},
    {name: 'Tasty Pot', lat: 37.8687471, long: -122.2690398, yelpId: 'tasty-pot-berkeley-4'},
    {name: 'Musashi', lat: 37.8639922, long: -122.2687128, yelpId: 'musashi-berkeley'},
    {name: 'Kiraku', lat: 37.8636841, long: -122.2611743, yelpId: 'kiraku-berkeley'},
    {name: 'My Tofu House', lat: 37.7806363, long: -122.4713094, yelpId: 'my-tofu-house-san-francisco'},
    {name: 'Mensho Tokyo', lat: 37.7867071, long: -122.4165156, yelpId: 'mensho-tokyo-san-francisco-2'}
];

// load up yelp data asynchronouslly
var yelp = [];
for (var i in initRestaurants){
    
    // create yelp endpoint string
    var yelpEndpoint = 'http://localhost:5000/yelp_api/'+ initRestaurants[i].yelpId;
    
    // query yelp data with jQuery
    $.getJSON(yelpEndpoint).done(function(data) {
        
        // generate info string from the data
        var info = '<div><b>' + data.name + '</b></div>' +
            '<div> Yelp Rating: ' + data.rating + '</div>' +
            '<div>' + data.address + '</div>' +
            '<div>' + data.city + '</div>';
                    
        // push the info to yelp array
        yelp.push(info);
    
    // handle api failure
    }).fail(function() {
        alert("There was an error with the Yelp API call.");
    });
}

// create the view model and the bindings
function loadModel() {
    ko.applyBindings(new viewModel());
}

// view model function
function viewModel(){
    var self = this;

    // generate the map object
    map = new google.maps.Map(
        document.getElementById('map'), {
        zoom: 12,
        center: {lat: 37.825734, lng: -122.368263}
    });

    // generate a single InfoWindow for all markers to use
    masterInfoWindow = new google.maps.InfoWindow({
                content: 'hello world!'
            });
    
    // initialize filter with empty string and restaurants with empty array
    this.filter = ko.observable('');
    this.restaurants = ko.observableArray([]);
    
    // compute the restaurants to show
    ko.computed(
        function() {
            
            // convert the filter to lower case for comparison
            var lowerCaseFilter = self.filter().toLowerCase();
                
            // empty restaurants for new filtering word and hide all markers
            self.restaurants.removeAll();
            hideAllMarkers();
            
            // iterate throguh each restaurant in the initial list and
            // push only the ones contain filtered words onto the array
            // also display markers of their locations on the map
            for (var i in initRestaurants){
                var lowerCaseRestaurant = initRestaurants[i].name.toLowerCase();
                if (lowerCaseRestaurant.includes(lowerCaseFilter)){

                    // generate marker for the location if its not yet generated
                    // or if the yelp data is not loaded
                    if (markers.length <= i || yelp.length <= i){
                        addMarker({lat: initRestaurants[i].lat,
                              lng: initRestaurants[i].long},
                              i);
                    }else{

                        // set the marker to visible if it exists
                        markers[i].setVisible(true);
                    }

                    // bind the name and the marker to the resaurants
                    self.restaurants.push({name: initRestaurants[i].name,
                        marker: markers[i]});
                    
                }
            }
        }
    );
}

// error handle for google map
function errorHandle() {
    alert("Map can't load! Please check your network!");
}
