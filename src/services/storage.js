import {ToastAndroid} from 'react-native';
let SQLite = require('react-native-sqlite-storage');
let db = SQLite.openDatabase({name: 'database.db',createFromLocation:'~database.db'});
import Api from './api';

const storage = ({
    sync(){
        db.transaction((tx) => {         
            tx.executeSql('SELECT id from User',[], (tx, results) => {  
                let id = results.rows.item(0).id;
                let data;
                try{
                    const response = Api.get(`/list/user/${id}`);        
                    data = response.data;
                }
                catch(error){
                    alert(error);
                }

                                
                db.transaction((tx) => {         
                tx.executeSql('SELECT * from Lists WHERE sync="false"',[], (tx, results) => {                                                          
                   for(let i=0;i<results.rows.length;i++){                                                                                                       
                       if(data!==undefined){ 
                            for (const j in data) {
                                if(results.rows.item(j).active == "false"){
                                    try{
                                        const response = Api.delete(`/list/${data[j].id}`);
                                        alert('Deletada');
                                        this.props.navigation.navigate('Home');
                                    }
                                    catch(error){
                                        alert(error);
                                        this.setState({error: 'Erro ao Atualizar Lista'});
                                    } 
                                }                                
                                else if(data[j].name === results.rows.item(j).name){
                                    alert('Dado já existe');
                                    try{
                                        const response = Api.put(`/list/${data[j].id}`, {                                    
                                            name: results.rows.item(j).name,
                                            items: results.rows.item(j).items
                                        });
                                        
                                        this.props.navigation.navigate('Home');
                                    }
                                    catch(error){
                                        alert(error);
                                        this.setState({error: 'Erro ao Atualizar Lista'});
                                    }
                                }
                                else{
                                    try{                                        
                                        const response = Api.post('/list', {
                                            idUser: id,
                                            name: results.rows.item(j).name,
                                            items: JSON.parse(results.rows.item(j).items)
                                        }); 
                                        
                                        alert('inserido');
                                    }
                                    catch(error){            
                                        this.setState({error: 'Erro ao Criar Lista'});
                                    }
                                }
                            }                    
                        }else{
                            if(results.rows.item(i).active == "false"){
                                try{
                                    const response = Api.delete(`/list/${data[j].id}`);
                                    alert('Deletada');
                                    this.props.navigation.navigate('Home');
                                }
                                catch(error){
                                    alert(error);
                                    this.setState({error: 'Erro ao Atualizar Lista'});
                                } 
                            }else{                                 
                                try{
                                    const response = Api.post('/list', {
                                        idUser: id,
                                        name: results.rows.item(i).name,
                                        items: JSON.parse(results.rows.item(i).items)
                                    }); 
                                    
                                    alert('inserido');
                                }
                                catch(error){            
                                    alert(error);
                                }
                            }
                        }

                        db.transaction((tx) => {         
                            tx.executeSql('UPDATE Lists SET sync="true" WHERE id=?',[results.rows.item(i).id], (tx, results) => {                                  
                                alert('Atualizado');
                            }, function (error){
                                alert(JSON.stringify(error));
                            });
                        });

                    }                                                                
                }, function (error){
                    alert(JSON.stringify(error));
                    });
                });
                
               
            }, function (error){
                alert(JSON.stringify(error));
                });
            });                      
    },

    delete(id){
        db.transaction((tx) => {         
            tx.executeSql('UPDATE Lists SET active="false" WHERE id=?',[id], (tx, results) => {                                  
                ToastAndroid.show('Lista Excluida com Sucesso', ToastAndroid.SHORT);
            }, function (error){
                alert(JSON.stringify(error));
            });
        });
    }
});

export default storage;