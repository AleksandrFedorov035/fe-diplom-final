// Тестовый файл для проверки API
// Запустите в браузере или Node.js для тестирования

import { api } from './services/api.js';

// Тест поиска городов
async function testSearchCities() {
    try {
        console.log('Тестируем поиск городов...');
        const cities = await api.searchCities('мос');
        console.log('Найденные города:', cities);
    } catch (error) {
        console.error('Ошибка поиска городов:', error);
    }
}

// Тест получения последних направлений
async function testGetLastRoutes() {
    try {
        console.log('Тестируем получение последних направлений...');
        const routes = await api.getLastRoutes();
        console.log('Последние направления:', routes);
    } catch (error) {
        console.error('Ошибка получения последних направлений:', error);
    }
}

// Тест поиска направлений
async function testSearchRoutes() {
    try {
        console.log('Тестируем поиск направлений...');
        const routes = await api.searchRoutes({
            from_city_id: "5b9a2fa7f83e028786ea5672",
            to_city_id: "5b9a2fa8f83e028786ea567b",
            limit: 5
        });
        console.log('Найденные направления:', routes);
    } catch (error) {
        console.error('Ошибка поиска направлений:', error);
    }
}

// Запуск всех тестов
async function runAllTests() {
    console.log('Начинаем тестирование API...');

    await testSearchCities();
    await testGetLastRoutes();
    await testSearchRoutes();

    console.log('Тестирование завершено!');
}

// Запуск тестов (если файл запущен напрямую)
if (typeof window !== 'undefined') {
    // В браузере
    window.runAllTests = runAllTests;
    console.log('Тесты готовы! Вызовите runAllTests() в консоли');
} else {
    // В Node.js
    runAllTests();
}

