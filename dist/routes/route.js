const { Router } = require("express");
const CheckNoteTitleAvailability = require("../controllers/checkNoteTitle.js");
const DeleteNote = require("../controllers/deletenote.controller.js");
const FetchAllNotes = require("../controllers/fetchnotes.controller.js");
const SaveNote = require("../controllers/savenote.controller.js");
const UpdateNote = require("../controllers/updatenote.controller.js");
module.exports = function Routes() {
    const router = Router();
    router.post("/note", SaveNote);
    router.get("/allnotes", FetchAllNotes);
    router.put("/note/:id", UpdateNote);
    router.delete("/note/:id", DeleteNote);
    router.get("/title/:title", CheckNoteTitleAvailability);
    return router;
}
