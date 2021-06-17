<?php
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Access-Control-Allow-Methods: POST');
  header('content-type: application/json; charset=utf-8');
  
  require_once 'dependencies/PHPMailer/PHPMailer.php';
  require_once 'dependencies/PHPMailer/SMTP.php';
  require_once 'dependencies/PHPMailer/Exception.php';
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\SMTP;
  use PHPMailer\PHPMailer\Exception;
  
  $CONFIG = include './config.php';
  $_ENV["HTTP_ROBORREGOS_EMAIL_DOMAIN"] = $CONFIG['ROBORREGOS_EMAIL_DOMAIN'];
  $_ENV["HTTP_ROBORREGOS_EMAIL_USERNAME"] = $CONFIG['ROBORREGOS_EMAIL_USERNAME'];
  $_ENV["HTTP_ROBORREGOS_EMAIL_PASSWORD"] = $CONFIG['ROBORREGOS_EMAIL_PASSWORD'];
  $_ENV["HTTP_RECAPTCHA_SECRET"] = $CONFIG['RECAPTCHA_SECRET'];

  function siteURL() {
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
    $domainName = $_SERVER['HTTP_HOST'].'/';
    return $protocol.$domainName;
  }

  function failResponse($msg, $data) {
    die(json_encode(array("status"=>0,"msg"=>$msg,"data"=>$data)));
  }
  
  function successReponse($msg, $data) {
    die(json_encode(array("status"=>1,"msg"=>$msg,"data"=>$data)));
  }
  
  $params = json_decode(file_get_contents('php://input'), true);
  
  $inputParams = ['from_name', 'message', 'reply_to', 'position', 'recaptchaKey'];
  foreach ($inputParams as $inputParam) {
    if( !$params[$inputParam]) {
      failResponse('Missing Parameters.', false);
    }
  }
  
  function getContent($filename, $params){
    $content = http_build_query($params, '', '&');
    $header = array(
      "Content-Type: application/x-www-form-urlencoded; charset=utf-8",
      "Content-Length: ".strlen($content)
    );
    $options = array( 
      'http' => array( 
        'method' => 'POST',
        'content' => $content,
        'header' => implode("\r\n", $header)
      ) 
    ); 
    $context  = stream_context_create($options);
    $url = siteURL() . 'mail';
    return file_get_contents("$url/templates/$filename", false, $context);
  }

  function sendEmail($to, $subject, $content){
    $mail = new PHPMailer();
    $mail->CharSet = "UTF-8";
    $mail->IsSMTP();
    $mail->SMTPDebug = 0;
    $mail->SMTPAuth = true;
    $mail->Host = "smtp.hostinger.mx";
    $mail->Port = 587;
    $mail->IsHTML(true);
    $mail->Username = $_ENV['HTTP_ROBORREGOS_EMAIL_USERNAME'];
    $mail->Password = $_ENV['HTTP_ROBORREGOS_EMAIL_PASSWORD'];
    $mail->SetFrom($_ENV['HTTP_ROBORREGOS_EMAIL_USERNAME'], 'RoBorregos');
    $mail->addAddress($to);
    $mail->Subject = $subject;
    $mail->Body    = $content;
    $mail->IsHTML(true);
    $mail->Send();
  }

  function verifyCaptcha($recaptchaKey) {
    $post_data = http_build_query(
      array(
        'secret' => $_ENV["HTTP_RECAPTCHA_SECRET"],
        'response' => $recaptchaKey,
      )
    );
    $opts = array('http' =>
      array(
        'method'  => 'POST',
        'header'  => 'Content-type: application/x-www-form-urlencoded',
        'content' => $post_data
      )
    );
    $context  = stream_context_create($opts);
    $response = file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $context);
    $result = json_decode($response);
    if (!$result->success) {
      failResponse('CAPTCHA Verification Failed.', false);
    }
  }

  try {
    verifyCaptcha($params['recaptchaKey']);

    $join_request_params = array('message' => $params['message']);
    $join_request_content = getContent('join_request.php', $join_request_params);
    $join_request_response_params = array('from_name' => $params['from_name'], 'position' => $params['position']);
    $join_request_response_content = getContent('join_request_response.php', $join_request_response_params);

    sendEmail('roborregosteam@gmail.com', $params['from_name'] . ' wants to join!', $join_request_content);
    sendEmail($params['reply_to'], 'Thanks for Applying ' . $params['from_name'], $join_request_response_content);
    successReponse('Mails Sent', false);
  } catch (Exception $e) {
    failResponse('Email-Server Error, Retry Later.', false);
  }
?>