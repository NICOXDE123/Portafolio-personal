<?php
session_start();
if (isset($_SESSION['user'])) {
    header("Location: Crud/index.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Portafolio | Nicolás Huenchual</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Solo Bootstrap -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light d-flex align-items-center justify-content-center vh-100">

  <div class="card shadow p-5 text-center" style="min-width: 350px; max-width: 500px;">
    <h1 class="text-primary fw-bold mb-3">¡Bienvenido!</h1>
    <p class="mb-4">Este es el proyecto final CRUD de <strong>Nicolás Huenchual</strong> desarrollado con PHP y Bootstrap.</p>
    <a href="login.php" class="btn btn-primary btn-lg">Iniciar Sesión</a>
  </div>

</body>
</html>
