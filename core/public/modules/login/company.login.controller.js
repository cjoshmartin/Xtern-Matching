'use script';
angular.module('Xtern')
    .controller('CompanyLogin', ['$scope', '$state', 'AuthService', function ($scope, $state, AuthService) {

        var formConfig = function () {
            $('#companyLogin').form({
                fields: {
                    email: {
                        identifier: 'email',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Please enter your e-mail'
                            },
                            {
                                type: 'email',
                                prompt: 'Please enter a valid e-mail'
                            }
                        ]
                    },
                    dropdown: {
                        identifier: 'company-dropdown',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Please select a dropdown value'
                            }
                        ]
                    },
                    password: {
                        identifier: 'password',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Please enter a password'
                            },
                            {
                                type: 'minLength[6]',
                                prompt: 'Your password must be at least {ruleValue} characters'
                            }
                        ]
                    }
                },
                onSuccess: function (event, fields) {
                    if (event)
                        event.preventDefault();
                    authenticate(fields);
                    return false;
                },
                onFailure: function (formErrors, fields) {
                    return false;
                }
            });
        };
        formConfig();

        $scope.login = function () {
            //formConfig();
            $('#companyLogin').form('validate form');
        };
        var authenticate = function (fields) {
            $('#companyLogin .ui.button').addClass("disabled");
            AuthService.login(fields.email, fields.password, function (token, org, err) {
                if (err) {
                    $('#companyLogin .ui.error.message').html(
                        '<ui class="list"><li>Invalid Username or Password</li></ui>'
                    ).show();
                    $('#companyLogin .ui.button').removeClass("disabled");
                } else {
                    console.log('Login Success ' + org);
                    setToken(true, 'isCompany');
                    $scope.isCompany = true;
                    $('#companyLogin .ui.button').removeClass("disabled");
                    $state.go('company.dashboard');
                }
            });
        };

        $scope.$on('$viewContentLoaded', function (event, viewConfig) {
            $('select.dropdown').dropdown();
            formConfig();
        });
    }]);
