const express = require('express')
const server = express();
const cors = require('cors');
const monk = require('monk');
const { default: axios } = require('axios');

const db = monk('mongodb://0.0.0.0:27017/StudentDetails');
db.then(() => {
  console.log('db connected ......');
})

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Sign up
server.post('/signup', async (req, res) => {
  try {
    const collection = db.get('LoginDetails');
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await collection.findOne({ username });
    if (existingUser) {
      return res.status(409).send('Username already exists');
    }

    // Insert the new user
    const newUser = { username, password };
    await collection.insert(newUser);

    res.sendStatus(201);
  } catch (err) {
    console.error("Error signing up:", err);
    res.status(500).send('Error signing up');
  }
});

//Logins
server.get('/logins', (req, res) => {
  const collection = db.get('LoginDetails');

  collection.find({}).then((docs) => {
    res.send(docs);
  });
});


//Attendance
server.post('/logs', async (req, res) => {
  try{
    const attend=db.get('logs');
  const studata=db.get('TabelData');
  const {RollNo}= req.body;

  const stuexist=await studata.findOne({RollNo});
  if(!stuexist){
    return res.status(404).send("Student not found");
  }

  const {Name , Batch , Course}=studata;

  const logextist=await attend.findOne({RollNo});
  if(logextist){
    return res.status(409).send("Roll Number already exist");
  }

  const newlog= {RollNo,Name,Batch,Course,Time};
  await attend.insert(newlog);
  }catch(err){
    res.status(500).send("Error in adding log");
  }
});


//Loged students
server.get('/logs', (req, res) => {
  const collection = db.get('logs');

  collection.find({}).then((docs1) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(docs1);
  });
});


//Updating Status
server.get('/updateStatus', async (req, res) => {
  console.log('Update status endpoint called');

  try {
    const logsCollection = db.get('logs');
    const tableDataCollection = db.get('TabelData');

    // Find all documents in the logs collection
    const logsDocs = await logsCollection.find({});

    // Loop through each log document and update the corresponding table data document
    for (const logDoc of logsDocs) {
      const { RollNo, Status } = logDoc;

      // Find the table data document with the same RollNo value
      const tableDataDoc = await tableDataCollection.findOne({ RollNo });

      if (tableDataDoc) {
        // Update the Status field in the table data document
        await tableDataCollection.update({ RollNo }, { $set: { status: 1 } });
      }
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("Error updating data:", err);
    res.status(500).send('Error updating status');
  }
});


server.get('/students/:RollNo', (req, res) => {
  const students = db.get('TabelData');
  
  const query = { RollNo: req.params.RollNo };
  students.find(query, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!data) {
      return res.status(404).send('Student not found');
    }
    res.send(data);
  });
});



//Students Data
server.get('/students', (req, res) => {
  const collection = db.get('TabelData');
  collection.find({}).then((docs1) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(docs1);
  });
});

server.listen(8585, () => {
  console.log('server running on port....')
});
