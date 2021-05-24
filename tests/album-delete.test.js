const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('delete album', () => {
  let db;
  let albums;

  beforeEach(async () => {
    db = await getDb();
    await Promise.all([
        db.query('INSERT INTO Album (name, year) values (?, ?)', [
            'Currents',
            '2015',
        ]),
        db.query('INSERT INTO Album (name, year) values (?, ?)', [
            'Disco',
            '2020',
        ]),
        db.query('INSERT INTO Album (name, year) values (?, ?)', [
            'Time out',
            '1959',
        ]),
    ]);

    [albums] = await db.query('SELECT * FROM Album');
  });

  afterEach(async () => {
      await db.query('DELETE FROM Album');
      await db.close();
  });

  describe('/album/:albumId', () => {
      describe('DELETE', () => {
          it('deletes an album with the correct id', async () => {
              const album = albums[0];
              const res = await request(app).delete(`/album/${album.id}`).send();

              expect(res.status).to.equal(200);

              const[[ deletedAlbumRecord ]] = await db.query(
                  'SELECT * FROM Album WHERE Id = ?',
                  [album.id]
              );

              expect(!!deletedAlbumRecord).to.be.false;
          });

          it('returns a 404 if the artist is not in the database', async () => {
              const res = await request(app).delete('/album/999999').send();

              expect(res.status).to.equal(404);
          });
      });
  });
});