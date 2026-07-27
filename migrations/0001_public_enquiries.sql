CREATE TABLE IF NOT EXISTS public_enquiries (
  id TEXT PRIMARY KEY,
  enquiry_type TEXT NOT NULL CHECK (enquiry_type IN ('contact', 'consultation')),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  topic TEXT,
  preferred_contact TEXT,
  message TEXT,
  consent INTEGER NOT NULL CHECK (consent IN (0, 1)),
  user_agent TEXT,
  cf_country TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_public_enquiries_type_created_at
ON public_enquiries (enquiry_type, created_at);
