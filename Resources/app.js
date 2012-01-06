Ti.include('initializers/init.js');
App.run();

App.setHost("http://localhost:3000/api", "admin@dfine.com:Secret123");

Controllers.application.index();
