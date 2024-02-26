const config = {};

config.api_gateway_url_base = "https://aminimulin.ru:9081";
config.services = [
    'Регистрация QR',
    'Информация о мерчанте',
    'Информация о платеже',
    'Внесение ДС',
    'Управление чеками',
];
config.serviceNames = [
    "QRC",
    "MRI",
    "PYI",
];
config.incidents_page_size = 20;

export default config;