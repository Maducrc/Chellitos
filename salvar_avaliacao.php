<?php
// Configurações do Banco de Dados
$servername = "localhost";
$username = "root"; // Seu usuário do MySQL
$password = "24036M@aria"; // Sua senha do MySQL
$dbname = "chellitos";

// 1. Cria a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// 2. Verifica a conexão
if ($conn->connect_error) {
    die("Falha na Conexão: " . $conn->connect_error);
}

// 3. Verifica se o formulário foi submetido
if (isset($_POST['avaliacao']) && !empty($_POST['avaliacao'])) {
    
    // 4. Recebe o dado e sanitiza
    $avaliacao = $conn->real_escape_string($_POST['avaliacao']);

    // 5. Prepara e Executa a Inserção
    $sql = "INSERT INTO feedback (avaliacoes_texto) VALUES ('$avaliacao')";

    if ($conn->query($sql) === TRUE) {
        echo "<script>";
        echo "window.history.back();"; // Volta para a página anterior, mas mantém a mesma URL
        echo "</script>";
        exit();
    } else {
        // Caso ocorra erro no DB
        echo "<script>";
        echo "alert('Erro ao salvar a avaliação: " . $conn->error . "');";
        echo "window.history.back();";
        echo "</script>";
        exit();
    }
} else {
    // Caso o campo esteja vazio
    echo "<script>";
    echo "window.history.back();";
    echo "</script>";
    exit();
}

$conn->close();
?>