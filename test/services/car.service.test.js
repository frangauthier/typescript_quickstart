const expect = require('chai').expect;
const sinon = require('sinon');
const firestore = require('@firebase/firestore')
const carService = require('../../dist/services/car.service')
const db = require('../../dist/database/firestore').db

describe('with mock: doc, setDoc', () => {
    it('should upsert a car', async() => {

        let firestoretMock = sinon.mock(firestore);

        firestoretMock.expects("doc")
            .once()
            // .withArgs(db, 'cars')
            // .yields(null, null, JSON.stringify(myPhotos));

        firestoretMock.expects("setDoc")
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