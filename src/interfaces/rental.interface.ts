export interface iCar {
    color: string
    model: string
    year: number
    inRental: boolean
}

export type iRental = {
    carId: string
    startTime: Date
    endTime: Date
} 