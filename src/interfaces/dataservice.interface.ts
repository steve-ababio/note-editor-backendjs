import { Note } from '../entities/entities';
import { IGenericStore } from './genericrepo.interface';

export interface IDataService{
    _note:IGenericStore<Note>;
}