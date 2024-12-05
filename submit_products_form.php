
<?php
$host = "localhost"; // Database host
$user = "root"; // Database user
$password = ""; // Database password
$dbname = "pm_db"; // Database name

// Create connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $description = mysqli_real_escape_string($conn, $_POST['description']);
    $price = mysqli_real_escape_string($conn, $_POST['price']);

    // Insert product into the database
    $sql = "INSERT INTO products (name, description, price) VALUES ('$name', '$description', '$price')";

    if ($conn->query($sql) === TRUE) {
        //show alert after submit successfully
        echo "<script>
            alert('Product submitted successfully!');
            window.location.href = '/test/index.html'; // Redirect to the home page
          </script>";
    exit();
    } else {
        echo "<div style='color: red;'>Error: " . $sql . "<br>" . $conn->error . "</div>";
    }
    
    $conn->close();
}
?>