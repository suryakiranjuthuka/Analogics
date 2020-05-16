<?php

class EMail
{

       public function send_mail($email, $subject, $body)

{
        require_once './PHPMailer/PHPMailerAutoload.php';
        require_once './PHPMailer/class.phpmailer.php';
        require_once './PHPMailer/class.smtp.php';
        try
        {
          $mail = new PHPMailer(true);
          $mail->IsSMTP();  // telling the class to use SMTP
          $mail->SMTPAuth   = true;                  // enable SMTP authentication
          $mail->SMTPSecure = "tls";                 // sets the prefix to the servier
          $mail->Host       = "smtp.gmail.com";      // sets GMAIL as the SMTP server
          $mail->Port       = 587;                   // set the SMTP port for the
          $mail->Username = 'analogics.webapp@gmail.com';                 // SMTP username
          $mail->Password = 'analogicsindia';
          $mail->SetFrom("analogics.webapp@gmail.com","Anologics Website");
          $mail->AddAddress($email);
          $mail->WordWrap = 50;
          // set word wrap to 50 characters
          $mail->IsHTML(true); // set email format to HTML
          $mail->Subject  = $subject;
          $mail->Body     = $body;
          if ($mail->Send())
          {
            return (1);
          }
          else
          {
            return(0);
          }
        }
        catch(phpmailerexception $e){
            echo $e->getMessage();
        }
    }
}

?>
