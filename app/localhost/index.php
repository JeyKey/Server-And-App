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

require 'api/v1/Auht.php';
require 'api/v1/Article.php';
require 'api/v1/Offer.php';
require 'api/v1/Categories.php';
require 'api/v1/AppUser.php';

$app->get('/', function ($request, $response) {
    $app = $response -> withStatus (200)
					 -> withHeader('Content-Type','application/json')
					 -> withHeader('Access-Control-Allow-Origin','*');

    $result = 'Сервер запущен';

	echo json_encode($result, JSON_UNESCAPED_UNICODE);
	return $app;
});





$app->run();
