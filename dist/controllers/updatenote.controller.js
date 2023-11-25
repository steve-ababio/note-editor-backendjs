const  {getPool} = "../data/config/database.js";
const  PostgresDataService = require("../data/services/postgres.dataservice.js");
const  PostgresStore = require("../data/repository/postgres.repository.js");
const  { constants } = require("http2");
const  NoteService = require('../logic/notes.js');
const { HTTP_STATUS_CREATED } = constants;

module.exports = async function UpdateNote(req, res, next) {
    const note = req.body;
    note.id = req.params.id.replace(":", "");
    const pool = getPool();
    const noteservice = new NoteService(new PostgresDataService(new PostgresStore(pool)));
    try {
        const updated = await noteservice.updateNote(note);
        console.log("updated: ", updated);
        if (updated) {
            return res.status(HTTP_STATUS_CREATED).json({ message: "Note updated" });
        }
    }
    catch (error) {
        next(new Error("Internal server error,Something went wrong..."));
    }
}
