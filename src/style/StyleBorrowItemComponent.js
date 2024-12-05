/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    height: 135,
    width: '100%',
    backgroundColor: '#FFFAF0', // nếu muốn màu tùy chỉnh thì #806080...
    marginBottom: 10,
    paddingStart: 18,
  },
  containerTextAndButton: {
    height: 45,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerText: {
    height: '100%',
    width: '50%',
  },
  containerButton: {
    height: '100%',
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  borrowingSlipCode: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 5,
  },
  bookName: {
    fontSize: 14,
    marginTop: 2,
    fontWeight: 'bold',
    color: 'blue',
  },
  memberName: {
    fontSize: 14,
    marginTop: 2,
    fontWeight: 'bold',
    color: 'blue',
  },
  state: {
    fontSize: 14,
    marginTop: 2,
    fontWeight: 'bold',
    color: 'blue',
  },
  rentalDate: {
    fontSize: 14,
    marginTop: 2,
    fontWeight: 'bold',
    color: 'blue',
  },
  deadline: {
    fontSize: 14,
    marginTop: 2,
    fontWeight: 'bold',
    color: 'blue',
  },
  buttonEdit: {
    height: '100%',
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: 25,
  },
  img_icon_edit: {
    height: '70%',
    width: '70%',
  },
});
export default styles;
