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
                //event.preventDefault();
                authenticate(fields);
            },
            onFailure: function (formErrors, fields) {
                return '';
            }
        });
    };
    formConfig();

    $scope.login = function () {
        //formConfig();
        $('#companyLogin').form('validate form');
    };
    var authenticate = function (fields) {
        console.log(fields);
        var tempFields = {
            email: "xniccum@gmail.com",
            password: "admin1"
        };
        AuthService.login(tempFields.email, tempFields.password, function (token, err) {
            if (err) {
                console.log('Login unsuccessful');
                $('#companyLogin .ui.error.message').html(
                    '<ui class="list"><li>Invalid Username or Passord</li></ui>'
                );
            } else {
                //setToken(token, "auth");
                setToken("ININ", "company");
                AuthService.renderTokens(function (token, err) {
                    if (err) {
                        console.log('Render Token unsuccessful', err);
                        $('#companyLogin .ui.error.message').html(
                            '<ui class="list"><li>A server error occured</li></ui>'
                        ).show();
                    } else {
                        $scope.isCompany = true;
                        $state.go('company.dashboard');
                    }
                });
            }
        });
    };

    $scope.$on('$viewContentLoaded', function (event, viewConfig) {
        $('select.dropdown').dropdown();
        formConfig();
    });
}]);