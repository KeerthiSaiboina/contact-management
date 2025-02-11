const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json())

const dbPath = path.join(__dirname, "contact-manager.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(301, () => {
      console.log("Server Running at http://localhost:301/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();



app.get("/contact/", async (request, response) => {
    const getcontactQuery = `
      SELECT
        *
      FROM
        contactlist`;
    const contactArray = await db.all(getcontactQuery);
    response.send(contactArray);
  });

  

  app.post("/contact/", async (request, response) => {
    const contactDetails = request.body;
    const {
      id,
      contactname,
      contactemail,
      contactphoneno  
    } = contactDetails;
    console.log(contactDetails)
    const addcontactQuery = `
      INSERT INTO
        contactlist (id,contactname,contactemail,contactphoneno)
      VALUES
        (
            '${id}',
           '${contactname}',
           '${contactemail}',
           '${contactphoneno}'
        );`;
  
    const dbResponse = await db.run(addcontactQuery);
    const contactId = dbResponse.lastID;
    response.send({ id: contactId });
  });




  app.put("/contact/:contactId/", async (request, response) => {
    const { contactId } = request.params;
    const contactDetails = request.body;
    const {
      id,
      contactname,
      contactemail,
      contactphoneno
    } = contactDetails;
    const updatecontactQuery = `
      UPDATE
        contactlist
      SET
        id='${id}',
        contactname='${contactname}',
        contactemail='${contactemail}',
        contactphoneno='${contactphoneno}'
      WHERE
        id = ${contactId};`;
    await db.run(updatecontactQuery);
    response.send("contact Updated Successfully");
  });

  
  app.delete("/contact/:contactId/", async (request, response) => {
    const { contactId } = request.params;
    const deletecontactQuery = `
      DELETE FROM
        contactlist
      WHERE
        id = ${contactId};`;
    await db.run(deletecontactQuery);
    response.send("contact Deleted Successfully");
  });


  

  app.get("/contact/:contactname", async (request,response) =>{
    const {contactname} = request.params;
    console.log(contactname)
    const contactquery = `
    select * from contactlist  where contactname like '${contactname}'`
    const contactArray = await db.get(contactquery)
    response.send(contactArray)
  
  });