/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';
import MemberDao from './MemberDao';
import connectDb from './OpenDataBase';
class BorrowingSlipDao {
  getAllBorrowingSlip(userId) {
    return new Promise((resolve, reject) => {
      const db = connectDb();
      db.executeSql('PRAGMA foreign_keys = ON');
      db.transaction(tx => {
        tx.executeSql(
          `select borrowingSlip.*,Book.bookName,Member.cardNumber,Member.memberName
          from borrowingSlip INNER JOIN Book ON borrowingSlip.bookId = Book.id 
          INNER JOIN Member ON borrowingSlip.memberId = Member.id where borrowingSlip.librarianId = ?`,
          [userId],
          (tx, result) => {
            console.log('get all phieu muon');
            let borrowingSlipArray = [];
            for (let i = 0; i < result.rows.length; i++) {
              borrowingSlipArray.push(result.rows.item(i));
            }
            console.log(
              'tra ve data phieu muon thanh cong ' + borrowingSlipArray.length,
            );
            resolve({success: true, data: borrowingSlipArray});
            db.close();
          },
          (tx, err) => {
            console.log('loi get all phieu muon');
            reject();
            db.close();
          },
        );
      });
    });
  }
  getBorrowingsByDateRange(librarianId,startDate,endDate) {
    console.log("start and endDate :"+startDate+":"+endDate+":"+librarianId)
    return new Promise((resolve, reject) => {
      const db = connectDb();
      db.executeSql('PRAGMA foreign_keys = ON');
      db.transaction(tx => {
        tx.executeSql(
           `SELECT borrowingslip.*,Book.price FROM borrowingslip INNER JOIN Book ON borrowingSlip.bookId = Book.id  WHERE rentalDate BETWEEN ? AND ? AND BorrowingSlip.librarianId = ?;`,
          [startDate,endDate,librarianId],
          (tx, result) => {
            console.log('get all phieu muon theo khoang ngay : '+result.rows.length);
            let borrowingSlipArray = [];
            for (let i = 0; i < result.rows.length; i++){
              borrowingSlipArray.push(result.rows.item(i));
            }
            resolve({success: true, data: borrowingSlipArray});
            db.close();
          },
          (tx, err) => {
            console.log('loi truy van sql ', err ? err.message : 'Không có thông tin lỗi');
            reject();
            db.close();
          },
        );
      });
    });
  }
  checkBorrowingSlipByMemberId(memberId) {
    return new Promise((resolve, reject) => {
      const db = connectDb();
      db.transaction(tx => {
        tx.executeSql(
          `select * from borrowingSlip where memberId = ?`,
          [memberId],
          (tx, result) => {
            const success = result.rows.length > 0 ? true : false;
            resolve({success});
            db.close();
          },
          (tx, err) => {
            reject();
            db.close();
          },
        );
      });
    });
  }
  deleteBorrowingSlip(borrowingSlipId) {
    return new Promise((resolve, reject) => {
      const db = connectDb();
      db.transaction(tx => {
        tx.executeSql(
          `delete from borrowingSlip where id = ?`,
          [borrowingSlipId],
          (tx, result) => {
            console.log('xoa phieu muon thanh cong');
            new MemberDao().deleteUnusedMembers();
            resolve({success: true});
          },
          (tx, err) => {
            console.error('Lỗi khi truy vấn SQL xoa phieu :', err);
            reject();
          },
        );
      });
    });
  }
  async saveNewBorrowingSlip(modalBorrowingSlip) {
    const {
      slipCode,
      idBook,
      userId,
      cardNumber,
      memberName,
      state,
      rentalDate,
      deadline,
    } = modalBorrowingSlip;
    console.log("object "+JSON.stringify(modalBorrowingSlip));
    const resultSelect = await new BorrowingSlipDao().getBorrowingSlipBySlipCode(slipCode,userId);
    console.log(" resultSelect "+JSON.stringify(resultSelect));
    if(resultSelect.success == true){
      return Promise.resolve({success : false});
    }
    await new MemberDao().saveMember(cardNumber, memberName, userId); // neu gap loi -> nem ngoai le
    const memberResult = await new MemberDao().getMemberByCardAndLibId(
      cardNumber,
      userId,
    ); 
    console.log('id member khi insert phieu muon : ' + memberResult.data.id);
    if (memberResult.success == false) return Promise.reject();
    const memberId = memberResult.data.id;
    return new Promise((resolve, reject) => {
      const db = connectDb();
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO borrowingSlip (ReceiptNumber,bookId,librarianId,memberId,state,rentalDate,rentalDuration) VALUES (?,?,?,?,?,?,?);',
          [slipCode, idBook, userId, memberId, state, rentalDate, deadline],
          (tx, results) => {
              console.log('them thanh cong');
              resolve({success: true, id: results.insertId});
          },
          (tx, err) => {
            console.log('loi them new phieu ');
            reject();
          },
        );
      });
    });
  }
  async updateBorrowingSlip(modalBorrowingSlip) {
    const {
      id,
      slipCode,
      idBook,
      userId,
      cardNumber,
      memberName,
      state,
      rentalDate,
      deadline,
    } = modalBorrowingSlip;
    const borrowingSlip = await new BorrowingSlipDao().getBorrowingSlipBySlipCode(slipCode,userId);
    if(borrowingSlip.success == true && borrowingSlip.data.id != id){ // tim thay phieu voi bien lai nhung id phieu do # tham so id
      return Promise.resolve({success : false});
    }
    const memberDao = new MemberDao();
    await memberDao.saveMember(cardNumber, memberName, userId); // neu gap loi -> nem ngoai le
    const memberResult = await new MemberDao().getMemberByCardAndLibId( // thêm mới member hoặc bỏ qua nếu tồn tại 
      cardNumber,
      userId,
    );
    memberDao.deleteUnusedMembers();
    const memberId = memberResult.data.id;
    return new Promise((resolve, reject) => {
      const db = connectDb();
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE borrowingSlip SET ReceiptNumber = ?, bookId = ?,librarianId = ?,memberId = ?,state = ?,rentalDate = ?,rentalDuration = ? WHERE id = ?;',
          [slipCode, idBook, userId, memberId, state, rentalDate,deadline,id],
          (tx, results) => {
              resolve({success: true, id: results.insertId});
          },
          (tx, err) => {
            reject();
          },
        );
      });
    });
  }
  getBorrowingSlipBySlipCode(slipCode,librarianId) {
    return new Promise((resolve, reject) => {
      const db = connectDb();
      db.executeSql('PRAGMA foreign_keys = ON');
      db.transaction(tx => {
        tx.executeSql(
          `select * from borrowingSlip where ReceiptNumber = ? and librarianId = ?`, 
          [slipCode,librarianId],
          (tx, result) =>{
            if(result.rows.length > 0) resolve({success: true, data: result.rows.item(0)});
            else resolve({success : false})
            db.close();
          },
          (tx, err) => {
            reject();
            db.close();
          },
        );
      });
    });
  }
  deleteBorrowingSlipByMemberId(memberId){
    return new Promise((resolve, reject) => {
      const db = connectDb();
      db.transaction(tx => {
        tx.executeSql(
          `delete from borrowingSlip where memberId = ?`,
          [memberId],
          (tx, result) => {
            console.log('xoa phieu muon by memberId thanh cong');
            resolve({success: true});
          },
          (tx, err) => {
            console.error('Lỗi khi truy vấn SQL xoa phieu :', err);
            reject();
          },
        );
      });
    });
  }
  
}
export default BorrowingSlipDao;
