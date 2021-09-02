export interface Member {
    name: string
    grade: 'officer' | 'sergent' | 'captain'
    hireDate: Date
    favoriteColor?: string
}

export interface Commando {
    members: Member[]
    codeName: string
}