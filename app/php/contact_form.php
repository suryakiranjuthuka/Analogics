<?php
error_reporting(E_ALL);
ini_set('display_errors',1);
require "mail_service.php";

    $name= isset($_POST['name']) ? $_POST['name'] : '-';
    $email= isset($_POST['email']) ? $_POST['email'] : '-';
    $phone= isset($_POST['phone']) ? $_POST['phone'] : '-';
    $designation= isset($_POST['designation']) ? $_POST['designation'] : '-';
    $company= isset($_POST['company']) ? $_POST['company'] : '-';
    $message= isset($_POST['message']) ? $_POST['message'] : '-';

    if(empty($_POST["name"]) || empty($_POST["email"]) || empty($_POST["message"])){

        echo '<script type="text/javascript">alert("Required Fields are missing, Please try again!"),window.location.assign("../contact.html")</script>';
    }
else{
    if(!preg_match("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$^",$email)){

    echo '<script type="text/javascript">alert("Invalid Email!"),window.location.assign("../contact.html")</script>';

     }
    else{
    $to = ['info@analogicgroup.com'];
    $subject = "Analogics Website Form Submission: ".$name;

    $emailBody  = 'Hello,<br/><br/><b><u>Contact details:</u></b> <br/> <table><tr><td>Name:</td> <td> ' . $name . '</td></tr><tr><td>Email:</td> <td> ' . $email . '</td></tr><tr><td>Message:</td> <td>' . $message . '</td></tr><tr><td>Company:</td> <td>' . $company . '</td></tr><tr><td>Designation:</td> <td>' . $designation . '</td></tr>';
    $obj=new EMail();
    for($i=0;$i<sizeof($to);$i++)
     {
      if($obj->send_mail($to[$i],$subject,$emailBody))
      {
         echo '<script type="text/javascript">alert("Form Submission Successful!\nWe will get in touch with you shortly."),window.location.assign("../index.html")</script>';
      }
        else{
            echo '<script type="text/javascript">alert("Something went wrong. Please try again."),window.location.assign("../contact.html")</script>';
        }
       }
    }
 }
?>
