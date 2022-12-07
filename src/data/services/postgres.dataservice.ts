import { Note} from "../../entities/entities";
import { IDataService } from "../../interfaces/dataservice.interface";
import { IGenericStore } from "../../interfaces/genericrepo.interface";

export class PostgresDataService implements IDataService{
    _note: IGenericStore<Note>;
    constructor(note:IGenericStore<Note>){
        this._note = note;
    }
}
