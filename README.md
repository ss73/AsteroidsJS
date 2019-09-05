# AsteroidsJS
This is an Asteroids clone in JavaScript and using the P5 framework. It was first developed in Processing and then ported to JavaScript. The game is playable here: https://ss73.github.io/AsteroidsJS/. You'll need a keyboard to play, so avoid using a mobile device.

For local development, an HTTP development server needs to be used as resources are loaded through HTTP AJAX requests. I have been using a browser-sync server which has the added benefit of automatically reloading the webpage when any changes were saved in the source code.

In order to setup the server, Node.JS first has to be installed (https://nodejs.org/en/download/). Then open a terminal and type: 

    sudo npm install -g http-server

Next, cd to the source directory (the same directory as this readme) and start the server by typing:

    ./http-server.sh
