<?php

// Exporta a página / para HTML estático (compatível com GitHub Pages).
// Importante: ao renderizar fora de uma request HTTP real, precisamos fornecer uma Request ao container.

$baseDir = realpath(__DIR__ . '/..'); // laravel/
$autoload = $baseDir . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';

if (!file_exists($autoload)) {
    fwrite(STDERR, "Erro: vendor/autoload.php não encontrado. Rode `composer install` dentro de laravel/.\n");
    exit(1);
}

require $autoload;

$app = require __DIR__ . '/../bootstrap/app.php';

// Cria uma Request "falsa" para que o UrlGenerator/Rotas tenham Request (evita null).
$request = \Illuminate\Http\Request::create('/', 'GET');

// Registra a request no container
$app->instance('request', $request);

// Boot do kernel para garantir que container/providers estejam prontos
$kernel = $app->make(\Illuminate\Contracts\Http\Kernel::class);
$kernel->bootstrap();

$html = $app->make('view')->make('home')->render();

$outDir = realpath(__DIR__ . '/..' . DIRECTORY_SEPARATOR . '..') . DIRECTORY_SEPARATOR . 'docs';
if (!is_dir($outDir)) {
    mkdir($outDir, 0775, true);
}

$dest = $outDir . DIRECTORY_SEPARATOR . 'index.html';
file_put_contents($dest, $html);

echo "Exportado: {$dest}" . PHP_EOL;
