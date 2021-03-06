import {ToastAndroid} from 'react-native';
let SQLite = require('react-native-sqlite-storage');
let db = SQLite.openDatabase({name: 'database.db',createFromLocation:'~database.db'});
import Api from './api';


const storage = ({
    async getIdUser(){
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT id FROM User', [], (tx, results) => {                                
                    let row = results.rows.item(0);                
                    resolve(row.id);
                });
            });
        });
    },
    async getToken(){
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT token FROM User', [], (tx, results) => {                                
                    let row = results.rows.item(0);                
                    resolve(row.token);
                });
            });
        });
    },
    async getNoSync() {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {            
                tx.executeSql('SELECT * from Lists WHERE sync="false"', [], (tx, results) => {
                    let rows = [];
                    for(let i=0;i<results.rows.length;i++){
                        let newItem = {
                           id: results.rows.item(i).id, 
                           name: results.rows.item(i).name,
                           items: JSON.parse(results.rows.item(i).items),
                           active: results.rows.item(i).active,
                           sync: results.rows.item(i).sync,
                        };
                        rows.push(newItem);
                    }
                    resolve(rows);
                });
            });
        });
    },
    async getDataAPI(id){                         
        try {
            const response = await Api.get(`/list/user/${id}`);
            return response.data;
          } catch (error) {
            alert(error);
          }
    },
    async validToken(){                
        try {
            const response = await Api.get(`/list/`);
            return true;            
          } catch (error) {
              const status = JSON.stringify(error.request.status);
              if(status==401){               
                return false;
              }
          }
    },
    searchObj(item,dataApi){
        for (const key in dataApi) {
            if (dataApi.hasOwnProperty(key)) {
                const element = dataApi[key];
                if(element.name == item.name){
                    return true;
                }                                                               
            }
        }
    },
    async deleteData(id){
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql('UPDATE Lists SET sync="true" WHERE id=?',[id], (tx, results) => {                                
                    if(results.rowsAffected.length>0){
                        ToastAndroid.show('Registro Deletado Local', ToastAndroid.SHORT);
                    }
                });
            });
        });
    },
    async logout(){        
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql('DELETE FROM User',[], (tx, results) => {                                
                    tx.executeSql('DELETE FROM Lists',[], (tx, results) => {                                
                        resolve(true);
                    });
                });
            });
        });   
    },
    async loadDataUser(){
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT name,email FROM User', [], (tx, results) => {                                
                    let row = {
                        name: results.rows.item(0).name,
                        email: results.rows.item(0).email                
                    }
                    resolve(row);
                });
            });
        });
    },
    async sync(){
        const id = await this.getIdUser();
        const noSync = await this.getNoSync(); 
        const dataApi = await this.getDataAPI(id); 
                
        if(noSync.length>0){                    
            for(let i=0;i<noSync.length;i++){                
                if(noSync[i].active == "false"){ //DELETE
                    try{
                        const response = Api.delete(`/list/${dataApi[i].id}`);
                        //ToastAndroid.show('Registro Apagado', ToastAndroid.SHORT);
                    }
                    catch(error){
                        ToastAndroid.show(error, ToastAndroid.SHORT);
                    }
                }
                else{
                    if(this.searchObj(noSync[i],dataApi)){ //UPDATE                                              
                        try{
                            const response = Api.put(`/list/${dataApi[i].id}`, {                                    
                                name: noSync[i].name,
                                items: noSync[i].items
                            });                            
                            //ToastAndroid.show('Registro Atualizado', ToastAndroid.SHORT);
                        }
                        catch(error){
                            ToastAndroid.show(error, ToastAndroid.SHORT);
                        }
                    }
                    else{ //NEW                                              
                        try{
                            const response = Api.post('/list', {
                                idUser: id,
                                name: noSync[i].name,
                                items: noSync[i].items
                            });                             
                            //ToastAndroid.show('Registro Inserido', ToastAndroid.SHORT);
                        }
                        catch(error){            
                            ToastAndroid.show(error, ToastAndroid.SHORT);
                        }
                    }
                }
                this.deleteData(noSync[i].id);
            }

            ToastAndroid.show("Dados Sincronizados Com Sucesso", ToastAndroid.SHORT);
        }
        else{
            ToastAndroid.show("Não Há Dados para Sincronizar", ToastAndroid.SHORT);
        }                        
    },
    async getLists(){
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM Lists WHERE active="true"', [], (tx, results) => {                                
                    let lists=[];
                    for(let i=0;i<results.rows.length;i++){                        
                        let newItem = {
                            id: results.rows.item(i).id, 
                            name: results.rows.item(i).name,
                            items: JSON.parse(results.rows.item(i).items),
                            active: results.rows.item(i).active,
                            sync: results.rows.item(i).sync,
                         };
                        lists.push(newItem); 
                    }                                   
                    resolve(lists);
                });
            });
        });    
    },
    async deleteList(id){
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql('UPDATE Lists SET active="false",sync="false" WHERE id=?',[id], (tx, results) => {                                
                    if(results.rowsAffected.length>0){
                        resolve(true);
                    }
                    else{
                        resolve(false);
                    }
                });
            });
        });    
    },
    async updateList(data,id){
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql('UPDATE Lists SET sync="false",items = ? WHERE id = ?',[data,id], (tx, results) => {                                
                    if(results.rowsAffected.length>0){
                        resolve(true);
                    }
                    else{
                        resolve(false);
                    }
                });
            });
        });   
    },
    async authenticate(){
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM User LIMIT 1', [], (tx, results) => { 
                    if(results.rows.length>0){
                        resolve(true);
                    }
                    else{
                        resolve(false);
                    }
                });
            });
        });    
    }
});

export default storage;


