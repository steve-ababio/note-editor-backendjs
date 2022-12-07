import { getPool } from "../data/config/database.js";
import { PostgresDataService } from "../data/services/postgres.dataservice.js";
import { PostgresStore } from "../data/repository/postgres.repository.js";
import { constants } from "http2";
import { NoteService } from '../logic/notes.js';
const { HTTP_STATUS_CREATED } = constants;
export default async function DeleteNote(req, res, next) {
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
