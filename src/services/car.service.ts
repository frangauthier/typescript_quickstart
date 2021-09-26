import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from "@firebase/firestore"
import { db } from "../database/firestore"
const carCollection = collection(db, 'cars')

export async function createCar(carInfo) {
    const result = await addDoc(carCollection, carInfo)
    console.log('result: ', result);
}

export async function upsertCar(carInfo, carId?: string) {
    const randomId = Math.floor(Math.random() * 100000).toString()
    carId = carId || randomId
    const carRef = await doc(db, 'cars', carId)
    await setDoc(carRef, carInfo)
    return carId;
}

export async function updateDoc(carInfo, carId: string): Promise<string> {
    const carRef = await doc(db, 'cars', carId)
    await setDoc(carRef, carInfo, { merge: true })
    return carId;
}

export async function readCarById(carId: string) {
    console.log('Reading car')
    const carRef = await doc(db, 'cars', carId);
    const carDocument = await getDoc(carRef);
    if(carDocument.exists()) {
        return carDocument.data()
    } 
    return null;
}

export async function deleteCar(carId: string) {
    const carRef = await doc(db, 'cars', carId);
    await deleteDoc(carRef);
    return carId;
}