const logoutButton = new LogoutButton();
logoutButton.action = function() {
    ApiConnector.logout(response => response.success ? window.location.reload() : console.log("какая-то ошибка"));
};

ApiConnector.current(response => response ? ProfileWidget.showProfile(response.data) : console.log("какая-то ошибка"));

const ratesBoard = new RatesBoard();
ratesBoard.getCourse = function() {
    // ApiConnector.getStocks(response => (response.success) ? ratesBoard.clearTable() : console.log("Не удалось очистить таблицу"))
    // ApiConnector.getStocks(response => (response.success) ? ratesBoard.fillTable(response.data) : console.log("Не удалось заполнить таблицу"))
    ApiConnector.getStocks((response) => {
        if (response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
        }
    })
}

ratesBoard.getCourse();
setInterval(ratesBoard.getCourse, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
    //ApiConnector.addMoney(data, response => response.success ? ProfileWidget.showProfile(response.data) : moneyManager.setMessage(response.success, response.error))
    ApiConnector.addMoney(data, ((response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data)
        }
        moneyManager.setMessage(response.success, response.error);
    }))
};

moneyManager.conversionMoneyCallback = function(data) {
    //ApiConnector.convertMoney(data, response => response.success ? ProfileWidget.showProfile(response.data) : moneyManager.setMessage(response.success, response.error))
    ApiConnector.convertMoney(data, ((response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data)
        }
        moneyManager.setMessage(response.success, response.error);
    }))
};

moneyManager.sendMoneyCallback = function(data) {
    //ApiConnector.transferMoney(data, response => response.success ? ProfileWidget.showProfile(response.data) : moneyManager.setMessage(response.success, response.error))
    ApiConnector.transferMoney(data, ((response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data)
        }
        moneyManager.setMessage(response, response.error);
    }))
};

const favoritesWidget = new FavoritesWidget();
favoritesWidget.getFavorites = function() {
    ApiConnector.getFavorites((response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    })
};

favoritesWidget.getFavorites();

favoritesWidget.addUserCallback = function(data){
    ApiConnector.addUserToFavorites(data, ((response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
        favoritesWidget.setMessage(response.success, response.error);
    }))
};

favoritesWidget.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, ((response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
        favoritesWidget.setMessage(response.success, response.error);
    }))
}