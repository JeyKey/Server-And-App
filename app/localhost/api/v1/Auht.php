<?php
// Серверная часть: Client RESTfull API
// Дата: 18.02.2016

$app->group('/api/v1', function () use( $db){

//--------------------------------
// GET: Проверка авторизации, показать столики
//--------------------------------
	$this->get('/auht', function($request, $response) use( $db){
		$code = $request->getParam('pin');
		$secret = $request->getParam('token');
		$AuhtDb = $db->app_auht()->where('pin', $code);
		$data = $AuhtDb->fetch();
		$token = $secret == $data['token'];

		if ($token && $data) {
			$app = $response -> withStatus (200)
											 -> withHeader('Content-Type','application/json')
											 -> withHeader('Access-Control-Allow-Origin','*');

			$result = array();
			foreach ($db->app_user() as $login) {
				$uid = $login['uid'];
				$result[]  = array(
					'uid' => $login['uid'],
					'name' => $login['name']
				);
			};

		}else{
			return $app = $response -> withStatus (400)
															-> withHeader('Content-Type','application/json')
															-> withHeader('Access-Control-Allow-Origin','*');
		}

		echo json_encode($result, JSON_UNESCAPED_UNICODE);
		return $app;
	});

//--------------------------------
// POST Проверка доступности сервера
//--------------------------------
		$this->post('/auht', function($request, $response) use( $db){

			$app = $response -> withStatus (200)
											 -> withHeader('Content-Type','application/json')
											 -> withHeader('Access-Control-Allow-Origin','*');
			return $app;
		});

});
