const sql = require("mssql");

// config for your database
var config = {
    user: 'sa',
    password: 'Doublepor',
    server: 'LAPTOP-R793JBP6', // You can use 'localhost\\instance' to connect to named instance
    database: 'ICONEXTContext-1',
    options: {
        enableArithAbort: true,
        encrypt: true,
    },
}

async function getProject() {
    try {
        const pool = await sql.connect(config);
        const query =
            `select * from Project`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function getProjectByID(ID) {
    try {
        const pool = await sql.connect(config);
        const query = `select * from project where PID = ${ID}`;
        const result = await pool.request().query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}


async function addProject(newProject) {
    try {
        const pool = await sql.connect(config);
        const query =
            `INSERT INTO Project (Name,Partner,Customer,StartDate)
            VALUES('${newProject[0]}', '${newProject[1]}', '${newProject[2]}', '${newProject[3]}');`
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function updateProject(project) {
    try {
        const pool = await sql.connect(config);
        const query =
            `UPDATE Project
            SET Name = '${project[1]}', Partner = '${project[2]}', Customer = '${project[3]}', StartDate = '${project[4]}'
            WHERE PID = ${project[0]};`
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function deleteProject(ID) {
    try {
        const pool = await sql.connect(config);
        const query = `delete from project where PID = ${ID}`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function getTasksProject(ID) {
    try {
        const pool = await sql.connect(config);
        const query = `select * from TasksProject where PID = ${ID}`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function getOneTasksProject(ID) {
    try {
        const pool = await sql.connect(config);
        const query = `select Top 1 * from TasksProject where PID = ${ID}`;
        const result = await pool.request()
            .query(query)
        return result.recordset
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function getTasksByTID(ID) {
    try {
        const pool = await sql.connect(config);
        const query = `select * from TasksProject where TID = ${ID}`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function getTasksByName(Name) {
    try {
        const pool = await sql.connect(config);
        const query = `select * from TasksProject where Tasks = '${Name}'`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function addTasks(newTask) {
    try {
        const pool = await sql.connect(config);
        const query =
            `INSERT INTO TasksProject (Tasks,PID)
            VALUES('${newTask[0]}', '${newTask[1]}');`
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function deleteTask(ID) {
    try {
        const pool = await sql.connect(config);
        const query = `delete from TasksProject where TID = ${ID}`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function getPosition() {
    try {
        const pool = await sql.connect(config);
        const query = `select * from Positions`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function addPosition(newPosition) {
    try {
        const pool = await sql.connect(config);
        const query =
            `INSERT INTO Positions (Position,Description)
        VALUES ('${newPosition[0]}','${newPosition[1]}')`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function deletePosition(ID) {
    try {
        const pool = await sql.connect(config);
        const query = `delete from Positions where PosID = ${ID}`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function getStaff() {
    try {
        const pool = await sql.connect(config);
        const query = `select * from Employee`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function getStaffByID(ID) {
    try {
        const pool = await sql.connect(config);
        const query = `select * from Employee where EID = '${ID}'`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function addStaff(newstaff) {
    try {
        const pool = await sql.connect(config);
        const query = `INSERT INTO Employee
        (EID, Title, Name, SurName, NickName, Position, Tel, Email, StartDate, EndDate, Active)
        VALUES('${newstaff[0]}', '${newstaff[1]}', '${newstaff[2]}', '${newstaff[3]}', '${newstaff[4]}', 
        '${newstaff[5]}', '${newstaff[6]}', '${newstaff[7]}', '${newstaff[8]}', '${newstaff[9]}', '${newstaff[10]}');`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function updateStaff(staff) {
    try {
        const pool = await sql.connect(config);
        const query =
            `UPDATE Employee SET 
            EID = '${staff[1]}', 
            Title = '${staff[2]}', 
            Name = '${staff[3]}', 
            SurName = '${staff[4]}', 
            NickName = '${staff[5]}',
            Position = '${staff[6]}',
            Tel = '${staff[7]}',
            Email = '${staff[8]}',
            StartDate = '${staff[9]}',
            EndDate = '${staff[10]}',
            Active = '${staff[11]}'
            WHERE EID = '${staff[0]}'`
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function deleteStaff(ID) {
    try {
        const pool = await sql.connect(config);
        const query = `delete from Employee where EID = ${ID}`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function getOutsouce() {
    try {
        const pool = await sql.connect(config);
        const query = `select * from outsource`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function getOutsouceByID(ID) {
    try {
        const pool = await sql.connect(config);
        const query = `select * from outsource where ID = '${ID}'`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function addOutsource(newstaff) {
    try {
        const pool = await sql.connect(config);
        const query = `INSERT INTO Outsource
        (ID, Title, Name, SurName, NickName, Position, Tel, Email, StartDate, EndDate, Active)
        VALUES('${newstaff[0]}', '${newstaff[1]}', '${newstaff[2]}', '${newstaff[3]}', '${newstaff[4]}', 
        '${newstaff[5]}', '${newstaff[6]}', '${newstaff[7]}', '${newstaff[8]}', '${newstaff[9]}', '${newstaff[10]}');`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function updateOutsource(staff) {
    try {
        const pool = await sql.connect(config);
        const query =
            `UPDATE Outsource SET 
            ID = '${staff[1]}', 
            Title = '${staff[2]}', 
            Name = '${staff[3]}', 
            SurName = '${staff[4]}', 
            NickName = '${staff[5]}',
            Position = '${staff[6]}',
            Tel = '${staff[7]}',
            Email = '${staff[8]}',
            StartDate = '${staff[9]}',
            EndDate = '${staff[10]}',
            Active = '${staff[11]}'
            WHERE ID = '${staff[0]}'`
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function deleteOutsource(ID) {
    try {
        const pool = await sql.connect(config);
        const query = `delete from Outsource where ID = '${ID}'`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function getPhaseTasks(ID) {
    try {
        const pool = await sql.connect(config);
        const query = `select * from Phase where TID = ${ID}`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function addPhase(newPhase) {
    try {
        const pool = await sql.connect(config);
        const query =
            `INSERT INTO Phase (Phase,StartDate,EndDate,Manpower,Role,Usage,TID)
        VALUES ('${newPhase[0]}','${newPhase[1]}','${newPhase[2]}','${newPhase[3]}','${newPhase[4]}','${newPhase[5]}','${newPhase[6]}')`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function deletePhase(ID) {
    try {
        const pool = await sql.connect(config);
        const query = `delete from Phase where ID = ${ID}`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function deletePhaseByTID(ID) {
    try {
        const pool = await sql.connect(config);
        const query = `delete from Phase where TID = ${ID}`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function getLeaveByID(ID) {
    try {
        const pool = await sql.connect(config);
        const query = `select * from Leave where ID = '${ID}'`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function addLeave(newLeave) {
    try {
        const pool = await sql.connect(config);
        const query =
            `INSERT INTO Leave (StartDate,EndDate,Annotation,ID)
        VALUES ('${newLeave[0]}','${newLeave[1]}','${newLeave[2]}','${newLeave[3]}')`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function getLeaveNewInsert() {
    try {
        const pool = await sql.connect(config);
        const query = `SELECT TOP 1 LID , DATEDIFF(day, StartDate, EndDate) AS Day FROM Leave ORDER BY LID DESC`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function updateLeaveDay(newDay) {
    try {
        const pool = await sql.connect(config);
        const query =
            `Update Leave SET
            Days = '${newDay.Day}'
            Where LID = ${newDay.LID}`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function deleteLeaveByLID(ID) {
    try {
        const pool = await sql.connect(config);
        const query = `delete from Leave where LID = ${ID}`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}

async function getHoliday() {
    try {
        const pool = await sql.connect(config);
        const query = `select Subject , Start_Date from Holiday`;
        const result = await pool.request()
            .query(query)
        return result
    } catch (err) {
        console.log("MESSAGE " + err.message);
    }
}



module.exports = {
    getProject,
    addStaff,
    getProjectByID,
    getOneTasksProject,
    addProject,
    addTasks,
    updateProject,
    deleteProject,
    getTasksProject,
    getTasksByName,
    deleteTask,
    getPosition,
    addPosition,
    getStaff,
    getStaffByID,
    deleteStaff,
    updateStaff,
    deletePosition,
    getOutsouce,
    addOutsource,
    deleteOutsource,
    getOutsouceByID,
    updateOutsource,
    getPhaseTasks,
    addPhase,
    getTasksByTID,
    deletePhase,
    deletePhaseByTID,
    addLeave,
    getLeaveByID,
    getLeaveNewInsert,
    updateLeaveDay,
    deleteLeaveByLID,
    getHoliday,
}