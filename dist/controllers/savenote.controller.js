const getPool = require("../data/config/database.js");
const PostgresDataService = require("../data/services/postgres.dataservice.js");
const PostgresStore = require("../data/repository/postgres.repository.js");
const { constants } = require("http2");
const NoteService = require("../logic/notes.js");
const { HTTP_STATUS_CREATED } = constants;
module.exports =  async function SaveNote(req, res, next) {
    const note = req.body;
    note.datecreated = new Date().toLocaleString();
    note.lastmodified = note.datecreated;
    const pool = getPool();
    const noteservice = new NoteService(new PostgresDataService(new PostgresStore(pool)));
    try {
        const saved = await noteservice.saveNote(note);
        if (!saved)
            throw new Error("Internal server error,Something went wrong...");
        return res.status(HTTP_STATUS_CREATED).json({ message: "Note has been saved" });
    }
    catch (error) {
        next(new Error("Internal server error,Something went wrong..."));
    }
}
