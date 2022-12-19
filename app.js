const http = require('http')
const server = http.createServer()

const users = [ //여기 부분은 회원가입 공간
    {
      id: 1,
      name: "Rebekah Johnson",
      email: "Glover12345@gmail.com",
      password: "123qwe",
    },
    {
      id: 2,
      name: "Fabian Predovic",
      email: "Connell29@gmail.com",
      password: "password",
    },
  ];
  
  const posts = [   // 여기부분은 사용자 게시글 공간
    {
      id: 1,
      title: "간단한 HTTP API 개발 시작!",
      content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
      userId: 1,
    },
    {
      id: 2,
      title: "HTTP의 특성",
      content: "Request/Response와 Stateless!!",
      userId: 1,
    },
  ];
  
  
  const httpRequestListner = function(request, response){
      const { url, method } = request

    if(method === 'GET'){
      if(url === '/using') {
        response.writeHead(200,{'Content-Type' : 'application/json'})
        response.end(JSON.stringify({message : 'postCreated'}))
      } else if(url === "/post"){   
        let data='';
          response.writeHead(200,{"Content-Type" : "application/json"});
          response.end(JSON.stringify({"data" : data}));
      }
      // === 사용자들의 회원가입 ===

    } else if (method === 'POST'){
      if(url === '/users/signup'){
        let body= "";

        request.on("data", (data) =>{
          body += data;
        });

        request.on("end", () =>{
          const user = JSON.parse(body);

          users.push({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
          });
          response.writeHead(200, {'Content-Type' : 'application/json'})
          response.end(JSON.stringify({"meesage" : 'userCreated' }));
        });
      }
      // ==== 게시글 등록하기 =====

      if(url === '/posted'){
        let postBody = "";

        request.on("data", (data) => {
          postBody += data;
        });
        request.on("end", () =>{
          const post = JSON.parse(postBody);

            posts.push({
                id: post.id,
                title: post.title,
                content: post.content,
                userId: post.userId,
          });
            
          response.writeHead(200,{"Content-Type" : "application.json"});
          response.end(JSON.stringify({"message" : "postCreated"}));
        });
      }
    };
  };
     
server.on("request", httpRequestListner)

const IP = '127.0.0.1'
const PORT = 8000

server.listen(PORT, IP, function(){
    console.log(`Listening to request on ip ${IP} ${PORT}`)
});