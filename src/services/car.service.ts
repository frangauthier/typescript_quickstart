import { client, francisContainer } from "./database/db.service";

// export function createCar(carInfo) {
//     container.items.create(city);
// }

export async function readCar(carId: string) {
    console.log('Reading car')
    const car = await francisContainer.item(carId);
    console.log('car: ', car.id);
    console.log('car.color: ', car.color);
    // await container.item(carId).read();

    // https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosdb/cosmos/samples/v3/typescript/src/ItemManagement.ts
    // const querySpec = {
    //     query: "SELECT * FROM Families f WHERE  f.lastName = @lastName",
    //     parameters: [
    //       {
    //         name: "@lastName",
    //         value: "Andersen"
    //       }
    //     ]
    //   };
    
    //   logStep("Query items in container '" + container.id + "'");
    //   const { resources: results } = await container.items.query(querySpec).fetchAll();
    
    //   if (results.length === 0) {
    //     throw "No items found matching";
    //   } else if (results.length > 1) {
    //     throw "More than 1 item found matching";
    //   }
    
    //   const person = results[0];
}