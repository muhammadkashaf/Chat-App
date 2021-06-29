import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import Button from "../components/Button";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

function Otp({ navigation, route }) {


  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [verifyCode, setVerifyCode] = useState('');
  const [password, setPassword] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  React.useEffect(() => {
    const { confirmation, number } = route.params;
    setConfirm(confirmation);
  }, [])

  async function confirmCode() {
    try {
      const result = await confirm.confirm(verifyCode);
      console.log(result);
      if (result.additionalUserInfo.isNewUser === "false") {
        navigation.navigate("Home");        
      }
      else {
        navigation.navigate("Register");
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Verify Code</Text>
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={verifyCode}
        onChangeText={val => setVerifyCode(val)}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <Button title="Verify" onPress={() => confirmCode()} />
    </View>
  );
}

export default Otp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    color: '#006AFF',
    fontSize: 25,
    marginTop: height * 0.1,
    marginLeft: width * -0.5,
    fontWeight: 'bold',
  },
  codeFieldRoot: { marginTop: height * 0.1 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#00000030',
    textAlign: 'center',
    borderRadius: 10,
    margin: 4,
  },
  focusCell: {
    borderColor: '#000',
  },
})