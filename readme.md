## secure.me - express helper that allows to setup security middleware for all routes at once

### features
* set security middleware on all routes at once
* manage endpoints access by using setting up freeMiddleware

### expamples
If you need to restrict access to all of your app's routes at once ```secure.secureRoutes(app);```. 
You still can open routes publically by adding free middleware for the route.

```javascript
var app = express();
var secure = secureMe();
//setup security/free middlewares
secure.setSecurity(ensureUser);
secure.setFree(freeAccess);

function ensureUser(req, res, next){
  // check the user next() if passed, 403 if not
}
function freeAccess(req, res, next){
  // setup guest user
  return next();
}

//secure routes
secure.secureRoutes(app);

app.get("/myprofile", showProfile);
app.get("/top", freeAccess, showTop);
app.get("/myProfileManage", manageProfile);
app.get("/shop", freeAccess, shop);

app.listen(PORT);
```


