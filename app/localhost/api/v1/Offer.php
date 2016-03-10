<?php
// Серверная часть: Client RESTfull API
// Дата: 18.02.2016

$app->group('/api/v1', function () use( $db){

//--------------------------------
// GET: Показать все горячие предложения (ГП)
//--------------------------------
    $this->get('/offer', function($request, $response) use( $db){

      $app = $response -> withStatus (200)
                       -> withHeader('Content-Type','application/json')
                       -> withHeader('Access-Control-Allow-Origin','*');

      $result = array();
      foreach ($db->app_offer() as $data) {
        foreach ($db->app_category()->where('id', $data['category']) as $datacat) {
          $result[]  = array(
            'id' => $data['id'],
            'name' => $data['name'],
            'image' => $data['image'],
            'category_id' => $data['category'],
            'category' => $datacat['title'],
            'text' => $data['text'],
            'price' => $data['price'],
            'old_price' => $data['old_price']
          );
        }}

        echo json_encode($result, JSON_UNESCAPED_UNICODE);
        return $app;
      });


//--------------------------------
// PUT: Добавить горячее предложение (ГП)
//--------------------------------
    $this->put('/offer', function($request, $response) use($db){

      $app = $response -> withStatus (200)
                       -> withHeader('Content-Type','application/json')
                       -> withHeader('Access-Control-Allow-Origin','*');

      $api = $request -> getParsedBody();
      $result = $db -> app_offer() -> insert($api);
      $result = 'Предложение успешно добавлено!';

      echo json_encode($result, JSON_UNESCAPED_UNICODE);
      return $app;

    });

//--------------------------------
// POST: Обновить горячее предложение (ГП)
//--------------------------------
    $this->post('/offer/{id}', function($request, $response, $args) use($db){

      $app = $response -> withStatus (200)
                       -> withHeader('Content-Type','application/json')
                       -> withHeader('Access-Control-Allow-Origin','*');

  	   $api = $request -> getParsedBody();
       $result = $db -> app_offer() -> where('id', $args[id]) -> update($api);
       $result = 'Предложение успешно обновлено!';

       echo json_encode($result, JSON_UNESCAPED_UNICODE);
       return $app;

    });

//--------------------------------
// DELETE: Удалить горячее предложение (ГП)
//--------------------------------
    $this->delete('/offer/{id}', function($request, $response, $args) use($db){
      $app = $response -> withStatus (200)
                       -> withHeader('Content-Type','application/json')
                       -> withHeader('Access-Control-Allow-Origin','*');

       $result = $db -> app_offer() -> where('id', $args[id]) -> delete();
       $result = 'Предложение успешно удалено!';

       echo json_encode($result, JSON_UNESCAPED_UNICODE);
       return $app;
     });

});
