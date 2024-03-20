<?php

$servername = "localhost";
$port = "3307";
$username = "root";
$password = "seriesapp@2024";
$dbname = "series_db";

$conn = new mysqli($servername, $username, $password, $dbname, $port);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$date = $_GET['date'];

$sql = "SELECT tv_series.title, tv_series_intervals.week_day, tv_series_intervals.show_time
        FROM tv_series
        INNER JOIN tv_series_intervals ON tv_series.id = tv_series_intervals.tv_series_id
        ORDER BY tv_series_intervals.show_time ASC";

$result = $conn->query($sql);

$week_days = array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
$date_day = date('l', strtotime($date));
$date_time = date('H:i', strtotime($date));
$date_day_index = array_search($date_day, $week_days);

if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {
        $title = $row["title"];
        $week_day = $row["week_day"];
        $show_time = $row["show_time"];

        $week_day_index = array_search($week_day, $week_days);

        if ($week_day_index >= $date_day_index && $date_time < $show_time) {
            $proxima_serie = $title;
            $proximo_dia = $week_day;
            $proxima_fecha = $show_time;
            echo "Próxima serie a emitirse: " . $proxima_serie . " (Day:" . $proximo_dia . " Fecha: " . $proxima_fecha . ")";
            break;
        }
    }
} else {
    echo "No se encontraron series programadas para después de la fecha ingresada.";
}


$conn->close();
