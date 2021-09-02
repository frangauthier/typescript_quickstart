import { Commando, Member } from "../interfaces/iCommando";

const members: Member[] = [
    {
        name: 'John Doe',
        grade: 'officer',
        hireDate: new Date('2018-01-02'),
    },
    {
        name: 'Yan Howard',
        grade: 'sergent',
        hireDate: new Date('2015-03-04'),
    },
    {
        name: 'John Bravo',
        grade: 'captain',
        hireDate: new Date('2011-05-04'),
    }
];
export const alphaSquad: Commando = {
    codeName: 'alpha',
    members
} 

export async function logEachMember(commando: Commando) {
    commando.members.forEach((member, index) => {
        console.log(`Member #${index}: ${member.name}`)
    });
}