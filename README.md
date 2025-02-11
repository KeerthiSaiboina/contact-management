Contact-Management-Application
this is backend project will done on crud operation sthe end-user will be read, update , delete and add new contact details. deployed link :

usage : this is used for CRUD opertions that will done on back end developement. node.js will be used for the development of code

npm install cmd will used to download all the modules package will be installed and later express, path, sqlite and sqlite3 and nodemon(optional) dependeicies will be install by using #npm i express path sqlite sqlite3 nodemon

after that will be start the server

i create a table name contactlist where sql commands wilol be execute on it, the table contains name , is, email,phoneno.

i create five api calls

1.to get all contacls list "/contact/" 2.to add new contact list"/contact/" for this api call we need request body request body: { "id": 1, "contactname": "dev", "contactemail": "dev123@gmail.com", "contactphoneno": 6459845794 }

response will be crete new contact list

3.to update contact list '/contact/:contactid" for for this api call we need request body request body: { "id": 1, "contactname": "dev", "contactemail": "dev123@gmail.com", "contactphoneno": 6459845794 }

response will updated contact list sucessfully
