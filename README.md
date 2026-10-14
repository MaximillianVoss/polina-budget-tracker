# React — Budget Tracker

Четыре этапа одной работы: форма, Material UI/DataGrid, лимит, маршруты и статистика. Второй каталог — вариант/дубль, отдельного чата не создавать.

Маршрут: прочитать условия → установить зависимости → запустить → пройти проверки → подготовить к сдаче.

## Условия

- [10-react-budget-tracker.md](docs/materials/fullstack-homework-kit/docs/assignments/10-react-budget-tracker.md)

## Запуск из чистой копии

Нужны Node.js (>=20.19.0) и npm. Откройте терминал в корне этого репозитория рядом с package.json.

~~~bash
node --version
npm --version
npm ci
npm run dev
~~~

Откройте локальный адрес, показанный Vite в терминале. Остановка: Ctrl+C.

## Проверка

~~~bash
npm run typecheck
npm run test:run
npm run build
~~~

В этой упаковке установки и проверки не выполнялись. Сборка, браузер, macOS и реальное устройство имеют отдельный статус; наличие файлов не означает готовность к сдаче.

## Разбор и материалы

- [Исходное руководство приложения](docs/PROJECT-README.md)
- [10-react-budget-tracker.md](docs/materials/fullstack-homework-kit/docs/tasks/10-react-budget-tracker.md)


## Единый запуск

```bash
bash ./build-and-run.sh --list
bash ./build-and-run.sh
```

[Запуск и перенос в свой GitHub](docs/CLIENT-HANDOFF.md).

<!-- upstream-tools:start -->
## Скачать независимую копию

В папке `delivery-tools` находятся скрипт, Python companion и каталог всех 24 проектов.
Нужны Git, Python 3.9+ и Bash 3.2+ (macOS/Linux или Windows через WSL/Git Bash).

```bash
mkdir -p "$HOME/Projects"
bash delivery-tools/export-project.sh --catalog delivery-tools/projects.tsv --project web-budget --dest "$HOME/Projects/polina-budget-tracker" --init-git
```

Результат: отдельная папка с новым Git без исходной истории и remote. Без
`--init-git` Git metadata отсутствует. [Все параметры](delivery-tools/README.md).
Отмеченный downloader и этот блок удаляются из чистой копии автоматически.
<!-- upstream-tools:end -->
