Ti.include('initializers/init.js');
App.run();

App.setHost("http://dfine.herokuapp.com/api", "admin@dfine.com:Secret123");

if(Ti.Network.networkType == Ti.Network.NETWORK_WIFI) ImageCache();

Controllers.application.index();
