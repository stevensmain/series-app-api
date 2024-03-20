<?php
function isPrimeNumber($number)
{
    if ($number <= 1) {
        return false;
    }
    for ($i = 2; $i <= sqrt($number); $i++) {
        if ($number % $i == 0) {
            return false;
        }
    }
    return true;
}

for ($i = 1; $i <= 100; $i++) {
    echo $i;
    if (isPrimeNumber($i)) {
        echo " [ES PRIMO]";
    }
    echo "\n";
}

phpinfo();
