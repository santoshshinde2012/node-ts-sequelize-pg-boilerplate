-- Insert initial record in Enquiry Table 
CREATE EXTENSION IF NOT EXISTS postgis;

-- Insert initial record in Enquiry Table 
INSERT INTO "Enquiry" (id, name, subject, body, email, country, "createdAt", "updatedAt")
VALUES 
    (gen_random_uuid(), 'Enquiry 1', 'Santosh', 'Demo', 'Waiting for demo', 'sanshinde2012@gmail.com', 'India', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (gen_random_uuid(), 'Enquiry 1', 'Santosh', 'Demo', 'Waiting for demo', 'sanshinde2012@gmail.com', 'India', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);