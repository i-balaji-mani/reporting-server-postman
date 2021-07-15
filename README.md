# Simple Reporting Server - for Postman Collection Runner

Cloned from https://github.com/sivcan/ResponseToFile-Postman, and added some enhancements such as 
- reports to csv
- record the original format of input data file (if csv) so as to retry failed requests. 

A simple reporting server which will be used with a postman collection runner to record the successful and failed requests to ```CSV``` reports. 

Both original request params in the iteration as well as the response will be recorded as part of the execution. 

----

### To Run

Just like any other node app, you will require ```node``` and ```npm``` to run this reporting server. 

1. ```npm install```

2. ```npm run start```

3. The server should run on port 3000 or you could change to your desired port. 


----

### Using the postman collection

Refer to the postman collection ```Collection-With-Reporting.postman_collection.json``` under ```postman```.

Import it and add requests within the collection. The collection also has variables to change the reporting server's URL. 
