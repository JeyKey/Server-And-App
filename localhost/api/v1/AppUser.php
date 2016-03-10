<?php
// Серверная часть: Client RESTfull API
// Дата: 18.02.2016

$app->group('/api/v1', function () use( $db){

//--------------------------------
// GET: Показать столики
//--------------------------------
  	$this->get('/app', function($request, $response) use( $db){

  		$app = $response -> withStatus (200)
  									   -> withHeader('Content-Type','application/json')
  									   -> withHeader('Access-Control-Allow-Origin','*');

          $result = array();
      foreach ($db -> app_user() as $data) {
          $result[]  = array(
              'uid' => $data['uid'],
              'name' => $data['name'],
              'status' => $data['status']
          );
      }

  		echo json_encode($result, JSON_UNESCAPED_UNICODE);
  		return $app;
  	});

//--------------------------------
// GET: Получить статус столика (Онлайн, офлайн)
//--------------------------------
      	$this->get('/app/status/{id}', function($request, $response, $args) use( $db){

      		$app = $response -> withStatus (200)
      									   -> withHeader('Content-Type','application/json')
      									   -> withHeader('Access-Control-Allow-Origin','*');

              $result = array();
          foreach ($db -> app_user() -> where('uid', $args[id]) as $data) {
              $result[]  = array(
                  'status' => $data['status']
              );
          }

      		echo json_encode($result, JSON_UNESCAPED_UNICODE);
      		return $app;
      	});

//--------------------------------
// POST: Обновить статус столика (Онлайн, офлайн) {s} - 0 или 1
//--------------------------------
    $this->post('/app/status/{id}/{s}', function($request, $response, $args) use($db){

      $app = $response -> withStatus (200)
                       -> withHeader('Content-Type','application/json')
                       -> withHeader('Access-Control-Allow-Origin','*');

      $api = $request -> getParsedBody();
      $stat = array ("status" => $args[s],);
      $result = $db -> app_user() -> where('uid', $args[id]) -> update($stat);

      echo json_encode($result, JSON_UNESCAPED_UNICODE);
      return $app;
    });

//--------------------------------
// PUT: Добавить столик
//--------------------------------
	$this->put('/app', function($request, $response) use( $db){

		$app = $response -> withStatus (200)
							  		 -> withHeader('Content-Type','application/json')
							  		 -> withHeader('Access-Control-Allow-Origin','*');

				$api = $request->getParsedBody();
    		$result = $db -> app_user() -> insert($api);
				$result = 'Столик успешно добавлен!';

		echo json_encode($result, JSON_UNESCAPED_UNICODE);
		return $app;
	});

//--------------------------------
// POST: Обновить столик
//--------------------------------
  $this->post('/app/{id}', function($request, $response, $args) use($db){

      $app = $response -> withStatus (200)
                       -> withHeader('Content-Type','application/json')
                       -> withHeader('Access-Control-Allow-Origin','*');

  	   $api = $request -> getParsedBody();
       $result = $db -> app_user() -> where('uid', $args[id]) -> update($api);
       $result = 'Столик успешно обновлен!';

       echo json_encode($result, JSON_UNESCAPED_UNICODE);
       return $app;
  });

//--------------------------------
// DELETE: Удалить столик
//--------------------------------
	$this->delete('/app/{id}', function($request, $response, $args) use( $db){

		$app = $response -> withStatus (200)
										 -> withHeader('Content-Type','application/json')
										 -> withHeader('Access-Control-Allow-Origin','*');

		 $result = $db -> app_user() -> where('uid', $args[id]) -> delete();
		 $result = 'Стол успешно удален!';

		 echo json_encode($result, JSON_UNESCAPED_UNICODE);
		 return $app;

	});

//--------------------------------
// GET: Показать вызов официанта к столику
//--------------------------------
    $this->get('/app/waiter/{id}', function($request, $response, $args) use( $db){

      $app = $response -> withStatus (200)
                       -> withHeader('Content-Type','application/json')
                       -> withHeader('Access-Control-Allow-Origin','*');

      $result = array();
      foreach ($db -> app_user() -> where('uid', $args[id]) as $data) {
        $result[]  = array(
          'waiter' => $data['waiter']
        );
      }

      echo json_encode($result, JSON_UNESCAPED_UNICODE);
      return $app;
    });

//--------------------------------
// POST: Добавить вызов официанта к столику
//--------------------------------
    $this->post('/app/waiter/{id}', function($request, $response, $args) use( $db){

      $app = $response -> withStatus (200)
                       -> withHeader('Content-Type','application/json')
                       -> withHeader('Access-Control-Allow-Origin','*');

        $api = array(
          'waiter' => '1'
        );
      $result = $db -> app_user() -> where('uid', $args[id]) -> update($api);
      $result = 'Официант вызван!';

      echo json_encode($result, JSON_UNESCAPED_UNICODE);
      return $app;
    });

//--------------------------------
// DELETE: Удалить столик
//--------------------------------
    $this->delete('/app/waiter/{id}', function($request, $response, $args) use( $db){

      $app = $response -> withStatus (200)
                       -> withHeader('Content-Type','application/json')
                       -> withHeader('Access-Control-Allow-Origin','*');

        $api = array(
         'waiter' => '0'
        );
      $result = $db -> app_user() -> where('uid', $args[id]) -> update($api);
      $result = 'Вызов официанта удален!';

      echo json_encode($result, JSON_UNESCAPED_UNICODE);
      return $app;

    });


});
