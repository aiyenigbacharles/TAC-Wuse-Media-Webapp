-- Create applications table for media team applications
-- This table stores all the application data from the form

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone_number text not null,
  occupation text not null,
  technical_skills text not null,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected', 'under_review')),
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.applications enable row level security;

-- Create policies for applications table
-- Users can view their own applications
create policy "applications_select_own"
  on public.applications for select
  using (auth.uid() = user_id);

-- Users can insert their own applications
create policy "applications_insert_own"
  on public.applications for insert
  with check (auth.uid() = user_id);

-- Users can update their own applications (if needed)
create policy "applications_update_own"
  on public.applications for update
  using (auth.uid() = user_id);

-- Admin policy (you can create admin users later)
-- For now, we'll allow public insert for anonymous applications
create policy "applications_insert_public"
  on public.applications for insert
  with check (true);

-- Allow public to view applications (for admin dashboard)
-- You might want to restrict this later to admin users only
create policy "applications_select_public"
  on public.applications for select
  using (true);

-- Create index for better performance
create index if not exists applications_user_id_idx on public.applications(user_id);
create index if not exists applications_status_idx on public.applications(status);
create index if not exists applications_created_at_idx on public.applications(created_at desc);
