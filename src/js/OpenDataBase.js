/* eslint-disable prettier/prettier */
import SQLite from 'react-native-sqlite-storage';
let db = null;

const deleteDb = () => {
  SQLite.deleteDatabase(
    {name: 'MyDatabase.db', location: 'default'},
    () => {
      console.log(`Database deleted successfully`);
    },
    (error) => {
      console.error('Error deletidng database 123!!: ', error);
    },
  );
};
//deleteDb();

const connectDb = () => {
  if (db == null) {
    db = SQLite.openDatabase(
      {
        name: 'MyDatabase.db',
        location: 'default',
      },
      () => {
        db.transaction(tx => {
          tx.executeSql(
            `SELECT name FROM sqlite_master WHERE type='table' AND name=?;`,
            ['StaffLibrary'],
            (_, resultSet) => {
              if (resultSet.rows.length <= 0) {
                createAllTable();
              }
            },
            (_, error) => {},
          );
        });
      },
      error => {},
    );
  }
  return db;
};

const createAllTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS StaffLibrary (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userName TEXT NOT NULL,
          password TEXT NOT NULL,
          name TEXT,
          UNIQUE(userName, password) 
        );`,
      [],
      () => {
        console.log('Table created librarian successfully');
        db.transaction(tx => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Category (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                categoryName TEXT NOT NULL,
                librarianId INTEGER NOT NULL,
                FOREIGN KEY (librarianId) REFERENCES StaffLibrary(id)
                UNIQUE(categoryName,librarianId)
              );`,
            [],
            () => {
              console.log('Table created category successfully');
              db.transaction(tx => {
                tx.executeSql( //  CHECK (typeof(price) = 'integer' tránh trường hợp dữ liệu là số kiểu 12.5
                  `CREATE TABLE IF NOT EXISTS Book (
                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                      bookName TEXT NOT NULL,
                      author Text not null,
                      price INTEGER NOT NULL  CHECK (typeof(price) = 'integer'), 
                      categoryId INTEGER NOT NULL,
                      librarianId INTEGER NOT NULL,
                      FOREIGN KEY (categoryId) REFERENCES Category(id),                   
                      FOREIGN KEY (librarianId) REFERENCES StaffLibrary(id)
                    );`,
                  [],
                  () => {
                    console.log('Table created book successfully');
                    db.transaction(tx => {
                      tx.executeSql(
                        `CREATE TABLE IF NOT EXISTS Member (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            cardNumber INTEGER NOT NULL,
                            memberName TEXT NOT NULL,
                            librarianId INTEGER NOT NULL,
                            Foreign key (librarianId) REFERENCES StaffLibrary(id),
                            UNIQUE(cardNumber,librarianId)
                          );`,
                        [],
                        () => {
                          console.log('Table created member successfully');

                          db.transaction(tx => {
                            tx.executeSql(
                              `CREATE TABLE IF NOT EXISTS borrowingSlip (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          ReceiptNumber TEXT NOT NULL,
          bookId Integer NOT NULL,
          librarianId Integer NOT NULL,
          memberId Integer NOT NULL,
          state Integer NOT NULL,
          rentalDate TEXT NOT NULL,
          rentalDuration TEXT Not null,
          FOREIGN KEY (bookId) REFERENCES Book(id),
          FOREIGN KEY (librarianId) REFERENCES StaffLibrary(id),
          FOREIGN KEY (memberId) REFERENCES Member(id),
          UNIQUE(ReceiptNumber,librarianId)
        );`,
                              [],
                              () => {
                                console.log(
                                  'Table created borrowinglip successfully',
                                );
                                db.transaction(tx => {
                                  tx.executeSql(
                                    'PRAGMA foreign_key_list(Book);',
                                    [],
                                    (tx, results) => {
                                      console.log(
                                        'Số lượng khóa ngoại: ',
                                        results.rows.length,
                                      );
                                    },
                                    (tx, error) => {
                                      console.error(
                                        'Error fetching foreign keys: ',
                                        error,
                                      );
                                    },
                                  );
                                });
                              },
                              error => {
                                console.log('Error creating table:', error);
                              },
                            );
                          });
                        },
                        error => {
                          console.log('Error creating table:', error);
                        },
                      );
                    });
                  },
                  error => {
                    console.log('Error creating table:', error);
                  },
                );
              });
            },
            error => {
              console.log('Error creating table:', error);
            },
          );
        });
      },
      error => {
        console.log('Error creating table:', error);
      },
    );
  });
};

export default connectDb;
