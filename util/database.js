import {openDatabase} from 'react-native-sqlite-storage';

import {Place} from '../models/place';

const database = openDatabase({name: 'places'});

export const init = () => {
  database.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(50), imageUri VARCHAR(1000))`,
      [],
      (_, res) => {
        console.log('table created successfully', res);
      },
      error => {
        console.log('error on creating table' + error.message);
      },
    );
  });
};
export const insertPlace = place => {
  database.transaction(tx => {
    tx.executeSql(
      `INSERT INTO places (title, imageUri) VALUES (?, ?)`,
      [place.title, place.imageUri],
      (_, res) => {
        console.log('places inserted successfully', res);
      },
      error => {
        console.log('error on inserting places' + error.message);
      },
    );
  });
};
export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM places ORDER BY id DESC`,
        [],
        (_, res) => {
          console.log('places retrieve successfully', res);
          // const places = []

          // for(const dp of res){
          //   places.push(new Place(dp.rows.item.title, dp.rows.item.imageUri, dp.rows.item.id))
          // }
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({
                id: item.id,
                title: item.title,
                imageUri: item.imageUri,
              });
            }
            resolve(results);
          }
        },
        error => {
          console.log('error on retrieving places' + error.message);
          reject(error.message);
        },
      );
    });
  });
  return promise;
};

export const fetchPlaceDetails = id => {
  const promise = new Promise((resolve, reject) => {
    database.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM places WHERE id = ?',
        [id],
        (_, result) => {
          let len = result.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = result.rows.item(i);
              results.push({
                id: item.id,
                title: item.title,
                imageUri: item.imageUri,
              });
            }
            resolve(results[0]);
          }
        },
        (_, error) => {
          reject(error.message);
        },
      );
    });
  });

  return promise;
};
