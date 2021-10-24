import { addDoc, collection, deleteDoc, doc, getDoc, setDoc, where, query, getDocs, DocumentData } from "@firebase/firestore"
import { db } from "../database/firestore"
const carCollection = collection(db, 'cars')

export async function createCar(carInfo) {
    carInfo.inRental = false;
    const result = await addDoc(carCollection, carInfo)
}

export async function upsertCar(carInfo, carId?: string) {
    const randomId = Math.floor(Math.random() * 100000).toString()
    console.log('randomId: ', randomId);
    carId = carId || randomId
    const carRef = await doc(db, 'cars', carId)
    await setDoc(carRef, carInfo)
    return carId;
}

export async function updateCar(carInfo, carId: string): Promise<string> {
    // console.log('sadas')
    const carRef = await doc(db, 'cars', carId)
    console.log('carRef: ', carRef);
    await setDoc(carRef, carInfo, { merge: true })
    return carId;
}

export async function readCarById(carId: string) {
    const carRef = await doc(db, 'cars', carId);
    const carDocument = await getDoc(carRef);
    if(carDocument.exists()) {
        return carDocument.data()
    } 
    return null;
}

export async function getAllCars() {
    const carQuery = query(carCollection);
    const carDocs = await getDocs(carQuery);
    if (carDocs) {
        let cars: DocumentData[] = [];
        carDocs.forEach((car) => {
            cars.push({carId: car.ref.id, ...car.data()})
        })
        return cars;
    } else return [];
}

export async function deleteCar(carId: string) {
    const carRef = await doc(db, 'cars', carId);
    await deleteDoc(carRef);
    return carId;
}