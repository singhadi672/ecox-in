import faker from "faker";
import { v4 as uuidv4 } from "uuid";

export const category = [
  {
    categoryName: "All Products",
    image:
      "https://sm.mashable.com/t/mashable_in/news/h/here-are-a/here-are-all-the-products-amazon-announced-at-its-hardware-e_eyz9.960.png",
    applink: "/products",
  },
  {
    categoryName: "Tents",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeInX0AwaYVfajSRrKtJNr37s5y7qsWX4kRg&usqp=CAU",
    applink: "/products?category=tent",
  },
  {
    categoryName: "Shoes",
    image:
      "http://atlas-content-cdn.pixelsquid.com/stock-images/hiking-boots-rAG7wxE-600.jpg",
    applink: "/products?category=shoes",
  },
  {
    categoryName: "Ropes",
    image:
      "https://www.kindpng.com/picc/m/245-2453652_climbing-rope-png-climb-rope-png-transparent-png.png",
    applink: "/products?category=ropes",
  },
  {
    categoryName: "Bags",
    image:
      "https://3.imimg.com/data3/MN/TP/MY-4556014/trekking-bag-500x500.jpeg",
    applink: "/products?category=bags",
  },
  {
    categoryName: "Jackets",
    image:
      "https://i.pinimg.com/originals/65/b0/d1/65b0d1415be93b4da925a2fa5967fb46.png",
    applink: "/products?category=jackets",
  },
  {
    categoryName: "Gloves",
    image:
      "https://i.pinimg.com/originals/90/3d/9d/903d9df97b3adcc1d45a6ca0a16651b2.png",
    applink: "/products?category=gloves",
  },
];

export const carouselImages = [
  "https://rukminim1.flixcart.com/flap/3376/560/image/a248342a1ae24ada.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/3376/560/image/2b681ab47772ad6c.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/3376/560/image/0f483a151f2014a8.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/3376/560/image/6e2c178107bdf74b.jpg?q=50",
];

export const spotlightData = [
  {
    id: uuidv4(),
    image: faker.image.people(),
    personName: faker.name.firstName(),
    offerURL:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Xiaomi/Family/Mi_FAN_Festival/D22243583_WLD_Xiaomi_MiFanFestival_Mobile_Hero_1242x450._CB656404157_SY500_.jpg",
  },
  {
    id: uuidv4(),
    image: faker.image.city(),
    personName: faker.name.firstName(),
    offerURL:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img20/CEPC/Tablets/TabS7_AprilOffer.jpg",
  },
  {
    id: uuidv4(),
    image: faker.image.nightlife(),
    personName: faker.name.firstName(),
    offerURL:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Audio/Boat/511v2/R01_Airdopes511_Gw_670x645.jpg",
  },
  {
    id: uuidv4(),
    image: faker.image.business(),
    personName: faker.name.firstName(),
    offerURL:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img21/OP/Co-op/Navneet/HQ--banner-670X645.gif",
  },
  {
    id: uuidv4(),
    image: faker.image.city(),
    personName: faker.name.firstName(),
    offerURL:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/WLA/Feb/FPF/WL_FPF_PC_Hor_1.jpg",
  },
  {
    id: uuidv4(),
    image: faker.image.nightlife(),
    personName: faker.name.firstName(),
    offerURL:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img20/CEPC/Wearables/Amazfit/Bip_U_Pro/Ingress/Date/AMAZFIT_Bip_U_670x645.jpg",
  },
  {
    id: uuidv4(),
    image: faker.image.business(),
    personName: faker.name.firstName(),
    offerURL:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Laptops/February/D20687461_IN_PC_Laptops-Laptop-days--Apple-February_vday_670x645.jpg",
  },
  {
    id: uuidv4(),
    image: faker.image.city(),
    personName: faker.name.firstName(),
    offerURL:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Cameras/Qubo/Doorbell/670x645_Knock_knock.jpg",
  },
  {
    id: uuidv4(),
    image: faker.image.business(),
    personName: faker.name.firstName(),
    offerURL:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img20/CEPC/Wearables/OnePlus/Watch/Ingress/Price/onepluse_smarteverywere_670x645.jpg",
  },
  {
    id: uuidv4(),
    image: faker.image.people(),
    personName: faker.name.firstName(),
    offerURL:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img20/PC/Networking/Category/Tp_Link_670x645.jpg",
  },
  {
    id: uuidv4(),
    image: faker.image.city(),
    personName: faker.name.firstName(),
    offerURL:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Laptops/Microsoft/Surface-Pro-7-670x645.jpg",
  },
  {
    id: uuidv4(),
    image: faker.image.nightlife(),
    personName: faker.name.firstName(),
    offerURL:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img20/TVs/Redmi/saleHDFC/staytuned/670x645.jpg",
  },
  {
    id: uuidv4(),
    image: faker.image.business(),
    personName: faker.name.firstName(),
    offerURL:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img20/CEPC/Wearables/OnePlus/Watch/Ingress/Price/onepluse_smarteverywere_670x645.jpg",
  },
  {
    id: uuidv4(),
    image: faker.image.people(),
    personName: faker.name.firstName(),
    offerURL:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img20/PC/Networking/Category/Tp_Link_670x645.jpg",
  },
  {
    id: uuidv4(),
    image: faker.image.city(),
    personName: faker.name.firstName(),
    offerURL:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img21/Laptops/Microsoft/Surface-Pro-7-670x645.jpg",
  },
  {
    id: uuidv4(),
    image: faker.image.nightlife(),
    personName: faker.name.firstName(),
    offerURL:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img20/TVs/Redmi/saleHDFC/staytuned/670x645.jpg",
  },
];
