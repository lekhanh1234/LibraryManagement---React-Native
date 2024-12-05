/* eslint-disable prettier/prettier */
import BorrowingSlipDao from './BorrowingSlipDao';
import CategoryDao from './CategoryDao';
import connectDb from './OpenDataBase';
class BookDao {
  getAllBook(userId) {
    return new Promise((resolve, reject) => {
      const db = connectDb();
      db.transaction(tx => {
        tx.executeSql(
          'select Book.*,Category.categoryName from Book INNER JOIN Category ON Book.categoryId = Category.id where Book.librarianId = ?',
          [userId],
          (tx, result) => {
            let bookArray = [];
            for (let i = 0; i < result.rows.length; i++) {
              bookArray.push(result.rows.item(i));
            }
            console.log(
              'tra ve data all book thanh cong : ' + bookArray.length,
            );
            resolve({success: true, data: bookArray});
          },
          (tx, err) => {
            reject();
          },
        );
      });
    });
  }
  saveNewBook(bookName, author, price, categoryId, librarianId) {
    return new Promise((resolve, reject) => {
      const db = connectDb();
      db.executeSql('PRAGMA foreign_keys = ON');
      db.transaction(tx => {
        tx.executeSql(
          'INSERT OR IGNORE INTO Book(bookName,author,price,categoryId,librarianId) VALUES (?,?,?,?,?);',
          // lệnh ignore chỉ áp dụng cho unique() hoặc 1 số t/hop khac, nếu trùng thì bỏ qua chứ không áp dụng cho foreign key
          // với foreign key, nếu không tìm thấy thì xuất hiện lỗi
          [bookName,author,price, categoryId, librarianId],
          (tx, results) => {
            if (results.rowsAffected > 0) resolve({success: true});
            else {
              resolve({success: false, message: 'Sách đã tồn tại'});
            }
          },
          (tx, err) => {
            reject();
          },
        );
      });
    });
  }
  deleteBook(bookId,userId) {
    return new Promise((resolve, reject) => {
      const db = connectDb();
      db.executeSql('PRAGMA foreign_keys = ON');
      new BorrowingSlipDao().getAllBorrowingSlip(userId).then((result)=>{
        const getAllBorrowingSlip = result.data;
        for(let i = 0;i<getAllBorrowingSlip.length;i++){
          if(getAllBorrowingSlip[i].bookId === bookId){
            resolve({success : false});
            db.close();
            return;
          }
        }
        db.transaction(tx => {
          tx.executeSql(
            `delete from Book where id = ?`,
            [bookId],
            (tx, result) => {
              resolve({success: true});
              db.close();
            },
            (tx, err) => {
              reject();
              db.close()
            },
          );
        });
      }).catch(()=>{
        reject();
      })
    });
  }
}
export default BookDao;
