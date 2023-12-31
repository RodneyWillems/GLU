<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>CrackTube</title>

    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="icon" href="https://static-00.iconduck.com/assets.00/youtube-icon-2048x2048-879wd8sv.png">

    <script src="libraries/p5.min.js"></script>
    <script src="libraries/p5.sound.min.js"></script>
  </head>

  <body>
    <?php 
    $video = 1; 
    if (isset($_GET["video"])) {
      $video = $_GET["video"];
    }
    ?>
    <div id="container">
      <!--Container met de video erin-->
      <div id="videoContainer">
        <?php 
        switch ($video) { 
          case 1: 
            echo '<iframe src="https://www.youtube.com/embed/giS0BrfXUmM?si=ClOr8TwLTB6owk8y" allowfullscreen></iframe>';
            break;
          case 2:
            echo '<iframe src="https://www.youtube.com/embed/_czzkqPjvS4?si=tI5VCDOMvLy_HfnD" allowfullscreen></iframe>';
            break;
          case 3:
            echo '<iframe src="https://www.youtube.com/embed/fAQmCNWJHb8?si=POfDTpe3WyEdgCvj" allowfullscreen></iframe>';
            break;
          case 4:
            echo '<iframe src="https://www.youtube.com/embed/3Fh6JnAxq6U?si=vEXOFG3--xmr1HPT" allowfullscreen></iframe>';
            break;
          case 5:
            echo '<iframe src="https://www.youtube.com/embed/iIGlvAlFzf8?si=NcrstNopBQkt9a5D" allowfullscreen></iframe>';
            break;
          default:
            break;
          }
          ?>
      </div>
      <!--Container met de form erin-->
        <div id="inputContainer">
          <?php 
          switch ($video) { 
            case 1: 
              echo '<form action="checkValidity.php?video=1" method="post">';
              break;
            case 2:
              echo '<form action="checkValidity.php?video=2" method="post">';
              break;
            case 3:
              echo '<form action="checkValidity.php?video=3" method="post">';
              break;
            case 4:
              echo '<form action="checkValidity.php?video=4" method="post">';
              break;
            case 5:
              echo '<form action="checkValidity.php?video=5" method="post">';
              break;
            default:
              break;
            }
            ?>
            <input type="text" name="username" id="usernameInput" class="input" placeholder="Username..." required> <br>
            <input type="text" name="email" id="emailInput" class="input" placeholder="Email..." required> <br>
            <!--Textarea in plaats van input zodat de text links bovenin staat in plaats van het midden-->
            <textarea name="comment" id="commentInput" class="input" placeholder="Comment..." required></textarea><br>
            <input type="submit" name="submit" value="Submit" href="checkValidity.php?">
          </form>
        </div>
        <!--Container met de comments erin die worden opgehaald uit de database-->
        <div id="commentContainer">
          <h1>Comments</h1>
          <!--Hier worden de comments opgehaald uit de database-->
          <?php
          include 'connectie.php';
          switch ($video) {
            case 1: 
              $sql = "SELECT username, email, comment FROM cracktube WHERE videoid = 1";
              break;
            case 2:
              $sql = "SELECT username, email, comment FROM cracktube WHERE videoid = 2";
              break;
            case 3:
              $sql = "SELECT username, email, comment FROM cracktube WHERE videoid = 3";
              break;
            case 4:
              $sql = "SELECT username, email, comment FROM cracktube WHERE videoid = 4";
              break;
            case 5:
              $sql = "SELECT username, email, comment FROM cracktube WHERE videoid = 5";
              break;
            default:
            break;
          }
          $result = $conn->query($sql);
          echo "<h2> " . $result->num_rows . " comments </h2>";
          if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) { 
                echo "<p>Username: " . $row["username"]. "<br>Email: " . $row["email"]. "<br>Comment: " . $row["comment"]. "</p>";
            } 
          }
          $conn->close();
          ?>
        </div>
    </div>
    <div id="rightcontainer"> 
      <div id="othervideos">
        <?php 
        switch ($video) {
        case 1:
          echo '<p><a href="index.php?video=2"><img src="https://cdn.discordapp.com/attachments/1147057065592893471/1174667581626515516/image.png?ex=65686d6f&is=6555f86f&hm=3f967f6f9733cd4f880e78d79288b28b9af9a150c53fbdf2c941ea2cda0c8652&"></a>';
          echo '<p><a href="index.php?video=3"><img src="https://cdn.discordapp.com/attachments/1147057065592893471/1174764033333792828/image.png?ex=6568c743&is=65565243&hm=65563052ab9534a9a7581b0962d85b982512436c2dae806580b147fdea7e5113&" class="mayonnaise"></a></p>';
          echo '<p><a href="index.php?video=4"><img src="https://cdn.discordapp.com/attachments/1147057065592893471/1174786467910922250/image.png?ex=6568dc28&is=65566728&hm=a1fd93c61cb58c964de5553da81f38a456105cfdca6a5daf2d56fa66652456cd&"></a></p>';
          echo '<p><a href="index.php?video=5"><img src="https://cdn.discordapp.com/attachments/1130538790000283768/1175171942165266462/image.png?ex=656a4328&is=6557ce28&hm=b3ccd8ea39f067a5599548a5a8e690d55f12891d62be4c6604298ab560267e05&"></a></p>';
          break;
        case 2:
          echo '<p><a href="index.php?video=1"><img src="https://cdn.discordapp.com/attachments/1147057065592893471/1174669249772535818/image.png?ex=65686efd&is=6555f9fd&hm=008334e1599df1e463ef411d52926c67bcc60d05cda859bf6e0e6037c7a55a99&"></a></p>';
          echo '<p><a href="index.php?video=3"><img src="https://cdn.discordapp.com/attachments/1147057065592893471/1174764033333792828/image.png?ex=6568c743&is=65565243&hm=65563052ab9534a9a7581b0962d85b982512436c2dae806580b147fdea7e5113&" class="mayonnaise"></a></p>';
          echo '<p><a href="index.php?video=4"><img src="https://cdn.discordapp.com/attachments/1147057065592893471/1174786467910922250/image.png?ex=6568dc28&is=65566728&hm=a1fd93c61cb58c964de5553da81f38a456105cfdca6a5daf2d56fa66652456cd&"></a></p>';
          echo '<p><a href="index.php?video=5"><img src="https://cdn.discordapp.com/attachments/1130538790000283768/1175171942165266462/image.png?ex=656a4328&is=6557ce28&hm=b3ccd8ea39f067a5599548a5a8e690d55f12891d62be4c6604298ab560267e05&"></a></p>';
          break;
        case 3:
          echo '<p><a href="index.php?video=1"><img src="https://cdn.discordapp.com/attachments/1147057065592893471/1174669249772535818/image.png?ex=65686efd&is=6555f9fd&hm=008334e1599df1e463ef411d52926c67bcc60d05cda859bf6e0e6037c7a55a99&"></a></p>';
          echo '<p><a href="index.php?video=2"><img src="https://cdn.discordapp.com/attachments/1147057065592893471/1174667581626515516/image.png?ex=65686d6f&is=6555f86f&hm=3f967f6f9733cd4f880e78d79288b28b9af9a150c53fbdf2c941ea2cda0c8652&"></a></p>';
          echo '<p><a href="index.php?video=4"><img src="https://cdn.discordapp.com/attachments/1147057065592893471/1174786467910922250/image.png?ex=6568dc28&is=65566728&hm=a1fd93c61cb58c964de5553da81f38a456105cfdca6a5daf2d56fa66652456cd&"></a></p>';
          echo '<p><a href="index.php?video=5"><img src="https://cdn.discordapp.com/attachments/1130538790000283768/1175171942165266462/image.png?ex=656a4328&is=6557ce28&hm=b3ccd8ea39f067a5599548a5a8e690d55f12891d62be4c6604298ab560267e05&"></a></p>';
          break;
        case 4:
          echo '<p><a href="index.php?video=1"><img src="https://cdn.discordapp.com/attachments/1147057065592893471/1174669249772535818/image.png?ex=65686efd&is=6555f9fd&hm=008334e1599df1e463ef411d52926c67bcc60d05cda859bf6e0e6037c7a55a99&"></a></p>';
          echo '<p><a href="index.php?video=2"><img src="https://cdn.discordapp.com/attachments/1147057065592893471/1174667581626515516/image.png?ex=65686d6f&is=6555f86f&hm=3f967f6f9733cd4f880e78d79288b28b9af9a150c53fbdf2c941ea2cda0c8652&"></a></p>';
          echo '<p><a href="index.php?video=3"><img src="https://cdn.discordapp.com/attachments/1147057065592893471/1174764033333792828/image.png?ex=6568c743&is=65565243&hm=65563052ab9534a9a7581b0962d85b982512436c2dae806580b147fdea7e5113&" class="mayonnaise"></a></p>';
          echo '<p><a href="index.php?video=5"><img src="https://cdn.discordapp.com/attachments/1130538790000283768/1175171942165266462/image.png?ex=656a4328&is=6557ce28&hm=b3ccd8ea39f067a5599548a5a8e690d55f12891d62be4c6604298ab560267e05&"></a></p>';
          break;
        case 5:
          echo '<p><a href="index.php?video=1"><img src="https://cdn.discordapp.com/attachments/1147057065592893471/1174669249772535818/image.png?ex=65686efd&is=6555f9fd&hm=008334e1599df1e463ef411d52926c67bcc60d05cda859bf6e0e6037c7a55a99&"></a></p>';
          echo '<p><a href="index.php?video=2"><img src="https://cdn.discordapp.com/attachments/1147057065592893471/1174667581626515516/image.png?ex=65686d6f&is=6555f86f&hm=3f967f6f9733cd4f880e78d79288b28b9af9a150c53fbdf2c941ea2cda0c8652&"></a></p>';
          echo '<p><a href="index.php?video=3"><img src="https://cdn.discordapp.com/attachments/1147057065592893471/1174764033333792828/image.png?ex=6568c743&is=65565243&hm=65563052ab9534a9a7581b0962d85b982512436c2dae806580b147fdea7e5113&" class="mayonnaise"></a></p>';
          echo '<p><a href="index.php?video=4"><img src="https://cdn.discordapp.com/attachments/1147057065592893471/1174786467910922250/image.png?ex=6568dc28&is=65566728&hm=a1fd93c61cb58c964de5553da81f38a456105cfdca6a5daf2d56fa66652456cd&"></a></p>';
          break;
        default:
        break;
        } 
        ?>
        </div>
    </div>
    <script src="sketch.js"></script>
  </body>
</html>