import { Car, iCar } from "../interfaces/iCar";
import { cars, db } from "../database/firebase";
import { deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
// export function createCar(carInfo) {
//     container.items.create(city);
// }

export async function readCarById(carId: string) {
    
    const docRef = doc(db, 'cars', carId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", JSON.stringify(docSnap.data()));
        console.log('docSnap.data(): ', docSnap.data());
        return docSnap.data();
      } else {
        console.log("No such document!");
        return null;
      }
}

export async function readCars() {
    const querySnapshot = await getDocs(cars);
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    })
}

export async function searchCar(query) {
    const queryCar = query(cars, where("color", "==", query.color));

    const querySnapshot = await getDocs(queryCar);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    });
}

export async function createCar(car: Car) {
    const id = Math.floor(Math.random() * 100000).toString()
    await setDoc(doc(cars, id), car);
    return id;
}

export async function updateCar(carId: string, car: Car) {
    const res = await setDoc(doc(cars, carId), car, {merge: true});
    return car;
}

export async function deleteCar(carId: string) {
    const result = await deleteDoc(doc(cars,carId))
    console.log('result: ', result);
    return result;
}