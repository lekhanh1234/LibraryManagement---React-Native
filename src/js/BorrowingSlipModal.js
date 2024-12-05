/* eslint-disable prettier/prettier */
class BorrowingSlipModal {
    constructor({ ReceiptNumber, bookId, librarianId, memberId, state, rentalDate, rentalDuration, phone, email }) {
        this.ReceiptNumber = ReceiptNumber;
        this.bookId = bookId;
        this.librarianId = librarianId;
        this.memberId = memberId;
        this.state = state;
        this.rentalDate = rentalDate;
        this.rentalDuration = rentalDuration;
        this.phone = phone;
        this.email = email;
    }
}
export default BorrowingSlipModal
