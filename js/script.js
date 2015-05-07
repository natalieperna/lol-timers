angular.module('app', [])
    .controller('ctrl', function ($scope, $interval) {
        $scope.timers = [
            {
                champion: "Yasuo",
                max: 10,
                current: 10,
                active: false
            },
            {
                champion: "Morgana",
                max: 5,
                current: 5,
                active: true
            }
        ];

        var tick = function () {
            $scope.timers.forEach(function (timer) {
                if (timer.active) {
                    timer.current--;
                }
            });
        };
        $interval(tick, 1000);

        $scope.start = function (i) {
            $scope.timers[i].active = true;
        };

        $scope.stop = function (i) {
            $scope.timers[i].active = false;
        };

        $scope.reset = function (i) {
            var timer = $scope.timers[i];
            timer.current = timer.max;
            timer.active = true;
        };
    })
    .filter('displayTimer', function () {
        return function (seconds) {
            var show = '';

            if (seconds < 0) {
                show += "-";
                seconds = -seconds;
            }

            var ss = seconds % 60;
            var mm = Math.floor(seconds / 60);

            if (mm < 10) show += '0';
            show += mm;
            show += ":";
            if (ss < 10) show += '0';
            show += ss;
            return show;
        }
    });