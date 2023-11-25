const {getPool} = require( "../data/config/database.js");
const PostgresDataService = require("../data/services/postgres.dataservice.js");
const PostgresStore = require("../data/repository/postgres.repository.js");
const { constants } = require("http2");
const NoteService = require('../logic/notes.js');
const { HTTP_STATUS_CREATED } = constants;

module.exports = async function DeleteNote(req, res, next) {
    const noteID = req.params.id.replace(":", "");
    const pool = getPool();
    const noteservice = new NoteService(new PostgresDataService(new PostgresStore(pool)));
    try {
        const deleted = await noteservice.deleteNote(noteID);
        if (deleted) {
            return res.status(HTTP_STATUS_CREATED).json({ message: "Note deleted successfully" });
        }
    }
    catch (error) {
        next(new Error("Internal server error,Something went wrong..."));
    }
}
