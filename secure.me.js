var _ = require("underscore");

var secureMe = function(){ 
  var securityMiddleware = null;
  var freeMiddleware = null;
  
  return {
    // security middleware setter
    setSecurity : function(middleware){
      securityMiddleware = middleware;
      securityMiddleware.secure = true;
    },
    // free middleware setter
    setFree : function(middleware){
      freeMiddleware = middleware;
      freeMiddleware.free = true;
    },
    // will make all routes secure besides those that have "guest middleware"
    secureRoutes : function(app){
      _.each(app.routes, eachRouteType);
      routesWatcher(app, eachRoute);
      return app;
      function eachRouteType(routeType){
        _.each(routeType, eachRoute);
      }
      function eachRoute(route){
        if(!isFree(route)){
          route.callbacks.unshift(securityMiddleware);
        }
        return route;
      }
    },
    // will make all routes free besides those that are secured by security middleware
    freeRoutes : function(app){
      _.each(app.routes, eachRouteType);
      routesWatcher(app, eachRoute);
      return app;
      function eachRouteType(routeType){
        _.each(routeType, eachRoute);
      }
      function eachRoute(route){
        if(!isSecure(route)){
          route.callbacks.unshift(freeMiddleware);
        }
        return route;
      }
    }
  }
}


function isFree(route){
  var freeMiddlePosition = _.find(route.callbacks, findFree);
  function findFree(callback){
    return callback.free === true;
  }
  return !!freeMiddlePosition;
}
function isSecure(route){
  var secureMiddlePosition = _.find(route.callbacks, findSecure);
  function findSecure(callback){
    return callback.secure === true;
  }
  return !!secureMiddlePosition;
}

module.exports = secureMe;

function routesWatcher(app, transform){
  // check full list of methods
  app.routes.get = app.routes.get || [];
  app.routes.put = app.routes.put || [];
  app.routes.post = app.routes.post || [];
  app.routes.delete = app.routes.delete || [];
  _.each(app.routes, eachRouteType);
  return app;
  function eachRouteType(routeType){
    bindWatcher(routeType, transform);
  }
}

var oldPush = Array.prototype.push;

Array.prototype.push = function(v){
  if(this.watched && this.transform){
    return oldPush.call(this, this.transform(v));
  }
  oldPush.call(this, v);
}

function bindWatcher(array, transform){
  Object.defineProperty(array, "watched", {
    enumerable: false,
    configurable:false,
    value: true
  });
  Object.defineProperty(array, "transform",{
    enumerable: false,
    configurable: false,
    value: transform
  });
}


