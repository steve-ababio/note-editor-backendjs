import { getPool } from "../data/config/database.js";
import { PostgresDataService } from "../data/services/postgres.dataservice.js";
import { PostgresStore } from "../data/repository/postgres.repository.js";
import { constants } from "http2";
import { NoteService } from '../logic/notes.js';
const { HTTP_STATUS_ACCEPTED } = constants;
export default async function CheckNoteTitleAvailability(req, res, next) {
    const noteTitle = req.params.title.replace(":", "");
    const pool = getPool();
    const noteservice = new NoteService(new PostgresDataService(new PostgresStore(pool)));
    try {
        const note = await noteservice.FindNoteTitle(noteTitle);
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
