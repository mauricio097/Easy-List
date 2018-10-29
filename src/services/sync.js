import storage from './storage';
import Api from './api';

const sync = {
    addItem(item){
        storage.save({
            key:'post',
            id: item.id,
            data: item,
            expires: null
        });
    },
    updateItem(item){
        storage.save({
            key:'put',
            id: item.id,
            data: item,
            expires: null
        });
    },
    start(){
        // Map the data and insert all items in API
        storage.getAllDataForKey('post').then(items => {
            items.forEach(element => {
                try{
                    const response = Api.post('/list', {
                        idUser: element.idUser,
                        name: element.name,
                        items: element.items
                    });
                }
                catch(error){            
                    this.setState({error: 'Erro ao Sincronizar Lista'});
                }
            });
        });
        
        
        // Map the data and update all items in API
        storage.getAllDataForKey('put').then(items => {
            items.forEach(element => {
                try{
                    const response = Api.put(`/list/${element.id}`, {
                        name: element.name,
                        items: element.items
                    });
                }
                catch(error){            
                    this.setState({error: 'Erro ao Sincronizar Lista'});
                }
            });
        }); 
    }
}

export default sync;