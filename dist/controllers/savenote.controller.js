import { getPool } from "../data/config/database.js";
import { PostgresDataService } from "../data/services/postgres.dataservice.js";
import { PostgresStore } from "../data/repository/postgres.repository.js";
import { constants } from "http2";
import { NoteService } from "../logic/notes.js";
const { HTTP_STATUS_CREATED } = constants;
export default async function SaveNote(req, res, next) {
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
