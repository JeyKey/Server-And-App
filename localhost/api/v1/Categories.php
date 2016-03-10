<?php
// Серверная часть: Client RESTfull API
// Дата: 18.02.2016

$app->group('/api/v1', function () use( $db){

//--------------------------------
// GET: Показать все категории
//--------------------------------
    $this->get('/category', function($request, $response) use( $db){

          $app = $response -> withStatus (200)
                           -> withHeader('Content-Type','application/json')
                           -> withHeader('Access-Control-Allow-Origin','*');

          $result = array();
          foreach ($db->app_category() as $data) {
             $result[]  = array(
                 'id' => $data['id'],
                 'title' => $data['title'],
                 'icon' => $data['icon']
             );
           }

        echo json_encode($result, JSON_UNESCAPED_UNICODE);
  			return $app;
    });

//--------------------------------
// PUT: Добавить категорию
//--------------------------------
  $this->put('/category', function($request, $response) use($db){

    $app = $response -> withStatus (200)
                     -> withHeader('Content-Type','application/json')
                     -> withHeader('Access-Control-Allow-Origin','*');

	   $api = $request -> getParsedBody();
     $result = $db -> app_category() -> insert($api);
     $result = 'Категория успешно добавлена!';

     echo json_encode($result, JSON_UNESCAPED_UNICODE);
     return $app;

  });

//--------------------------------
// POST: Обновить категорию
//--------------------------------
    $this->post('/category/{id}', function($request, $response, $args) use($db){

      $app = $response -> withStatus (200)
                       -> withHeader('Content-Type','application/json')
                       -> withHeader('Access-Control-Allow-Origin','*');

  	   $api = $request -> getParsedBody();
       $result = $db -> app_category() -> where('id', $args[id]) -> update($api);
       $result = 'Категория успешно обновлена!';

       echo json_encode($result, JSON_UNESCAPED_UNICODE);
       return $app;

    });

//--------------------------------
// DELETE: Удалить категорию
//--------------------------------
  $this->delete('/category/{id}', function($request, $response, $args) use($db){
    $app = $response -> withStatus (200)
                     -> withHeader('Content-Type','application/json')
                     -> withHeader('Access-Control-Allow-Origin','*');

     $result = $db -> app_category() -> where('id', $args[id]) -> delete();
     $result = 'Категория успешно удалена!';

     echo json_encode($result, JSON_UNESCAPED_UNICODE);
     return $app;
   });

});
