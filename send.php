<?php

header('Content-Type: application/json; charset=utf-8');

$BOT_TOKEN = "8977126137:AAH-80x-zpIrK7p8CpPpHd0qMFtTwPnHems";
$CHAT_ID   = "-5534383102";

// Отримуємо дані
$data = json_decode(file_get_contents("php://input"), true);

$name = htmlspecialchars(trim($data["name"] ?? ""));
$phone = htmlspecialchars(trim($data["phone"] ?? ""));
$service = htmlspecialchars(trim($data["service"] ?? ""));
$message = htmlspecialchars(trim($data["message"] ?? ""));

$text =
"📩 Нова заявка з сайту GrandBudControl\n\n".
"👤 Ім'я: {$name}\n".
"📞 Телефон: {$phone}\n".
"🛠 Послуга: {$service}\n\n".
"📝 Повідомлення:\n{$message}";

$url = "https://api.telegram.org/bot{$BOT_TOKEN}/sendMessage";

$post = [
    "chat_id" => $CHAT_ID,
    "text" => $text
];

$options = [
    "http" => [
        "header"  => "Content-Type: application/x-www-form-urlencoded\r\n",
        "method"  => "POST",
        "content" => http_build_query($post),
        "timeout" => 10
    ]
];

$context = stream_context_create($options);

$result = file_get_contents($url, false, $context);

if ($result !== false) {
    echo json_encode([
        "success" => true
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false
    ]);
}