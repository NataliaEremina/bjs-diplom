'use strict';

class Profile {
    constructor ({ username, name: { firstName, lastName }, password }) {	
        this.username = username;	
        this.name = {	
            firstName,	
            lastName,	
        };	
        this.password = password;	
    }	

createUser(callback) {
    return ApiConnector.createUser({ username: this.username, name: this.name, password: this.password }, (err, data) => {
      console.log(`Creating user ${this.name.firstName}`);
      callback(err, data);
    });
}

performLogin(callback) {	
    return ApiConnector.performLogin(	
        { username: this.username, password: this.password },	
        (err, data) => {	
            console.log(`Authorizing user ${this.username}`);	
            callback(err, data);	
        }	
    );	
}	

 addMoney({ currency, amount }, callback) {	
    return ApiConnector.addMoney({ currency, amount }, (err, data) => {	
        console.log(`Adding ${amount} of ${currency} to ${this.username}`);	
        callback(err, data);	
    });	
}	

convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
    return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
        console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
        callback(err, data);
    });
}

transferMoney({ to, amount }, callback) {	
    return ApiConnector.transferMoney({ to, amount }, (err, data) => {	
        console.log(`Transfering ${amount} of Netcoins to ${to}`);	
        callback(err, data);	
    });	
}
}
function getStocks(callback) {	
return ApiConnector.getStocks((err, data) => {	
    console.log(`Getting stocks info`);	
    callback(err, data);	
});	
}

let Stocks = getStocks ((err, data) => {
    if (err) {
        console.error('Error Getting stocks info');
    } else {
        Stocks = data;
    }
});

function main() {

    let Ivan = new Profile({
                    username: 'Ivan',
                    name: {firstName: 'Ivan', lastName: 'Ivanov'},
                    password: 'password1',
                });

    let Victor  = new Profile({
                    username: 'Victor',
                    name: {firstName: 'Victor', lastName: 'Petrov'},
                    password: 'password2',
                });


    Ivan.createUser((err,data) => {
        if (err) {
            console.error('Creating Ivan error');
        } else {
            console.log(`Ivan is created`);
            Ivan.performLogin((err,data) => {
                if (err) {
                    console.error('Authorization error');
                } else {
                    console.log(`Ivan is authorized`);
                    Ivan.addMoney({ currency: 'RUB', amount: 100000 }, (err, data) => {
                        if (err) {
                            console.error('Error during adding money to Ivan');
                        } else {
                            console.log(`Added 100000 rubles to Ivan`);
                            Ivan.convertMoney({ fromCurrency: 'RUB', targetCurrency: 'NETCOIN' , targetAmount: 100000 }, (err,data) => {
                                if (err) {
                                    console.log('Сonverting error');
                                } else {
                                    console.log(`Converted to netcoin`);
                                    Victor.createUser((err,data) => {
                                if (err) {
                                    console.log('Creating Victor error');
                                } else {
                                    console.log(`Victor is created`);
                                    Ivan.transferMoney({ to: 'Victor', amount: 10 }, (err,data) => {
                                if (err) {
                                    console.log('Transfer error');
                                } else {
                                    console.log(`Victor get 10 NETCOIN`);
                                }
                                });
                                }                   
                                });
                                }
                                });
                            }
                    });
                }
            });
        }
    });    

main();