const getDb = require('../services/db');

exports.create = async (req, res) => {
  const { name, year } = req.body;
  const db = await getDb();
  const {artistId} = req.params;
console.log('*******************',artistId,'*******************')
  try {
    await db.query(`INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)`, [
      name,
      year,
      artistId
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
    const [albums] = await db.query('SELECT * FROM Album');
    res.status(200).json(albums);
  } catch (err) {
    res.sendStatus(500).json(err);
  }

  db.close();
};

exports.albumById = async (req, res) => {
  const db = await getDb();
  const { albumId } = req.params;

  const [[album]] = await db.query('SELECT * FROM Album WHERE id = ?', [
    albumId,
  ]);

  if (!album) {
    res.sendStatus(404).json('Album could not be found');
  } else {
    res.status(200).json(album);
  }

  db.close();
};

exports.updateAlbum = async (req, res) => {
  const db = await getDb();
  const data = req.body;
  const albumId = req.params.albumId;
  console.log('*********',req.params.albumId)
  try {
      
      const [{ affectedRows }] = await db.query(
          'UPDATE Album SET ? WHERE id = ?',
          [data, albumId]
          );
          
    if (!affectedRows) {
      res.sendStatus(404);
    } else {
      res.status(200).json(affectedRows);
    }
  } catch (err) { 
    res.sendStatus(500).json(err);
  }

  db.close();
};

exports.deleteAlbum = async (req, res) => {
  const db = await getDb();
  const { albumId } = req.params;

  try {
    const [{ affectedRows }] = await db.query('DELETE FROM Album WHERE id = ?', [
      albumId,
    ]);

    if (!affectedRows) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200).json(affectedRows);
    }
  } catch (err) {
    res.sendStatus(500).json(err);
  }

  db.close();
};
