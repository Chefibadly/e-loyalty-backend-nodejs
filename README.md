#  realted APIs(endpoints) 
* POST :http://localhost:5000/api/v1/signup for adding(signup) a new user to database
    to test:{
        "name": "mohamed chedly",
        "lastname": "AMEUR",
        "phoneNumber": "92819480",
        "password": "chedly123"
    }
* POST :http://localhost:5000/api/v1/users/signin for loggin in a user
    to test:{
        "phoneNumber": "92819480",
        "password":"chedly123"
    }
* GET :http://localhost:5000/api/v1/users/sigout for logoff the current loginning user

* GET: http://localhost:5000/api/v1/users for getting all users
* GET: http://localhost:5000/api/v1/users/{id} for getting a user by id
* DELETE: http://localhost:5000/api/v1/users/{id} for deletting a user by id
* PUT: http://localhost:5000/api/v1/users/{id} update a user by id
    to test:{
        "name": "yezan ",
        "lastname": "mbarek",
    }
* POST http://localhost:5000/api/v1/users/addloyaltycard/{id} add a loyalty card to the user with id
    to test:{
        "points":100,
        "checkPoints": ["1"],
        "rewards": "",
        "validationDate":"20-12-2022",
        "id_program":"",
    }

* POST :http://localhost:5000/api/v1/businesses/signin for loggin in a business account
    to test:{
        "username":"chedly"
        "password":"chedly123"
    }
* POST :http://localhost:5000/api/v1/businesses/signup 

* POST :http://localhost:5000/api/v1/businesses/createloyaltycardProgram for creating a loyalty program for the business per id business
   to test:{
        "titre":"test1"
        "loyalty_program_type":"second day"
        "strategy":"4-2-3-1"
        "business":"62447550f974697a495a6f21"
    }
* POST :http://localhost:5000/api/v1/businesses/addProduct/{id} for adding a product to  a business
    to test:{
        "name":"product test"
        "reference":"6250dcff186d51bed6a"
        "price":500
        "description":" lil bi3"
        "quantity":100
    }
* POST :http://localhost:5000/api/v1/businesses/createQRCode for a creating a QRCode for a product/service/loyalty card
    to test:{
        "name":"product test"
        "reference":"6250dcff186d51bed6a"
        "price":500
        "description":" lil bi3"
        "quantity":100
    }


* QRCode will be generated from the backend, and will be decoded from the frontend before sent to back a clear data( so if for example i want to generate a QRCode for a product it will be generated in the backend while creating the product, the front will get the qrcode from the user after he scan it and decode a clear operation then call the backend to do the job)

* payment will be implemented by the help of a third party api called stripe once the front is half ready then we will add payment