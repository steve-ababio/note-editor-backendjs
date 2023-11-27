const {getPool} = require("../data/config/database.js");
const PostgresDataService = require("../data/services/postgres.dataservice.js");
const PostgresStore = require("../data/repository/postgres.repository.js");
const { constants } = require("http2");
const NoteService = require('../logic/notes.js');
const { HTTP_STATUS_ACCEPTED } = constants;

module.exports = async function CheckNoteTitleAvailability(req, res, next) {
    const noteTitle = req.params.title.replace(":", "");
    console.log(noteTitle);
    const pool = getPool();
    const noteservice = new NoteService(new PostgresDataService(new PostgresStore(pool)));
    try {
        const note = await noteservice.FindNoteTitle(noteTitle);
        console.log(note);
        if (note && note.length === 0) {
            return res.status(HTTP_STATUS_ACCEPTED).json({ isTitleAvailable: true });
        }
        else if (note && note.length > 0) {
            return res.status(HTTP_STATUS_ACCEPTED).json({ isTitleAvailable: false, message: "The Title provided already exists" });
        }
    }
    catch (error) {
        next(new Error("Internal server error,Something went wrong..."));
    }
}
