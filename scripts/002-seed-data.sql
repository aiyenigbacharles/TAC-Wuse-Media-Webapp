-- Seed data for Church Media Management System
-- Sample data for development and testing

-- Insert sample users
INSERT INTO users (id, email, name, role, avatar_url) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'admin@church.com', 'John Smith', 'Admin', '/man-profile.png'),
    ('550e8400-e29b-41d4-a716-446655440002', 'sarah@church.com', 'Sarah Johnson', 'Media Lead', '/woman-profile.png'),
    ('550e8400-e29b-41d4-a716-446655440003', 'mike@church.com', 'Mike Davis', 'Volunteer', '/man-profile-2.png'),
    ('550e8400-e29b-41d4-a716-446655440004', 'emily@church.com', 'Emily Wilson', 'Volunteer', '/woman-profile-two.png')
ON CONFLICT (email) DO NOTHING;

-- Insert sample services
INSERT INTO services (id, name, description, service_date, service_time, location, service_type, created_by) VALUES
    ('650e8400-e29b-41d4-a716-446655440001', 'Sunday Morning Service', 'Main worship service', '2024-01-21', '10:00:00', 'Main Sanctuary', 'Worship', '550e8400-e29b-41d4-a716-446655440001'),
    ('650e8400-e29b-41d4-a716-446655440002', 'Wednesday Prayer Meeting', 'Midweek prayer and worship', '2024-01-24', '19:00:00', 'Fellowship Hall', 'Prayer', '550e8400-e29b-41d4-a716-446655440001'),
    ('650e8400-e29b-41d4-a716-446655440003', 'Youth Service', 'Youth-focused worship service', '2024-01-26', '18:30:00', 'Youth Room', 'Youth', '550e8400-e29b-41d4-a716-446655440002')
ON CONFLICT (id) DO NOTHING;

-- Insert sample service assignments
INSERT INTO service_assignments (service_id, user_id, role, status) VALUES
    ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'Video Operator', 'confirmed'),
    ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'Audio Technician', 'confirmed'),
    ('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Audio Technician', 'pending'),
    ('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', 'Presentation Operator', 'confirmed')
ON CONFLICT (service_id, user_id, role) DO NOTHING;

-- Insert sample media files
INSERT INTO media_files (id, name, description, file_type, file_size, file_url, category, tags, uploaded_by) VALUES
    ('750e8400-e29b-41d4-a716-446655440001', 'Worship Slides - Jan 21', 'Presentation slides for Sunday service', 'presentation', 2048000, '/presentation-slides.png', 'Presentations', ARRAY['worship', 'slides', 'sunday'], '550e8400-e29b-41d4-a716-446655440001'),
    ('750e8400-e29b-41d4-a716-446655440002', 'Sermon Background', 'Background image for sermon', 'image', 1024000, '/worship-background-video.jpg', 'Backgrounds', ARRAY['sermon', 'background'], '550e8400-e29b-41d4-a716-446655440002'),
    ('750e8400-e29b-41d4-a716-446655440003', 'Church Logo', 'Official church logo', 'image', 512000, '/church-logo.png', 'Graphics', ARRAY['logo', 'branding'], '550e8400-e29b-41d4-a716-446655440001'),
    ('750e8400-e29b-41d4-a716-446655440004', 'Youth Event Promo', 'Promotional video for youth event', 'video', 15728640, '/youth-event-promo.jpg', 'Promotions', ARRAY['youth', 'promo', 'video'], '550e8400-e29b-41d4-a716-446655440002')
ON CONFLICT (id) DO NOTHING;

-- Insert sample announcements
INSERT INTO announcements (id, title, content, priority, category, target_roles, is_published, published_at, created_by) VALUES
    ('850e8400-e29b-41d4-a716-446655440001', 'New Media Training Session', 'Join us for a comprehensive training session on our new media equipment. Learn about the latest audio/video systems and presentation software.', 'high', 'Training', ARRAY['Volunteer', 'Media Lead'], true, NOW(), '550e8400-e29b-41d4-a716-446655440001'),
    ('850e8400-e29b-41d4-a716-446655440002', 'Schedule Update', 'Please note the schedule changes for this week due to the special guest speaker.', 'normal', 'Schedule', ARRAY['Admin', 'Media Lead', 'Volunteer'], true, NOW(), '550e8400-e29b-41d4-a716-446655440002'),
    ('850e8400-e29b-41d4-a716-446655440003', 'Equipment Maintenance', 'Scheduled maintenance for audio equipment this Saturday. Some systems may be unavailable.', 'high', 'Maintenance', ARRAY['Admin', 'Media Lead'], true, NOW(), '550e8400-e29b-41d4-a716-446655440001')
ON CONFLICT (id) DO NOTHING;
