/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    height: '100%',
    width: '96%',
    alignSelf: 'center',
    marginTop: 10,
  },
  flItemContainer: {
    height: 80,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContainer: {
    height: '30%',
    width: '90%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameInput: {
    height: 50,
    width: '90%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginBottom: 30,
    paddingStart: 6,
  },
  editNameButton: {
    height: 40,
    width: 140,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editNameText: {
    fontSize: 17,
    color: 'white',
  },
  studentId: {
    height: '50%',
    width: '100%',
    fontSize: 20,
    color: 'black',
    textAlignVertical: 'center',
    marginStart: 10,
  },
  bottomItemInfoContainer: {
    height: '50%',
    width: '100%',
    flexDirection: 'row',
  },
  studentName: {
    height: '100%',
    width: '70%',
    fontSize: 20,
    color: 'black',
    textAlignVertical: 'center',
    marginStart: 10,
  },
  studentItemControls: {
    height: '100%',
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    height: '40%',
    width: '20%',
    alignSelf: 'center',
    marginEnd: 15,
  },
  deleteImg: {
    height: '100%',
    width: '100%',
  },
  editButton: {
    height: '40%',
    width: '20%',
    alignSelf: 'center',
    marginEnd: 15,
  },
  editImg: {
    height: '100%',
    width: '100%',
  },
});
export default styles;
