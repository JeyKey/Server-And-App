<?php
// Серверная часть: Client RESTfull API
// Дата: 18.02.2016

$app->group('/api/v1', function () use( $db){

//--------------------------------
// GET: Показать все блюда
//--------------------------------
    $this->get('/article', function($request, $response) use( $db){

      $app = $response -> withStatus (200)
                       -> withHeader('Content-Type','application/json')
                       -> withHeader('Access-Control-Allow-Origin','*');

      $result = array();
      foreach ($db->app_articles() as $data) {
        foreach ($db->app_category()->where('id', $data['category_id']) as $datacat) {
          $result[]  = array(
            'id' => $data['id'],
            'category_id' => $data['category_id'],
            'category' => $datacat['title'],
            'name' => $data['name'],
            'price' => $data['price'],
            'old_price' => $data['old_price']
          );
        }}

        echo json_encode($result, JSON_UNESCAPED_UNICODE);
        return $app;
      });

//--------------------------------
// PUT: Добавить блюдо
//--------------------------------
    $this->put('/article', function($request, $response) use($db){

      $app = $response -> withStatus (200)
                       -> withHeader('Content-Type','application/json')
                       -> withHeader('Access-Control-Allow-Origin','*');

      $api = $request -> getParsedBody();
      $result = $db -> app_articles() -> insert($api);
      $result = 'Блюдо успешно добавлено!';

      echo json_encode($result, JSON_UNESCAPED_UNICODE);
      return $app;

    });

//--------------------------------
// GET: Показать все блюда одной категории
//--------------------------------
    $this->get('/article/cat/{id}', function($request, $response, $args) use( $db){

      $CatDb = $db->app_articles()->where('category_id', $args[id]);

      if ($CatDb->fetch()) {
        $app = $response -> withStatus (200)
                         -> withHeader('Content-Type','application/json')
                         -> withHeader('Access-Control-Allow-Origin','*');

        $result = array();
        foreach ($db->app_articles()->where('category_id', $args[id]) as $data) {
          $result[]  = array(
            'id' => $data['id'],
            'name' => $data['name'],
            'price' => $data['price'],
            'old_price' => $data['old_price']

          );}
        }else{
          $app = $response -> withStatus (400)
                           -> withHeader('Content-Type','application/json')
                           -> withHeader('Access-Control-Allow-Origin','*');
        }

        echo json_encode($result, JSON_UNESCAPED_UNICODE);
        return $app;
    });

//--------------------------------
// GET: Показать одно блюдо
//--------------------------------
    $this->get('/article/{id}', function($request, $response, $args) use ($db) {

      $Article = $db->app_articles()->where('id', $args[id]);

      if($data = $Article->fetch()){

        $app = $response -> withStatus (200)
                         -> withHeader('Content-Type','application/json')
                         -> withHeader('Access-Control-Allow-Origin','*');

        $result = array();
        foreach ($db->app_category()->where('id', $data['category_id']) as $datacat) {
          $result[]  = array(
            'id' => $data['id'],
            'image' => $data['image'],
            'category_id' => $data['category_id'],
            'category' => $datacat['title'],
            'name' => $data['name'],
            'times' => $data['times'],
            'callories' => $data['callories'],
            'likes' => $data['likes'],
            'description' => $data['description'],
            'trip' => $data['trip'],
            'wt' =>  $data['wt'],
            'price' => $data['price'],
            'old_price' => $data['old_price'],
            'recomend' => $data['recomend']
          );}
        }else{
          $app = $response -> withStatus (400)
                           -> withHeader('Content-Type','application/json')
                           -> withHeader('Access-Control-Allow-Origin','*');
          $result = 'Ошибка! Такого блюда не существует.';
        }

        echo json_encode($result, JSON_UNESCAPED_UNICODE);
        return $app;

      });


//--------------------------------
// POST: Обновить блюдо
//--------------------------------
    $this->post('/article/{id}', function($request, $response, $args) use($db){

      $app = $response -> withStatus (200)
                       -> withHeader('Content-Type','application/json')
                       -> withHeader('Access-Control-Allow-Origin','*');

  	   $api = $request -> getParsedBody();
       $result = $db -> app_articles() -> where('id', $args[id]) -> update($api);
       $result = 'Блюдо успешно обновлено!';

       echo json_encode($result, JSON_UNESCAPED_UNICODE);
       return $app;

    });

//--------------------------------
// DELETE: Удалить блюдо
//--------------------------------
    $this->delete('/article/{id}', function($request, $response, $args) use($db){
      $app = $response -> withStatus (200)
                       -> withHeader('Content-Type','application/json')
                       -> withHeader('Access-Control-Allow-Origin','*');

       $result = $db -> app_articles() -> where('id', $args[id]) -> delete();
       $result = 'Блюдо успешно удалено!';

       echo json_encode($result, JSON_UNESCAPED_UNICODE);
       return $app;
     });

 });
