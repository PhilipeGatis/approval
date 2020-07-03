![](https://media.giphy.com/media/LlEqGzjyRPwMpnZ1kX/giphy.gif)

# approval
This is a asset approval collaboration tool where you can:
 - Does markups on images, videos, audios and create a note.
 - Does comments on notes
 - Can approve/repove the asset

### run dev mode

 #### start mysql docker
 - docker-compose up -d
 - docker-compose ps (to see if mysql docker is up)
 - docker-compose stop (to stop mysql docker)
 
 #### start server and web
 - yarn install (to install all dependencies)
 ##### server
 - configure .env.dev file in "packages/server" folder, sample file is together.
 ```
    LOG_LEVEL=?
    PORT=?
    DB_HOST=
    DB_PORT=
    DB_USER=
    DB_PASS=
    DB_DATABASE=
 ```
 - yarn start:server
 ##### web
 - change proxy field in "packages/front/package.json" to server port, sample ```"proxy": "http://localhost:3001"```,
 - yarn start:front
 
 ##### add frist data 
 - add basic auth header ```"Authorization": "Basic dGVzdGU6dGVzdA="``` 
 - call mutation and copy id in result
 ```
  mutation addApproval {
   addApproval(approval: {
       from: "web",
       approvers: [{
         login: "teste",
         name: "teste",
         isRequeried: true
       },
       {
         login: "user2",
         name: "Mary Poppins",
         isRequeried: false
       }],
       assets: [
         {
           asset: "little-yoda.jpeg",
           assetUrl: "https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
         }
       ]

     }){
       id
     }
   }
  ```
  ![sample.png](![alt text](https://github.com/[username]/[reponame]/blob/[branch]/samples/sample.png?raw=true))
  ##### end
  - access ```http://localhost:3000/{id}```
