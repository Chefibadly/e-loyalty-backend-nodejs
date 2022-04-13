# users_services realted APIs 
* POST :http://localhost:5000/api/v1/signup for adding(signup) a new user to database
    {
        "name": "mohamed chedly",
        "lastname": "AMEUR",
        "phoneNumber": "92819480",
        "password": "chedly123"
    }
* POST :http://localhost:5000/api/v1/users/signin for loggin in a user
* GET :http://localhost:5000/api/v1/users/sigout for logoff the current loginning user


* GET: http://localhost:5000/api/v1/users for getting all users
* GET: http://localhost:5000/api/v1/users/{id} for getting a user by id
* DELETE: http://localhost:5000/api/v1/users/{id} for deletting a user by id
* PUT: http://localhost:5000/api/v1/users/{id} update a user by id

* POST :http://localhost:5000/api/v1/business/signin for loggin in a business account
* POST :http://localhost:5000/api/v1/business/signup 

* POST :http://localhost:5000/api/v1/users/addloyaltycard/{id} for adding user existing loyalty card to wallet
* POST :http://localhost:5000/api/v1/businesses/createloyaltycard/


* QRCode will be generated from the backend, and will be decoded from the frontend before sent to back a clear data( so if for example i want to generate a QRCode for a product it will be generated in the backend while creating the product, the front will get the qrcode from the user after he scan it and decode a clear operation then call the backend to do the job)