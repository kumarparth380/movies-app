import { StyleSheet } from 'react-native';

const containers = StyleSheet.create({
  componentContainer: {
    width: '100%',
    alignItems: 'center',
    flex: 1
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  alignCenter: {
    alignItems: 'center'
  },
  alignStart: {
    alignItems: 'flex-start'
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fullWidth: {
    width: '100%'
  },
  fullHeight: {
    height: '100%'
  },
  fullWidthCenter: {
    width: '100%',
    alignItems: 'center'
  },
  pushToBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  flex1: {
    flex: 1
  },
  inputRadius: {
    borderRadius: 3
  },
  buttonRadius: {
    borderRadius: 3
  },
  row: {
    flexDirection: 'row'
  },
  redBorder: {
    borderWidth: 2,
    borderColor: 'red'
  },
  blueBorder: {
    borderWidth: 2,
    borderColor: 'blue'
  },
  alignEnd: {
    alignItems: 'flex-end'
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  justifyEnd: {
    justifyContent: 'flex-end'
  },
  justifyStart: {
    justifyContent: 'flex-start'
  },
  positionAbsolute: {
    position: 'absolute'
  },
  borderRadius: {
    borderRadius: 5
  },
  alignSelfEnd: {
    alignSelf: 'flex-end'
  },
  alignSelfCenter: {
    alignSelf: 'center'
  },
  alignSelfStart: {
    alignSelf: 'flex-start'
  }
});

export default containers;
