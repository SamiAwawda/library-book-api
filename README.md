# Library Book Management API

REST API بسيط لإدارة الكتب، مبني بـ **Express 5 + TypeScript**، والتخزين in-memory (البيانات بتروح لما يوقف السيرفر).

## التشغيل

```bash
npm install
npm run dev      # تشغيل للتطوير على http://localhost:3000
# أو
npm run build && npm start
```

(ممكن تغيّر البورت بـ `PORT=4000 npm run dev`)

## Book model

| الحقل | النوع | ملاحظة |
|---|---|---|
| id | number | بيتولّد تلقائي |
| title | string | مطلوب |
| author | string | مطلوب |
| genre | string | مطلوب |
| available | boolean | اختياري، الافتراضي `true` |

## Endpoints

| Method | Path | الوصف | الرد |
|---|---|---|---|
| GET | `/books` | كل الكتب | 200 |
| GET | `/books/:id` | كتاب واحد | 200 / 404 |
| POST | `/books` | إضافة كتاب | 201 / 400 |
| PATCH | `/books/:id` | تعديل جزئي (حقل واحد على الأقل) | 200 / 400 / 404 |
| DELETE | `/books/:id` | حذف كتاب | 204 / 404 |

مثال:

```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Dune","author":"Frank Herbert","genre":"Sci-Fi"}'
```

## هيكل المشروع

```
src/
  routes/        books.routes.ts       ← ربط المسارات بالـ controller
  controllers/   books.controller.ts   ← استقبال الطلب + Zod validation + إرسال الرد
  services/      books.service.ts      ← منطق الكتب والتخزين in-memory
  schemas/       book.schema.ts        ← Zod schemas (POST / PATCH / id)
  middleware/    errorHandler.ts       ← معالجة الأخطاء (400 / 404 / 500)
  types/         book.ts
  app.ts, server.ts
```

## معالجة الأخطاء

كل الأخطاء بترجع JSON بشكل `{ "error": "..." }`:

- **400**: فشل الـ validation (مع `details` لكل حقل)، أو id مش رقم صحيح، أو JSON غلط
- **404**: كتاب أو مسار مش موجود
- **500**: خطأ غير متوقع

PATCH بيرفض body فاضي، وبيرفض أي حقل مش معروف (مثلاً `id`).

## اختبار بـ Postman

استورد الملف [postman/library-api.postman_collection.json](postman/library-api.postman_collection.json)
(Import ← اختار الملف)، شغّل السيرفر، وبعدين شغّل الـ collection بالترتيب (Run collection).
فيه 11 طلب بيغطوا الحالات الناجحة والفاشلة، وكل طلب فيه test بيتحقق من الـ status code.

## استخدام الـ AI (AI Usage)

استعملت **Claude Code** في هذا الواجب:

- كتابة الكود الأساسي (الـ routes/controllers/services وZod schemas وmiddleware الأخطاء) والـ Postman collection وهذا الـ README بناءً على متطلبات الواجب.
- Claude شغّل السيرفر وجرّب الـ endpoints بـ curl، ولقى bug: `PATCH` بـ body فاضي كان بيرجّع `available` لـ `true` بدون ما حدا يطلب، لأن الـ default في Zod بيضل شغال مع `.partial()`. انصلح بفصل الـ default عن الـ schema الخاص بالتعديل.
- أنا راجعت الكود وفهمت تقسيم الطبقات قبل التسليم.
