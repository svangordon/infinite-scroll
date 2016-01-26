angular.module('app',[]);

angular.module('app')
	.controller('agendaController', ['$scope', '$window', '$document', '$interval',function($scope,$window,$document,$interval) {
		
		$scope.cancelBubble = function (e) {
 			var evt = e ? e:window.event;
 			if (evt.stopPropagation)    evt.stopPropagation();
 			if (evt.cancelBubble!=null) evt.cancelBubble = true;
		}

		$scope.dayClick = function(day) {
			console.log('dayClick');
			$scope.days.forEach(function(cur,i,arr) {cur.formOpen = false});
			$scope.days.forEach(function(cur,i,arr) {if (cur.entryOpen) {cur.events.push($scope.entryForm); day.entryOpen = false; $scope.clearForm()}})
			day.formOpen = true;
		}

		$scope.saveForm = function(day) {
			if ($scope.entryForm.desc) {
				day.events.push( $scope.entryForm );
			}
			day.formOpen = false;
			$scope.clearForm(day);
			//$scope.clearForm(day);
		}

		$scope.clearForm = function(day) {
	
			$scope.entryForm = {
				time : new Date(0, 0, 0, 12, 0),
				desc : ""
			}
			if(arguments.length!==0) {
				day.formOpen = false;
			}
		}

		$scope.deleteEntry = function(day,index) {
			day.events.splice(index,1);
		}

		$scope.editEntry = function(day,event,index) {
			$scope.clearForm();
			day.entryOpen = true;
			//event.editing = true;
			$scope.entryForm.time = event.time;
			$scope.entryForm.desc = event.desc;
			console.log(day.events.length);
			$scope.deleteEntry(day,index);
			console.log(day.events.length);
		}

		$scope.lastDate = 6;

		function DayConstructor(lastDate) {
			this.date = new Date(2016, 0, lastDate);
			this.formOpen = false;
			this.entryOpen = false;
			this.events = [];
		}

		$scope.days = [
			{
				date : new Date(2016, 0, 5),
				formOpen: false,
				entryOpen : false,
				events : [
					{
						time : new Date(0, 0, 0, 12,0),
						desc : "Wake up quick, at about noon"
						, editing : false
					},
					{
						time : new Date(0,0,0,13,0),
						desc : "Gotta get to Compton soon"
						, editing : false
					}
				]
			},
			{
				date : new Date(2015,0,6),
				formOpen: false,
				entryOpen : false,
				events : [
					{
						time : new Date(0, 0, 0, 12,30),
						desc : "Get drunk before the day begins"
						, editing : false
					},
					{
						time : new Date(0,0,0,13,25),
						desc : "Before your mother starts bitching about your friends"
						, editing : false
					},
					{
						time : new Date(0,0,0,18,30),
						desc : "just as you thought -- fools keep steppin"
						, editing : false
					},
					{
						time : new Date(0,0,0,16,25),
						desc : "Bail outside, point weapon"
						, editing : false
					},
					
				]
			}
		];
		$scope.entryForm = {
			time : new Date(0, 0, 0, 12, 0),
			desc : ""
		}
		//console.log($window.pageYOffset);
		$scope.addDay = function(){
			$scope.lastDate++;
			$scope.days.push(new DayConstructor($scope.lastDate));
			console.log('fired')
		};
		$scope.addDay();
		for (var i = $window.innerHeight / 100; i > 0 ; i-- ) {
			$scope.addDay();
		}
		console.log(getDocHeight(), $window.innerHeight)
		// while($window.innerHeight > getDocHeight() ) {
		// 	$scope.addDay();
		// 	console.log('!!!')
		// }
		//$document.ready(console.log($document.prop('documentElement').clientHeight))
		

		function getDocHeight() {
    			return Math.max(
        			$document.prop('body').scrollHeight, $document.prop('documentElement').scrollHeight,
        			$document.prop('body').offsetHeight, $document.prop('documentElement').offsetHeight,
        			$document.prop('body').clientHeight, $document.prop('documentElement').clientHeight
    			);
			}
		
		var addRows = $interval(function(){
			if (getDocHeight() === this.pageYOffset + this.innerHeight) {
				for (var i = 0; i < 7; i++) {
					$scope.addDay();
				};
			}
		},100);

	}]);

