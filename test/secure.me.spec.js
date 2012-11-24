var secureMe = require("../secure.me.js");
var express = require("express");
var expect = require("chai").expect;
var util = require("util");

describe("secure me unit", function(){
  it("secure.secureRoutes(app); will add securuty middleware for all endpoints", function(done){
    var app = express();
    var secure = secureMe();
    secure.setSecurity(secMiddleware);
    secure.setFree(freeMiddleware);
    function secMiddleware(req, res, next){}
    function freeMiddleware(req, res, next){}
    
    app.get("/get", function(){});
    app.post("/post", function(){});
    secure.secureRoutes(app);
    app.del("/del", function(){});
    app.put("/put", function(){});
    expect(app.routes.get[0].callbacks[0]).to.equal(secMiddleware);
    expect(app.routes.post[0].callbacks[0]).to.equal(secMiddleware);
    expect(app.routes.delete[0].callbacks[0]).to.equal(secMiddleware);
    expect(app.routes.put[0].callbacks[0]).to.equal(secMiddleware);
    done();
  })
  it(" secure.freeRoutes(app) will add free middleware for all endpoints", function(done){
    var app = express();
    var secure = secureMe();
    secure.setSecurity(secMiddleware);
    secure.setFree(freeMiddleware);
    function secMiddleware(req, res, next){}
    function freeMiddleware(req, res, next){}
    
    app.get("/get", function(){});
    app.post("/post", function(){});
    secure.freeRoutes(app);
    app.del("/del", function(){});
    app.put("/put", function(){});
    expect(app.routes.get[0].callbacks[0]).to.equal(freeMiddleware);
    expect(app.routes.post[0].callbacks[0]).to.equal(freeMiddleware);
    expect(app.routes.delete[0].callbacks[0]).to.equal(freeMiddleware);
    expect(app.routes.put[0].callbacks[0]).to.equal(freeMiddleware);
    done();
  })
  it(" secure.sequreRoutes(app) will sequre all endpoints besides those that have free middleware", function(done){
    var app = express();
    var secure = secureMe();
    secure.setSecurity(secMiddleware);
    secure.setFree(freeMiddleware);
    function secMiddleware(req, res, next){}
    function freeMiddleware(req, res, next){}
    
    app.get("/get", function(){});
    app.post("/post", function(){}, freeMiddleware);
    secure.secureRoutes(app);
    app.del("/del", function(){});
    app.put("/put", freeMiddleware, function(){});
    expect(app.routes.get[0].callbacks[0]).to.equal(secMiddleware);
    expect(app.routes.post[0].callbacks[0]).to.not.equal(secMiddleware);
    expect(app.routes.delete[0].callbacks[0]).to.equal(secMiddleware);
    expect(app.routes.put[0].callbacks[0]).to.not.equal(secMiddleware);
    done();
  })
  it(" secure.freeRoutes(app) will sequre all endpoints besides those that have security middleware", function(done){
    var app = express();
    var secure = secureMe();
    secure.setSecurity(secMiddleware);
    secure.setFree(freeMiddleware);
    function secMiddleware(req, res, next){}
    function freeMiddleware(req, res, next){}
    
    app.get("/get", function(){});
    app.post("/post", function(){}, secMiddleware);
    secure.freeRoutes(app);
    app.del("/del", function(){});
    app.put("/put", secMiddleware, function(){});
    expect(app.routes.get[0].callbacks[0]).to.equal(freeMiddleware);
    expect(app.routes.post[0].callbacks[0]).to.not.equal(freeMiddleware);
    expect(app.routes.delete[0].callbacks[0]).to.equal(freeMiddleware);
    expect(app.routes.put[0].callbacks[0]).to.not.equal(freeMiddleware);
    done();
  })
})
