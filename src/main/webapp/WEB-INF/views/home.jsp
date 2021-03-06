<!DOCTYPE html>
<html data-ng-app='main'>
<head>
    <title></title>
    
    <link rel="stylesheet" type="text/css" href="static/twitter-bootstrap/css/bootstrap.css"/>
    <link rel="stylesheet" type="text/css" href="static/app/common/dialog/dialog.css"/>
    <link rel="stylesheet" type="text/css" href="static/app/common/spinner/spinner.css"/>
    <script src="static/jquery/jquery-1.9.1.min.js"></script>
    <script src="static/angularJS/angular.js"></script>
    <script src="static/angularJS/angular-resource.js"></script>
    <script src="static/angularJS/angular-route.js"></script>
    <script src="static/angularJS/angular-animate.js"></script>
    <script src="static/twitter-bootstrap/js/bootstrap.js"></script>
    <!-- <script src="static/angular-strap/angular-strap.js"></script>
    <script src="static/angular-strap/angular-strap.tpl.js"></script> -->
    <script src="static/angular-ui-bootstrap/ui-bootstrap-tpls-0.11.2.js"></script>

    <script src="static/json/json2.js"></script>
    <script src="static/app/common/data/data.js"></script>
    <script src="static/app/common/dialog/dialog.js"></script>
    <script src="static/app/common/view/view.js"></script>
    <script src="static/app/common/spinner/spinner.js"></script>
	<script src="static/app/common/messaging/messaging.js"></script>
    <script src="static/app/common/alerting/alert.js"></script>
    <script src="static/app/contract/contract.js"></script>
    <script src="static/app/main/main.js"></script>

</head>

<body data-ng-controller="mainController">

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
	
	<!-- <div class="container">
		<ul class="nav nav-pills">
			<li data-ng-repeat="view in activeModuleViews" ng-class="selectActiveNavPillItem(0, $index)">
				<a data-ng-href="{{view.homeUrl}}">{{view.displayName}}</a>
			</li>
		</ul>
	</div> -->

	<!-- Message notification area -->
	<!-- ************************* -->
	
	<div class="container">
 		<div class ="row-fluid" data-ng-controller="AlertCtrl">
			<div class="span12" data-ng-show="true">
				<alert data-ng-repeat="alert in alerts" type="{{alert.type}}" close="closeAlert($index)">{{alert.msg}}</alert>
			</div>
		</div>
	</div>
	
	<!-- Main content area -->
	<!-- ***************** -->
	
	<div class="container" data-ng-view></div>
	
</body>
</html>
