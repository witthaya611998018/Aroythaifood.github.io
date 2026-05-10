# AROYTHAI Frontend

โปรเจกต์นี้เป็น Frontend ของระบบ AROYTHAI พัฒนาด้วย React + TypeScript + Vite โดยรองรับทั้งหน้าเว็บไซต์ฝั่งผู้ใช้งานทั่วไปและหน้า Admin สำหรับจัดการข้อมูลเมนู

## ภาพรวมโปรเจกต์

ระบบนี้แบ่งการทำงานหลักออกเป็น 2 ส่วน

- หน้า Public สำหรับแสดงเมนูอาหารที่หน้า `/`
- หน้า Admin สำหรับจัดการข้อมูลหลังบ้าน เช่น dashboard, เมนูอาหาร, โปรไฟล์, เปลี่ยนรหัสผ่าน และคู่มือการใช้งาน

การจัดการ state ใช้ Redux Toolkit และการจัดการเส้นทางใช้ React Router

## เทคโนโลยีที่ใช้

- React 19
- TypeScript
- Vite 7
- React Router
- Redux Toolkit
- React Redux
- Tailwind CSS v4
- Headless UI
- Vitest

## โครงสร้างโปรเจกต์หลัก

```text
src/
  app/        bootstrap ของแอป, router, store, hooks
  features/   logic ราย feature เช่น auth, menu
  pages/      หน้า route-level ของระบบ
  shared/     layout, route guard, api helper และ utility ที่ใช้ร่วมกัน
```

แนวทาง import ภายในโปรเจกต์ใช้ alias `@/` เพื่ออ้างอิงจาก `src`

## Route หลักของระบบ

- `/` : หน้าเมนูอาหารฝั่งผู้ใช้งาน
- `/login` : หน้าเข้าสู่ระบบ Admin
- `/dashboard` : หน้า dashboard
- `/menus` : หน้าจัดการเมนูอาหาร
- `/profile` : หน้าโปรไฟล์ผู้ใช้
- `/change-password` : หน้าเปลี่ยนรหัสผ่าน
- `/manuals` : หน้าคู่มือการใช้งาน

หมายเหตุ: route ฝั่ง Admin ถูกครอบด้วย `ProtectedRoute`

## การติดตั้งและเริ่มต้นใช้งาน

1. ติดตั้ง dependencies

```bash
npm install
```

2. สร้างไฟล์ `.env` จาก `.env.example`

```bash
cp .env.example .env
```

ถ้าใช้งานบน Windows ผ่าน PowerShell สามารถคัดลอกไฟล์ด้วยคำสั่ง:

```powershell
Copy-Item .env.example .env
```

3. ปรับค่า environment ให้ตรงกับ backend ที่ใช้งาน

4. รันโปรเจกต์ในโหมดพัฒนา

```bash
npm run dev
```

## Environment Variables

ค่าที่ใช้งานในโปรเจกต์นี้:

- `VITE_API_BASE_URL` : base URL ของ backend API
- `VITE_UPLOADS_BASE_URL` : base URL สำหรับไฟล์รูปภาพหรือ uploads ถ้าต้องการ override path แยกจาก API

ค่าตัวอย่าง:

```env
VITE_API_BASE_URL=http://127.0.0.1:3001/api/aroy
# VITE_UPLOADS_BASE_URL=http://127.0.0.1:3001/uploads
```

## คำสั่งที่ใช้บ่อย

```bash
npm run dev
npm run build
npm run lint
npm run test
npm run preview
```

ความหมายของคำสั่ง:

- `npm run dev` : เปิด development server
- `npm run build` : build production และตรวจ TypeScript
- `npm run lint` : ตรวจ lint ของโค้ด
- `npm run test` : รัน unit tests ด้วย Vitest
- `npm run preview` : preview build ที่ build แล้ว

## แนวทางการพัฒนาในโปรเจกต์นี้

- ใช้ `useAppDispatch()` และ `useAppSelector()` จาก `src/app/hooks.ts`
- เก็บ async logic ที่คุยกับ server ไว้ใน Redux thunks และ service ของแต่ละ feature
- ใช้ shared API helper จาก `src/shared/api/api.ts` แทนการเขียน `fetch()` ใหม่ซ้ำ ๆ
- แยก route ระหว่าง Public และ Admin ให้ชัดเจน
- พยายามต่อยอด flow เดิมของระบบก่อนสร้าง flow ใหม่

## ส่วนสำคัญของระบบเมนูอาหาร

ไฟล์หลักที่เกี่ยวข้องกับการจัดการเมนู:

- `src/features/menu/model/menuSlice.ts`
- `src/features/menu/api/menuService.ts`
- `src/features/menu/ui/AdminMenus.tsx`
- `src/features/menu/ui/AdminMenuEditModal.tsx`

แนวทางที่ใช้อยู่ในระบบ:

- การสร้างและแก้ไขเมนูใช้ modal mode แบบชัดเจน
- การอัปโหลดรูปใช้ `FormData`
- ชื่อ field สำหรับอัปโหลดรูปคือ `image`
- การ refresh รายการเมนูหลัง mutation ควรอิง Redux flow เดิมของระบบ

## ส่วนสำคัญของระบบ Auth

ไฟล์หลัก:

- `src/features/auth/model/authSlice.ts`
- `src/features/auth/ui/LoginForm.tsx`

ระบบ auth มีการเก็บ token ฝั่ง client อยู่แล้ว และใช้ profile bootstrap ตาม flow เดิมของระบบ

## การตรวจสอบงานหลังแก้ไข

สำหรับการแก้ไขทั่วไปของ frontend คำสั่งที่ควรรันอย่างน้อยคือ:

```bash
npm run build
```

ถ้าแก้หลาย component หรือ logic กลางของระบบ ควรตรวจเพิ่มด้วย:

```bash
npm run lint
```
