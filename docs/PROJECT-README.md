# Budget Tracker (React + TypeScript)

Учебная реализация задания `Budget Tracker` из `anotherhw.zip`. В проекте собраны все четыре шага: базовая форма, Material UI, MUI-X DataGrid и React Router со статистикой.

## Запуск

Требуется Node.js 20.19+ или 22.12+.

```bash
npm install --include=optional
npm run test
npm run build
npm run dev
```

После `npm run dev` откройте адрес Vite в браузере. Основные маршруты: `/`, `/budget`, `/statistics`.

Если npm на Windows сообщает `Cannot find native binding`, выполните в корне этого проекта:

```bash
npm install --include=optional
npm install --no-save @rolldown/binding-win32-x64-msvc@1.2.6
```

## Структура

- `src/types.ts` — типы draft, записи и статистики.
- `src/utils/budget.ts` — валидация, нормализация знака и расчёты.
- `src/components/BudgetTracker.tsx` — форма, лимит и сводка.
- `src/components/BudgetItems.tsx` — MUI-X DataGrid, сортировка, фильтрация, пагинация и удаление.
- `src/components/Statistics.tsx` — доходы, расходы и saldo.
- `src/components/Home.tsx` — стартовая страница.
- `src/App.tsx` — общее состояние и маршрутизация.
- `src/*.test.ts(x)` — автоматические тесты.

Полный разбор и листинги находятся в [docs/tasks/10-react-budget-tracker.md](materials/fullstack-homework-kit/docs/tasks/10-react-budget-tracker.md), исходные требования — в [docs/assignments/10-react-budget-tracker.md](materials/fullstack-homework-kit/docs/assignments/10-react-budget-tracker.md).

## Ручной чек-лист

- пустая форма показывает ошибку и не создаёт запись;
- доход отображается положительным, расход — отрицательным;
- Delete удаляет строку;
- переход Budget → Statistics сохраняет данные;
- превышение месячного лимита показывает предупреждение.
