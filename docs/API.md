# API and starter scope

## Existing endpoints

Base path: `/api/v1`.

| Method | Path                    | Request                                          | Authorization                          |
| ------ | ----------------------- | ------------------------------------------------ | -------------------------------------- |
| POST   | `/auth/register`        | `username`, `email`, `password`, optional `role` | Public                                 |
| POST   | `/auth/login`           | `username`, `password`                           | Public                                 |
| POST   | `/auth/change-password` | `currentPassword`, `newPassword`                 | `Authorization: Bearer <access-token>` |

Password examples require 8–20 letters/digits with uppercase, lowercase and a digit. Login returns `data.user` and `data.token` in the API response envelope. A database connection is needed for these flows.

```bash
curl http://localhost:5001/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"example","password":"Example123"}'
```

The API root serves a static landing page. Unmatched `/api/` requests return JSON with a 404; unmatched other URLs receive the HTML not-found page. Invalid Zod requests return 400, and missing/invalid access tokens return 401.

## Unfinished examples

- The frontend's login mutation still references `/auth/send-otp`, while the API implements `/auth/login`.
- The frontend's user query requests `/auth`; no matching GET profile endpoint exists.
- The frontend refresh helper references `/auth/refresh`; that endpoint and refresh-cookie issuance are unfinished. Config entries and a validation schema do not implement this flow.
- The dashboard guard checks cookies and redirects to `/login`, but the starter has no login page. Redux stores tokens separately; align the guard with your chosen auth flow before using it.
- Registration currently accepts `role: admin`. Restrict public registration to ordinary users and manage admin assignment through a trusted flow before exposing the API.
- Token revocation after password changes is commented out in the authentication middleware.

These examples are documented as extension points. Runtime smoke tests cover validation, unauthorized requests, JWT expiry conversion and assets; they do not verify database-backed registration or login.
