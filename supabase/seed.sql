-- Synthetic public directory and discovery data. Safe to run repeatedly.
insert into public.authorities (name, ministry, department, description, category) values
  ('Demo Public Works Authority', 'Demo Ministry of Urban Development', 'Roads and Works', 'Illustrative authority responsible for fictional urban road work records.', 'Infrastructure'),
  ('Demo School Education Authority', 'Demo Ministry of Education', 'School Education', 'Illustrative authority for fictional school infrastructure and staffing records.', 'Education'),
  ('Demo Public Health Authority', 'Demo Ministry of Health', 'Public Health Services', 'Illustrative authority for fictional public hospital records.', 'Health'),
  ('Demo Rail Services Authority', 'Demo Ministry of Railways', 'Passenger Services', 'Illustrative authority for fictional rail service records.', 'Transport')
on conflict (name) do update set description = excluded.description;

insert into public.public_information (title, category, authority_id, summary, content)
select 'Road Development Expenditure — FY 2025–26', 'Infrastructure', id, 'Illustrative expenditure summary for road maintenance projects in Pune.', 'This fictional dataset summarises sanctioned and spent amounts for selected road maintenance projects. It is shown to demonstrate information discovery before an RTI is filed.' from public.authorities where name = 'Demo Public Works Authority'
on conflict do nothing;
