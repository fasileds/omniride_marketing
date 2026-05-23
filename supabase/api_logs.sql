-- ============================================================
-- OmniRide — API Logs table
-- Run this in Supabase SQL Editor after the main schema.sql
-- ============================================================

CREATE TABLE IF NOT EXISTS api_logs (
  id             UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  endpoint       TEXT        NOT NULL,          -- e.g. /api/waitlist
  method         TEXT        NOT NULL,          -- GET, POST, PATCH, DELETE
  status_code    INTEGER     NOT NULL,          -- HTTP status returned
  success        BOOLEAN     NOT NULL,          -- true if 2xx
  duration_ms    INTEGER,                       -- handler execution time
  error_message  TEXT,                          -- reason for failure (if any)
  request_summary JSONB,                        -- sanitized snapshot of key request data
  ip_address     TEXT,                          -- caller IP
  user_agent     TEXT,                          -- caller user-agent
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast dashboard queries
CREATE INDEX IF NOT EXISTS api_logs_created_at_idx ON api_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS api_logs_success_idx    ON api_logs (success);
CREATE INDEX IF NOT EXISTS api_logs_endpoint_idx   ON api_logs (endpoint);

-- RLS: only service role can read/write (admin reads via service client)
ALTER TABLE api_logs ENABLE ROW LEVEL SECURITY;

-- No public access at all
-- Service role bypasses RLS entirely — no explicit policy needed
