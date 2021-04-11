import { createServer, Model, RestSerializer } from "miragejs";
import faker from "faker";

export default function createMockServer() {
  createServer({
    serializers: {
      application: RestSerializer,
    },

    models: {
      products: Model,
    },
    routes() {
      this.namespace = "api";
      this.timing = 3000;
      this.resource("products");
    },
    seeds(server) {
      [...Array(60)].forEach((_) => {
        server.create("product", {
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          description: faker.lorem.sentences(),
          image: faker.random.image(),
          price: faker.commerce.price(),
          material: faker.commerce.productMaterial(),
          brand: faker.lorem.word(),
          inStock: faker.datatype.boolean(),
          quantity: 0,
          fastDelivery: faker.datatype.boolean(),
          ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
          offer: faker.random.arrayElement(["Save 50", "70% bonanza", "Prime"]),
          productCategory: faker.random.arrayElement([
            "tent",
            "bags",
            "shoes",
            "ropes",
            "jackets",
            "gloves",
          ]),
          color: faker.commerce.color(),
        });
      });
    },
  });
}
