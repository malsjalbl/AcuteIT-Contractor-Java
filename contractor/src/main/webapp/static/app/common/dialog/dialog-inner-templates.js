<script type="text/ng-template" id="static/app/common/dialog/dialog-confirm.html">
	<div class="modal-header dialog-header-confirm">
	    <h4 class="modal-title">{{title}}Template</h4>
	</div>
	<div class="modal-body">
	    <p>{{content}}</p>
	</div>
	<div class="modal-footer">
	    <button class="btn btn-warning" ng-click="close()">OK</button>
	    <button class="btn btn-primary" ng-click="cancel()">Cancel</button>
	</div>
 </script>
 
 <script type="text/ng-template" id="static/app/common/dialog/dialog-error.html">
	<div class="modal-header dialog-header-error">
	    <h4 class="modal-title">{{title}}Template</h4>
		</div>
		<div class="modal-body">
		    <p>{{content}}</p>
		</div>
		<div class="modal-footer">
		    <button class="btn btn-danger" ng-click="close()">OK</button>
	</div>
 </script>