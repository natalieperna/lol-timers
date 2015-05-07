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
                name: "Barrier",
                max: 210
            },
            {
                name: "Clairvoyance",
                max: 60
            },
            {
                name: "Clarity",
                max: 180
            },
            {
                name: "Cleanse",
                max: 210
            },
            {
                name: "Exhaust",
                max: 210
            },
            {
                name: "Flash",
                max: 300
            },
            {
                name: "Garrison",
                max: 210
            },
            {
                name: "Ghost",
                max: 210
            },
            {
                name: "Heal",
                max: 240
            },
            {
                name: "Ignite",
                max: 210
            },
            {
                name: "Mark",
                max: 20
            },
            {
                name: "Dash",
                max: 20
            },
            {
                name: "Smite",
                max: 60
            },
            {
                name: "Teleport",
                max: 300
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

        $scope.deleteChampion = function (c) {
            $scope.champions.splice(c, 1);
        };

        $scope.addTimer = function (c, timer) {
            var add = angular.copy(timer);
            add.current = add.max;
            add.active = false;
            var timers = $scope.champions[c].timers;
            if (timers.length < 2) {
                timers.push(add);
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