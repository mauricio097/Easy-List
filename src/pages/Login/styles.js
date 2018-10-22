import { StyleSheet } from 'react-native';
import Colors from '../../config/colors';

const Styles = StyleSheet.create({
    contentView: {
        backgroundColor: Colors.background,
        flex: 1
    },
    logo: {
        width: '60%',
        height: '60%'
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
    buttonLogin: {
        alignItems: 'center',
        backgroundColor: Colors.button,
        padding: 10,
        marginHorizontal: 150,
        borderRadius: 5,
        marginTop: 20
    },
    textButtonLogin: {
        color: '#FFF'
    }
});

export default Styles;