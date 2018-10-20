import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    containerView: {
        marginTop: 10,
        marginHorizontal: 10
    },
    itemListView: {
        flexBasis: 0,
        alignItems: "center",
        backgroundColor: "#FFF",
        flexGrow: 1,
        margin: 4,
        padding: 20,
        borderRadius: 5,
        flexDirection: 'row'
    },
    itemListText: {
        flex: 1,
        fontSize: 20
    },
    itemListIcon: {
        fontSize: 30
    }
});

export default Styles;