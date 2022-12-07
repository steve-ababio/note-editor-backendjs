import { Note } from "../../entities/entities";
import { IGenericStore } from "../../interfaces/genericrepo.interface";
import {Pool, QueryResult} from "pg";
import {writeFile} from "fs/promises";

export class PostgresStore<T> implements IGenericStore<T>{
    private _pool:Pool|null = null;

    constructor(pool:Pool){
        this._pool = pool;
    }

    async find<T>(filter?: any):Promise<T[]> {
        let notedata:QueryResult;
        notedata = await this._pool!.query("SELECT * FROM notes");
        return  notedata.rows as T[];
    }
    async findOne<T>(filter: any): Promise<T[]> {
        let notedata:QueryResult;
        notedata = await this._pool!.query("SELECT title FROM notes WHERE title = $1",[filter]);
        return  notedata.rows as T[];
    }
    async save(note: Note): Promise<boolean> {  
        let result;     
        result = await this._pool!.query("INSERT INTO notes (note,title,datecreated,lastmodified) VALUES($1,$2,$3,$4) RETURNING id",[note.note,note.title,note.datecreated,note.lastmodified]);    
        return result !== null;  
    }
    async delete(item: string | number): Promise<boolean> {
        const result = await this._pool!.query("DELETE FROM notes WHERE id = $1",[item]);
        return result !== null;
    }
    async update(item:Note){
        const lastmodified = new Date().toLocaleString();
        const result = await this._pool!.query("UPDATE notes SET note = $1,lastmodified = $3 WHERE id = $2",[item.note,item.id,lastmodified]);
        return result !== null;
    }
} 