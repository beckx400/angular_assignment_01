/**
 * Created by Nick on 9/28/15.
 */
var app = angular.module('app',[]);
app.controller("IndexController",["$scope","$http",function($scope,$http){
    $scope.candidates = {};
    $scope.candidates.republicans = [];
    $scope.candidates.democrats = [];
    var cand = [];
    $scope.allCandidates = [];
    $scope.winner = "";
    $scope.loadCandidates = function(){
        //console.log("LOADING CANDADITOS");
        $http.get('/rep').then(function(res){
            //console.log("CALLING ALL REPS");
            console.log(res.data);
            $scope.candidates.republicans = res.data;

        });
        $http.get('/dem').then(function(res) {
            //console.log("CALLING ALL DEMS");
            console.log(res.data);
            $scope.candidates.democrats = res.data;
        });


    };
    $scope.vote = function(){
        //var votes =
        cand = $scope.candidates.republicans.concat($scope.candidates.democrats);
        $scope.allCandidates = cand;
        var numVotes = Math.round(Math.random()*(100000-10000)+10000);
        //var delay = 999;
        for (var i=0;i<numVotes;i++){
            //setTimeout(voteOnce,delay);
            voteOnce();

        }

        //$scope.winner = cand[randInd];
        //console.log("votes: "+$scope.votes);
        //voteTimer = setTimeout(voteOnce,delay);
        //setTimeout(clearTimeout)
        //$scope.$apply();
        $scope.winner = findWinner();
    };

    $scope.getVotes = function(index){
        console.log(index + 'getVotes hit', $scope.votes[index]);
        return $scope.votes[index];
    };

    function voteOnce(){
        //console.log(cand.length);
        var randAffil  = Math.round(Math.random());
        if(randAffil){
            var randInd = Math.floor(Math.random()*$scope.candidates.republicans.length);
            $scope.candidates.republicans[randInd].votes++;
        } else{
            var randInd = Math.floor(Math.random()*$scope.candidates.democrats.length);
            $scope.candidates.democrats[randInd].votes++;

        }

        //$scope.candidates[affiliation].votes[randInd]++;
        //console.log($scope.votes);
        //console.log("rand int: "+randInd);
        //console.log($scope.candidates.republicans);
        //console.log($scope.candidates.democrats);
        //$scope.$apply();
    }

    function findWinner(){
        console.log($scope.allCandidates);
        var highestVotes = 0;
        var winning = {};
        for (var candidate in $scope.allCandidates){
            var myCand = $scope.allCandidates[candidate];
            if (myCand.votes > highestVotes) {
                winning = myCand;
                highestVotes = myCand.votes;
            }
        }
        //console.log($scope.allCandidates);
        console.log(winning);
        return winning.name;
    }

}]);