angular.module('app', [])
    .controller('ctrl', function ($scope, $interval) {
        $scope.champions = [];
        /*
        [
            {
                name: "Yasuo",
                timers: [
                    {
                        name: "Flash",
                        max: 5*60,
                        current: 5*60
                    }
                ]
            }
        ];
        */

        $scope.timers = [
            {
                name: "Heal",
                max: 4*60,
                current: 4*60,
                active: false
            },
            {
                name: "Flash",
                max: 5*60,
                current: 5*60,
                active: false
            },
            {
                name: "Ignite",
                max: 3.5*60,
                current: 3.5*60,
                active: false
            }
        ];

        var tick = function () {
            $scope.champions.forEach(function (champion) {
                champion.timers.forEach(function (timer) {
                    if (timer.active) {
                        timer.current--;
                    }
                });
            });
        };
        $interval(tick, 1000);

        $scope.reset = function (c, t) {
            var timer = $scope.champions[c].timers[t];
            timer.current = timer.max;
            timer.active = true;
        };

        $scope.addChampion = function (champion) {
            $scope.champions.push({
                name: champion,
                timers: []
            });
        };

        $scope.addTimer = function (c, timer) {
            var timers = $scope.champions[c].timers;
            if (timers.length < 2) {
                timers.push(angular.copy(timer));
            }
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