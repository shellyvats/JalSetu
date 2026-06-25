-- Insert common roof materials with their runoff coefficients
INSERT INTO roof_materials (material_name, runoff_coefficient, description) VALUES
('Concrete/RCC', 0.85, 'Reinforced Concrete Cement roof with smooth surface'),
('Clay Tiles', 0.75, 'Traditional clay tiles with moderate water absorption'),
('Metal Sheets', 0.90, 'Galvanized iron or aluminum sheets with excellent runoff'),
('Asbestos Sheets', 0.80, 'Corrugated asbestos cement sheets'),
('Thatched Roof', 0.20, 'Traditional straw or palm leaf thatching'),
('Slate', 0.85, 'Natural slate tiles with good water shedding'),
('Shingles', 0.70, 'Wooden or composite shingles'),
('Green Roof', 0.30, 'Living roof with vegetation and growing medium'),
('Membrane Roof', 0.95, 'Waterproof membrane with excellent runoff'),
('Polycarbonate', 0.88, 'Transparent polycarbonate sheets')
ON CONFLICT (material_name) DO NOTHING;
