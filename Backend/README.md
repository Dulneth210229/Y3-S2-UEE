# Rural Jobs Backend

## Prereqs
- Node 18+
- MongoDB running (local or Atlas)
- Stripe CLI (for webhook tests) optional
- Cloudinary account (or leave env as defaults)

## Setup
```bash
cd backend
cp .env.example .env
npm i
npm run seed
npm run dev
```
API: `http://localhost:$PORT` (default 4000)

## Stripe Webhook (test)
```bash
stripe login
stripe listen --forward-to localhost:4000/payments/webhook
```

## Example Flow (cURL)
```bash
# register seeker
curl -X POST http://localhost:4000/auth/register -H "Content-Type: application/json"   -d '{"email":"user1@example.com","password":"password","role":"JobSeeker"}'

# login
TOKEN=$(curl -s http://localhost:4000/auth/login -H "Content-Type: application/json"   -d '{"email":"seeker@example.com","password":"password"}' | jq -r '.data.tokens.accessToken')

# me
curl -H "Authorization: Bearer $TOKEN" http://localhost:4000/users/me
```

## Must-Have Endpoints
- `POST /auth/register, /auth/login, /auth/refresh, /auth/logout`
- `GET/PUT /users/me, POST /users/me/photo`
- `POST /jobs, GET /jobs, GET /jobs/:id, PUT /jobs/:id, DELETE /jobs/:id`
- `POST /applications, GET /applications/mine, GET /applications/by-job/:jobId, PATCH /applications/:id`
- `POST /payments/job-post/create-session, POST /payments/webhook`
- `GET /suggestions`
- `POST /conversations, GET /conversations`
- `GET /messages/:conversationId, POST /messages/:conversationId`
- Admin: `/admin/jobs?status=pending_approval`, `/admin/jobs/:id/approve`, `/admin/jobs/:id/reject`, `/admin/metrics`
- `POST /sms/send`
- `POST /uploads/image`

## Error Format
```json
{ "success": false, "error": { "message": "string", "code": "STRING", "details":[...] } }
```

## Production Notes
- Strong `JWT_SECRET` & `JWT_REFRESH_SECRET`
- Restrict `CORS_ORIGINS`
- HTTPS proxy and secure Stripe webhook
- Real Cloudinary/Twilio/Stripe keys
- Redis for refresh tokens & Socket.IO adapter for scale
