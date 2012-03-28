Ti.include('initializers/init.js');
App.run();

// App.setHost("http://dfine.herokuapp.com/api", "admin@dfine.com:Secret123");
App.setHost("http://dfine.dev/api", "admin@dfine.com:Secret123");

if(Ti.Network.networkType == Ti.Network.NETWORK_WIFI) ImageCache();

// Instead of this, perhaps we call the view directly. Specifying the layout if it is not already specified.
Controllers.content.renderView('main_screen');


