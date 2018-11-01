import { StyleSheet } from 'react-native';
import Colors from '../../config/colors';

const Styles = StyleSheet.create({
    contentView: {
        backgroundColor: Colors.background,
        flex: 1
    },
    logo: {
        width: '75%',
        height: '38%',
        marginBottom: 15,
        marginTop: 15
    },
    formView: {
        marginTop: 15
    },
    input: {
        backgroundColor: '#fff',
        marginTop: 15,
        marginHorizontal: 30,
        borderRadius: 5
    },
    registerText: {
        marginTop: 15,
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15
    },
    buttonRegister: {
        alignItems: 'center',
        backgroundColor: Colors.button,
        padding: 7,
        marginHorizontal: 130,
        borderRadius: 5,
        marginTop: 20
    },
    textButtonRegister: {
        color: '#FFF',
        fontWeight: 'bold'
    }
});

export default Styles;