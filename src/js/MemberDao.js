/* eslint-disable prettier/prettier */
import BorrowingSlipDao from './BorrowingSlipDao';
import connectDb from './OpenDataBase';
class MemberDao {
  getAllMember(userId) {
    return new Promise((resolve, reject) => {
      const db = connectDb();
      db.transaction(tx => {
        tx.executeSql(
          'select * from Member where librarianId = ?',
          [userId],
          (tx, result) => {
            console.log(
              'get data thann cong all Member : ' + result.rows.length,
            );
            let memberArray = [];
            for (let i = 0; i < result.rows.length; i++) {
              memberArray.push(result.rows.item(i));
            }
            console.log('tra ve data all Member thanh cong');
            resolve({success: true, data: memberArray});
          },
          (tx, err) => {
            resolve({success: false, message: err.message});
            console.log('loi khi get all Member ' + err);
          },
        );
      });
    });
  }
  getMemberById(memberId) {
    return new Promise((resolve, reject) => {
      const db = connectDb();
      db.transaction(
        tx => {
          tx.executeSql(
            'select * from Member where id = ?',
            [memberId],
            (tx, result) => {
              if (result.rows.length > 0)
                resolve({success: true, data: result.rows.item(0)});
              else resolve({success: false, message: 'No Member'});
            },
          );
        },
        (tx, err) => {
          reject(err);
        },
      );
    });
  }
  getMemberByCardAndLibId(cardNumber, librarianId) {
    return new Promise((resolve, reject) => {
      const db = connectDb();
      db.transaction(
        tx => {
          tx.executeSql(
            'select * from Member where cardNumber = ? and librarianId = ?',
            [cardNumber, librarianId],
            (tx, result) => {
              if (result.rows.length > 0)
                resolve({success: true, data: result.rows.item(0)});
              else resolve({success: false, message: 'No Member'});
            },
          );
        },
        (tx, err) => {
          reject(err);
        },
      );
    });
  }
  saveMember(cardNumber, memberName, librarianId) {
    return new Promise((resolve, reject) => {
      const db = connectDb();
      db.transaction(tx => {
        tx.executeSql(
          'INSERT OR IGNORE INTO Member (cardNumber,memberName,librarianId) VALUES (?,?,?);',
          [cardNumber, memberName, librarianId],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              resolve({success: true});
            } else {
              resolve({success: false});
            }
          },
          (tx, err) => {
            reject();
          },
        );
      });
    });
  }
  updateMemberName(memberId, memberName) {
    return new Promise((resolve, reject) => {
      const db = connectDb();
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE Member SET memberName = ? WHERE id = ?;',
          [memberName, memberId],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              resolve({success: true});
            } else {
              resolve({success: false});
            }
          },
          (tx, err) => {
            reject();
          },
        );
      });
    });
  }
  deleteMember(memberId,librarianId) {
    return new Promise((resolve, reject) => {
      const db = connectDb();
      new BorrowingSlipDao()
      .deleteBorrowingSlipByMemberId(memberId,librarianId)
      .then(() => {
        (() => {
          db.transaction(transaction => {
            transaction.executeSql(
              'delete from Member where id = ?',
              [memberId],
              () => {
                resolve({success : true});
              },
              () => {
                reject();
              },
            );
          });
        })();
      });

    });
  }
  deleteUnusedMembers() {
    return new Promise((resolve, reject) => {
      const db = connectDb();
      const deleteMember = () => {
        db.transaction(transaction => {
          transaction.executeSql(
            'DELETE FROM Member WHERE id NOT IN (SELECT memberId FROM BorrowingSlip);',
            [],
            (transaction, result) => {
              resolve({success: true});
            },
            (transaction, err) => {
              reject();
            },
          );
        });
      };
      deleteMember();
    });
  }
}
export default MemberDao;
