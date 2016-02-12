<?php
require 'vendor/autoload.php';
require 'plugins/NotORM.php';
require 'config/dbconnect.php';
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Dflydev\FigCookies\Cookie;
use Dflydev\FigCookies\FigRequestCookies;
use Dflydev\FigCookies\SetCookie;

$app = new \Slim\App;

$app->get('/', function ($request, $response) {
    $app = $response -> withStatus (200)
					 -> withHeader('Content-Type','application/json')
					 -> withHeader('Access-Control-Allow-Origin','*');

	echo json_encode($result, JSON_UNESCAPED_UNICODE);
	return $app;
});


// Серверная часть: Client RESTfull API
// Дата: 02.02.2016
//

// Авторизация для приложения (столика)
$app->get('/auht', function($request, $response) use( $db){

	$code = $request->getParam('pin');
	$secret = $request->getParam('token');
	$reqdb = $db->app_auht()->where('pin', $code);
	$data = $reqdb->fetch();
	
	$token = $secret == $data['token'];

	if ($token && $data) {
		
	$result = array();
	
		$app = $response -> withStatus (200)
						 -> withHeader('Content-Type','application/json')
						 -> withHeader('Access-Control-Allow-Origin','*');

	   foreach ($db->app_user() as $login) {
		  $uid = $login['uid'];
		   
        $result[]  = array(
            'uid' => $login['uid'],
            'name' => $login['name']
        );
    };

	}else{

		return $app = $response -> withStatus (400)
								-> withHeader('Access-Control-Allow-Origin','*');

	}

	echo json_encode($result, JSON_UNESCAPED_UNICODE);
	return $app;

});


// Сессия
$app->get('/session', function($request, $response) use ($db) {

	$uid = $request->getParam('uid');
	$array1 = array("status" => "1",);
	$array0 = array("status" => "0",);

	$reqdb = $db->app_user()->where(uid, $uid)->update($array1);
	
		if ($reqdb) {
			
		$app = $response -> withStatus (200)
						 -> withHeader('Content-Type','application/json');
						 
	}else{
		return $app = $response -> withStatus (400);
	}
	
		$callback = $request->getParam('callback');
	if ($callback) {
		echo $_GET['callback'] . '('.json_encode($api, JSON_UNESCAPED_UNICODE).')';
	}else{
		echo json_encode($api, JSON_UNESCAPED_UNICODE);
	}
	return $json= $response->withHeader('Content-Type','application/json');

});




// Показать спец. предложения
$app->get('/offer', function($request, $response) use( $db){


    $api = array();
    foreach ($db->app_offer() as $data) {
		foreach ($db->app_category()->where('id', $data['category']) as $datacat) {
        $api[]  = array(
            'id' => $data['id'],
            'name' => $data['name'],
			'image' => $data['image'],
			'catid' => $data['category'],
            'category' => $datacat['title'],
			'text' => $data['text'],
            'price' => $data['price'],
            'old_price' => $data['old_price']
        );
    }};

		$callback = $request->getParam('callback');

	if ($callback) {
		echo $_GET['callback'] . '('.json_encode($api, JSON_UNESCAPED_UNICODE).')';
	}else{
		echo json_encode($api, JSON_UNESCAPED_UNICODE);
	}

	return $json= $response->withHeader('Content-Type','application/json');

});


// Показать все категории
$app->get('/category', function($request, $response) use( $db){

    $api = array();
    foreach ($db->app_category() as $data) {
        $api[]  = array(
            'id' => $data['id'],
            'title' => $data['title'],
            'icon' => $data['icon']
        );
    }
		$callback = $request->getParam('callback');

	if ($callback) {
		echo $_GET['callback'] . '('.json_encode($api, JSON_UNESCAPED_UNICODE).')';
	}else{
		echo json_encode($api, JSON_UNESCAPED_UNICODE);
	}

	return $json= $response->withHeader('Content-Type','application/json');

});


// Показать все блюда категории
$app->get('/category/{id}', function($request, $response, $args) use( $db){

	$reqdb = $db->app_articles()->where('category_id', $args[id]);

	if ($reqdb->fetch()) {

		foreach ($db->app_category()->where('id', $args[id]) as $datacat) {
		$api = array();

			foreach ($db->app_articles()->where('category_id', $args[id]) as $data) {
			$api[]  = array(
				'id' => $data['id'],
				'category_id' => $data['category_id'],
				'category' => $datacat['title'],
				'name' => $data['name'],
				'times' => $data['times'],
				'callories' => $data['callories'],
				'likes' => $data['likes'],
				'ingredient' => $data['ingredient'],
				'price' => $data['price'],
				'old_price' => $data['old_price'],
				'id_comb' => $data['id_comb']

			);}
		}
	} else {
		return $json = $response -> withStatus (200);
	}

		$callback = $request->getParam('callback');

	if ($callback) {
		echo $_GET['callback'] . '('.json_encode($api, JSON_UNESCAPED_UNICODE).')';
	}else{
		echo json_encode($api, JSON_UNESCAPED_UNICODE);
	}
	return $json= $response->withHeader('Content-Type','application/json');
});


// Показать одно блюдо
$app->get('/article/{id}', function($request, $response, $args) use ($db) {

 $reqdb = $db->app_articles()->where('id', $args[id]);
	$api = array();
    if($data = $reqdb->fetch()){
        $api[]  = array(
            'id' => $data['id'],
            'category_id' => $data['category_id'],
            'name' => $data['name'],
            'times' => $data['times'],
			'callories' => $data['callories'],
            'likes' => $data['likes'],
            'ingredient' => $data['ingredient'],
			'price' => $data['price'],
			'old_price' => $data['old_price'],
            'id_comb' => $data['id_comb']
        );
    }
    else{
        $api[]  = array(
            'status' => "error",
            'message' => "Ошибка! Такого блюда не сущуствует..."
        );
    }

		$callback = $request->getParam('callback');

	if ($callback) {
		echo $_GET['callback'] . '('.json_encode($api, JSON_UNESCAPED_UNICODE).')';
	}else{
		echo json_encode($api, JSON_UNESCAPED_UNICODE);
	}

	return $json= $response->withHeader('Content-Type','application/json');

});



// Серверная часть: Admin RESTfull API
// Дата: 02.02.2016
//

// Добавить блюдо
$app->post('/articles/add', function(ServerRequestInterface $request, ResponseInterface $response ) use($db){

	$api = $request->getParsedBody();
    $result = $db->app_articles->insert($api);
    echo 'Блюдо успешно добавлено!';

});

// Добавить категорию
$app->post('/category/add', function(ServerRequestInterface $request, ResponseInterface $response ) use($db){

	$api = $request->getParsedBody();
    $result = $db->app_category->insert($api);
    echo 'Категория успешно добавлена!';

});

// Добавить столик
$app->post('/auht/add', function(ServerRequestInterface $request, ResponseInterface $response ) use($db){

	$api = $request->getParsedBody();
    $result = $db->app_user->insert($api);
    echo 'Столик успешно добавлен!';
});

// Добавить спец. предложение
$app->post('/offer/add', function(ServerRequestInterface $request, ResponseInterface $response ) use($db){

	$api = $request->getParsedBody();
    $result = $db->app_offer->insert($api);
    echo 'Предложение успешно добавлено!';

});



$app->run();
