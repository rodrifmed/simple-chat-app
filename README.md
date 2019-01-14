# simple-chat-app

A simple chat example using node, socket.io and angular.
The project is splited in 2 folders, client and server.

## How to install?

1) Clone the project.
2) Execute the command <b>npm install</b> inside the cliend and server folders.

## How to use or test?

1) npm run server for server and npm run start for client.

## Model

* I'm using the flatten data structures in a in memory database
* You can find a example in /server/demo/database-data-mock.ts

## Authentication

* Sessionless
* I'm using JWT with cookie in this project, because of that the way to test the chat is using 2 brownsers.

## Socket.io

* Because of in the model the chat is the owner of the messages, I'm using a socket.io room per chat
* With that the application don't need to open lot of tcp connections.


## Knowing issues

1) No test
2) Logout is not cleaning the socket
3) Layout is not presentable
4) Needs more functionality 

## Real world application observations

1) Another solution to create a chat is working with serveless, using firebase or another similar tool
2) For authentication is better use a third-party aplication like Auth0
3) Depending on the quantity of users and requests is better follow the discord solution for chat
4) For a proof of concept work with flatten data is good, because is simple to change the structure.

## References

* https://firebase.google.com/docs/database/web/structure-data
* https://socket.io/
* https://blog.discordapp.com/how-discord-stores-billions-of-messages-7fa6ec7ee4c7
* https://material.angular.io/
* https://angular-university.io/




