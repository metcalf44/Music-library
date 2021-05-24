const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create album', () => {
    let db;
    let artists;

    beforeEach(async () => {
        db = await getDb();
        await Promise.all([
            db.query('INSERT INTO Artist (name, genre) values (?, ?)', [
                'Tame Impala',
                'rock'
            ])
        ]);

        [artists] = await db.query('SELECT * FROM Artist');
    });

    afterEach(async () => {
        await db.query('DELETE FROM Album');
        await db.query('DELETE FROM Artist');
        await db.close;
    });

    describe('/artist/:artistId/album', () => {
        describe('POST', () => {
            it('creates a new album in the database', async () => {
                const artist = artists[0];
                const res = await request(app).post(`/artist/${artistId}/album`).send({
                    name: 'Currents',
                    year: '2015',
                });

                expect(res.status).to.equal(201);

                const[[albumEntries]] = await db.query(
                    `SELECT * FROM Album WHERE name = 'Currents'`
                );

                expect(albumEntries.name).to.equal('Currents');
                expect(albumEntries.year).to.equal('2015');
                expect(albumEntries.artistId).to.equal(artist.id);
            });
        });
    });
});