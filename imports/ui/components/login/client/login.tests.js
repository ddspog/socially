import {
    name as Login
} from '../login';

import 'angular-mocks';

import {
    Meteor
} from 'meteor/meteor';

import {
    sinon
} from 'meteor/practicalmeteor:sinon';

describe('Login', function() {
    beforeEach(function(done) {
        window.module(Login);

        spies.restoreAll();
        done();
    });

    describe('controller', function() {
        let controller;

        beforeEach(function(done) {
            inject(function($rootScope, $componentController) {
                controller = $componentController(Login, {
                    $scope: $rootScope.$new(true)
                });
            });
            done();
        });

        it('should have credentials all empty by default', function(done) {
            expect(controller.credentials).to.be.deep.equal({
                email: '',
                password: ''
            });
            done();
        });

        it('should have error empty by default', function(done) {
            expect(controller.error).to.be.equal('');
            done();
        });

        describe('login()', function() {
            let validEmail = 'validEmail';
            let validPassword = 'validPassword';

            it('should call Meteor.loginWithPassword', function(done) {
                spies.create('login', Meteor, 'loginWithPassword');

                controller.credentials = {
                    email: validEmail,
                    password: validPassword
                };
                controller.login();

                expect(spies.login).to.be.calledWith(validEmail, validPassword);

                spies.login.restore();
                done();
            });
        });

        describe('loginGoogle()', function() {
            it('should call Meteor.loginWithGoogle', function(done) {
                spies.create('login', Meteor, 'loginWithGoogle');

                controller.loginGoogle();

                expect(spies.login).to.be.called;

                spies.login.restore();
                done();
            });
        });

        describe('loginFacebook()', function() {
            it('should call Meteor.loginWithFacebook', function(done) {
                spies.create('login', Meteor, 'loginWithFacebook');

                controller.loginFacebook();

                expect(spies.login).to.be.called;

                spies.login.restore();
                done();
            });
        });
    });
});