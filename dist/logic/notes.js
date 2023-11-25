module.exports = class NoteService {
    constructor(dataservice) {
        this._dataservice = dataservice;
    }
    saveNote(note) {
        return this._dataservice._note.save(note);
    }
    getAllNotes() {
        return this._dataservice._note.find();
    }
    deleteNote(id) {
        return this._dataservice._note.delete(id);
    }
    updateNote(item) {
        return this._dataservice._note.update(item);
    }
    FindNoteTitle(item) {
        return this._dataservice._note.findOne(item);
    }
}
