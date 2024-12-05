/* eslint-disable prettier/prettier */
import Book from '../component/Book';
import BookDao from './BookDao';
import connectDb from './OpenDataBase';
class CategoryDao {
  getAllCategory(userId) {
    return new Promise((resolve, reject) => {
      const db = connectDb();
      db.transaction(tx => {
        tx.executeSql(
          'select * from Category where librarianId = ?',
          [userId],
          (tx, result) => {
            let categoryArray = [];
            for (let i = 0; i < result.rows.length; i++) {
              categoryArray.push(result.rows.item(i));
            }
            resolve({success: true, data: categoryArray});
            db.close()
          },
          (tx, err) => {
            reject()
            db.close()
          },
        );
      });
    });
  }
  saveNewCategory(userId, category) {
    return new Promise((resolve, reject) => {
      const db = connectDb();
      db.transaction(tx => {
        tx.executeSql(
          'INSERT OR IGNORE INTO Category (categoryName,librarianId) VALUES (?, ?);',
          [category, userId],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              tx.executeSql(
                'SELECT * FROM Category WHERE id = ?;',
                [results.insertId],
                (_, selectResults) => {
                  resolve({success: true, data: selectResults.rows.item(0)});
                },
                (_, error) => {},
              );
            } else {
              resolve({success: false, message: 'Danh mục đã tồn tại'});
            }
          },
          (tx, err) => {
            reject({success: false, message: err});
          },
        );
      });
    });
  }
  deleteCategory(userId, categoryId) {
    return new Promise((resolve, reject) => {
      new BookDao()
        .getAllBook(userId)
        .then(result => {
          for (let i = 0; i < result.data.length; i++) {
            if (result.data[i].categoryId == categoryId) {
              resolve({success: false, message: 'exits book with category'});
              return;
            }
          }
          connectDb().transaction(tx => {
            tx.executeSql(
              'delete from Category where id = ?',
              [categoryId],
              (tx, result) => {
                if (result.rowsAffected > 0) {
                  resolve({success: true, message: 'Đã xóa danh mục'});
                } else {
                  reject();
                }
              },
              (tx, err) => {
                reject();
              },
            );
          });
        })
        .catch(() => {
          reject();
        });
    });
  }
}
export default CategoryDao;
