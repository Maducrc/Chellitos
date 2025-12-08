<?php 
include 'conexão.php';

$nome = $_POST['name'];
$email = $_POST['email'];
$senha = $_POST['senhaUser'];
$senhaCript=password_hash($senha,PASSWORD_DEFAULT);

if (($nome == "") || ($email == "") || ($senha == "")) {
    echo "<script>alert('Preencha todos os campos para realizar o cadastro!!'); history.go(-1);</script>";
}

else {
    try {
        $cadastro_user = $verify->prepare ('INSERT INTO cadastro_usuário(nome, email, senha) VALUES (:nome, :email, :senha)');
        $cadastro_user -> execute (array(
            ':nome' => $nome,
            ':email' => $email,
            ':senha' => $senhaCript
        ));
        
        if ($cadastro_user -> rowCount()==1) {
        echo "<script>alert('Cadastro realizado com sucesso!!'); history.go(-1);</script>";
        }
        else {
        echo "<script>alert('Erro ao cadastrar!!'); history.go(-1);</script>";
        }
    }

    catch (PDOException $erro) {
       if ($erro->getCode() == 23000) {
        
       $email_check = $verify->prepare("SELECT * from cadastro_usuário WHERE email = :email");
       $email_check->execute([':email' => $email]);
        if ($email_check->fetchColumn()) {
            echo "<script>alert('Esse e-mail já está cadastrado. Tente outro.'); history.go(-1);</script>";
        }
    }

    else {
        echo "<script>alert('Houve um erro ao realizar o cadastro, tente novamente'); history.go(-1);</script>";
    }
}
}
?>
