import { Note } from "../entities/entities";
export interface IGenericStore<T>{
    find<T>(filter?:any):Promise<T[]>,
    findOne<T>(filter:any):Promise<T[]>;
    save(items:Note):Promise<boolean>;
    delete(item:string|number):Promise<boolean>;
    update(item:Note):Promise<boolean>;
}