<!DOCTYPE html>
<html data-ng-app='app'>
<head>
    <title></title>
    <link rel="stylesheet" type="text/css" href="static/bootstrap3/css/bootstrap.css"/>
    <script src="static/scripts/jquery/jquery-1.9.1.min.js"></script>
    <script src="static/scripts/json/json2.js"></script>
    <script src="static/scripts/angular/angular.js"></script>
    <script src="static/scripts/angular/angular-resource.js"></script>
    <script src="static/scripts/angular/angular-route.js"></script>
    <script src="static/scripts/angular/angular-sanitize.js"></script>
    <script src="static/scripts/ui-bootstrap/ui-bootstrap-tpls-0.11.2.js"></script>
    <script src="static/scripts/modules/core-data.js"></script>
    <script src="static/scripts/modules/core-contract.js"></script>
	<script src="static/scripts/modules/core-messaging.js"></script>
    <script src="static/scripts/modules/mileage-vehicle.js"></script>
    <script src="static/scripts/modules/ui-helper.js"></script>
    <script src="static/scripts/modules/core-view.js"></script>
    <script src="static/scripts/modules/app.js"></script>

    <script src="static/scripts/global/constants.js"></script>

</head>

<body data-ng-controller="appController">

	<!-- Main menu area -->
	<!-- ************** -->
	
	<div role="navigation" class="navbar navbar-default navbar-static-top">
		<div class="container">
		  <div class="navbar-header">
		    <button data-target=".navbar-collapse" data-toggle="collapse" class="navbar-toggle collapsed" type="button">
		      <span class="sr-only">Toggle navigation</span>
		      <span class="icon-bar"></span>
		      <span class="icon-bar"></span>
		      <span class="icon-bar"></span>
		    </button>
		    <a href="#" class="navbar-brand">Acute IT Solutions</a>
		  </div>
		  <div class="navbar-collapse collapse">
		    <ul class="nav navbar-nav">
				<li data-ng-repeat="module in modules" ng-class="selectActiveNavBarItem(0, $index)">
					<a href="{{module.homeUrl}}">{{module.displayName}}</a>
				</li>
		      <li class="dropdown">
		        <a data-toggle="dropdown" class="dropdown-toggle" href="#">Dropdown <span class="caret"></span></a>
		        <ul role="menu" class="dropdown-menu">
		          <li><a href="#">Action</a></li>
		          <li><a href="#">Another action</a></li>
		          <li><a href="#">Something else here</a></li>
		          <li class="divider"></li>
		          <li class="dropdown-header">Nav header</li>
		          <li><a href="#">Separated link</a></li>
		          <li><a href="#">One more separated link</a></li>
		        </ul>
		      </li>
		      
		      <li class="dropdown">
		        <a data-toggle="dropdown" class="dropdown-toggle" href="#">Dropdown <span class="caret"></span></a>
		        <ul role="menu" class="dropdown-menu">
		          <li><a href="#">Action</a></li>
		          <li><a href="#">Another action</a></li>
		          <li><a href="#">Something else here</a></li>
		          <li class="divider"></li>
		          <li class="dropdown-header">Nav header</li>
		          <li><a href="#">Separated link</a></li>
		          <li><a href="#">One more separated link</a></li>
		        </ul>
		      </li>
		      
		      
		    </ul>
		    <ul class="nav navbar-nav navbar-right">
		      <li><a href="../navbar/">Default</a></li>
		      <li class="active"><a href="./">Static top</a></li>
		      <li><a href="../navbar-fixed-top/">Fixed top</a></li>
		    </ul>
		  </div><!--/.nav-collapse -->
		</div>
	</div>

	<!-- Sub menu area -->
	<!-- ************* -->
	
	<div class="container">
		<ul class="nav nav-pills">
			<li data-ng-repeat="view in activeModuleViews" ng-class="selectActiveNavPillItem(0, $index)">
				<a data-ng-href="{{view.homeUrl}}">{{view.displayName}}</a>
			</li>
		</ul>
	</div>

	<!-- Message notification area -->
	<!-- ************************* -->
	
	<div class="container">
 		<div class ="row-fluid" data-ng-controller="messagingController">
			<div class="span12" data-ng-show="true">
				<alert data-ng-repeat="message in messages" type="message.type" close="removeMessage($index)">{{message.text}}</alert>
			</div>
		</div>
	</div>
	
	<!-- Main content area -->
	<!-- ***************** -->
	
	<div class="container" data-ng-view></div>
	
</body>
</html>
