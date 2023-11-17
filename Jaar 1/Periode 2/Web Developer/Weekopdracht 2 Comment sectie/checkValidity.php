<?php
include 'connectie.php';

// Check if the values exist and if so put it in a variable
if (isset($_POST['username'])) {
    $username = $_POST['username'];
    echo "Valid Username";
} else {
    die;
}
if (isset($_POST['email'])) {
    $email = $_POST['email'];
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "$email is geen geldig E-mail adres";
        die;
    }
} else {
    die;
}
if (isset($_POST['comment'])) {
    $comment = $_POST['comment'];
    echo "Valid Comment";
} else {
    die;
}

// Check which video it's suppossed to be with and put it in the database
if (isset($_GET["video"])) {
    $video = $_GET["video"];
    $sql = "INSERT INTO cracktube (videoid, username, email, comment)
    VALUES ('$video', '$username', '$email', '$comment')";
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
        die;
    }
}

$conn->close();

// Redirect back to the right video
switch ($video) {
    case "1":
        header("Location: index.php?video=1");
        break;
    case "2":
        header("Location: index.php?video=2");
        break;
    case "3":
        header("Location: index.php?video=3");
        break;
    case "4":
        header("Location: index.php?video=4");
        break;
    case "5":
        header("Location: index.php?video=5");
        break;
    default:
        break;
}

?>