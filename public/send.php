
<?php
/**
 * Обработчик формы обратной связи.
 * Принимает JSON POST-запрос и отправляет письмо на указанный e-mail.
 *
 * Настройка: измените $to на ваш e-mail.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// === НАСТРОЙКИ ===
$to      = 'huston81@mail.ru';       // E-mail получателя
$subject = 'Новая заявка с сайта юриста Литонова А.М.';

// Только POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Читаем JSON
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// Honeypot: если бот заполнил скрытое поле — отбрасываем
if (!empty($input['website'])) {
    http_response_code(200);
    echo json_encode(['ok' => true]); // Притворяемся, что всё ок
    exit;
}

// Санитизация
$name    = htmlspecialchars($input['Имя'] ?? '—', ENT_QUOTES, 'UTF-8');
$surname = htmlspecialchars($input['Фамилия'] ?? '—', ENT_QUOTES, 'UTF-8');
$phone   = htmlspecialchars($input['Телефон'] ?? '—', ENT_QUOTES, 'UTF-8');
$email   = htmlspecialchars($input['E-mail'] ?? '—', ENT_QUOTES, 'UTF-8');
$comment = htmlspecialchars($input['Комментарий'] ?? '—', ENT_QUOTES, 'UTF-8');

// Формируем письмо
$message  = "Новая заявка с сайта юриста Литонова А.М.\n\n";
$message .= "Имя:        $name\n";
$message .= "Фамилия:    $surname\n";
$message .= "Телефон:    $phone\n";
$message .= "E-mail:     $email\n";
$message .= "Комментарий: $comment\n";
$message .= "\n---\n";
$message .= "Отправлено: " . date('d.m.Y H:i:s') . "\n";
$message .= "IP: " . $_SERVER['REMOTE_ADDR'] . "\n";

// Заголовки
$headers  = "From: no-reply@litonov-law.ru\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "MIME-Version: 1.0\r\n";

// Отправляем
$sent = mail($to, $subject, $message, $headers);

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Mail send failed']);
}
