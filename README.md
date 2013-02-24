README
------

Node-MVVM is a RESTful MVVM service that I use for prototyping in Express.js

Dependancies
------

* Express
* MongoDB

TODO
------

Implement Auth as such:

```
app.put('/:model/:id', 'Auth.checkAuth', database.update);
```