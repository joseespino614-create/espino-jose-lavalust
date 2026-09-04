<?php

require_once __DIR__ . '/scheme/database/Database.php';

try {
    $db = Database::instance('main');

    $result = $db->query("SELECT 1");

    echo "SUCCESS: Connected to Aiven MySQL!";
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage();
}