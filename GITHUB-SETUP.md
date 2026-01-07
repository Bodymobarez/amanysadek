# تعليمات رفع المشروع على GitHub

## الخطوات:

### 1. إنشاء Repository جديد على GitHub:
   - اذهب إلى https://github.com/new
   - اختر اسم للمشروع (مثلاً: `HTML-Parser` أو `amanysadek-website`)
   - اختر Public أو Private
   - **لا** تضع علامة على "Initialize this repository with a README"
   - اضغط "Create repository"

### 2. ربط المشروع بـ GitHub:

بعد إنشاء الـ repository، استبدل `YOUR_USERNAME` و `REPO_NAME` في الأمر التالي:

```bash
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

أو إذا كان الـ repository موجود بالفعل:

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

### 3. رفع الكود:

```bash
git push -u origin main
```

إذا طُلب منك اسم المستخدم وكلمة المرور:
- اسم المستخدم: اسمك على GitHub
- كلمة المرور: استخدم Personal Access Token (ليس كلمة المرور العادية)

### 4. إنشاء Personal Access Token (إذا لزم الأمر):

1. اذهب إلى: https://github.com/settings/tokens
2. اضغط "Generate new token (classic)"
3. اختر الصلاحيات: `repo` (كامل)
4. انسخ الـ token واستخدمه ككلمة مرور عند الرفع

---

## أوامر سريعة:

```bash
# ربط المشروع (استبدل بالرابط الصحيح)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# رفع الكود
git push -u origin main
```

---

## ملاحظات مهمة:

- ✅ تم عمل commit لجميع التغييرات
- ✅ تم تحديث `.gitignore` لاستثناء الملفات الحساسة
- ✅ المشروع جاهز للرفع

