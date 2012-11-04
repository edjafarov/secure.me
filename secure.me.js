var _ = require("underscore");

var secureMe = function(){ 
  var securityMiddleware = null;
  var freeMiddleware = null;
  
  return {
    setSecuruty : function(middleware){
      securityMiddleware = middleware;
      securityMiddleware.secure = true;
    },
    setFree : function(middleware){
      freeMiddleware = middleware;
      freeMiddleware.free = true;
    },
    secureRoutes : function(app){
      _.each(app.routes, eachRouteType);

      function eachRouteType(routeType){
        _.each(routeType, eachRoute);
      }
      function eachRoute(route){
        if(!isFree(route)){
          route.callbacks.unshift(securityMiddleware);
        }
      }
    },
    freeRoutes : function(app){
      _.each(app.routes, eachRouteType);

      function eachRouteType(routeType){
        _.each(routeType, eachRoute);
      }
      function eachRoute(route){
        if(!isSecure(route)){
          route.callbacks.unshift(freeMiddleware);
        }
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
