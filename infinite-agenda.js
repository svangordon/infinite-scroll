angular.module('app',[]);

angular.module('app')
	.controller('agendaController', ['$scope', '$window', '$document', '$interval','calendar',function($scope,$window,$document,$interval,calendar) {

		// $scope.dayClick = function(day) {
		// 	console.log('dayClick',day);
		// 	$scope.days.forEach(function(cur,i,arr) {cur.formOpen = false});
		// 	$scope.days.forEach(function(cur,i,arr) {if (cur.entryOpen) {cur.events.push($scope.entryForm); day.entryOpen = false; $scope.clearForm()}})
		// 	day.formOpen = true;
		// }

		function DayConstructor(lastDate) {
			this.date = new Date(2016, 0, lastDate);
			this.formOpen = false;
			this.entryOpen = false;
			this.events = [];
		}

		$scope.days = calendar.days;

		

	

		calendar.addDay();
		for (var i = $window.innerHeight / 100; i > 0 ; i-- ) {
			calendar.addDay();
		}
		//console.log(getDocHeight(), $window.innerHeight)
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
					calendar.addDay();
				};
			}
		},100);

		calendar.addDay();
		calendar.addEvent(new Date(0,0,0,12,00),"Wake up Quick at about noon",0);
		calendar.addEvent(new Date(0,0,0,12,30),"Just thought that I had to be in Compton soon",0);
		calendar.addDay();
		calendar.addEvent(new Date(0,0,0,4,20),"Gotta get drunk before the day begins",1);
		calendar.addEvent(new Date(0,0,0,13,30),"Before my mother starts bitchin about my friends",1);

	}]);

angular.module('app')
	.controller('dayController', ['$scope', 'calendar',function($scope, calendar) {
		$scope.dayClick = function(day) {
			if (day.formOpen === false) {
				console.log('able to edit')
				calendar.closeForms()
				//$scope.days.forEach(function(cur,i,arr) {if (cur.entryOpen) {cur.events.push($scope.entryForm); day.entryOpen = false; $scope.clearForm()}})
				day.formOpen = true;
			} else if (!$scope.entryForm.desc) {
				console.log($scope.entryForm.desc)
				calendar.closeForms();
				$scope.clearForm();
			}
			//console.log(calendar.ableToEdit())
		}

		$scope.saveButtonClick = function(day) {
			console.log($scope.entryForm.time , $scope.entryForm.desc , day.index)
			calendar.addEvent($scope.entryForm.time , $scope.entryForm.desc , day.index);
			calendar.closeForms();
			$scope.clearForm();
		}

		$scope.cancelButtonClick = function(day) {
			//console.log('formOpen',day.formOpen);
			$scope.clearForm();
			calendar.closeForms();
			//console.log('formOpen',day.formOpen);
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
			//console.log(day.events.length);
			$scope.deleteEntry(day,index);
			//console.log(day.events.length);
		}

		$scope.entryForm = {
			time : new Date(0, 0, 0, 12, 0),
			desc : ""
		}

	}])

angular.module('app')
	.factory('calendar', [ function(){
		var lastDate = 6;
		var days = [
			// {
			// 	index : 0,
			// 	date : new Date(2016, 0, 5),
			// 	formOpen: false,
			// 	entryOpen : false,
			// 	events : [
			// 		{
			// 			time : new Date(0, 0, 0, 12,0),
			// 			desc : "Wake up quick, at about noon"
			// 			, editing : false
			// 		},
			// 		{
			// 			time : new Date(0,0,0,13,0),
			// 			desc : "Gotta get to Compton soon"
			// 			, editing : false
			// 		}
			// 	]
			// },
			// {
			// 	index : 1,
			// 	date : new Date(2015,0,6),
			// 	formOpen: false,
			// 	entryOpen : false,
			// 	events : [
			// 		{
			// 			time : new Date(0, 0, 0, 12,30),
			// 			desc : "Get drunk before the day begins"
			// 			, editing : false
			// 		},
			// 		{
			// 			time : new Date(0,0,0,13,25),
			// 			desc : "Before your mother starts bitching about your friends"
			// 			, editing : false
			// 		},
			// 		{
			// 			time : new Date(0,0,0,18,30),
			// 			desc : "just as you thought -- fools keep steppin"
			// 			, editing : false
			// 		},
			// 		{
			// 			time : new Date(0,0,0,16,25),
			// 			desc : "Bail outside, point weapon"
			// 			, editing : false
			// 		},
					
			// 	]
			// }
		];


		function DayConstructor(lastDate) {
			this.date = new Date(2016, 0, lastDate);
			this.formOpen = false;
			this.entryOpen = false;
			this.events = [];
			this.index = days.length;
			this.closeForm = function() {
				this.formOpen = false;
			}
		}

		function EventConstructor(time,desc) {
			this.time = time;
			this.desc = desc;
			this.editing = false;
		}

		return {
			days : days,
			getDay : function(index) {return days[index]},
			addDay : function(){
				lastDate++;
				days.push(new DayConstructor(lastDate));
			},
			lastDate : lastDate,
			ableToEdit : function(arr) { //checks if day is currently open
				return days.reduce(function(prev,cur) { return !cur.formOpen && prev },true)
			},
			addEvent : function(time, desc, index) {
				days[index].events.push( 
					new EventConstructor(time,desc)
				)
			},
			closeForms : function() {
				days.forEach(function(cur,i,arr) {cur.formOpen = false});
			}
		};

	}])