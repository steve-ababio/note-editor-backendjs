import { getPool } from "../data/config/database.js";
import { PostgresDataService } from "../data/services/postgres.dataservice.js";
import { PostgresStore } from "../data/repository/postgres.repository.js";
import { constants } from "http2";
import { NoteService } from '../logic/notes.js';
const { HTTP_STATUS_CREATED } = constants;
export default async function UpdateNote(req, res, next) {
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
