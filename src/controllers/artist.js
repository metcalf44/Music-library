
const getDb = require('../services/db');

exports.create = async (req, res) => {
    const { name, genre } = req.body;
    const db = await getDb();

    try {
        await db.query(`INSERT INTO Artist (name, genre) VALUES (?, ?)`, [
            name,
            genre
        ]);
        res.sendStatus(201);
    } catch (err) {
        res.sendStatus(500).json(err);
    }

    db.close();
};

exports.read = async (_, res) => {
    const db = await getDb();

    try {
        const [artists] = await db.query('SELECT * FROM Artist');
        res.status(200).json(artists)
    } catch (err) {
        res.sendStatus(500).json(err)
    }

    db.close();
 };

 exports.artistById = async (req, res) => {
    const db = await getDb();
    const { artistId } = req.params;

        const [[artist]] = await db.query('SELECT * FROM Artist WHERE id = ?', [
            artistId,
        ]);
        
        if (!artist) {
            res.sendStatus(404).json('Artist could not be found');
        } else {
            res.status(200).json(artist);
        }

        db.close();
 };

 exports.updateArtist = async (req, res) => {
     const db = await getDb();
     const data = req.body;
     const { artistId } = req.params;

     try {
     const { updatedRows } = await db.query('UPDATE Artist SET ? WHERE id = ?', [
         data,
         artistId
     ]); 

     if (!updatedRows) {
        res.sendStatus(404).json('artist could not be found');
     } else {
         res.status(200).json(updatedRows);
     }
    } catch (err) {
        res.sendStatus(500).json(err)
    }

    db.close()
 };