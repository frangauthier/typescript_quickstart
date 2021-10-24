import { DocumentReference } from "../../node_modules/@firebase/firestore/dist";

const expect = require('chai').expect;
const sinon = require('sinon');
const firestore = require('@firebase/firestore')
const carService = require('../../src/services/car.service')
const db = require('../../src/database/firestore').db

describe('with mock: doc, setDoc', () => {
    it('should update a car', async() => {

        let firestoreMock = sinon.mock(firestore);

        firestoreMock.expects("doc")
            .once()
            // .withArgs(db, 'cars', '1050')
            // .yields(new DocumentReference());

        firestoreMock.expects("setDoc")
            .once()


        const carId = await carService.updateCar({
            color: 'blue',
        }, '1050')
        console.log('carId: ', carId);

        expect(carId).to.equal('1050');
        // expect(parseInt(carId)).to.be.below(100000);
        // expect(parseInt(carId)).to.be.above(0);


        // carService.updateCar({
        //     color: 'blue',
        // }, '1050').then(result => {
        //     expect(result).to.equal('1050');
        //     // done();
        // })

        // done();
        // .then((photos) => {
        //     expect(photos.length).to.equal(3);
        //     photos.forEach((photo) => {
        //         expect(photo).to.have.property('id');
        //         expect(photo).to.have.property('title');
        //         expect(photo).to.have.property('url');
        //     });

        //     requestMock.verify();
        //     requestMock.restore();
        //     done();
        // });
    });
});