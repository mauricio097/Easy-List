import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    contentView: {
        backgroundColor: '#38ADA9',
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
    buttonRegister: {
        alignItems: 'center',
        backgroundColor: '#1E5C5A',
        padding: 10,
        marginHorizontal: 150,
        borderRadius: 5,
        marginTop: 20
    },
    textButtonRegister: {
        color: '#FFF'
    }
});

export default Styles;