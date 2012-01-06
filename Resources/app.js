Ti.include('initializers/init.js');
App.run();

App.setHost("http://dfine.herokuapp.com/api", "admin@dfine.com:Secret123");

Controllers.application.index();
