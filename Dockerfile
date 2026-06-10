# 1. Node.js 기본 이미지 (로컬 환경: Node v26)
FROM node:26-alpine

# 2. 컨테이너 내부 작업 디렉토리 설정
WORKDIR /app

# 3. 패키지 설치를 위해 package.json과 lock 파일 복사
COPY package.json package-lock.json* ./

# 4. 의존성 패키지 설치
RUN npm install

# 5. 프론트엔드 코드 전체 복사
COPY . .

# 6. Next.js 개발 서버 포트 명시
EXPOSE 3000

# 7. Next.js 개발 서버 실행 (컨테이너 밖에서 접속 가능하도록 0.0.0.0 바인딩)
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
