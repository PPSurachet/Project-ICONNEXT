const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const db = require("../database/database");

router.use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/project', async function (req, res, next) {
  const result = await db.getProject();
  res.render('index', { Projects: result.recordset });
});

router.post('/getOneTID', async function (req, res, next) {
  const PID = req.body.PID;
  const getOneTID = await db.getOneTasksProject(PID);
  let TID;
  if (getOneTID.length == 0) {
    TID = 0;
  } else {
    TID = getOneTID[0].TID
  }
  res.redirect(`/project/viewproject/${PID}/${TID}`);
});

router.post('/createproject', async function (req, res, next) {
  const projectName = req.body.projectName;
  const partnerProject = req.body.partnerProject;
  const custtomerProject = req.body.customerProject;
  const dateProject = req.body.dateProject;

  const addProject = [projectName, partnerProject, custtomerProject, dateProject];

  await db.addProject(addProject);

  res.redirect('/project');
});

router.get('/project/editproject/:PID', async function (req, res, next) {
  const PID = req.params.PID;
  const result = await db.getProjectByID(PID);
  res.render('EditProject', { Projects: result.recordset[0] });
});

router.get('/project/viewproject/:PID/:TID', async function (req, res, next) {
  const PID = req.params.PID;
  const TID = req.params.TID;
  const getprojectByID = await db.getProjectByID(PID);
  const getTasksProject = await db.getTasksProject(PID);
  const getTasksByTID = await db.getTasksByTID(TID);
  const getPhase = await db.getPhaseTasks(TID);
  const getStaff = await db.getStaff();
  const getOutsouce = await db.getOutsouce();
  const getPosition = await db.getPosition();

  var output;
  if (getTasksByTID.recordset.length == 0) {
    output = {
      TID: 0,
      Tasks: "",
      PID: PID,
    };
  } else {
    output = {
      TID: getTasksByTID.recordset[0].TID,
      Tasks: getTasksByTID.recordset[0].Tasks,
      PID: getTasksByTID.recordset[0].PID,
    };
  }
  res.render('ViewProject',
    {
      Projects: getprojectByID.recordset[0],
      Tasks: getTasksProject.recordset,
      Phases: getPhase.recordset,
      Outsource: getOutsouce.recordset,
      Staffs: getStaff.recordset, oneTask: output,
      Positions: getPosition.recordset
    }
  );
});

router.post('/createtasks', async function (req, res, next) {
  const PID = req.body.PID;
  const TaskName = req.body.tasksName;
  const addTask = [TaskName, PID];
  await db.addTasks(addTask);
  const urlTID = await db.getTasksByName(TaskName);
  res.redirect(`/project/viewproject/${PID}/${urlTID.recordset[0].TID}`);
});

router.post('/deletetasks', async function (req, res, next) {
  const PID = req.body.PID;
  const TID = req.body.deleteTID;
  var urlTID = await db.getOneTasksProject(PID);
  if (urlTID == TID) {
    urlTID == 0;
  }
  await db.deleteTask(TID);
  await db.deletePhaseByTID(TID);
  res.redirect(`/project/viewproject/${PID}/${urlTID[0].TID}`);
});

router.post('/createphase', async function (req, res, next) {
  const PID = req.body.PID;
  const Phase = req.body.Phase;
  const StartDate = req.body.StartDate;
  const EndDate = req.body.EndDate;
  const Manpower = req.body.Manpower;
  const Role = req.body.Position;
  const Usage = req.body.Usage;
  const TID = req.body.TID;

  const addPhase = [Phase, StartDate, EndDate, Manpower, Role, Usage, TID]

  await db.addPhase(addPhase);

  res.redirect(`/project/viewproject/${PID}/${TID}`);
});

router.post('/deletephase', async function (req, res, next) {
  const PID = req.body.PID;
  const TID = req.body.TID;
  const phaseID = req.body.phaseID;
  await db.deletePhase(phaseID);
  res.redirect(`/project/viewproject/${PID}/${TID}`);
});

router.post('/editproject', async function (req, res, next) {
  const PID = req.body.PID;
  const projectName = req.body.editProjectName;
  const partnerProject = req.body.editParterProject;
  const custtomerProject = req.body.editCustomerProject;
  const dateProject = req.body.editDateProject;
  const updateProject = [PID, projectName, partnerProject, custtomerProject, dateProject];
  await db.updateProject(updateProject);
  res.redirect('/project');
});

router.post('/deleteproject', async function (req, res, next) {
  const PID = req.body.PID;
  await db.deleteProject(PID);
  await db.deleteTask(PID);
  res.redirect('/project');
});

router.get('/manpower/staff', async function (req, res, next) {
  const staff = await db.getStaff();
  const postion = await db.getPosition();
  res.render('Staff', { Staffs: staff.recordset, Positions: postion.recordset });
});

router.get('/manpower/outsource', async function (req, res, next) {
  const staff = await db.getOutsouce();
  const postion = await db.getPosition();
  res.render('Outsource', { Staffs: staff.recordset, Positions: postion.recordset });
});

router.post('/addstaff', async function (req, res, next) {
  const ID = req.body.ID;
  const Title = req.body.Title;
  const Name = req.body.Name;
  const Surname = req.body.Surname;
  const Nickname = req.body.Nickname;
  const Position = req.body.Position;
  const Tel = req.body.Tel;
  const Email = req.body.Email;
  const StartDate = req.body.StartDate;
  const EndDate = req.body.EndDate;
  const Active = req.body.Active;
  const addStaff = [ID, Title, Name, Surname, Nickname, Position, Tel, Email, StartDate, EndDate, Active]
  await db.addStaff(addStaff);
  res.redirect('/manpower/staff')
});

router.post('/addoutsource', async function (req, res, next) {
  const ID = req.body.ID;
  const Title = req.body.Title;
  const Name = req.body.Name;
  const Surname = req.body.Surname;
  const Nickname = req.body.Nickname;
  const Position = req.body.Position;
  const Tel = req.body.Tel;
  const Email = req.body.Email;
  const StartDate = req.body.StartDate;
  const EndDate = req.body.EndDate;
  const Active = req.body.Active;
  const addStaff = [ID, Title, Name, Surname, Nickname, Position, Tel, Email, StartDate, EndDate, Active]
  await db.addOutsource(addStaff);
  res.redirect('/manpower/outsource')
});

router.get('/editstaff/:ID', async function (req, res, next) {
  const ID = req.params.ID
  const result = await db.getStaffByID(ID);
  const postion = await db.getPosition();
  res.render('EditStaff', { Staffs: result.recordset[0], Positions: postion.recordset });
});

router.get('/editoutsource/:ID', async function (req, res, next) {
  const ID = req.params.ID
  const result = await db.getOutsouceByID(ID);
  const postion = await db.getPosition();
  res.render('EditOutsource', { Staffs: result.recordset[0], Positions: postion.recordset });
});

router.post('/updatestaff', async function (req, res, next) {
  const editID = req.body.editID;
  const ID = req.body.ID;
  const Title = req.body.Title;
  const Name = req.body.Name;
  const Surname = req.body.Surname;
  const Nickname = req.body.Nickname;
  const Position = req.body.Position;
  const Tel = req.body.Tel;
  const Email = req.body.Email;
  const StartDate = req.body.StartDate;
  const EndDate = req.body.EndDate;
  const Active = req.body.Active;
  const updateStaff = [editID, ID, Title, Name, Surname, Nickname, Position, Tel, Email, StartDate, EndDate, Active]
  await db.updateStaff(updateStaff);
  res.redirect('/manpower/staff');
});

router.post('/updateoutsource', async function (req, res, next) {
  const editID = req.body.editID;
  const ID = req.body.ID;
  const Title = req.body.Title;
  const Name = req.body.Name;
  const Surname = req.body.Surname;
  const Nickname = req.body.Nickname;
  const Position = req.body.Position;
  const Tel = req.body.Tel;
  const Email = req.body.Email;
  const StartDate = req.body.StartDate;
  const EndDate = req.body.EndDate;
  const Active = req.body.Active;
  const updateStaff = [editID, ID, Title, Name, Surname, Nickname, Position, Tel, Email, StartDate, EndDate, Active]
  await db.updateOutsource(updateStaff);
  res.redirect('/manpower/outsource');
});

router.post('/deletestaff', async function (req, res, next) {
  const EID = req.body.EID;
  await db.deleteStaff(EID);
  res.redirect('/manpower/staff');
});

router.post('/deleteoutsource', async function (req, res, next) {
  const ID = req.body.ID;
  await db.deleteOutsource(ID);
  res.redirect('/manpower/outsource');
});

router.get('/position', async function (req, res, next) {
  const result = await db.getPosition();
  res.render('Position', { Positions: result.recordset });
});

router.post('/addposition', async function (req, res, next) {
  const Position = req.body.Position;
  const Description = req.body.Description;
  const addPosition = [Position, Description];
  await db.addPosition(addPosition);
  res.redirect('/position');
});

router.post('/deleteposition', async function (req, res, next) {
  const PosID = req.body.PosID;
  await db.deletePosition(PosID);
  res.redirect('/position');
});

router.get('/leave/staff', async function (req, res, next) {
  const staff = await db.getStaff();
  res.render('LeaveStaff', { Staffs: staff.recordset });
});

router.get('/leave/outsource', async function (req, res, next) {
  const staff = await db.getOutsouce();
  res.render('LeaveOutsource', { Staffs: staff.recordset });
});

router.get('/viewleave/:ID', async function (req, res, next) {
  const ID = req.params.ID
  const getLeaveByID = await db.getLeaveByID(ID);
  var staff;
  var output;
  if (ID.substring(0, 1) == "O") {
    staff = await db.getOutsouceByID(ID);
    output = {
      ID: staff.recordset[0].ID,
      Name: staff.recordset[0].Name,
      SurName: staff.recordset[0].SurName,
    }
  } else {
    staff = await db.getStaffByID(ID);
    output = {
      ID: staff.recordset[0].EID,
      Name: staff.recordset[0].Name,
      SurName: staff.recordset[0].SurName,
    }
  }
  res.render('Leave', { Staffs: output, Leaves: getLeaveByID.recordset })
});

router.post('/addLeave', async function (req, res, next) {
  const ID = req.body.ID;
  const StartDate = req.body.StartDate;
  const EndDate = req.body.EndDate;
  const Annotation = req.body.Annotation;
  const addLeave = [StartDate, EndDate, Annotation, ID]
  await db.addLeave(addLeave);
  const getLeave = await db.getLeaveNewInsert();
  await db.updateLeaveDay(getLeave.recordset[0]);
  res.redirect(`/viewleave/${ID}`);
});

router.post('/deleteleave', async function (req, res, next) {
  const LID = req.body.LID;
  const ID = req.body.ID;
  await db.deleteLeaveByLID(LID);
  res.redirect(`/viewleave/${ID}`);
});

router.get('/Holiday', async function (req, res, next) {
  const result = await db.getHoliday();
  let ArrayCalender = [];
  for (const key in result.recordset) {
    if (result.recordset.hasOwnProperty(key)) {
      ArrayCalender[key] = {
        title: result.recordset[key].Subject,
        start: result.recordset[key].Start_Date,
      }
    }
  }
  res.render('Holiday', { Holidays: result.recordset });
});

module.exports = router;
