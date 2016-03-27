  <div class="container-fluid" ng-controller="BaskedController" >
        <div class="row">

          <div class="col-md-2 atm atm_left">
              <a href="" ng-click="getofi()"><img src="img/bullhorn.svg">
                <p>ПОЗВАТЬ ОФИЦИАНТА</p>
              </a>
          </div>

          <div class="col-md-8 atm">
			         <img class="logo" ng-src="http://localhost/tpl/img/logo.png">
          </div>

          <div class="col-md-2 atm atm_right" >
            <a id="btn_basket_right" href="" ng-click="getCart()"><ngcart-summary></ngcart-summary>  </a>
          </div>

        </div>
    </div>
    <nav ng-controller="GetNavCtrl">
      <div class="container-fluid">
          <div class="row">
            <div class="frame">
              <ul class="nav navbar-nav slide">
                <li ng-repeat="n in getdata" ><a class="hvr-s" href="#/category/{{n.id}}"><img ng-src="{{n.icon}}"> <p>{{n.title}}</p></a></li>
              </ul>
            </div>
          </div>
      </div>
    </nav>


<script type="text/ng-template" id="template/ngCart/summary.html">
  <span class="badge"> {{ngCart.getTotalItems()}} </span><img src="img/basket.svg">
    <p>ВАШ ЗАКАЗ:</p><b><ng-pluralize count="ngCart.getTotalItems()"></ng-pluralize>
    {{ngCart.totalCost()}} <sup>тг.</sup></b>
</script>
