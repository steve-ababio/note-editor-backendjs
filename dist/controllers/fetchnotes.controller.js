import { getPool } from "../data/config/database.js";
import { PostgresDataService } from "../data/services/postgres.dataservice.js";
import { PostgresStore } from "../data/repository/postgres.repository.js";
import { constants } from "http2";
import { NoteService } from '../logic/notes.js';
const { HTTP_STATUS_ACCEPTED } = constants;
export default async function FetchAllNotes(req, res, next) {
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
