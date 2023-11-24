import { Router } from "express";
import CheckNoteTitleAvailability from "../controllers/checkNoteTitle.js";
import DeleteNote from "../controllers/deletenote.controller.js";
import FetchAllNotes from "../controllers/fetchnotes.controller.js";
import SaveNote from "../controllers/savenote.controller.js";
import UpdateNote from "../controllers/updatenote.controller.js";
export function Routes() {
    const router = Router();
    router.post("/note", SaveNote);
    router.get("/allnotes", FetchAllNotes);
    router.put("/note/:id", UpdateNote);
    router.delete("/note/:id", DeleteNote);
    router.get("/title/:title", CheckNoteTitleAvailability);
    return router;
}
