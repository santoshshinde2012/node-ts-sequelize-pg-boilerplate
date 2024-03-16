-- Insert initial record in Enquiry Table 
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create Table
CREATE TABLE Enquiry (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    email VARCHAR(100) NOT NULL,
    body VARCHAR(400) NOT NULL,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP
);

-- Insert initial record in Enquiry Table 
INSERT INTO Enquiry (id, name, country, subject, email, body, createdAt, updatedAt)
VALUES 
    (gen_random_uuid(), 'Santosh', 'India', 'Enquiry 1', 'sanshinde2012@gmail.com', 'Waiting for demo',  NOW(), NOW());