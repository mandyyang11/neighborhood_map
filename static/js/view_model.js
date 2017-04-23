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

    
}

// error handle for google map
function errorHandle() {
    alert("Map can't load! Please check your network!");
}