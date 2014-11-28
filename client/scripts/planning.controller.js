app.controller('planningCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.weekDays = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'];


    var schemaData = [
        {
            title: 'default',
            id: '1'
        },
        {
            title: 'custom 0',
            id: '2'

        },
        {
            title: 'custom 1',
            id: '3'
        }
    ];

    function Schema(schema) {
        _.extend(this, schema, {
            go: function () {
                console.log('go')
                $location.path('schema/' + this.id);
            }
        })
    }

    $scope.schemas = _.map(schemaData, function (schema) {
        return new Schema(schema)
    });

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
