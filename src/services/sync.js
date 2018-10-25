import storage from './storage';
import Api from './api';

const sync = ({
    sync(){
        storage.getAllDataForKey('sync').then(sync => { 
            alert(JSON.stringify(sync));       
            /*sync.forEach(element => {
                try{
                    Api({
                        method: element.method,
                        url: element.url,
                        data: element.body
                    });

                    storage.remove({
                        key: 'sync',
                        id: element.id
                    });
                }
                catch(error){
                    alert('erro ao sincronizar dados');
                } 
            }); */        
        });
    }
});

export default sync;