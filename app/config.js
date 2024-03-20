const config = {};

config.api_gateway_url_base = "https://aminimulin.ru:9081";
config.services = [
    'Регистрация QR',
    'Информация о мерчанте',
    'Информация о платеже',
    'Внесение ДС',
    'Управление чеками',
    'Проведение платежей',
    'Получение списка операций',
];
config.serviceNames = [
    "QRC",
    "MRI",
    "PYI",
    "payments_processing",
    "receipts-servce",
    "Payments",
    "operations"
];
config.incidents_page_size = 20;
config.failed_request_retry_period = 10;  // in seconds

export default config;