module.exports =  class PostgresStore {
    constructor(pool) {
        this._pool = null;
        this._pool = pool;
    }
    async find(filter) {
        let notedata;
        notedata = await this._pool.query("SELECT * FROM notes");
        return notedata.rows;
    }
    async findOne(filter) {
        let notedata;
        notedata = await this._pool.query("SELECT title FROM notes WHERE title = $1", [filter]);
        return notedata.rows;
    }
    async save(note) {
        let result;
        result = await this._pool.query("INSERT INTO notes (note,title,datecreated,lastmodified) VALUES($1,$2,$3,$4) RETURNING id", [note.note, note.title, note.datecreated, note.lastmodified]);
        return result !== null;
    }
    async delete(item) {
        const result = await this._pool.query("DELETE FROM notes WHERE id = $1", [item]);
        return result !== null;
    }
    async update(item) {
        const lastmodified = new Date().toLocaleString();
        const result = await this._pool.query("UPDATE notes SET note = $1,lastmodified = $3 WHERE id = $2", [item.note, item.id, lastmodified]);
        return result !== null;
    }
}
