import { Note } from "../entities/entities";
import { IDataService } from "../interfaces/dataservice.interface";

export class NoteService{
    private _dataservice:IDataService;
    constructor(dataservice:IDataService){
        this._dataservice = dataservice;
    }
    saveNote(note:Note){
        return this._dataservice._note.save(note);
    }
    getAllNotes(){
        return this._dataservice._note.find();
    }
    deleteNote(id:number|string){
        return this._dataservice._note.delete(id);
    }
    updateNote(item:Note){
        return this._dataservice._note.update(item);
    }
    FindNoteTitle(item:string){
        return this._dataservice._note.findOne(item);
    }
} 