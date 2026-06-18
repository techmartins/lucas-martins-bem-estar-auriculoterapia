<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>@yield('title', 'Lucas Martins Bem-Estar | Auriculoterapia na Moca, São Paulo')</title>
  <meta name="description" content="Auriculoterapia para alívio de dores, emagrecimento e bem-estar geral. Atendimento na Moca, São Paulo. Agende pelo WhatsApp.">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
  @yield('content')

  <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
