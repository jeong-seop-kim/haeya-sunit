# Haeya Sunit - 투두리스트 애플리케이션

## 프로젝트 소개

Haeya Sunit은 Next.js 14와 Supabase를 활용한 현대적인 투두리스트 애플리케이션입니다. 메인 투두 항목과 서브 투두 항목을 관리할 수 있으며, 시작일과 마감일을 설정할 수 있습니다.

## 기술 스택

- **프레임워크**: Next.js 14
- **데이터베이스**: Supabase
- **상태관리**:
  - Zustand (로컬 상태)
  - React Query (서버 상태)
- **스타일링**: Tailwind CSS
- **타입스크립트**: TypeScript

## 주요 기능

- ✅ 메인 투두 항목 생성/수정/삭제
- ✅ 서브 투두 항목 생성/수정/삭제
- ✅ 시작일/마감일 설정
- ✅ 완료 상태 토글
- ✅ 실시간 데이터 동기화

## 프로젝트 구조

```
src/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API 라우트
│   │   ├── todos/        # 투두 관련 API
│   │   └── sub-todos/    # 서브 투두 관련 API
│   ├── layout.tsx        # 루트 레이아웃
│   └── page.tsx          # 메인 페이지
├── components/           # React 컴포넌트
│   ├── CheckIcon.tsx    # 체크 아이콘
│   ├── EditTodoModal.tsx # 투두 수정 모달
│   ├── TodoItem.tsx     # 개별 투두 항목
│   └── TodoList.tsx     # 투두 목록
├── hooks/               # 커스텀 훅
│   └── useTodos.ts     # 투두 관련 로직
├── lib/                # 유틸리티
│   └── supabase.ts    # Supabase 클라이언트
└── store/             # Zustand 스토어
    └── todo.ts        # 투두 상태 관리
```

## 환경 설정

1. Supabase 프로젝트 생성
2. `.env` 파일 생성 및 환경변수 설정:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Supabase SQL 에디터에서 테이블 생성:

```sql
-- todos 테이블
create table todos (
  id bigint primary key generated always as identity,
  title text not null,
  content text,
  completed boolean default false,
  due_date timestamp with time zone,
  start_date timestamp with time zone,
  has_start_date boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- sub_todos 테이블
create table sub_todos (
  id bigint primary key generated always as identity,
  todo_id bigint references todos(id) on delete cascade,
  title text not null,
  content text,
  completed boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 라이선스

MIT
