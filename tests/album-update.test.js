const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('update album', () => {
  let db;
  let albums;

  beforeEach(async () => {
    db = await getDb();
    await Promise.all([
      db.query('INSERT INTO Album (name, year) VALUES (?, ?)', [
        'currents',
        2015,
      ]),
      db.query('INSERT INTO Album (name, year) VALUES (?, ?)', [
        'Disco',
        2020,
      ]),
      db.query('INSERT INTO Album (name, year) VALUES (?, ?)', [
        'Time out',
        1959,
      ]),
    ]);

    [albums] = await db.query('SELECT * FROM Album');
  });

  afterEach(async () => {
    await db.query('DELETE FROM Album');
    await db.close();
  });

  describe('./album/:albumId', () => {
    describe('PATCH', () => {
      it('updates an album with the correct id', async () => {
        const album = albums[0];
        const res = await request(app)
          .patch(`/album/${album.id}`)
          .send({ name: 'new name', year: 2015 });

        expect(res.status).to.equal(200);

        const [[ newArtistAlbum ]] = await db.query(
          'SELECT * FROM Album WHERE id = ?',
          [album.id]
        );

        expect(newArtistAlbum.name).to.equal('new name');
      });

      it('returns a 404 if the album is not in the database', async () => {
        const res = await request(app)
          .patch('/album/999999')
          .send({ name: 'new name' });

        expect(res.status).to.equal(404);
      });
    });
  });
});