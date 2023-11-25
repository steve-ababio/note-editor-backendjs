const { getPool } = require("../data/config/database.js");
const { PostgresDataService } = require("../data/services/postgres.dataservice.js");
const { PostgresStore } = require("../data/repository/postgres.repository.js");
const { constants } = require("http2");
const { NoteService } = require('../logic/notes.js');
const { HTTP_STATUS_ACCEPTED } = constants;

module.exports =  async function FetchAllNotes(req, res, next) {
    const pool = getPool();
    const noteservice = new NoteService(new PostgresDataService(new PostgresStore(pool)));
    try {
        const notedata = await noteservice.getAllNotes();
        return res.status(HTTP_STATUS_ACCEPTED).json(notedata);
    }
    catch (error) {
        next(new Error("Internal server error,Something went wrong..."));
    }
}
