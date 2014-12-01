app.controller('planningCtrl', ['$scope', '$location', 'allSchemas', function ($scope, $location, allSchemas) {
    $scope.weekDays = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'];

    function Schema(schema) {
        _.extend(this, schema, {
            go: function () {
                $location.path('schema/' + this._id);
            }
        })
    }

    $scope.schemas = _.map(allSchemas.data, function (schema) {
        return new Schema(schema)
    });

    $scope.newSchema = function () {
        $location.path('schema');
    };

    $scope.plannings = {
        list: [
            {
                title: 'weekdays',
                date: {
                    type: 'select',
                    from: 'Monday',
                    to: 'Friday'
                },
                schema: '',
                required: true
            },
            {
                title: 'weekend',
                date: {
                    type: 'select',
                    from: 'Saturday',
                    to: 'Sunday'
                },
                schema: '',
                required: true
            }
        ],
        add: function () {
            this.list.push({
                title: 'custom date ' + (this.list.length - 1),
                date: {
                    type: 'date',
                    from: '',
                    to: ''
                },
                schema: '',
                edit: true
            })
        },
        save: function () {
            _.each(this.list, function (planning) {
                delete planning.edit
            })
        },
        remove: function (index) {
            if (!this.list[index].required) {
                this.list.splice(index, 1);
            }
        }
    }
}]);
