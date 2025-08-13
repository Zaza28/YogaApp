//-------------------------------------
//Partie rappel des objets en JS :
const obj = {
  //index:value
  pseudo: "Zaza La Reine",
  ville: "Lyon",
  admin: false,

  sayHello: function () {
    // console.log("Bonjour je suis " + this.pseudo);
  },
  //   direBonjour() {
  //     console.log("Bonjour" + obj.pseudo);
  //   },
};

//ajouter un qlqch dans un objet :
obj.age = 28;
obj["admin"] = true;

// supprimer un index dans un objet :
delete obj.ville;
// console.log(obj);

//modifier un paramètre dans un objet :
obj.pseudo = "Z";

// Vérifier si une propriété existe dans un objet :
// console.log("pseudo" in obj);
// console.log("ville" in obj);

// Comment parcourir un Objet :
// for (const key in obj) {
//   //   console.log(key + " : " + obj[key]);
// }
// console.log(obj.sayHello());
//-------------------------------------------

// Partie Cours Les Méthodes Natives (les méthodes des objets) :

// Obtenir les clés :
const keys = Object.keys(obj);
// console.log(keys);

// Obtenir les Valeurs :
const values = Object.values(obj);
// console.log(values);

//Récupère toutes les données de l'objet :
const nestedArray = Object.entries(obj);
// console.log(nestedArray);

//Fusionner des objects
const obj2 = {
  taille: "1m65",
  poids: "80kg",
  pseudo: "Zzzzz",
};
const fusion = Object.assign({}, obj, obj2);
// console.log(fusion);

//Empecher les modifications :

const newObj = Object.seal(obj);
newObj.pseudo = "Test";
newObj.adresse = "1 rue Guy de Maup";
// console.log(newObj);

//--------------------------------------------
// Cours les différents constructeur d'objets :

// La fonction Constructeur :

function User(pseudo, ville) {
  this.pseudo = pseudo;
  this.ville = ville;

  this.getCity = function () {
    // console.log(this.pseudo + " habite à " + this.ville);
  };
}

const user1 = new User("Zaza", "Lyon");
const user2 = new User("Zaloo", "Nantes");
// console.log(user2.getCity());

// La factory functions :

function User3(plat, dessert) {
  return {
    plat,
    dessert,
  };
}

const user4 = User3("Molokhiya", "Banana Split");
// console.log(user4);

// Création des Class :
class Utilisateur {
  constructor(plat, dessert) {
    (this.plat = plat), (this.dessert = dessert);
  }
  // ici on peut mettre toutes les méthodes qu'on veut
}

// Les Prototypes :

const user5 = new Utilisateur("Pâte Carbonara", "Cake au Citron");
Utilisateur.prototype.sayPlat = function () {
  //   console.log("j'aime les " + this.plat);
};
Object.assign(Utilisateur.prototype, {
  method1() {},
  method2() {},
});

// console.log(user5);

//----------------------------------
// L'Héritage :

class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  saySome(text) {
    // console.log(this.name + "dit : " + text);
  }
}
class Dog extends Animal {
  run() {
    // console.log("Le chien court !");
  }
}

class Cat extends Animal {
  hunt() {
    // console.log("miaou");
  }
}
const chat1 = new Cat("Patate", 6);
// console.log(chat1);

const chien2 = new Dog("clabard", 8);
// console.log(chien2);
