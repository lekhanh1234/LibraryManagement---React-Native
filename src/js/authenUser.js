/* eslint-disable prettier/prettier */
import connectDb from "./OpenDataBase";
const db = connectDb()
const insertUser = (userName, password) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT OR IGNORE INTO StaffLibrary (userName, password, name) VALUES (?, ?, ?);',
          [userName, password, "Anonymous"],
          (tx, results) => {
            if (results.rowsAffected > 0){
              console.log('register thanh cong')
              login(userName,password).then(result =>{
                resolve(result);
              })
            } else {
              console.log('register that bai')
              resolve({ success: false, message: 'Tài khoản đã tồn tại'});
            }
          },
          (tx, err) => {
            reject({ success: false, message: err.message });
          }
        );
      });
    });
};

const login = (userName, password) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM StaffLibrary WHERE userName = ? AND password = ?',
          [userName, password],
          (tx, results) => {
            if (results.rows.length> 0) {
              resolve({success : true , user : results.rows.item(0)});//
            } else {
              resolve({ success: false, message: 'Tài khoản không tồn tại' });
            }
          },
          (tx, err) => {
            reject();
          }
        );
      });
    });
  };
export {login,insertUser}  
  