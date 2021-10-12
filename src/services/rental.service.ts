import { addDoc, collection, deleteDoc, doc, getDoc, setDoc, getDocs, query, DocumentData } from "@firebase/firestore"
import { db } from "../database/firestore"
import { readCarById, updateCar } from "./car.service";
const rentalCollection = collection(db, 'rentals')

export async function createRental(rentalInfo) {
    const result = await addDoc(rentalCollection, rentalInfo)
    console.log('result: ', result);
}

export async function upsertRental(rentalInfo, rentalId?: string) {
    const randomId = Math.floor(Math.random() * 100000).toString()
    rentalId = rentalId || randomId

    const carRef = await readCarById(rentalInfo.carId)
    if(!carRef) {
        throw new Error(`Could not find car with id ${rentalInfo.carId}`)
    }
    if(carRef.inRental) {
        throw new Error('Car is unavailable');
    }

    const rentalRef = await doc(db, 'rentals', rentalId)
    await setDoc(rentalRef, rentalInfo)
    await updateCar({ inRental: true}, rentalInfo.carId)
    return rentalId;
}

export async function updateRental(rentalInfo, rentalId: string): Promise<string> {
    const rentalRef = await doc(db, 'rentals', rentalId)
    await setDoc(rentalRef, rentalInfo, { merge: true })
    return rentalId;
}

export async function readRentalById(rentalId: string) {
    const rentalRef = await doc(db, 'rentals', rentalId);
    const rentalDocument = await getDoc(rentalRef);
    if(rentalDocument.exists()) {
        return rentalDocument.data
    } 
    return null;
}

export async function getAllRentals() {
    const rentalQuery = query(rentalCollection);
    const rentalDocs = await getDocs(rentalQuery);
    if (rentalDocs) {
        let rentals: DocumentData[] = [];
        rentalDocs.forEach((rental) => {
            rentals.push({rentalId: rental.ref.id, ...rental.data()})
        })
        return rentals;
    } else return [];
}


export async function deleteRental(rentalId: string) {
    const rentalRef = await doc(db, 'rentals', rentalId);
    await deleteDoc(rentalRef);
    return rentalId;
}