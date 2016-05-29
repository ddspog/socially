import {
    Meteor
} from 'meteor/meteor';
import {
    name as PartyAdd
} from '../partyAdd';
import {
    Parties
} from '../../../../api/parties';
import 'angular-mocks';

describe('PartyAdd', () => {
    // Initialize module
    beforeEach(() => {
        window.module(PartyAdd);
    });

    // Test inside controller
    describe('controller', () => {
        let controller;
        const party = {
            name: 'Foo',
            description: 'Birthday of Foo',
            public: true
        };
        const user = {
            _id: 'userId'
        }

        // Initialize controller
        beforeEach(() => {
            inject(($rootScope, $componentController) => {
                controller = $componentController(PartyAdd, {
                    $scope: $rootScope.$new(true)
                });
            });

            spyOn(Meteor, 'user').and.returnValue(user);
        });

        describe('reset()', () => {
            it('should clean up party object', () => {
                controller.party = party;
                controller.reset();

                expect(controller.party).toEqual({});
            });
        });

        describe('submit()', () => {
            // Monitors insert, reset on submit calls
            beforeEach(() => {
                spyOn(Parties, 'insert');
                spyOn(controller, 'reset').and.callThrough();

                controller.party = party;

                controller.submit();
            });

            it('should insert a new party', () => {
                expect(Parties.insert).toHaveBeenCalledWith({
                    name: party.name,
                    description: party.description,
                    public: party.public,
                    owner: user._id
                });
            });

            it('should call reset()', () => {
                expect(controller.reset).toHaveBeenCalled();
            });
        });
    });
});
