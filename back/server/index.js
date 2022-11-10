
const express = require('express')

const app = express()

const cors = require('cors')
const mongoose = require('mongoose')

const adminController = require('../Controller/AdminController');
const emailController = require('../Controller/EmailController');
const livreurController = require('../Controller/LivreurController');
const clientController = require('../Controller/ClientController');
const restaurantController = require('../Controller/RestaurantController');
const platController = require('../Controller/PlatController');
const commandeController = require('../Controller/CommandController');
const categorieController = require('../Controller/CategorieController');



app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://beldi:beldi@cluster0.arvwc.mongodb.net/beldi?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.route("/api/login").post(adminController.loginAdmin)
app.route("/update_admin").post(adminController.updateAdmin)
app.route("/reset_password/user/:email").post(emailController.sendPasswordResetEmail)
app.route("/receive_new_password/:id/:token").post(emailController.receiveNewPassword)

//Route Livreurs
app.route("/get_all_livreurs").get(livreurController.getAllLivreurs);
app.route("/add_new_livreur").post(livreurController.insertNewLivreurs);
app.route("/update_livreur").post(livreurController.updateLivreur);
app.route("/delete_livreur").post(livreurController.deleteLivreur);
app.route("/get_number_livreur").get(livreurController.getNumberOf);

//Route Clients
app.route("/get_all_clients").get(clientController.getAllClients);
app.route("/delete_client").post(clientController.deleteClient);
app.route("/get_number_client").get(clientController.getNumberOf);

//Route Restaurants
app.route("/get_all_restaurants").get(restaurantController.getAllRestaurants);
app.route("/add_new_restaurant").post(restaurantController.insertNewRestaurant);
app.route("/delete_restaurant").post(restaurantController.deleteRestaurant);
app.route("/update_restaurant").post(restaurantController.updateRestaurant);
app.route("/get_number_restaurant").get(restaurantController.getNumberOf);

//Route Plats
app.route("/get_all_plats").get(platController.getAllPlats);
app.route("/add_new_plat").post(platController.insertNewPlat);
app.route("/delete_plat").post(platController.deletePlat);
app.route("/update_plat").post(platController.updatePlat);

//Route Commandes
app.route("/get_all_commandes").get(commandeController.getAllCommandes);
app.route("/get_number_commande").get(commandeController.getNumberOf);

//Route Categories
app.route("/get_all_categories").get(categorieController.getAllCategorie);



app.listen(1337, () => {
	console.log('Server started on 1337')
})

